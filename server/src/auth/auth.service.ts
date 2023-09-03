import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Mailer } from 'src/utils/mail.util';
import { RegisterDetailsPayload, RegisterOtpPayload, UserPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailer: Mailer,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken(payload: object) {
    return await this.jwtService.signAsync(payload);
  }

  async registerEmail(email: string): Promise<{ otp_token: string }> {
    this.mailer.sendOTP(email);
    const payload: RegisterOtpPayload = {
      email: email,
      varified: false,
    };
    return {
      otp_token: await this.generateToken(payload),
    };
  }

  async registerDetailsToken(email: string): Promise<string> {
    const payload: RegisterDetailsPayload = {
      email,
      varified: true,
    };
    return await this.generateToken(payload);
  }

  async login(useremail: string, username: string, userId: number): Promise<string> {
    const payload: UserPayload = {
      username,
      email: useremail,
      userId
    };

    return await this.generateToken(payload);
  }
}
