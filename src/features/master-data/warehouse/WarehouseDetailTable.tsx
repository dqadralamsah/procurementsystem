'use client';

import { InventoryType } from '@/types/inventory';
import { AlertTriangle } from 'lucide-react';
import SearchComponent from '@/components/shared/Search';
import PaginationComponent from '@/components/shared/Pagination';

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
    <div className='w-full border border-slate-200/80 rounded-xl bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md'>
      <div className='flex flex-col p-6 sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100'>
        <div className='space-y-1'>
          <h2 className='text-lg font-bold text-slate-900'>Warehouse Items</h2>
          <p className='text-xs text-slate-500'>
            Stok inventaris terdaftar di warehouse ini.
          </p>
        </div>
        <div className='w-full sm:w-72'>
          <SearchComponent placeholder='Search by SKU or Item Name...' />
        </div>
      </div>

      <div className='w-full overflow-x-auto'>
        <table className='w-full min-w-[700px] border-collapse text-left'>
          <thead>
            <tr className='bg-slate-50/75 border-b border-slate-200/80 text-xs font-semibold text-slate-500 uppercase tracking-wider'>
              <th className='w-48 p-3'>SKU</th>
              <th className='p-3'>Item Name</th>
              <th className='w-36 p-3 text-right'>Quantity</th>
              <th className='w-32 p-3 text-right'>Unit</th>
              <th className='w-40 p-3 text-right'>Reorder Point</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 text-sm'>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className='p-3 text-center text-slate-400 font-medium'
                >
                  No items found in this warehouse.
                </td>
              </tr>
            ) : (
              data.map((inv) => {
                const qty = Number(inv.quantity);
                const reorder = Number(inv.reorderPoint);
                const isLowStock = qty <= reorder;

                return (
                  <tr
                    key={inv.id}
                    className='hover:bg-slate-50/50 transition-colors'
                  >
                    <td className='p-3 font-mono text-xs font-semibold text-slate-700'>
                      {inv.item.sku}
                    </td>
                    <td className='p-3 font-medium text-slate-900'>
                      {inv.item.name}
                    </td>
                    <td className='p-3 text-right'>
                      {isLowStock ? (
                        <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 font-semibold text-xs'>
                          <AlertTriangle
                            size={12}
                            className='text-rose-500 animate-pulse'
                          />
                          {qty}
                        </span>
                      ) : (
                        <span className='font-semibold text-slate-900'>
                          {qty}
                        </span>
                      )}
                    </td>
                    <td className='p-3 text-right text-slate-500'>
                      {inv.item.uom.name}
                    </td>
                    <td
                      className={`p-3 text-right font-medium ${
                        isLowStock ? 'text-amber-600' : 'text-slate-600'
                      }`}
                    >
                      {reorder}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 0 && (
        <div className='p-4 border-t border-slate-100 bg-slate-50/30'>
          <PaginationComponent totalPages={totalPages} currentLimit={limit} />
        </div>
      )}
    </div>
  );
}
