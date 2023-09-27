import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';

export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  async getTodos() {
    return await this.todoRepo.find();
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
