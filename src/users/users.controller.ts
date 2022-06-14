import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/user-input';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    return this.service.create(body);
  }
}
