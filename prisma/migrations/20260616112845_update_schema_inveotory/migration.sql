-- DropIndex
DROP INDEX "inventory_item_id_warehouse_id_idx";

-- AlterTable
ALTER TABLE "inventory" ADD COLUMN     "stock_status" TEXT NOT NULL DEFAULT 'IN_STOCK';

-- CreateIndex
CREATE INDEX "inventory_item_id_warehouse_id_stock_status_idx" ON "inventory"("item_id", "warehouse_id", "stock_status");
