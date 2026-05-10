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
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-3 py-2 font-medium">SKU</th>
            <th className="px-3 py-2 font-medium">Name</th>
            <th className="px-3 py-2 font-medium">Category</th>
            <th className="px-3 py-2 font-medium">Stock</th>
            <th className="px-3 py-2 font-medium">Status</th>
            <th className="px-3 py-2 text-center font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-3 py-2">{item.sku}</td>
              <td className="px-3 py-2">{item.name}</td>
              <td className="px-3 py-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs border border-blue-100">
                  {item.category.name}
                </span>
              </td>
              {/* Untuk Stock diambil dari data stock */}
              {/* <td className="px-3 py-2">
                <span className="font-semibold">{item.stock}</span>{' '}
                <span className="text-gray-500 text-xs">{item.uom.name}</span>
                <div className="text-[10px] text-gray-400 mt-1">
                  Min: {item.minimumStock} | ROP: {item.reorderPoint}
                </div>
              </td> */}
              {/* <td className="px-3 py-2">
                <StockStatusBadge
                  stock={item.stock}
                  minStock={item.minimumStock}
                  reorderPoint={item.reorderPoint}
                />
              </td> */}
              <td className="flex items-center justify-center gap-2">
                <Button
                  onClick={() => {
                    setSelectItem(item);
                    setIsEditOpen(true);
                  }}
                  variant={'ghost'}
                  size={'icon'}
                >
                  <SquarePen className="text-blue-400" />
                </Button>
                <Button variant={'ghost'} size={'icon'}>
                  <Eye className="text-gray-500" />
                </Button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={6} className="px-3 py-2 text-center text-gray-500">
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
    </div>
  );
}
