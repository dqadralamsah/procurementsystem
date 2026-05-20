/*
  Warnings:

  - You are about to drop the column `minimum_stock` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `reorder_point` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `suppier_id` on the `supplier_prices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[supplier_id,item_id,effective_date]` on the table `supplier_prices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supplier_id` to the `supplier_prices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "supplier_prices" DROP CONSTRAINT "supplier_prices_suppier_id_fkey";

-- DropIndex
DROP INDEX "supplier_prices_suppier_id_item_id_effective_date_key";

-- DropIndex
DROP INDEX "supplier_prices_suppier_id_item_id_idx";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "minimum_stock",
DROP COLUMN "reorder_point";

-- AlterTable
ALTER TABLE "supplier_prices" DROP COLUMN "suppier_id",
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "supplier_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "inventory" (
    "id" UUID NOT NULL,
    "warehouse_id" UUID NOT NULL,
    "item_id" UUID NOT NULL,
    "quantity" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "reorder_point" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "minimum_stock" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "inventory_item_id_warehouse_id_idx" ON "inventory"("item_id", "warehouse_id");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_item_id_warehouse_id_key" ON "inventory"("item_id", "warehouse_id");

-- CreateIndex
CREATE INDEX "supplier_prices_supplier_id_item_id_idx" ON "supplier_prices"("supplier_id", "item_id");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_prices_supplier_id_item_id_effective_date_key" ON "supplier_prices"("supplier_id", "item_id", "effective_date");

-- AddForeignKey
ALTER TABLE "supplier_prices" ADD CONSTRAINT "supplier_prices_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
