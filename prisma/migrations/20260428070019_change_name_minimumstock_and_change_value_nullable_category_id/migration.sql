/*
  Warnings:

  - You are about to drop the column `min_stock` on the `items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_category_id_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "min_stock",
ADD COLUMN     "minimum_stock" DECIMAL(18,4) NOT NULL DEFAULT 0,
ALTER COLUMN "category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "item_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
