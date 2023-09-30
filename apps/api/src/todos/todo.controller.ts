import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Serialize } from '../interceptors/serialize.Interceptor';
import { TodoDto } from './dtos/todo.dto';
import { RequestListPaginationDto } from './dtos/pagination-todo.dto';
import { GetTodoQueryDto } from './dtos/getTodoQuery.dto';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @Serialize(RequestListPaginationDto)
  getTodos(@Query() query: GetTodoQueryDto) {
    return this.todoService.getTodos(query);
  }

  @Serialize(TodoDto)
  @Get(':id')
  getTodo(@Param('id') id: number) {
    return this.todoService.getOneTodo(id);
  }

  @Post()
  createTodo(@Body() payload: CreateTodoDto) {
    return this.todoService.createTodo(payload);
  }
}
