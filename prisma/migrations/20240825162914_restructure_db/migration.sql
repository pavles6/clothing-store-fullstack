/*
  Warnings:

  - You are about to drop the `OrderOnProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderedBy` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderOnProduct" DROP CONSTRAINT "OrderOnProduct_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderOnProduct" DROP CONSTRAINT "OrderOnProduct_orderedBy_fkey";

-- DropForeignKey
ALTER TABLE "OrderOnProduct" DROP CONSTRAINT "OrderOnProduct_productId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderedBy" TEXT NOT NULL;

-- DropTable
DROP TABLE "OrderOnProduct";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderedBy_fkey" FOREIGN KEY ("orderedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
