'use client';

import SearchComponent from '@/components/shared/Search';
import PaginationComponent from '@/components/shared/Pagination';
import { InventoryType } from '@/types/inventory';

export function WarehouseDetailTable({
  data,
  totalPages,
  limit,
}: {
  data: InventoryType[];
  totalPages: number;
  limit: number;
}) {
  return (
    <div className="w-full p-6 border rounded-xl space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-foreground">Warehouse Items</h2>
        <SearchComponent placeholder="Search by SKU or Item Name..." />
      </div>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-bold text-muted-foreground bg-muted/50 uppercase">
              <th className="w-60 p-3">SKU</th>
              <th className="p-3">Item Name</th>
              <th className="w-32 p-3 text-right">Quantity</th>
              <th className="w-32 p-3 text-right">Unit</th>
              <th className="w-32 p-3 text-right">Reorder Point</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-3 text-center text-muted-foreground italic border-t">
                  No items found in this warehouse.
                </td>
              </tr>
            ) : (
              data.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-indigo-50/30 even:bg-muted/20 transition-colors"
                >
                  <td className="p-3 font-mono font-medium">{inv.item.sku}</td>
                  <td className="p-3">{inv.item.name}</td>
                  <td className="p-3 text-right font-bold">{Number(inv.quantity)}</td>
                  <td className="p-3 text-right font-bold">{inv.item.uom.name}</td>
                  <td className="p-3 text-right text-orange-600 font-semibold">
                    {Number(inv.reorderPoint)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 0 && <PaginationComponent totalPages={totalPages} currentLimit={limit} />}
    </div>
  );
}
