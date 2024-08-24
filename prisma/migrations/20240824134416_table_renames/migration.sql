/*
  Warnings:

  - You are about to drop the `RatingsOnProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RatingsOnProducts" DROP CONSTRAINT "RatingsOnProducts_createdById_fkey";

-- DropForeignKey
ALTER TABLE "RatingsOnProducts" DROP CONSTRAINT "RatingsOnProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "RatingsOnProducts" DROP CONSTRAINT "RatingsOnProducts_ratingId_fkey";

-- DropTable
DROP TABLE "RatingsOnProducts";

-- CreateTable
CREATE TABLE "RatingOnProduct" (
    "productId" TEXT NOT NULL,
    "ratingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "RatingOnProduct_pkey" PRIMARY KEY ("productId","ratingId")
);

-- AddForeignKey
ALTER TABLE "RatingOnProduct" ADD CONSTRAINT "RatingOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingOnProduct" ADD CONSTRAINT "RatingOnProduct_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingOnProduct" ADD CONSTRAINT "RatingOnProduct_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
