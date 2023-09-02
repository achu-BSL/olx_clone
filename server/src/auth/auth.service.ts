import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Mailer } from 'src/utils/mail.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailer: Mailer,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken (payload: object) {
    return await this.jwtService.signAsync(payload);
  }


  async registerEmail(email: string) {
    this.mailer.sendOTP(email);
    const payload = {
      email: email,
      varified: false,
    };
    return {
      otp_token: await this.generateToken(payload),
    };
  }

  async registerDetailsToken (email: string) {
    const payload = {
      email,
      varified: true
    }
    return await this.generateToken(payload);
  }
}
