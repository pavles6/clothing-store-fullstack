/*
  Warnings:

  - You are about to drop the column `userId` on the `Rating` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "RatingsOnProducts" (
    "productId" TEXT NOT NULL,
    "ratingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "RatingsOnProducts_pkey" PRIMARY KEY ("productId","ratingId")
);

-- AddForeignKey
ALTER TABLE "RatingsOnProducts" ADD CONSTRAINT "RatingsOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingsOnProducts" ADD CONSTRAINT "RatingsOnProducts_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingsOnProducts" ADD CONSTRAINT "RatingsOnProducts_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
