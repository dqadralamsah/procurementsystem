'use client';

import Link from 'next/link';
import { useState } from 'react';
import { WarehouseType } from '@/types/warehouse';
import { SquarePen, Eye, Trash } from 'lucide-react';
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
    <div className='border rounded-lg overflow-hidden'>
      <table className='w-full text-left'>
        <thead>
          <tr className='h-12 text-xs fond-bold text-gray-400 bg-muted'>
            <th className='w-60 p-3'>Warehouse Number</th>
            <th className='p-3'>Name</th>
            <th className='w-32 p-3 text-center'>Status</th>
            <th className='w-32 p-3 text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((wh) => (
            <tr
              key={wh.id}
              className='h-12 text-xs border-t hover:bg-indigo-50/30 even:bg-muted/20 transition-colors'
            >
              <td className='p-3 font-mono'>{wh.warehouseCode}</td>
              <td className='p-3 font-medium'>{wh.name}</td>
              <td className='p-3 text-center'>
                <span
                  className={`px-4 py-1 text-[10px] font-bold rounded-full ${
                    wh.isActive
                      ? 'bg-green-100 border border-green-300 text-green-700 '
                      : 'bg-red-100 border border-red-300 text-red-700'
                  }`}
                >
                  {wh.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className='flex items-center justify-center p-1.5 gap-1'>
                {/* Handle Detail dan Delete belum berfungsi */}
                {/* Handle Detail */}
                <Button variant={'ghost'} size={'icon'} asChild>
                  <Link href={`/settings/warehouse/${wh.id}`}>
                    <Eye className='text-gray-500' />
                  </Link>
                </Button>

                {/* Handle Edit */}
                <Button
                  onClick={() => {
                    setSelectWarehouse(wh);
                    setIsEditOpen(true);
                  }}
                  variant={'ghost'}
                  size={'icon'}
                >
                  <SquarePen className='text-blue-500' />
                </Button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className='p-3 text-sm text-center font-medium text-gray-400 border-t'
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
