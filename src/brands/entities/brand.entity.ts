import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('brand')
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;
}
