/*
  Warnings:

  - Added the required column `expireOn` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OTP" ADD COLUMN     "expireOn" TIMESTAMP(3) NOT NULL;
