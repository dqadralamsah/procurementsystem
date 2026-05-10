/*
  Warnings:

  - You are about to drop the column `uom_code` on the `uoms` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "uoms_uom_code_key";

-- AlterTable
ALTER TABLE "uoms" DROP COLUMN "uom_code";
