'use client';

import { useState } from 'react';
import { SupplierType } from '@/types/supplier';
import { SquarePen, Eye, Trash } from 'lucide-react';
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
    <div className='border rounded-lg overflow-hidden'>
      <table className='w-full text-left'>
        <thead>
          <tr className='h-12 text-xs font-bold text-gray-400 bg-muted'>
            <th className='w-60 p-3'>Supplier Number</th>
            <th className='p-3'>Supplier Name</th>
            <th className='w-32 p-3 text-center'>Status</th>
            <th className='w-32 p-3 text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sup) => (
            <tr
              key={sup.id}
              className='h-12 text-xs border-t hover:bg-indigo-50/30 even:bg-muted/20 transition-colors'
            >
              <td className='p-3 font-mono'>{sup.supplierCode}</td>
              <td className='p-3 font-medium'>{sup.name}</td>
              <td className='p-3 text-center'>
                <span
                  className={`px-4 py-1 text-[10px] font-bold rounded-full ${
                    sup.isActive
                      ? 'bg-green-100 border border-green-300 text-green-700 '
                      : 'bg-red-100 border border-red-300 text-red-700'
                  }`}
                >
                  {sup.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className='flex items-center justify-center p-1.5 gap-1'>
                {/* Handle Detail belum berfungsi */}
                {/* Handle Detail */}
                <Button variant='ghost' size='icon'>
                  <Eye className='text-gray-500' />
                </Button>

                {/* Handle Edit */}
                <Button
                  onClick={() => {
                    setSelectedSupplier(sup);
                    setIsEditOpen(true);
                  }}
                  variant='ghost'
                  size='icon'
                >
                  <SquarePen className='text-blue-500' />
                </Button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className='p-3 text-sm text-center font-medium text-gray-400 border-t'
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
    </div>
  );
}
