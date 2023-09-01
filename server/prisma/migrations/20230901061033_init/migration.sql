-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "useremail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userphone" BIGINT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" INTEGER NOT NULL,
    "productname" TEXT NOT NULL,
    "productdesc" TEXT NOT NULL,
    "ownerid" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "ProductImg" (
    "productImgId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "ProductImg_pkey" PRIMARY KEY ("productImgId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_useremail_key" ON "User"("useremail");

-- CreateIndex
CREATE UNIQUE INDEX "User_userphone_key" ON "User"("userphone");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImg" ADD CONSTRAINT "ProductImg_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;
