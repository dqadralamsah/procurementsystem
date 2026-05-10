import { uomCategoryService, uomService } from '@/services/uom.service';
import UomCategoryCreateButton from '@/features/master-data/uom-category/UomCategoryCreateButton';
import UomCategoryTable from '@/features/master-data/uom-category/UomCategoryTable';
import UomCreateButton from '@/features/master-data/uom/UomCreateButton';
import UomTable from '@/features/master-data/uom/UomTable';

export default async function Page() {
  // const categories = await uomCategoryService.getAll();
  const [uoms, categories] = await Promise.all([uomService.getAll(), uomCategoryService.getAll()]);

  return (
    <main className="space-y-6">
      {/* Uom Categories */}
      <section>
        <div>
          <h1 className="text-2xl font-bold">Uom Category</h1>
          <p className="text-sm text-gray-400">Kelola Uom Category Di sini</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-end">
            <UomCategoryCreateButton />
          </div>
          <div className="">
            <UomCategoryTable data={categories} />
          </div>
        </div>
      </section>

      {/* Uoms */}
      <section>
        <div>
          <h1 className="text-2xl font-bold">Uoms</h1>
          <p className="text-sm text-gray-400">Kelola Uoms Di sini</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-end">
            <UomCreateButton categories={categories} />
          </div>
          <div className="">
            <UomTable data={uoms} categories={categories} />
          </div>
        </div>
      </section>
    </main>
  );
}
