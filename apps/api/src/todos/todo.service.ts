import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { PaginationDto, PageMetaDto } from '../dtos/pagination.dto';

export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  async getTodos() {
    const todos = await this.todoRepo.find();

    return new PaginationDto(todos, new PageMetaDto(1, 50, 200));
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
      created_at: new Date(),
      updated_at: new Date(),
    });
    return await this.todoRepo.save(newTodo);
  }
}
