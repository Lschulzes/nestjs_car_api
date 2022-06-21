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
import { CurrentUser } from './decorators/current-user.decorator';
import {
  CreateUserDTO,
  FindUsersDTO,
  UpdateUserDTO,
  UserSession,
} from './dto/user-input';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('me')
  me(@CurrentUser() user: User) {
    return user;
  }

  @Post('signup')
  async createUser(
    @Body() { email, password }: CreateUserDTO,
    @Session() session: UserSession,
  ) {
    const user = await this.authService.signup(email, password);
    session.userId = user.id;

    return user;
  }

  @Post('signin')
  async signin(
    @Body() { email, password }: CreateUserDTO,
    @Session() session: any,
  ) {
    const user = await this.authService.signin(email, password);
    session.userId = user.id;

    return user;
  }

  @Post('signout')
  async signout(@Session() session: any) {
    session.userId = void 0;

    return { message: 'Signed Out!' };
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
