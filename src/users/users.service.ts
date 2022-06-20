import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(data: { email: string; password: string }) {
    const user = this.repository.create(data);

    return this.repository.save(user);
  }

  async findOne(id: number) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`No user with id of ${id}`);

    return user;
  }

  find(email?: string) {
    return this.repository.find({ where: { email } });
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found!');

    Object.assign(user, attributes);

    return this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found!');

    await this.repository.remove(user);
  }
}
