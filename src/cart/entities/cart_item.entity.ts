import {
  Entity,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('cart_item')
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn()
  item: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.username)
  @JoinColumn()
  user: UserEntity;
}
