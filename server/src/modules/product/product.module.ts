import {  Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { AuthService } from "src/auth/auth.service";
import { Mailer } from "src/utils/mail.util";
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [MulterModule.register({
        dest: './uploads'
    }), PrismaModule],
    controllers: [ProductController],
    providers: [ProductService, AuthService, Mailer]
})
export class ProductModule {
}