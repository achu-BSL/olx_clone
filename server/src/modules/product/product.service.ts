import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddProductDto } from './dto/add-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * The function to create new product.
   *
   * @param addProductDto - The product detials.
   * @returns details of new added product from the database.
   * @throws InternalServerException - If the add new product into database fails.
   */
  async addProduct(addProductDto: AddProductDto) {
    try {
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
      return product;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * The function for retrive all the product full details
   * including owner's details and product images.
   * @returns Array of product details.
   */
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

  async removeAllProducts() {
    await this.prisma.productImg.deleteMany();
    await this.prisma.product.deleteMany();
    return 'deleted';
  }
}
