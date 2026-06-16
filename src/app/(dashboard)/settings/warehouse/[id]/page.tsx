import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { warehouseService } from '@/services/warehouse.service';
import { inventoryService } from '@/services/inventory.service';
import { Button } from '@/components/ui/button';
import { WarehouseDetailCard } from '@/features/master-data/warehouse/WarehouseDetailCard';
import { WarehouseDetailTable } from '@/features/master-data/warehouse/WarehouseDetailTable';
import SearchComponent from '@/components/shared/Search';
import PaginationComponent from '@/components/shared/Pagination';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    search?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || '';
  const page = Number(resolvedSearchParams.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 10;

  const warehouse = await warehouseService.getById(id);
  if (!warehouse) {
    notFound();
  }

  const { data: inventories, meta } = await inventoryService.getByWarehouseId(
    id,
    search,
    page,
    limit,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Link href='/settings/warehouse'>
          <Button variant='outline' size='icon' className='h-9 w-9 text-slate-600 hover:text-slate-900'>
            <ArrowLeft className='size-4' />
          </Button>
        </Link>
        <div>
          <h1 className='text-2xl font-bold text-slate-900 tracking-tight'>Detail Warehouse</h1>
          <p className='text-sm text-slate-500 mt-1'>
            Informasi lengkap dan daftar inventaris di warehouse
          </p>
        </div>
      </div>

      {/* 2 Sections / Divs Layout */}
      <div className="space-y-6">
        {/* Section 1: Detail (Identity Warehouse) */}
        <div>
          <WarehouseDetailCard data={warehouse} />
        </div>

        {/* Section 2: Detail Table (Items in Warehouse) */}
        <div className='p-6 bg-white border border-slate-200/80 rounded-xl shadow-sm'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
            <div>
              <h2 className='text-lg font-semibold text-slate-800 tracking-tight'>
                Warehouse Items
              </h2>
              <p className='text-sm text-slate-500'>
                Stok inventaris terdaftar di {warehouse.name}
              </p>
            </div>

            <div className='w-full sm:max-w-xs'>
              <SearchComponent placeholder='Cari SKU atau Nama Item...' />
            </div>
          </div>

          <WarehouseDetailTable data={inventories} />

          <div className='mt-6 border-t border-slate-100 pt-4'>
            <PaginationComponent 
              totalPages={meta.totalPages} 
              currentLimit={limit} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
