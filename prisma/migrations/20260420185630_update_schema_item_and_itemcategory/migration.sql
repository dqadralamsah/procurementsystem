/*
  Warnings:

  - You are about to drop the column `max_stock` on the `items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `item_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "item_categories" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "items" DROP COLUMN "max_stock",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "stock" DECIMAL(18,4) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "item_categories_name_key" ON "item_categories"("name");

-- CreateIndex
CREATE INDEX "items_item_code_idx" ON "items"("item_code");
