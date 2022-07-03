import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';

interface ClassConstructor {
  new (...args: Array<any>): {};
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private DTO: ClassConstructor) {}

  intercept(_ctx: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) =>
        plainToInstance(this.DTO, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}

export const Serialize = (dto: ClassConstructor) =>
  UseInterceptors(new SerializeInterceptor(dto));
