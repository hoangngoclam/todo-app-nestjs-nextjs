import { Type } from 'class-transformer';
import { TodoDto } from './todo.dto';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  @Type(() => TodoDto)
  todos: TodoDto[];
}
