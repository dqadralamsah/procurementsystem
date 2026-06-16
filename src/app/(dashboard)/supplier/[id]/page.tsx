import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { supplierService } from '@/services/supplier.service';
import { supplierPriceService } from '@/services/supplierprice.service';
import { Button } from '@/components/ui/button';
import SupplierDetailCard from '@/features/supplier/SupplierDetailCard';
import SupplierItemsTable from '@/features/supplier/SupplierItemsTable';
import SearchComponent from '@/components/shared/Search';
import PaginationComponent from '@/components/shared/Pagination';

export default async function SupplierDetailPage({
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

  const [supplier, pricesRes] = await Promise.all([
    supplierService.getById(id),
    supplierPriceService.getBySupplierId(id, search, page, limit),
  ]);

  if (!supplier) {
    notFound();
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Link href='/supplier'>
          <Button variant='outline' size='icon' className='h-9 w-9'>
            <ArrowLeft className='size-4' />
          </Button>
        </Link>
        <div>
          <h1 className='text-2xl font-bold text-slate-900'>Detail Supplier</h1>
          <p className='text-sm text-slate-500 mt-1'>
            Informasi lengkap dan daftar harga item
          </p>
        </div>
      </div>

      {/* Supplier Information Card */}
      <SupplierDetailCard supplier={supplier} />

      {/* Supplier Items List */}
      <div className='p-6 bg-white border border-slate-200/80 rounded-xl shadow-sm'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
          <div>
            <h2 className='text-lg font-semibold text-slate-800'>
              Daftar Harga Item
            </h2>
            <p className='text-sm text-slate-500'>
              Item yang disuplai oleh {supplier.name}
            </p>
          </div>

          <div className='w-full sm:max-w-xs'>
            <SearchComponent placeholder='Cari Item / SKU' />
          </div>
        </div>

        <SupplierItemsTable data={pricesRes.data} />
        
        <div className='mt-6'>
          <PaginationComponent 
            totalPages={pricesRes.meta.totalPages} 
            currentLimit={limit} 
          />
        </div>
      </div>
    </div>
  );
}
