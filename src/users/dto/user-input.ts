import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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

export class UpdateUserDTO extends PartialType(User) {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}

export class UserSession {
  @IsNumber()
  @IsOptional()
  userId: number;
}
