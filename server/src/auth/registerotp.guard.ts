import {
  BadGatewayException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export class RegisterOtpGuard implements CanActivate {
  constructor(@Inject(JwtService) private  jwtService: JwtService) {}


  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      console.log("No toke");
      throw new UnauthorizedException();
    }
    try {

      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'SECRET',
      });

      if (payload.varified === undefined) throw new ForbiddenException();
      else if (payload.varified) throw new BadGatewayException();
      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
