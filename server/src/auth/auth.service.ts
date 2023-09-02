import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { generateOTP } from 'src/utils/generateOTP';
import { Mailer } from 'src/utils/mail.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailer: Mailer,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async storeOTP(email: string, OTP: string) {
    const otp = await this.prisma.otp.findUnique({
      where: { email: email },
    });

    if (otp) {
      await this.prisma.otp.update({
        where: { email },
        data: {
          OTP,
          expireOn: new Date(Date.now() + 60000),
        },
      });
    } else {
      await this.prisma.otp.create({
        data: {
          OTP: OTP,
          email: email,
          expireOn: new Date(Date.now() + 60000),
        },
      });
    }
  }



  async registerEmail(email: string) {
    const OTP = generateOTP(4);
    this.storeOTP(email, OTP);
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

  async registerDetailsToken (email: string) {
    const payload = {
      email,
      varified: true
    }
    return await this.jwtService.signAsync(payload);
  }
}
