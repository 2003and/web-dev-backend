import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CartService } from 'src/cart/cart.service';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductService } from 'src/product/product.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Module } from '@nestjs/common';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      ProductEntity,
      CartEntity,
      UserEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, CartService, ProductService],
})
export class OrderModule {}
