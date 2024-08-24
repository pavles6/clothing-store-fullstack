/*
  Warnings:

  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `RatingOnProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "RatingOnProduct" DROP CONSTRAINT "RatingOnProduct_createdById_fkey";

-- DropForeignKey
ALTER TABLE "RatingOnProduct" DROP CONSTRAINT "RatingOnProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "RatingOnProduct" DROP CONSTRAINT "RatingOnProduct_ratingId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "RatingOnProduct";

-- CreateTable
CREATE TABLE "OrderOnProduct" (
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "orderedBy" TEXT NOT NULL,

    CONSTRAINT "OrderOnProduct_pkey" PRIMARY KEY ("orderedBy","orderId")
);

-- AddForeignKey
ALTER TABLE "OrderOnProduct" ADD CONSTRAINT "OrderOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderOnProduct" ADD CONSTRAINT "OrderOnProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderOnProduct" ADD CONSTRAINT "OrderOnProduct_orderedBy_fkey" FOREIGN KEY ("orderedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
