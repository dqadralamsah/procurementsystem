'use client';

import { useState } from 'react';
import { WarehouseType } from '@/types/warehouse';
import { MapPin, AlignLeft, SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WarehouseForm from './WarehouseForm';

export function WarehouseDetailCard({ data }: { data: WarehouseType }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className='w-full p-6 border rounded-xl bg-card shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md'>
      {/* Header Panel */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-4 border-b border-gray-100 dark:border-gray-800'>
        <div className='space-y-1'>
          <h1 className='text-2xl font-bold tracking-tight text-foreground'>{data.name}</h1>
          <p className='text-sm text-muted-foreground font-mono'>
            Warehouse Code: {data.warehouseCode}
          </p>
        </div>
        <div className='flex items-center gap-3 self-end sm:self-auto'>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
              data.isActive
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600'
                : 'bg-destructive/10 border border-destructive/20 text-destructive'
            }`}
          >
            {data.isActive ? 'Active' : 'Inactive'}
          </span>
          <Button
            onClick={() => setIsEditOpen(true)}
            variant='outline'
            size='sm'
            className='gap-2 shadow-sm border-gray-300 dark:border-gray-700'
          >
            <SquarePen size={14} className='text-blue-500' />
            Edit Detail
          </Button>
        </div>
      </div>

      {/* Konten Informasi Utama */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-6'>
        {/* Alamat */}
        <div className='flex items-start gap-4'>
          <div className='p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800'>
            <MapPin size={18} className='text-blue-500' />
          </div>
          <div className='space-y-1'>
            <p className='text-sm font-semibold text-foreground'>Address</p>
            <p className='text-sm text-muted-foreground leading-relaxed'>{data.address}</p>
          </div>
        </div>

        {/* Deskripsi */}
        <div className='flex items-start gap-4'>
          <div className='p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800'>
            <AlignLeft size={18} className='text-blue-500' />
          </div>
          <div className='space-y-1'>
            <p className='text-sm font-semibold text-foreground'>Description</p>
            <p className='text-sm text-muted-foreground italic leading-relaxed'>
              {data.description || 'No description provided.'}
            </p>
          </div>
        </div>
      </div>

      <WarehouseForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialData={data}
      />
    </div>
  );
}
