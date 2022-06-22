import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private DTO: any) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const res = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) =>
        plainToInstance(this.DTO, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}

interface ClassConstructor {
  new (...args: Array<any>): {};
}

export const Serialize = (dto: ClassConstructor) =>
  UseInterceptors(new SerializeInterceptor(dto));
