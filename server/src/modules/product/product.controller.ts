import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthUserGuard } from "src/auth/auth-user.guard";

@Controller('product')
export class ProductController {

    @UseGuards(AuthUserGuard)
    @Post('add')
    // @UseInterceptors(FileInterceptor('product_img'))
    addProduct(@UploadedFile() files: Array<Express.Multer.File>) {
        console.log(files);
        return ''
    }
}