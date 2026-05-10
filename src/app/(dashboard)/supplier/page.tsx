import { supplierService } from '@/services/supplier.service';
import SupplierPage from '@/components/features/supplier/SupplierPage';

export default async function Page() {
  const suppliers = await supplierService.getAll();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Supplier Management</h1>
      </div>

      <SupplierPage initialData={suppliers} />
    </div>
  );
}
