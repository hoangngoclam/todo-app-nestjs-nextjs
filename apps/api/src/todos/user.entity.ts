import { Todo } from './todo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  updated_at: Date;

  @Column()
  created_at: Date;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
