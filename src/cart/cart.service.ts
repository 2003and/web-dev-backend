import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartItemEntity } from './entities/cart_item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CartService {
  async getItemsInCart(userId: number): Promise<CartItemEntity[]> {
    const userCart = await this.cartItemRepository.find({
      relations: ['item', 'user'],
    });
    return (await userCart).filter((item) => item.user.id === userId);
  }

  constructor(
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async create(dto: CreateCartDto, userId: number) {
    const userCart = await this.cartItemRepository
      .createQueryBuilder()
      .select()
      .from(CartItemEntity, 't')
      .where('t.userId = :userId and t.itemId = :itemId', {
        userId: userId,
        itemId: dto.itemId,
      })
      .execute();
    let cartItem;
    if (userCart.length === 0) {
      // create new record
      cartItem = new CartItemEntity();
      cartItem.quantity = dto.quantity;
      cartItem.user = await this.userRepository.findOneBy({ id: userId });
      cartItem.item = await this.productRepository.findOneBy({
        id: dto.itemId,
      });
    } else {
      // update existing record
      //   cartItem = this.cartItemRepository
      //     .createQueryBuilder()
      //     .select()
      //     .from(CartItemEntity, 't')
      //     .where('t.userId = :userId and t.itemId = :itemId', {
      //       userId: userId,
      //       itemId: dto.itemId,
      //     })
      //     .execute();
      userCart.quantity += dto.quantity;
    }
    const newCart = await this.cartItemRepository.save(cartItem);

    const product = await this.productRepository.findOne({
      where: { id: dto.itemId },
      relations: ['carts'],
    });
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      relations: ['carts'],
    });

    if (product.carts != null) {
      product.carts.push(cartItem);
    }

    await this.productRepository.save(product);
    await this.userRepository.save(user);

    return newCart;
  }

  async findAll() {
    return this.cartItemRepository.find();
  }

  async get(userId: number) {
    return await this.cartItemRepository
      .createQueryBuilder()
      .select()
      .from(CartItemEntity, 't')
      .where('t.userId = :userId', { userId: userId })
      .execute();
  }

  // todo
  async update(id: number, dto: UpdateCartDto) {
    const toUpdate = await this.cartItemRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.quantity) {
      toUpdate.quantity = dto.quantity;
    }
    return this.cartItemRepository.save(toUpdate);
  }

  async remove(id: number) {
    return this.cartItemRepository.delete(id);
  }

  async clearCart(userId: number) {
    await this.cartItemRepository
      .createQueryBuilder()
      .delete()
      .from(CartItemEntity)
      .where('userId = :userId', { userId: userId })
      .execute();
    // this.cartRepository.delete({ user.id: user_id });
  }
}
