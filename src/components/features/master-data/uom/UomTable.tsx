'use client';

import { useState } from 'react';
import { UomType, UomCategoryType } from '@/types/uom';
import { handleUomDelete } from '@/actions/uomAction';
import { Button } from '@/components/ui/button';
import { SquarePen, Trash } from 'lucide-react';
import UomDialog from './UomDialog';

type Props = {
  data: UomType[];
  categories: UomCategoryType[];
};

export default function UomTable({ data, categories }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectData, setSelectData] = useState<UomType | null>(null);

  const openAddDialog = () => {
    setSelectData(null);
    setIsOpen(true);
  };

  const openEditDialog = (item: UomType) => {
    setSelectData(item);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this data?')) {
      await handleUomDelete(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button onClick={openAddDialog} className="bg-blue-600 hover:bg-blue-700">
          Create
        </Button>
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-3 py-2 text-sm font-medium text-left">Nama</th>
              <th className="px-3 py-2 text-sm font-medium text-left">Category</th>
              <th className="px-3 py-2 text-sm font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((uom) => (
              <tr key={uom.id} className="border-b">
                <td className="px-3 py-2 text-sm font-medium text-left">{uom.name}</td>
                <td className="px-3 py-2 text-sm font-medium text-left">{uom.category.name}</td>
                <td className="px-3 py-2 flex items-center justify-center gap-0.5">
                  <Button onClick={() => openEditDialog(uom)} size={'icon-lg'} variant={'ghost'}>
                    <SquarePen className="text-blue-400" />
                  </Button>
                  <Button onClick={() => handleDelete(uom.id)} size={'icon-lg'} variant={'ghost'}>
                    <Trash className="text-red-400" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UomDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        initialData={selectData}
        categories={categories}
      />
    </div>
  );
}
