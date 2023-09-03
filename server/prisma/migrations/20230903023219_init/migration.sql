-- AlterTable
CREATE SEQUENCE product_productid_seq;
ALTER TABLE "Product" ALTER COLUMN "productId" SET DEFAULT nextval('product_productid_seq');
ALTER SEQUENCE product_productid_seq OWNED BY "Product"."productId";
