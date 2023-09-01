import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateOTP } from 'src/utils/generateOTP';
import { Mailer } from 'src/utils/mail.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailer: Mailer,
    private readonly jwtService: JwtService,
  ) {}

  async registerEmail(email: string) {
    const OTP = generateOTP(4);
    await this.mailer.sendMail({
      toEmail: email,
      subject: 'OTP for email varification',
      text: `Your OTP is ${OTP}`,
    });
    const payload = {
      email: email,
      varified: false,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      otp_token: token,
    };
  }
}
