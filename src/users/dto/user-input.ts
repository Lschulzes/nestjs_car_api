import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../user.entity';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class FindUsersDTO {
  @IsEmail()
  @IsOptional()
  email: string;
}

export class UpdateUserDTO implements Partial<User> {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
