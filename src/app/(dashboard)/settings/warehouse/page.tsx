import { warehouseService } from '@/services/warehouse.service';
import WarehousePage from '@/components/features/master-data/warehouse/WarehousePage';

export default async function Page() {
  const warehouses = await warehouseService.getAll();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Warehouse Management</h1>
      </div>

      <WarehousePage initialData={warehouses} />
    </div>
  );
}
