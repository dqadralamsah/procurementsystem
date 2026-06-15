import Link from 'next/link';
import { notFound } from 'next/navigation';
import { warehouseService } from '@/services/warehouse.service';
import { inventoryService } from '@/services/inventory.service';
import { Button } from '@/components/ui/button';
import { WarehouseDetailCard } from '@/features/master-data/warehouse/WarehouseDetailCard';
import { WarehouseDetailTable } from '@/features/master-data/warehouse/WarehouseDetailTable';
import { SetBreadcrumb } from '@/components/layout/DynemicBreadcrumbs';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    search?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || '';
  const page = Number(resolvedSearchParams.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 10;

  const warehouse = await warehouseService.getById(id);
  if (!warehouse) {
    notFound();
  }

  const { data: inventories, meta } = await inventoryService.getByWarehouseId(
    id,
    search,
    page,
    limit,
  );

  return (
    <div className="space-y-6">
      <SetBreadcrumb id={id} label={warehouse.warehouseCode} />
      {/* Breadcrumb / Back Button */}
      <div className="flex items-center gap-4">
        <Button size="xs" asChild>
          <Link href="/settings/warehouse">Back to List</Link>
        </Button>
      </div>

      {/* 2 Sections / Divs Layout */}
      <div className="space-y-6">
        {/* Section 1: Detail (Identity Warehouse) */}
        <div>
          <WarehouseDetailCard data={warehouse} />
        </div>

        {/* Section 2: Detail Table (Items in Warehouse) */}
        <div>
          <WarehouseDetailTable data={inventories} totalPages={meta.totalPages} limit={limit} />
        </div>
      </div>
    </div>
  );
}
