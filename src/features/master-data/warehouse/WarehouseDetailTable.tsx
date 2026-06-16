'use client';

import { InventoryType } from '@/types/inventory';
import { AlertTriangle, PackageSearch } from 'lucide-react';
import Link from 'next/link';

export function WarehouseDetailTable({
  data,
}: {
  data: InventoryType[];
}) {
  return (
    <div className='w-full overflow-x-auto'>
      <table className='w-full text-left'>
        <thead>
          <tr className='text-xs text-slate-500 font-bold uppercase bg-slate-50 border-y border-slate-200'>
            <th className='p-4 w-48'>SKU</th>
            <th className='p-4'>Item Name</th>
            <th className='p-4 text-right w-36'>Quantity</th>
            <th className='p-4 text-center w-32'>Unit</th>
            <th className='p-4 text-right w-40'>Reorder Point</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100 text-sm'>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className='p-8 text-center text-slate-400 font-medium bg-slate-50/30'
              >
                <div className='flex flex-col items-center justify-center gap-2'>
                  <PackageSearch className='size-8 text-slate-300' />
                  <p>Tidak ada stok item yang ditemukan di warehouse ini.</p>
                </div>
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
                  <td className='p-4 font-mono text-xs font-semibold text-slate-700'>
                    <Link 
                      href={`/item-catalog/${inv.item.id}`}
                      className='hover:text-cyan-600 transition-colors'
                    >
                      {inv.item.sku}
                    </Link>
                  </td>
                  <td className='p-4 font-medium text-slate-900'>
                    {inv.item.name}
                  </td>
                  <td className='p-4 text-right'>
                    {isLowStock ? (
                      <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-700 font-semibold text-xs'>
                        <AlertTriangle
                          size={14}
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
                  <td className='p-4 text-center'>
                    <span className='inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600'>
                      {inv.item.uom.name}
                    </span>
                  </td>
                  <td
                    className={`p-4 text-right font-medium ${
                      isLowStock ? 'text-rose-600' : 'text-slate-600'
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
  );
}
