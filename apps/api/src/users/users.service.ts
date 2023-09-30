import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findAll() {
    return this.userRepo.find({ relations: { todos: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
