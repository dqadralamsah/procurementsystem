'use client';

import { SupplierPrices, Supplier, Uom } from '@/generated/prisma/client';
import { BadgeCheck, Store } from 'lucide-react';
import Link from 'next/link';

type SupplierPriceWithRelations = SupplierPrices & {
  supplier: Supplier;
  uom: Uom;
};

type Props = {
  data: SupplierPriceWithRelations[];
};

export default function ItemSuppliersTable({ data }: Props) {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-left'>
        <thead>
          <tr className='text-xs text-slate-500 font-bold uppercase bg-slate-50 border-y border-slate-200'>
            <th className='p-4 w-48'>Supplier Name</th>
            <th className='p-4'>Supplier Code</th>
            <th className='p-4 text-right'>Price</th>
            <th className='p-4 text-center'>UOM</th>
            <th className='p-4 text-right'>Min. Order</th>
            <th className='p-4'>Effective Date</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100 text-sm'>
          {data && data.length > 0 ? (
            data.map((price) => (
              <tr
                key={price.id}
                className='hover:bg-slate-50/50 transition-colors'
              >
                <td className='p-4 font-medium text-slate-800'>
                  <Link 
                    href={`/supplier/${price.supplier.id}`}
                    className='flex items-center gap-2 hover:text-blue-600 transition-colors'
                  >
                    <div className='w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center'>
                      <Store className='size-4' />
                    </div>
                    {price.supplier.name}
                    {price.supplier.isActive && (
                      <BadgeCheck className='size-3.5 text-emerald-500' />
                    )}
                  </Link>
                </td>
                <td className='p-4 text-slate-600'>{price.supplier.supplierCode}</td>
                <td className='p-4 text-right font-semibold text-slate-800'>
                  Rp {Number(price.price).toLocaleString('id-ID')}
                </td>
                <td className='p-4 text-center'>
                  <span className='inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600'>
                    {price.uom.name}
                  </span>
                </td>
                <td className='p-4 text-right text-slate-600'>
                  {Number(price.minimumOrder).toLocaleString('id-ID')}
                </td>
                <td className='p-4 text-slate-600'>
                  {new Date(price.effectiveDate).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className='p-8 text-center text-slate-400 font-medium bg-slate-50/30'
              >
                <div className='flex flex-col items-center justify-center gap-2'>
                  <Store className='size-8 text-slate-300' />
                  <p>Tidak ada supplier yang menyediakan item ini.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
