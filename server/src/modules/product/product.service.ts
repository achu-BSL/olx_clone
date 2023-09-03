import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { AddProductDto } from "./dto/add-product.dto";

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    async addProduct(addProductDto: AddProductDto) {

        const product = await this.prisma.product.create({
            data: {
                productname: addProductDto.product_name,
                productdesc: addProductDto.product_desc,
                ownerid: addProductDto.userId,
                productImgs: {
                    createMany: {
                        data: addProductDto.product_imgs.map(img => ( { imgUrl: img.filename }))
                    }
                }
            },
            include: {
                productImgs: true
            }
        })
        console.log(product);
        return product;
    }
}