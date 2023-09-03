import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddProductDto } from './dto/add-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async addProduct(addProductDto: AddProductDto) {
    const product = await this.prisma.product.create({
      data: {
        productname: addProductDto.product_name,
        productdesc: addProductDto.product_desc,
        ownerid: addProductDto.userId,
        productPrice: addProductDto.product_price,
        productImgs: {
          createMany: {
            data: addProductDto.product_imgs.map((img) => ({
              imgUrl: img.filename,
            })),
          },
        },
      },
      include: {
        productImgs: true,
      },
    });
    console.log(product);
    return product;
  }

  async getAllProducts() {
    const products = await this.prisma.product.findMany({
      select: {
        productname: true,
        productdesc: true,
        productPrice: true,
        productId: true,
        owner: {
          select: {
            username: true,
            useremail: true,
          },
        },
        productImgs: {
          select: { imgUrl: true },
        },
      },
    });

    const formattedProducts = products.map((product) => ({
      ...product,
      productImgs: product.productImgs.map((img) => img.imgUrl),
    }));

    return formattedProducts;
  }

  async removeAllProducts () {
    await this.prisma.productImg.deleteMany();
    await this.prisma.product.deleteMany();
    return 'deleted';
  }
}
