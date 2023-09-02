import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { RegisterOtpGuard } from 'src/auth/registerotp.guard';
import { Request as Req } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}


  @Get('isexist/:credential')
  async isExist(@Param('credential') credential: string) {
    console.log('from isExist controller');
    return await this.userService.isExist(credential);
  }

  @Post('register/email')
  registerEmail(@Body('email') email: string) {
    return this.authService.registerEmail(email);
  }

  @UseGuards(RegisterOtpGuard)
  @Post('register/otp')
  async registerOTP(@Body('otp') otp: string, @Request() req: Req & {user: {email: string, varified: boolean}}) {
    console.log("Hello from register otp controller");
    return this.userService.verifyRegisterOTP(req.user.email, otp);
  }


  @UseGuards(RegisterOtpGuard)
  @Get('register/otp/resend')
  async registerOTPResend (@Request() req: Req & {user: {email: string}}) {
    return this.userService.registerOTPResend(req.user.email);
  }
}
