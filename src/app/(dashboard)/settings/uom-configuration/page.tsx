import { uomCategoryService, uomService } from '@/services/uom.service';
import UomCategoryCreateButton from '@/features/master-data/uom-category/UomCategoryCreateButton';
import UomCategoryTable from '@/features/master-data/uom-category/UomCategoryTable';
import UomCreateButton from '@/features/master-data/uom/UomCreateButton';
import UomTable from '@/features/master-data/uom/UomTable';

export default async function Page() {
  const [uoms, categories] = await Promise.all([uomService.getAll(), uomCategoryService.getAll()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">UOM Configuration</h1>
        <p className="text-sm text-slate-500 mt-1">Kelola master data Unit of Measurement beserta kategorinya.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Uom Categories */}
        <section className="xl:col-span-5 flex flex-col gap-6 p-6 bg-white border border-slate-200/80 rounded-xl shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900">UOM Categories</h2>
              <p className="text-xs text-slate-500">Kelola kategori pengukuran</p>
            </div>
            <UomCategoryCreateButton />
          </div>
          <div className="flex-1">
            <UomCategoryTable data={categories} />
          </div>
        </section>

        {/* Uoms */}
        <section className="xl:col-span-7 flex flex-col gap-6 p-6 bg-white border border-slate-200/80 rounded-xl shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900">Units of Measure</h2>
              <p className="text-xs text-slate-500">Kelola satuan pengukuran</p>
            </div>
            <UomCreateButton categories={categories} />
          </div>
          <div className="flex-1">
            <UomTable data={uoms} categories={categories} />
          </div>
        </section>
      </div>
    </div>
  );
}
