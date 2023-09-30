import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
