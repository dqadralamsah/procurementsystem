import { warehouseService } from '@/services/warehouse.service';
import WarehouseCreateButton from '@/features/master-data/warehouse/WarehouseCreateButton';
import WarehouseTable from '@/features/master-data/warehouse/WarehouseTable';

export default async function Page() {
  const warehouses = await warehouseService.getAll();

  return (
    <main className='space-y-4'>
      <div>
        <h1 className='text-2xl font-bold'>Warehouse</h1>
        <p className='text-sm text-gray-400'>Kelola Warehouse Di sini</p>
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-end'>
          <WarehouseCreateButton />
        </div>
        <div className=''>
          <WarehouseTable data={warehouses} />
        </div>
      </div>
    </main>
  );
}
