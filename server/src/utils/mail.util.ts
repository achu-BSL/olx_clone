import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { generateOTP } from './generateOTP';
import { PrismaService } from 'src/modules/prisma/prisma.service';

interface SendMailInterface {
  toEmail: string;
  subject: string;
  text: string;
}

@Injectable()
export class Mailer {
  constructor(
    private readonly mailService: MailerService,
    @Inject(PrismaService) private readonly prisma: PrismaService,
  ) {}

  /**
   * For send mail.
   * @param param0 
   */
  private async sendMail({ toEmail, subject, text }: SendMailInterface) {
    await this.mailService.sendMail({
      from: process.env.USER_EMAIL,
      to: toEmail,
      subject: subject,
      text: text,
    });
  }


  /**
   * To store and send otp via mail.
   * @param email 
   */
  async sendOTP (email: string) {
    const OTP = generateOTP(4);
    console.log("OTP ---------- ", OTP);
    this.storeOTP(email, OTP);
    await this.sendMail({
      toEmail: email,
      subject: 'OTP for email varification',
      text: `Your OTP is ${OTP}`,
    });
  }



  /**
   * For store OTP to verify later.
   * @param email 
   * @param OTP 
   */
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
}
