import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.Interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Serialize(UserDto)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
