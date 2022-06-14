import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDTO, FindUsersDTO, UpdateUserDTO } from './dto/user-input';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    return this.service.create(body);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.service.findOne(parseInt(id));
    if (!user) throw new NotFoundException(`No user with id of ${id}`);

    return user;
  }

  @Get()
  findUsers(@Query() req: FindUsersDTO) {
    return this.service.find(req?.email);
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
