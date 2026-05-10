/*
  Warnings:

  - You are about to drop the column `item_code` on the `items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sku]` on the table `items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sku` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "items_item_code_idx";

-- DropIndex
DROP INDEX "items_item_code_key";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "item_code",
ADD COLUMN     "sku" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "items_sku_key" ON "items"("sku");

-- CreateIndex
CREATE INDEX "items_sku_idx" ON "items"("sku");
