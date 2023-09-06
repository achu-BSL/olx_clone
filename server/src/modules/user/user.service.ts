import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { Mailer } from 'src/utils/mail.util';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly mailer: Mailer,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
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

  async verifyRegisterOTP(email: string, otp: string) {
    const validOTP = await this.prisma.otp.findUnique({
      where: { email: email },
    });
    if (!validOTP) throw new BadRequestException();
    else if (validOTP.OTP !== otp) throw new BadRequestException();
    else if (validOTP.expireOn < new Date()) throw new BadRequestException();

    return {
      register_details_token: await this.authService.registerDetailsToken(
        email,
      ),
    };
  }

  /**
   * Resend OTP service.
   * @param email
   * @returns
   */
  async registerOTPResend(email: string) {
    this.mailer.sendOTP(email);
    return 'OTP send successfully';
  }

  async register(registerDto: RegisterUserDto) {
    console.log('rgister service');
    console.log(registerDto);
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [
            { useremail: registerDto.email },
            { username: registerDto.username },
          ],
        },
      });

      if (user) throw new BadRequestException();
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(registerDto.password, salt);
      await this.prisma.user.create({
        data: {
          username: registerDto.username,
          useremail: registerDto.email,
          password: hashedPassword,
        },
      });

      return 'User created';
    } catch (err) {
      console.log('from catch');
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { useremail: loginUserDto.email },
    });
    if (!user) throw new BadRequestException();
    const password = await bcrypt.compare(loginUserDto.password, user.password);
    if (!password) throw new BadRequestException();

    return {
      token: await this.authService.login(user.useremail, user.username, user.userId),
    };
  }
}
