import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/user-input';
import { User } from './user.entity';
import { UsersService } from './users.service';

const [email, password] = ['Afefewf@fwee.com', 'asdf'];

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: Array<User> = [];

    fakeUsersService = {
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
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup(email, password);

    expect(user.password).not.toEqual(password);

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', (done) => {
    service.signup(email, password).then(() => {
      service.signup(email, password).catch(() => {
        done();
      });
    });
  });

  it('throws if signin is called with an unused email', (done) => {
    service.signin('sadasdsd@sdfsdf.com', 'fdsdfsdf').catch(() => {
      done();
    });
  });

  it('throws if an invalid password is provided', (done) => {
    service.signup(email, password).then(() => {
      service.signin(email, 'wrong_password').catch(() => {
        done();
      });
    });
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup(email, password);

    const user = await service.signin(email, password);

    expect(user).toBeDefined();
  });
});
