import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);

    if (users.length) throw new BadRequestException('Email already taken');

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = `${salt}.${hash.toString('hex')}`;

    return await this.usersService.create({ email, password: result });
  }

  async signin(email: string, password: string) {
    const user = (await this.usersService.find(email))?.[0];

    const [salt, hash] = user.password.split('.');

    const currentHash = ((await scrypt(password, salt, 32)) as Buffer).toString(
      'hex',
    );

    if (currentHash !== hash) throw new BadRequestException('Wrong password');

    return user;
  }
}
