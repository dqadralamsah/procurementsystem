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
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[400px] border-collapse text-left">
        <thead>
          <tr className="bg-slate-50/75 border-b border-slate-200/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <th className="p-3 w-40">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3 w-28 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-3 text-center text-slate-400 font-medium border-b border-slate-100">
                No categories found.
              </td>
            </tr>
          ) : (
            data.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3 font-semibold text-slate-800">{cat.name}</td>
                <td className="p-3 text-slate-600">{cat.description || '-'}</td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <Button
                      onClick={() => {
                        setSelectCategory(cat);
                        setIsEditOpen(true);
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-500 hover:text-amber-600 hover:bg-amber-50/50 rounded-lg transition-colors"
                    >
                      <SquarePen className="size-4" />
                    </Button>
                    <Button 
                      onClick={() => handleDelete(cat.id)} 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-lg transition-colors"
                    >
                      <Trash className="size-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
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
