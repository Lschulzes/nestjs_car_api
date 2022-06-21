import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserSession } from '../dto/user-input';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept<T>(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Promise<Observable<T>> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session as UserSession;

    if (userId) {
      const user = await this.usersService.findOne(userId);

      request.user = user;
    }

    return next.handle();
  }
}
