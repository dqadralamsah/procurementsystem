import { supplierService } from '@/services/supplier.service';
import SupplierTable from '@/features/supplier/SupplierTable';
import SupplierCreateButton from '@/features/supplier/SupplierCreateButton';
import SearchComponent from '@/components/shared/Search';
import PaginationComponent from '@/components/shared/Pagination';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string; page?: string; limit?: string }>;
}) {
  const params = await searchParams;
  const search = params?.search || '';
  const page = Math.max(1, Number(params?.page) || 1);
  const limit = Math.max(10, Number(params?.limit) || 10);

  const res = await supplierService.getAll(search, page, limit);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Supplier Management</h1>
        <p className="text-sm text-slate-500 mt-1">Kelola Master Data Supplier</p>
      </div>

      {/* Content */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-slate-100">
          {/* Search */}
          <div className="w-full sm:max-w-xs">
            <SearchComponent placeholder="Cari berdasarkan Nama atau Kode" />
          </div>

          {/* Create Button */}
          <div>
            <SupplierCreateButton />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <SupplierTable data={res.data} />
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100">
          <PaginationComponent totalPages={res.meta.totalPages} currentLimit={limit} />
        </div>
      </div>
    </div>
  );
}
