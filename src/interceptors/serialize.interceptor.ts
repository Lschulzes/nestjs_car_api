import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  intercept<T>(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<T> | Promise<Observable<T>> {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data: T) => {
        console.log("I'm running b4 response is sent out", data);
        return data;
      }),
    );
  }
}
