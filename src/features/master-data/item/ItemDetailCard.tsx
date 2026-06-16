'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Tag, Package, Box, SquarePen } from 'lucide-react';
import { ItemType, ItemCategoryType } from '@/types/item';
import { UomType } from '@/types/uom';
import { Button } from '@/components/ui/button';
import ItemForm from './ItemForm';

type Props = {
  item: ItemType;
  categories: ItemCategoryType[];
  uoms: UomType[];
};

export default function ItemDetailCard({ item, categories, uoms }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <div className='p-6 bg-white border border-slate-200/80 rounded-xl shadow-sm relative overflow-hidden'>
        {/* Decorative background element for freshness */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-linear-to-br from-indigo-50 to-purple-50 rounded-full opacity-50 pointer-events-none" />

        <div className='flex items-start justify-between mb-8 relative'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20'>
              <Package className='size-6' />
            </div>
            <div>
              <h2 className='text-xl font-bold text-slate-800 tracking-tight'>
                {item.name}
              </h2>
              <div className='flex items-center gap-3 mt-1'>
                <p className='text-slate-500 text-sm font-medium'>{item.sku}</p>
                <span className='w-1 h-1 rounded-full bg-slate-300' />
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 shadow-sm ${
                    item.isActive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {item.isActive ? (
                    <CheckCircle2 className='size-3' />
                  ) : (
                    <XCircle className='size-3' />
                  )}
                  {item.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setIsEditOpen(true)}
            variant='outline' 
            size='sm' 
            className='text-slate-600 shadow-sm transition-all hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50'
          >
            <SquarePen className='size-4 mr-2' />
            Edit Item
          </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm relative'>
          {/* Category Card */}
          <div className='p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-3 hover:bg-slate-50 transition-colors'>
            <div className='p-2 rounded-lg bg-indigo-100 text-indigo-600'>
              <Tag className='size-4' />
            </div>
            <div>
              <p className='text-slate-500 text-xs font-medium mb-0.5 uppercase tracking-wider'>Category</p>
              <p className='font-semibold text-slate-800'>{item.category.name}</p>
            </div>
          </div>

          {/* UOM Card */}
          <div className='p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-3 hover:bg-slate-50 transition-colors'>
            <div className='p-2 rounded-lg bg-purple-100 text-purple-600'>
              <Box className='size-4' />
            </div>
            <div>
              <p className='text-slate-500 text-xs font-medium mb-0.5 uppercase tracking-wider'>Unit of Measure (UOM)</p>
              <p className='font-semibold text-slate-800'>
                {item.uom.name}
              </p>
            </div>
          </div>

          {/* Description Card */}
          <div className='md:col-span-2 p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-3 hover:bg-slate-50 transition-colors'>
            <div>
              <p className='text-slate-500 text-xs font-medium mb-1.5 uppercase tracking-wider'>Description</p>
              <p className='font-semibold text-slate-800 leading-relaxed max-w-3xl'>
                {item.description || 'No description provided.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ItemForm 
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialData={item}
        categories={categories}
        uoms={uoms}
      />
    </>
  );
}
