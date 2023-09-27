import { UserDto } from './user.dto';
import { Expose } from 'class-transformer';

export class TodoDto {
  @Expose()
  title: string;

  @Expose()
  id: number;

  @Expose()
  user: UserDto;
}
