/*
  Warnings:

  - The primary key for the `OrderOnProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "OrderOnProduct" DROP CONSTRAINT "OrderOnProduct_pkey",
ADD CONSTRAINT "OrderOnProduct_pkey" PRIMARY KEY ("orderedBy", "orderId", "productId");
