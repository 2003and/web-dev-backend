import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('idea')
export class IdeaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;
}
