import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, FindUsersDTO, UpdateUserDTO } from './dto/user-input';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  createUser(@Body() { email, password }: CreateUserDTO) {
    return this.authService.signup(email, password);
  }

  @Post('signin')
  logUser(@Body() { email, password }: CreateUserDTO) {
    return this.authService.signin(email, password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findUsers(@Query('email') email: FindUsersDTO['email']) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
