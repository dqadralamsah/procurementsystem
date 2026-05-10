'use client';

import { useState } from 'react';
import { UomCategoryType } from '@/types/uom';
import { handleCategoryDelete } from '@/actions/uomAction';
import { Button } from '@/components/ui/button';
import { SquarePen, Trash } from 'lucide-react';
import UomCategoryDialog from './UomCategoryDialog';

type Props = {
  data: UomCategoryType[];
};

export default function UomCategoryPage({ data }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<UomCategoryType | null>(null);

  const openAddDialog = () => {
    setSelectedData(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: UomCategoryType) => {
    setSelectedData(item);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this data?')) {
      await handleCategoryDelete(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">List Kategori Item</h2>
        <Button
          onClick={openAddDialog}
          size={'lg'}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Create
        </Button>
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-3 py-2 text-sm font-medium text-left">Nama</th>
              <th className="px-3 py-2 text-sm font-medium text-left">Deskripsi</th>
              <th className="px-3 py-2 text-sm font-medium text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-3 py-2 text-sm font-medium text-left">{item.name}</td>
                <td className="px-3 py-2 text-sm font-medium text-left">{item.description}</td>
                <td className="px-3 py-2 flex items-center justify-center gap-0.5">
                  <Button onClick={() => openEditDialog(item)} size={'icon-lg'} variant={'ghost'}>
                    <SquarePen className="text-blue-400" />
                  </Button>
                  <Button onClick={() => handleDelete(item.id)} size={'icon-lg'} variant={'ghost'}>
                    <Trash className="text-red-400" />
                  </Button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  Belum ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Komponen Dialog yang sudah dipisah rapi */}
      <UomCategoryDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialData={selectedData}
      />
    </div>
  );
}
