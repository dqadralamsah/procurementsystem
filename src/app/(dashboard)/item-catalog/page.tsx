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
    <main className="space-y-6">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold">Item Catalog</h1>
        <p className="text-sm text-gray-600">Kelola master data item di sini.</p>
      </section>
      {/* Content */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <SearchComponent placeholder="Cari berdasarkan Nama atau SKU" />
          <ItemCreateButton categories={categories} uoms={uoms} />
        </div>
        <div>
          <ItemTable data={res.data} categories={categories} uoms={uoms} />
          <PaginationComponent currentLimit={limit} totalPages={res.meta.totalPages} />
        </div>
      </section>
    </main>
  );
}
