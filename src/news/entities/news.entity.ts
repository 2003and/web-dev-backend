// import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
