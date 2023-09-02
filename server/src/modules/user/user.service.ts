import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { generateOTP } from 'src/utils/generateOTP';
import { Mailer } from 'src/utils/mail.util';

@Injectable()
export class UserService {
  constructor(
    private readonly mailer: Mailer,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService
  ) {}


  async isExist(credential: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { useremail: credential },
          { username: credential },
          { userphone: +credential || 0 },
        ],
      },
    });

    if (user) throw new BadRequestException({ message: 'User already exist' });
    return 'User not exist';
  }

  async verifyRegisterOTP (email: string, otp: string) {
    const validOTP = await this.prisma.otp.findUnique({
      where: {email: email}
    })
    console.log(validOTP + "   -35");
    console.log(otp, "   user otp  -36");
    if(!validOTP) throw new BadRequestException()
    else if(validOTP.OTP !== otp) throw new BadRequestException()
    else if (validOTP.expireOn < new Date()) throw new BadRequestException();

    return {
      register_details_token: this.authService.registerDetailsToken(email)
    }
  }


  async registerOTPResend (email: string) {
    const OTP = generateOTP(4);
    this.authService.storeOTP(email, OTP);
    await this.mailer.sendMail({
      toEmail: email,
      subject: 'OTP for email varification',
      text: `Your OTP is ${OTP}`,
    });
    return 'OTP send successfully';
  }


}
