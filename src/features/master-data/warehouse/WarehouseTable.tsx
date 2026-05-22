'use client';

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
          <tr className='text-xs text-gray-400 border-b bg-muted/50'>
            <th className='w-60 p-3 font-bold '>Warehouse Number</th>
            <th className='p-3 font-bold'>Name</th>
            <th className='w-40 p-3 font-bold text-center'>Status</th>
            <th className='w-40 p-3 font-bold text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((wh) => (
            <tr
              key={wh.id}
              className='text-xs border-b hover:bg-muted/20 transition-colors'
            >
              <td className='p-3 font-mono'>{wh.warehouseCode}</td>
              <td className='p-3 font-medium'>{wh.name}</td>
              <td className='p-3 text-center'>
                <span
                  className={`px-2 py-1 rounded-full ${
                    wh.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {wh.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className='flex items-center justify-center gap-2 p-1.5'>
                {/* Handle Edit */}
                <Button
                  onClick={() => {
                    setSelectWarehouse(wh);
                    setIsEditOpen(true);
                  }}
                  variant={'ghost'}
                  size={'icon'}
                >
                  <SquarePen className='text-blue-400' />
                </Button>

                {/* Handle Detail dan Delete belum berfungsi */}
                {/* Handle Detail */}
                <Button variant={'ghost'} size={'icon'}>
                  <Eye className='text-gray-500' />
                </Button>

                {/* Handle Delete */}
                <Button variant={'ghost'} size={'icon'}>
                  <Trash className='text-red-500' />
                </Button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className='p-3 text-sm text-center font-medium text-gray-400'
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
