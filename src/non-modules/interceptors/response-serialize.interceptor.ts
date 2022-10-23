import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { ClassType } from '../typing/class.typing';

export class ResponseSerializeInterceptor implements NestInterceptor {
  private dto: ClassType;

  constructor(dto: ClassType) {
    this.dto = dto;
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Run something b4 the req is handled
    console.log('B4 request is handled');
    console.log(this.dto);
    return next.handle().pipe(
      map((data: any) => {
        // Run something b4 the response is sent out
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
