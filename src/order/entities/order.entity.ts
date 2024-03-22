import {
  Entity,
  OneToMany,
  JoinColumn,
  OneToOne,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToMany(() => ProductEntity, (item) => item.id)
  items: ProductEntity[];

  @OneToOne(() => UserEntity, (user) => user.username)
  @JoinColumn()
  user: UserEntity;

  @Column()
  subTotal: number;

  @Column({ default: false })
  pending: boolean;
}
