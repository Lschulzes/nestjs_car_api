import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, FindUsersDTO, UpdateUserDTO } from './dto/user-input';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private service: UsersService, private auth: AuthService) {}

  @Post('signup')
  createUser(@Body() { email, password }: CreateUserDTO) {
    return this.auth.signup(email, password);
  }

  @Post('signin')
  logUser(@Body() body: CreateUserDTO) {
    return this.auth.signin(body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Get()
  findUsers(@Query('email') email: FindUsersDTO['email']) {
    return this.service.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.service.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
