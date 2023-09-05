import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Request,
  Get,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AddProductDto } from './dto/add-product.dto';
import { AuthUserGuard } from 'src/auth/auth-user.guard';
import { ProductService } from './product.service';
import { TransformAddProductDtoInterceptor } from './interceptor/tranform-addProductDto..interceptor';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  /**
   * The service for adding new product.
   * 
   * @param addProductDto - The product details;
   * @returns 
   */
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
    TransformAddProductDtoInterceptor,
  )
  async addProduct(@Body() addProductDto: AddProductDto) {
    return this.productService.addProduct(addProductDto);
  }


  /**
   * To get all product details.
   * 
   * @returns - {
   *   productname: string,
   *   productdesc: string,
   *   productprice: strign,
   *   owner: {
   *    ownerId: number,
   *    useremail: string,
   *   },
   *   productImgs: string[]
   * }
   */
  @Get('getallproducts')
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('clear')
  async removeAllProducts() {
    return this.productService.removeAllProducts();
  }

  @Post('test')
  test() {}
}
