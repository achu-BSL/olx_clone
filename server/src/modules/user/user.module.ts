import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Mailer } from "src/utils/mail.util";
import { AuthService } from "src/auth/auth.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService, Mailer, AuthService],
    exports: [Mailer]
})
export class UserModule {}