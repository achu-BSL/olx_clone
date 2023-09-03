-- AlterTable
CREATE SEQUENCE productimg_productimgid_seq;
ALTER TABLE "ProductImg" ALTER COLUMN "productImgId" SET DEFAULT nextval('productimg_productimgid_seq');
ALTER SEQUENCE productimg_productimgid_seq OWNED BY "ProductImg"."productImgId";
