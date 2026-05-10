import { itemCategoryService } from '@/services/item.service';
import ItemCategoryCreateButton from '@/features/master-data/item-category/ItemCategoryCreateButton';
import ItemCategoryTable from '@/features/master-data/item-category/ItemCategoryTable';

export default async function Page() {
  const categories = await itemCategoryService.getAll();

  return (
    <main className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold">Item Category</h1>
        <p className="text-sm text-gray-400">Kelola Item Category Di sini</p>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-end">
          <ItemCategoryCreateButton />
        </div>
        <div className="">
          <ItemCategoryTable data={categories} />
        </div>
      </section>
    </main>
  );
}
