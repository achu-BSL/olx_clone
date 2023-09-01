// import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { ConfigService } from '@nestjs/config';
// import { MailerService } from '@nestjs-modules/mailer';

// @Injectable()
// export class UsersService {

//   constructor(private configService: ConfigService, private readonly mailerService: MailerService) {}

//   create(createUserDto: CreateUserDto) {
//     return 'This action adds a new user';
//   }

//   findAll() {
//     return `This action returns all users`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} user`;
//   }

//   update(id: number, updateUserDto: UpdateUserDto) {
//     return `This action updates a #${id} user`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} user`;
//   }

//   sendMail() {
//     this.mailerService.sendMail({
//       to: 'acoading@gmail.com',
//       from: process.env.USER_EMAIL,
//       subject: 'Testing',
//       text: 'Testing mail via Nestjs',
//       html: '<h1>Testing body</h1>'
//     })

//     return 'Mail sended successfully';
//   }
// }


import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}