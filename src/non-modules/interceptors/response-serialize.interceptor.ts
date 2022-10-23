import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { OutgoingDepartmentDto } from 'src/department/dtos/outgoing-department.dto';

export class ResponseSerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Run something b4 the req is handled
    console.log('Runnig b4', context);

    return next.handle().pipe(
      map((data: any) => {
        // Run something b4 the response is sent out
        return plainToInstance(OutgoingDepartmentDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
