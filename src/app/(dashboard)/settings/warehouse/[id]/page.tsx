import Link from 'next/link';
import { warehouseService } from '@/services/warehouse.service';
import { Button } from '@/components/ui/button';
import WarehouseDetailView from '@/features/master-data/warehouse/WarehouseDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const data = await warehouseService.getById(id);

  return (
    <div className='space-y-4'>
      {/* Breadcrumb / Back Button */}
      <div className='flex items-center gap-4'>
        <Button size={'sm'} variant='outline' asChild className='shadow-sm'>
          <Link href='/settings/warehouse'>Back to List</Link>
        </Button>
      </div>

      {/* Main View */}
      <WarehouseDetailView warehouse={data} />
    </div>
  );
}
