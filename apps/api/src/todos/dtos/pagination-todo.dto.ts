import { TodoDto } from './todo.dto';
import { PaginationDto } from '../../dtos/pagination.dto';
import { Expose, Type } from 'class-transformer';

export class RequestListPaginationDto extends PaginationDto<TodoDto> {
  @Expose()
  @Type(() => TodoDto)
  items: TodoDto[];
}
