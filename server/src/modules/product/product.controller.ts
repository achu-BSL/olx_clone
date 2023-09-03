import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Request,
  Get
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AddProductDto } from './dto/add-product.dto';
import { AuthUserGuard } from 'src/auth/auth-user.guard';
import { ProductService } from './product.service';
import { Request as Req } from 'express';
import { UserPayload } from 'src/auth/interfaces/payload.interface';

@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService) {}  

  @UseGuards(AuthUserGuard)
  @Post('add')
  @UseInterceptors(
    FilesInterceptor('product_img', 5, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads');
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + -Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async addProduct(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() addProductDto: AddProductDto, @Request() req: Req & {user: UserPayload}
  ) {
    //todo Implement custome pipe for manipulating addProductDto
    addProductDto.useremail = req.user.email;
    addProductDto.product_imgs = files;
    addProductDto.userId = req.user.userId;
    return this.productService.addProduct(addProductDto);
  }

  @Get('getallproducts')
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('clear')
  async removeAllProducts () {
    return this.productService.removeAllProducts();
  }
}
