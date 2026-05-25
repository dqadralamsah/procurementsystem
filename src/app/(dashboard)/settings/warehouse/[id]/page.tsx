import Link from 'next/link';
import { notFound } from 'next/navigation';
import { warehouseService } from '@/services/warehouse.service';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import WarehouseDetailView from '@/features/master-data/warehouse/WarehouseDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const data = await warehouseService.getById(id);

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Breadcrumb / Back Button */}
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' asChild>
          <Link href='/warehouses'>
            <ChevronLeft className='w-4 h-4' />
          </Link>
        </Button>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>{data?.name}</h1>
          <p className='text-sm text-muted-foreground'>
            Manage warehouse information and stock levels
          </p>
        </div>
      </div>

      {/* Main View */}
      <WarehouseDetailView warehouse={data} />
    </div>
  );
}
