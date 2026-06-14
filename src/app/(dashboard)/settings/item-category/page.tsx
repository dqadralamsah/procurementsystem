import { itemCategoryService } from '@/services/item.service';
import ItemCategoryCreateButton from '@/features/master-data/item-category/ItemCategoryCreateButton';
import ItemCategoryTable from '@/features/master-data/item-category/ItemCategoryTable';

export default async function Page() {
  const categories = await itemCategoryService.getAll();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Item Category</h1>
        <p className="text-sm text-slate-500 mt-1">Kelola master data Item Category beserta detailnya.</p>
      </div>

      <div className="flex flex-col gap-6 p-6 bg-white border border-slate-200/80 rounded-xl shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">Categories</h2>
            <p className="text-xs text-slate-500">Daftar semua kategori item</p>
          </div>
          <ItemCategoryCreateButton />
        </div>
        <div className="flex-1">
          <ItemCategoryTable data={categories} />
        </div>
      </div>
    </div>
  );
}
