import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserSession } from 'src/users/dto/user-input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = (req.session as UserSession) || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);

      req['user'] = user;
    }

    next();
  }
}
