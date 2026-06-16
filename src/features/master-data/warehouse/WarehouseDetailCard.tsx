'use client';

import { useState } from 'react';
import { WarehouseType } from '@/types/warehouse';
import { MapPin, AlignLeft, SquarePen, CheckCircle2, XCircle, Warehouse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WarehouseForm from './WarehouseForm';

export function WarehouseDetailCard({ data }: { data: WarehouseType }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <div className='p-6 bg-white border border-slate-200/80 rounded-xl shadow-sm relative overflow-hidden'>
        {/* Decorative background element for freshness */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-linear-to-br from-cyan-50 to-blue-50 rounded-full opacity-50 pointer-events-none" />

        <div className='flex items-start justify-between mb-8 relative'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20'>
              <Warehouse className='size-6' />
            </div>
            <div>
              <h2 className='text-xl font-bold text-slate-800 tracking-tight'>
                {data.name}
              </h2>
              <div className='flex items-center gap-3 mt-1'>
                <p className='text-slate-500 text-sm font-medium'>{data.warehouseCode}</p>
                <span className='w-1 h-1 rounded-full bg-slate-300' />
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 shadow-sm ${
                    data.isActive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {data.isActive ? (
                    <CheckCircle2 className='size-3' />
                  ) : (
                    <XCircle className='size-3' />
                  )}
                  {data.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setIsEditOpen(true)}
            variant='outline' 
            size='sm' 
            className='text-slate-600 shadow-sm transition-all hover:text-cyan-600 hover:border-cyan-200 hover:bg-cyan-50'
          >
            <SquarePen className='size-4 mr-2' />
            Edit Warehouse
          </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm relative'>
          {/* Address Card */}
          <div className='p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-3 hover:bg-slate-50 transition-colors'>
            <div className='p-2 rounded-lg bg-cyan-100 text-cyan-600'>
              <MapPin className='size-4' />
            </div>
            <div>
              <p className='text-slate-500 text-xs font-medium mb-0.5 uppercase tracking-wider'>Address</p>
              <p className='font-semibold text-slate-800'>{data.address}</p>
            </div>
          </div>

          {/* Description Card */}
          <div className='p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-3 hover:bg-slate-50 transition-colors'>
            <div className='p-2 rounded-lg bg-slate-200 text-slate-600'>
              <AlignLeft className='size-4' />
            </div>
            <div>
              <p className='text-slate-500 text-xs font-medium mb-0.5 uppercase tracking-wider'>Description</p>
              <p className='font-semibold text-slate-800'>
                {data.description || 'No description provided.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <WarehouseForm isOpen={isEditOpen} onOpenChange={setIsEditOpen} initialData={data} />
    </>
  );
}
