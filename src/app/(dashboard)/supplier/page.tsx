import { supplierService } from '@/services/supplier.service';
import SupplierTable from '@/features/supplier/SupplierTable';
import SupplierCreateButton from '@/features/supplier/SupplierCreateButton';

export default async function Page() {
  const suppliers = await supplierService.getAll();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Supplier Management</h1>
        <p className="text-sm text-gray-400">Kelola Master Data Supplier</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-end">
          <SupplierCreateButton />
        </div>
        <div>
          <SupplierTable data={suppliers} />
        </div>
      </div>
    </div>
  );
}
