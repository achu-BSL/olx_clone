import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Mailer } from "src/utils/mail.util";

@Module({
    controllers: [UserController],
    providers: [UserService, Mailer],
})
export class UserModule {}