'use client';

import { SupplierPrices, Item, Uom, ItemCategory } from '@/generated/prisma/client';

type SupplierPriceWithRelations = SupplierPrices & {
  item: Item & {
    category: ItemCategory;
  };
  uom: Uom;
};

type Props = {
  data: SupplierPriceWithRelations[];
};

export default function SupplierItemsTable({ data }: Props) {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-left'>
        <thead>
          <tr className='text-xs text-slate-500 font-bold uppercase bg-slate-50 border-y border-slate-200'>
            <th className='p-3 w-32'>Item SKU</th>
            <th className='p-3'>Item Name</th>
            <th className='p-3'>Category</th>
            <th className='p-3 text-right'>Price</th>
            <th className='p-3 text-center'>UOM</th>
            <th className='p-3 text-right'>Min. Order</th>
            <th className='p-3'>Effective Date</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100 text-sm'>
          {data && data.length > 0 ? (
            data.map((price) => (
              <tr
                key={price.id}
                className='hover:bg-slate-50/50 transition-colors'
              >
                <td className='p-3 font-medium text-slate-700'>
                  {price.item.sku}
                </td>
                <td className='p-3 text-slate-800'>{price.item.name}</td>
                <td className='p-3 text-slate-600'>
                  {price.item.category.name}
                </td>
                <td className='p-3 text-right font-medium text-slate-800'>
                  Rp {Number(price.price).toLocaleString('id-ID')}
                </td>
                <td className='p-3 text-center text-slate-600'>
                  {price.uom.name}
                </td>
                <td className='p-3 text-right text-slate-600'>
                  {Number(price.minimumOrder)}
                </td>
                <td className='p-3 text-slate-600'>
                  {new Date(price.effectiveDate).toLocaleDateString('id-ID')}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className='p-4 text-center text-slate-400 font-medium'
              >
                Tidak ada data harga item untuk supplier ini.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
