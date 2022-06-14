import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  find(email?: string) {
    return this.repository.find({ where: { email } });
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new Error('User not found!');

    Object.assign(user, attributes);

    return this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new Error('User not found!');

    await this.repository.remove(user);
  }
}
