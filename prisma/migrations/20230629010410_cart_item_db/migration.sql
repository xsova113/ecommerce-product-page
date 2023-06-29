/*
  Warnings:

  - Added the required column `image` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CartItem_name_key";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "image" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
