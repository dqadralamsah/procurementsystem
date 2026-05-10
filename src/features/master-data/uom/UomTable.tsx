'use client';

import { useState } from 'react';
import { UomType, UomCategoryType } from '@/types/uom';
import { SquarePen, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleUomDelete } from '@/actions/uomAction';
import UomForm from './UomForm';

export default function UomTable({
  data,
  categories,
}: {
  data: UomType[];
  categories: UomCategoryType[];
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectUom, setSelectUom] = useState<UomType | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure for delete this uom?')) {
      await handleUomDelete(id);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-3 py-2 font-medium">Name</th>
            <th className="px-3 py-2 font-medium">Description</th>
            <th className="px-3 py-2 font-medium">Category</th>
            <th className="px-3 py-2 text-center font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="px-3 py-2">{u.name}</td>
              <td className="px-3 py-2">{u.description}</td>
              <td className="px-3 py-2">{u.category.name}</td>
              <td className="flex items-center justify-center gap-2">
                <Button
                  onClick={() => {
                    setSelectUom(u);
                    setIsEditOpen(true);
                  }}
                  variant={'ghost'}
                  size={'icon'}
                >
                  <SquarePen className="text-blue-400" />
                </Button>
                <Button onClick={() => handleDelete(u.id)} variant={'ghost'} size={'icon'}>
                  <Trash className="text-blue-400" />
                </Button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={3} className="px-3 py-2 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <UomForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialData={selectUom}
        categories={categories}
      />
    </div>
  );
}
