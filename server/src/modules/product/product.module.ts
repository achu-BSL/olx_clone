import {  Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { AuthService } from "src/auth/auth.service";
import { Mailer } from "src/utils/mail.util";
import { PrismaService } from "src/prisma.service";
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadMiddleware } from "./middlewares/file-upload.middleware";

@Module({
    imports: [MulterModule.registerAsync({
        useClass: FileUploadMiddleware
    })],
    controllers: [ProductController],
    providers: [ProductService, AuthService, Mailer, PrismaService]
})
export class ProductModule {
}