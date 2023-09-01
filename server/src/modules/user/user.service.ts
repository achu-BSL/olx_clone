import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { generateOTP } from 'src/utils/generateOTP';
import { Mailer } from 'src/utils/mail.util';

@Injectable()
export class UserService {
  constructor(
    private readonly mailer: Mailer,
    private readonly prisma: PrismaService,
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


}
