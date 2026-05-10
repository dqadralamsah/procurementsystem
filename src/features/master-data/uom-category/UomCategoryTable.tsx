'use client';

import { useState } from 'react';
import { UomCategoryType } from '@/types/uom';
import { Button } from '@/components/ui/button';
import { SquarePen, Trash } from 'lucide-react';
import { handleCategoryDelete } from '@/actions/uomAction';
import UomCategoryForm from './UomCategoryForm';

export default function UomCategoryTable({ data }: { data: UomCategoryType[] }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectCategory, setSelectCategory] = useState<UomCategoryType | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure for delete this category?')) {
      await handleCategoryDelete(id);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-3 py-2 font-medium">Name</th>
            <th className="px-3 py-2 font-medium">Description</th>
            <th className="px-3 py-2 text-center font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cat) => (
            <tr key={cat.id} className="border-b">
              <td className="px-3 py-2">{cat.name}</td>
              <td className="px-3 py-2">{cat.description}</td>
              <td className="flex items-center justify-center gap-2">
                <Button
                  onClick={() => {
                    setSelectCategory(cat);
                    setIsEditOpen(true);
                  }}
                  variant={'ghost'}
                  size={'icon'}
                >
                  <SquarePen className="text-blue-400" />
                </Button>
                <Button onClick={() => handleDelete(cat.id)} variant={'ghost'} size={'icon'}>
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

      <UomCategoryForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialData={selectCategory}
      />
    </div>
  );
}
