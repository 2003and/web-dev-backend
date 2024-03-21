import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartEntity } from './entities/cart.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CartEntity, ProductEntity, UserEntity]),
    ProductEntity,
  ],
})
export class CartModule {}
