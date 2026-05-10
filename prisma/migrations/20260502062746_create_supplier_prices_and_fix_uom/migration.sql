/*
  Warnings:

  - You are about to drop the column `contact_person` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `supplier` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "items_category_id_idx";

-- DropIndex
DROP INDEX "items_sku_idx";

-- DropIndex
DROP INDEX "items_uom_id_idx";

-- AlterTable
ALTER TABLE "supplier" DROP COLUMN "contact_person",
DROP COLUMN "phone",
ADD COLUMN     "contact" TEXT;

-- AlterTable
ALTER TABLE "uom_categories" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "uoms" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "supplier_prices" (
    "id" UUID NOT NULL,
    "suppier_id" UUID NOT NULL,
    "item_id" UUID NOT NULL,
    "price" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "uom_id" UUID NOT NULL,
    "conversion_ratio" DECIMAL(18,4) NOT NULL,
    "minimum_order" DECIMAL(18,4) NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supplier_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "supplier_prices_suppier_id_item_id_idx" ON "supplier_prices"("suppier_id", "item_id");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_prices_suppier_id_item_id_effective_date_key" ON "supplier_prices"("suppier_id", "item_id", "effective_date");

-- CreateIndex
CREATE INDEX "items_sku_category_id_uom_id_idx" ON "items"("sku", "category_id", "uom_id");

-- AddForeignKey
ALTER TABLE "supplier_prices" ADD CONSTRAINT "supplier_prices_suppier_id_fkey" FOREIGN KEY ("suppier_id") REFERENCES "supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_prices" ADD CONSTRAINT "supplier_prices_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_prices" ADD CONSTRAINT "supplier_prices_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
