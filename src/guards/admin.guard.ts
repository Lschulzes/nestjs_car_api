import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class Admin implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user) return false;

    return request.user.isAdmin;
  }
}
