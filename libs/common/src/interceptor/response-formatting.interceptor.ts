import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseFormattingInterceptor implements NestInterceptor {
  excludeRoutes = ['/auth/login'];
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const path = request.path;

    if (this.excludeRoutes.includes(path)) {
      return next.handle();
    }
    return next.handle().pipe(
      map((data) => {
        // console.log('context',context)
        if (data && data.data && data.message && !data.pagination) {
          // console.log('data working');
          return {
            error: false,
            value: data.data,
            message: data.message,
          };
        }
        if (data.pagination) {
          // console.log('data.pagination', data.pagination);
          return {
            error: false,
            value: data.data,
            message: data.message,
            pagination: data.pagination,
          };
        }

        throw new BadRequestException('Invalid response format');
      }),
    );
  }
}
