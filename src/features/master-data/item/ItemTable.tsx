'use client';

import { useState } from 'react';
import { ItemType, ItemCategoryType } from '@/types/item';
import { UomType } from '@/types/uom';
import { SquarePen, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ItemForm from './ItemForm';

type Props = {
  data: ItemType[];
  categories: ItemCategoryType[];
  uoms: UomType[];
};

function StockStatusBadge({
  stock,
  minStock,
  reorderPoint,
}: {
  stock: number;
  minStock: number;
  reorderPoint: number;
}) {
  if (stock <= 0) {
    return (
      <span className="px-2 py-1 bg-red-100 text-red-700 border border-red-200 rounded-md text-xs font-medium">
        Out of Stock
      </span>
    );
  }
  if (stock <= minStock) {
    return (
      <span className="px-2 py-1 bg-orange-100 text-orange-700 border border-orange-200 rounded-md text-xs font-medium">
        Low
      </span>
    );
  }
  if (stock <= reorderPoint) {
    return (
      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-md text-xs font-medium">
        Reorder
      </span>
    );
  }
  return (
    <span className="px-2 py-1 bg-green-100 text-green-700 border border-green-200 rounded-md text-xs font-medium">
      Available
    </span>
  );
}
export default function ItemTable({ data, categories, uoms }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectItem, setSelectItem] = useState<ItemType | null>(null);

  return (
    <>
      <table className="w-full min-w-[700px] border-collapse text-left">
        <thead>
          <tr className="bg-slate-50/75 border-b border-slate-200/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <th className="p-3 w-32">SKU</th>
            <th className="p-3">Name</th>
            <th className="p-3 w-48">Category</th>
            {/* <th className="p-3">Stock</th> */}
            {/* <th className="p-3">Status</th> */}
            <th className="p-3 w-28 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y   divide-slate-100 text-sm">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="p-3 font-medium text-slate-800">{item.sku}</td>
              <td className="p-3 text-slate-700">{item.name}</td>
              <td className="p-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 border border-indigo-100 text-indigo-600">
                  {item.category.name}
                </span>
              </td>
              {/* Untuk Stock diambil dari data stock */}
              {/* <td className="p-3">
                <span className="font-semibold text-slate-800">{item.stock}</span>{' '}
                <span className="text-slate-500 text-xs">{item.uom.name}</span>
                <div className="text-[10px] text-slate-400 mt-1">
                  Min: {item.minimumStock} | ROP: {item.reorderPoint}
                </div>
              </td> */}
              {/* <td className="p-3">
                <StockStatusBadge
                  stock={item.stock}
                  minStock={item.minimumStock}
                  reorderPoint={item.reorderPoint}
                />
              </td> */}
              <td className="p-3">
                <div className="flex items-center justify-center gap-1.5">
                  <Button
                    onClick={() => {
                      setSelectItem(item);
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
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ItemForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialData={selectItem}
        categories={categories}
        uoms={uoms}
      />
    </>
  );
}
