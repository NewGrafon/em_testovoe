import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  surname: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'integer' })
  age: number;
}
