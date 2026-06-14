'use client';

import Link from 'next/link';
import { useState } from 'react';
import { WarehouseType } from '@/types/warehouse';
import { SquarePen, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WarehouseForm from './WarehouseForm';

type Props = {
  data: WarehouseType[];
};

export default function WarehouseTable({ data }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectWarehouse, setSelectWarehouse] = useState<WarehouseType | null>(
    null,
  );

  return (
    <div className='w-full overflow-x-auto border border-slate-200/80 rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md'>
      <table className='w-full min-w-[700px] border-collapse text-left'>
        <thead>
          <tr className='bg-slate-50/75 border-b border-slate-200/80 text-xs font-semibold text-slate-500 uppercase tracking-wider'>
            <th className='w-60 px-6 py-4'>Warehouse Code</th>
            <th className='px-6 py-4'>Name & Details</th>
            <th className='w-36 px-6 py-4 text-center'>Status</th>
            <th className='w-32 px-6 py-4 text-center'>Actions</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100 text-sm'>
          {data.map((wh) => (
            <tr
              key={wh.id}
              className='hover:bg-slate-50/50 transition-colors'
            >
              <td className='px-6 py-4 font-mono text-xs font-semibold text-slate-700'>
                {wh.warehouseCode}
              </td>
              <td className='px-6 py-4'>
                <div className='flex flex-col gap-0.5'>
                  <span className='font-medium text-slate-900'>{wh.name}</span>
                  {wh.address && (
                    <span className='text-xs text-slate-500 line-clamp-1 max-w-md'>
                      {wh.address}
                    </span>
                  )}
                </div>
              </td>
              <td className='px-6 py-4 text-center'>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    wh.isActive
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-800/30 dark:text-emerald-400'
                      : 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/20 dark:border-rose-800/30 dark:text-rose-400'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      wh.isActive ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  {wh.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className='px-6 py-4'>
                <div className='flex items-center justify-center gap-1.5'>
                  {/* View Details */}
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors'
                    asChild
                  >
                    <Link href={`/settings/warehouse/${wh.id}`}>
                      <Eye className='size-4' />
                    </Link>
                  </Button>

                  {/* Edit details */}
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 text-slate-500 hover:text-amber-600 hover:bg-amber-50/50 rounded-lg transition-colors'
                    onClick={() => {
                      setSelectWarehouse(wh);
                      setIsEditOpen(true);
                    }}
                  >
                    <SquarePen className='size-4' />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className='px-6 py-10 text-sm text-center font-medium text-slate-400'
              >
                No warehouses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <WarehouseForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialData={selectWarehouse}
      />
    </div>
  );
}
