/*
  Warnings:

  - Added the required column `description` to the `item_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `uom_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item_categories" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "uom_categories" ADD COLUMN     "description" TEXT NOT NULL;
