import { warehouseService } from "@/services/warehouse.service";
import WarehouseTable from "@/features/master-data/warehouse/WarehouseTable";
import WarehouseCreateButton from "@/features/master-data/warehouse/WarehouseCreateButton";

export default async function WarehousePage() {
  const data = await warehouseService.getAll();

  return (
    <div className='space-y-4'>
      <div>
        <h1 className='text-2xl font-bold'>Warehouse Configuration</h1>
        <p className='text-sm text-muted-foreground'>
          Manage your warehouse locations and details.
        </p>
      </div>
      <div className='bg-card border border-gray-200/80 rounded-lg shadow-md'>
        <div className='p-4'>
          <WarehouseCreateButton />
        </div>
        <div className='p-2'>
          <WarehouseTable data={data} />
        </div>
      </div>
    </div>
  );
}
