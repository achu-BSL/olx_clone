-- CreateTable
CREATE TABLE "OTP" (
    "otpId" INTEGER NOT NULL,
    "OTP" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("otpId")
);

-- CreateIndex
CREATE UNIQUE INDEX "OTP_ownerId_key" ON "OTP"("ownerId");

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
