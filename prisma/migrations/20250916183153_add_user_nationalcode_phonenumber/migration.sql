/*
  Warnings:

  - A unique constraint covering the columns `[nationalCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "nationalCode" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_national_code_idx" ON "public"."User"("nationalCode");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_idx" ON "public"."User"("phoneNumber");
