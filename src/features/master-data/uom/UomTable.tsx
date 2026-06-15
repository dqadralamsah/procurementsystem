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
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[500px] border-collapse text-left">
        <thead>
          <tr className="bg-slate-50/75 border-b border-slate-200/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <th className="p-3 w-40">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3 w-40">Category</th>
            <th className="p-3 w-28 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-3 text-center text-slate-400 font-medium border-b border-slate-100">
                No units of measure found.
              </td>
            </tr>
          ) : (
            data.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3 font-semibold text-slate-800">{u.name}</td>
                <td className="p-3 text-slate-600">{u.description || '-'}</td>
                <td className="p-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 border border-slate-200 text-slate-700">
                    {u.category.name}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <Button
                      onClick={() => {
                        setSelectUom(u);
                        setIsEditOpen(true);
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-500 hover:text-amber-600 hover:bg-amber-50/50 rounded-lg transition-colors"
                    >
                      <SquarePen className="size-4" />
                    </Button>
                    <Button 
                      onClick={() => handleDelete(u.id)} 
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

      <UomForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialData={selectUom}
        categories={categories}
      />
    </div>
  );
}
