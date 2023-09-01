import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
