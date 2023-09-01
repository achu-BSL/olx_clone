import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

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
}
