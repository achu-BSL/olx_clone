import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserPayload } from 'src/auth/interfaces/payload.interface';

@Injectable()
export class TransformAddProductDtoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    try {
      const request: Request & { user: UserPayload } = context
        .switchToHttp()
        .getRequest();
      request.body.useremail = request.user.email;
      request.body.userId = request.user.userId;
      request.body.product_imgs = request.files;

      return next.handle();
    } catch (err) {
      throw new BadGatewayException();
    }
  }
}
