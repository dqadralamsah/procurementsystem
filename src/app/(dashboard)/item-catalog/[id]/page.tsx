import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { itemService, itemCategoryService } from '@/services/item.service';
import { uomService } from '@/services/uom.service';
import { supplierPriceService } from '@/services/supplierprice.service';
import { Button } from '@/components/ui/button';
import ItemDetailCard from '@/features/master-data/item/ItemDetailCard';
import ItemSuppliersTable from '@/features/master-data/item/ItemSuppliersTable';
import SearchComponent from '@/components/shared/Search';
import PaginationComponent from '@/components/shared/Pagination';

export default async function ItemDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ search?: string; page?: string; limit?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  
  const search = sp?.search || '';
  const page = Math.max(1, Number(sp?.page) || 1);
  const limit = Math.max(10, Number(sp?.limit) || 10);

  const [item, suppliersRes, categories, uoms] = await Promise.all([
    itemService.getById(id),
    supplierPriceService.getByItemId(id, search, page, limit),
    itemCategoryService.getAll(),
    uomService.getAll(),
  ]);

  if (!item) {
    notFound();
  }

  // Format item to match the expected type by ItemDetailCard if needed
  const formattedItem = {
    ...item,
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Link href='/item-catalog'>
          <Button variant='outline' size='icon' className='h-9 w-9 text-slate-600 hover:text-slate-900'>
            <ArrowLeft className='size-4' />
          </Button>
        </Link>
        <div>
          <h1 className='text-2xl font-bold text-slate-900 tracking-tight'>Detail Item</h1>
          <p className='text-sm text-slate-500 mt-1'>
            Informasi lengkap dan daftar supplier penyedia
          </p>
        </div>
      </div>

      {/* Item Information Card */}
      <ItemDetailCard item={formattedItem} categories={categories} uoms={uoms} />

      {/* Item Suppliers List */}
      <div className='p-6 bg-white border border-slate-200/80 rounded-xl shadow-sm'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
          <div>
            <h2 className='text-lg font-semibold text-slate-800 tracking-tight'>
              Daftar Supplier
            </h2>
            <p className='text-sm text-slate-500'>
              Supplier yang menyediakan item {item.name}
            </p>
          </div>

          <div className='w-full sm:max-w-xs'>
            <SearchComponent placeholder='Cari Nama / Kode Supplier' />
          </div>
        </div>

        <ItemSuppliersTable data={suppliersRes.data} />
        
        <div className='mt-6 border-t border-slate-100 pt-4'>
          <PaginationComponent 
            totalPages={suppliersRes.meta.totalPages} 
            currentLimit={limit} 
          />
        </div>
      </div>
    </div>
  );
}
