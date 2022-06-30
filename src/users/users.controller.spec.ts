import { CreateUserDTO } from './dto/user-input';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';

const [email, password] = ['Afefewf@fwee.com', 'asdf'];

describe('UsersController', () => {
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUsersService: Partial<UsersService>;
  const users: Array<User> = [];

  beforeEach(async () => {
    fakeAuthService = {
      // signup(email, password) {},
      signin(email, password) {
        return Promise.resolve({
          id: Math.trunc(Math.random() * 9999999),
          email,
          password,
        } as User);
      },
    };

    fakeUsersService = {
      findOne(id) {
        const user = users.find((user) => user.id === id);
        if (!user) throw new BadRequestException();

        return Promise.resolve(user);
      },
      find: (email?: string) => {
        const user = users.find((user) => user.email === email);
        if (!user) return Promise.resolve(users);

        return Promise.resolve([user]);
      },
      create({ email, password }: CreateUserDTO) {
        const newUser = {
          id: Math.trunc(Math.random() * 9999999),
          email,
          password,
        } as User;
        users.push(newUser);
        return Promise.resolve(newUser);
      },

      // remove(id) {},
      // update(id, attributes) {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    fakeUsersService.create({ email, password });

    const users = await controller.findUsers();

    expect(users.data[0].email).toEqual(email);
  });

  it('findUser returns a single user with the given id', async () => {
    fakeUsersService.create({ email, password });

    const users = await controller.findUsers();

    const { id } = users.data[0];

    const user = await controller.findUser(id + '');

    expect(user).toBeDefined();
  });

  it('signin updates session object and returns user', async () => {
    const session: { userId?: number } = {};

    const user = await controller.signin({ email, password }, session);

    expect(session?.userId).toEqual(user.id);
  });
});
