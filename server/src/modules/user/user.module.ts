import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Mailer } from "src/utils/mail.util";
import { PrismaService } from "src/prisma.service";
import { AuthService } from "src/auth/auth.service";

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService, Mailer, AuthService],
    exports: [Mailer]
})
export class UserModule {}