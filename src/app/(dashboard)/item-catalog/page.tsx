import { itemCategoryService, itemService } from '@/services/item.service';
import { uomService } from '@/services/uom.service';
import ItemCreateButton from '@/features/master-data/item/ItemCreateButton';
import ItemTable from '@/features/master-data/item/ItemTable';
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

  const [res, categories, uoms] = await Promise.all([
    itemService.getAll(search, page, limit),
    itemCategoryService.getAll(),
    uomService.getAll(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Item Catalog</h1>
        <p className="text-sm text-slate-500 mt-1">Kelola master data item di sini.</p>
      </div>

      {/* Content */}
      <div className="flex flex-col bg-white border border-slate-200/80 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-slate-100">
          <div className="w-full sm:max-w-xs">
            <SearchComponent placeholder="Cari berdasarkan Nama atau SKU" />
          </div>
          <div>
            <ItemCreateButton categories={categories} uoms={uoms} />
          </div>
        </div>

        <div className="w-full px-2 overflow-x-auto">
          <ItemTable data={res.data} categories={categories} uoms={uoms} />
        </div>

        <div className="p-4 border-slate-100">
          <PaginationComponent currentLimit={limit} totalPages={res.meta.totalPages} />
        </div>
      </div>
    </div>
  );
}
