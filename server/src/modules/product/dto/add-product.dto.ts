export class AddProductDto {
    product_name: string;
    product_desc: string;
    product_price: string;
    product_imgs: Express.Multer.File[];
    useremail: string;
    userId: number;
}