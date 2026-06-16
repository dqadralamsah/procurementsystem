import { warehouseService } from '@/services/warehouse.service';
import WarehouseCreateButton from '@/features/master-data/warehouse/WarehouseCreateButton';
import WarehouseTable from '@/features/master-data/warehouse/WarehouseTable';
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

  const res = await warehouseService.getAll(search, page, limit);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Warehouse Management</h1>
        <p className="text-sm text-slate-500 mt-1">Kelola Master Data Warehouse</p>
      </div>

      {/* Content */}
      <div className="flex flex-col bg-white border border-slate-200/80 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
          <div className="w-full sm:max-w-xs">
            <SearchComponent placeholder="Cari Kode atau Nama" />
          </div>
          <div>
            <WarehouseCreateButton />
          </div>
        </div>

        <div className="w-full overflow-x-auto px-2">
          <WarehouseTable data={res.data} />
        </div>

        <div className="p-4 border-slate-100">
          <PaginationComponent currentLimit={limit} totalPages={res.meta.totalPages} />
        </div>
      </div>
    </div>
  );
}
