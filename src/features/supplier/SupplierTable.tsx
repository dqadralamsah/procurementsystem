'use client';

import { useState } from 'react';
import { SupplierType } from '@/types/supplier';
import { SquarePen, Eye } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SupplierForm from './SupplierForm';

type Props = {
  data: SupplierType[];
};

export default function SupplierTable({ data }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierType | null>(
    null,
  );

  return (
    <>
      <table className='w-full text-left'>
        <thead>
          <tr className='text-xs text-slate-500 font-bold uppercase bg-slate-50 border-b border-slate-200'>
            <th className='p-3 w-48'>Supplier Number</th>
            <th className='p-3'>Supplier Name</th>
            <th className='p-3 w-32 text-center'>Status</th>
            <th className='p-3 w-28 text-center'>Action</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100 text-sm'>
          {data.map((sup) => (
            <tr key={sup.id} className='hover:bg-slate-50/50 transition-colors'>
              <td className='p-3 font-medium'>{sup.supplierCode}</td>
              <td className='p-3'>{sup.name}</td>
              <td className='p-2'>
                <div className='flex items-center justify-center'>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${sup.isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                  >
                    {sup.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </td>
              <td className='p-2'>
                <div className='flex items-center justify-center gap-1.5'>
                  <Link href={`/supplier/${sup.id}`}>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors'
                    >
                      <Eye className='size-4' />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setSelectedSupplier(sup);
                      setIsEditOpen(true);
                    }}
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 text-slate-500 hover:text-amber-600 hover:bg-amber-50/50 rounded-lg transition-colors'
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
                className='p-3 text-center text-slate-400 font-medium'
              >
                No suppliers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <SupplierForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialData={selectedSupplier}
      />
    </>
  );
}
