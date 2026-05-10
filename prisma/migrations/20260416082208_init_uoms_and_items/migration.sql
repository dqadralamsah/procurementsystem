-- AlterTable
ALTER TABLE "supplier" ALTER COLUMN "is_active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "warehouse" ALTER COLUMN "is_active" SET DEFAULT true;

-- CreateTable
CREATE TABLE "uoms" (
    "id" UUID NOT NULL,
    "uom_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" UUID NOT NULL,
    "item_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" UUID NOT NULL,
    "uom_id" UUID NOT NULL,
    "reorder_point" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "min_stock" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "max_stock" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uoms_uom_code_key" ON "uoms"("uom_code");

-- CreateIndex
CREATE INDEX "uoms_category_id_idx" ON "uoms"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "items_item_code_key" ON "items"("item_code");

-- CreateIndex
CREATE INDEX "items_category_id_idx" ON "items"("category_id");

-- CreateIndex
CREATE INDEX "items_uom_id_idx" ON "items"("uom_id");

-- AddForeignKey
ALTER TABLE "uoms" ADD CONSTRAINT "uoms_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "uom_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "item_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
