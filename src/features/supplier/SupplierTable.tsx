'use client';

import { useState } from 'react';
import { SupplierType } from '@/types/supplier';
import { SquarePen, Eye } from 'lucide-react';
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
      <table className="w-full min-w-[600px] border-collapse text-left">
        <thead>
          <tr className="bg-slate-50/75 border-b border-slate-200/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <th className="p-3 w-48">Supplier Number</th>
            <th className="p-3">Supplier Name</th>
            <th className="p-3 w-32 text-center">Status</th>
            <th className="p-3 w-28 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {data.map((sup) => (
            <tr key={sup.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="p-3 font-medium text-slate-800">{sup.supplierCode}</td>
              <td className="p-3 text-slate-700">{sup.name}</td>
              <td className="p-3">
                <div className="flex justify-center">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                      sup.isActive
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    {sup.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center justify-center gap-1.5">
                  <Button
                    onClick={() => {
                      setSelectedSupplier(sup);
                      setIsEditOpen(true);
                    }}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-500 hover:text-amber-600 hover:bg-amber-50/50 rounded-lg transition-colors"
                  >
                    <SquarePen className="size-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors"
                  >
                    <Eye className="size-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={4} className="p-3 text-center text-slate-400 font-medium">
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
