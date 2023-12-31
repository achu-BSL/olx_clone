import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "src/modules/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ProductModule } from "src/modules/product/product.module";

@Module({
    imports: [UserModule, ProductModule, JwtModule.register({
        global: true,
        secret: "SECRET",
        signOptions: {expiresIn: '60s'},
    })],
    providers: [AuthService],
    exports: [AuthService]
}) 
export class AuthModule {}
