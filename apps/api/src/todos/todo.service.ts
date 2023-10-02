import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { PaginationDto, PageMetaDto } from '../dtos/pagination.dto';
import { GetTodoQueryDto } from './dtos/getTodoQuery.dto';

export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  async getTodos({ is_completed, name }: GetTodoQueryDto) {
    const todos: SelectQueryBuilder<Todo> =
      await this.todoRepo.createQueryBuilder();
    if (is_completed) {
      todos.andWhere({ is_completed: is_completed });
    }
    if (name) {
      todos.andWhere('title like :name', { name: `%${name}%` });
    }
    const todosResult = await todos.getMany();
    return new PaginationDto(todosResult, new PageMetaDto(1, 50, 200));
  }

  async getOneTodo(id: number) {
    const todoResult = await this.todoRepo.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    console.log(todoResult);
    return todoResult;
  }

  async createTodo(data: CreateTodoDto) {
    const newTodo = this.todoRepo.create({
      ...data,
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return await this.todoRepo.save(newTodo);
  }
}
