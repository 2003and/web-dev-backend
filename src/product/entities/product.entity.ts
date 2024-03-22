// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('product')
// export class ProductEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   image: string;

//   @Column()
//   title: string;

//   @Column()
//   text: string;
// }
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { BrandEntity } from 'src/brands/entities/brand.entity';
import { PromoEntity } from 'src/promo/entities/promo.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  price: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  @ManyToMany(() => CartEntity, (cart) => cart.item, {
    eager: true,
  })
  @JoinColumn()
  carts: CartEntity[];

  @ManyToOne(() => BrandEntity, (brand) => brand.product, {
    eager: true,
  })
  @JoinColumn()
  brand: BrandEntity;

  @OneToOne(() => PromoEntity, (promo) => promo.product, {
    eager: true,
  })
  @JoinColumn()
  promo: PromoEntity;
}
