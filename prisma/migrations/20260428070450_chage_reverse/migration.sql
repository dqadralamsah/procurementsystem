/*
  Warnings:

  - Made the column `category_id` on table `items` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_category_id_fkey";

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "category_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "item_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
