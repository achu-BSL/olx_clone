import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true
  }), 
    MailerModule.forRoot({
    transport: {
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD
      }
    }
  }),
  UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
