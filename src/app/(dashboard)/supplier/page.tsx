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
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold text-slate-900'>Supplier Management</h1>
        <p className='text-sm text-slate-500 mt-1'>Kelola Master Data Supplier</p>
      </div>

      {/* Content */}
      <div className='bg-white border border-slate-200/80 rounded-xl shadow-sm'>
        {/* Filter & Create Button */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5'>
          {/* Search */}
          <div className='w-full sm:max-w-xs'>
            <SearchComponent placeholder='Cari Nama atau Supplier Number' />
          </div>

          {/* Create Button */}
          <div>
            <SupplierCreateButton />
          </div>
        </div>

        <div>
          <SupplierTable data={res.data} />

          <PaginationComponent
            totalPages={res.meta.totalPages}
            currentLimit={limit}
          />
        </div>
      </div>
    </div>
  );
}
