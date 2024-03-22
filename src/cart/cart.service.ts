import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CartService {
  async getItemsInCard(user: string): Promise<CartEntity[]> {
    const userCart = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    return (await userCart).filter((item) => item.user.username === user);
  }

  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    // @InjectRepository(UserEntity)
    // private categoryRepository: Repository<UserEntity>,
  ) {}
  async create(dto: CreateCartDto) {
    const cart = new CartEntity();
    cart.quantity = dto.quantity;
    cart.user = await this.userRepository.findOneBy({ id: dto.userId });
    cart.item = await this.productRepository.findOneBy({ id: dto.itemId });

    const newCart = await this.cartRepository.save(cart);

    const product = await this.productRepository.findOne({
      where: { id: dto.itemId },
      relations: ['carts'],
    });
    // todo: calc sum price
    // product.price;

    if (product.carts != null) {
      product.carts.push(cart);
    }

    await this.productRepository.save(product);

    return newCart;
    // todo: make UserEntity connection
  }

  async findAll() {
    return this.cartRepository.find();
  }

  async findOne(id: number) {
    return this.cartRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCartDto) {
    const toUpdate = await this.cartRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.quantity) {
      toUpdate.quantity = dto.quantity;
    }
    return this.cartRepository.save(toUpdate);
  }

  async remove(id: number) {
    return this.cartRepository.delete(id);
  }
}
