import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Error extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  error: string;

  @Column()
  uuid: string;
}
