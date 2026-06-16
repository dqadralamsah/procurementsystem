'use client';

import { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Mail, 
  Phone, 
  MapPin, 
  SquarePen 
} from 'lucide-react';
import { Supplier } from '@/generated/prisma/client';
import { Button } from '@/components/ui/button';
import SupplierForm from './SupplierForm';

type Props = {
  supplier: Supplier;
};

export default function SupplierDetailCard({ supplier }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <div className='p-6 bg-white border border-slate-200/80 rounded-xl shadow-sm relative overflow-hidden'>
        {/* Decorative background element for freshness */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-linear-to-br from-blue-50 to-emerald-50 rounded-full opacity-50 pointer-events-none" />

        <div className='flex items-start justify-between mb-8 relative'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20'>
              <span className='text-xl font-bold'>
                {supplier.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className='text-xl font-bold text-slate-800 tracking-tight'>
                {supplier.name}
              </h2>
              <div className='flex items-center gap-3 mt-1'>
                <p className='text-slate-500 text-sm font-medium'>{supplier.supplierCode}</p>
                <span className='w-1 h-1 rounded-full bg-slate-300' />
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 shadow-sm ${
                    supplier.isActive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {supplier.isActive ? (
                    <CheckCircle2 className='size-3' />
                  ) : (
                    <XCircle className='size-3' />
                  )}
                  {supplier.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setIsEditOpen(true)}
            variant='outline' 
            size='sm' 
            className='text-slate-600 shadow-sm transition-all hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50'
          >
            <SquarePen className='size-4' />
            Edit Profile
          </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm relative'>
          {/* Email Card */}
          <div className='p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-3 hover:bg-slate-50 transition-colors'>
            <div className='p-2 rounded-lg bg-blue-100 text-blue-600'>
              <Mail className='size-4' />
            </div>
            <div>
              <p className='text-slate-500 text-xs font-medium mb-0.5 uppercase tracking-wider'>Email Address</p>
              <p className='font-semibold text-slate-800'>{supplier.email || '-'}</p>
            </div>
          </div>

          {/* Contact Card */}
          <div className='p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-3 hover:bg-slate-50 transition-colors'>
            <div className='p-2 rounded-lg bg-emerald-100 text-emerald-600'>
              <Phone className='size-4' />
            </div>
            <div>
              <p className='text-slate-500 text-xs font-medium mb-0.5 uppercase tracking-wider'>Contact Number</p>
              <p className='font-semibold text-slate-800'>
                {supplier.contact || '-'}
              </p>
            </div>
          </div>

          {/* Address Card */}
          <div className='md:col-span-2 p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-3 hover:bg-slate-50 transition-colors'>
            <div className='p-2 rounded-lg bg-amber-100 text-amber-600'>
              <MapPin className='size-4' />
            </div>
            <div>
              <p className='text-slate-500 text-xs font-medium mb-0.5 uppercase tracking-wider'>Registered Address</p>
              <p className='font-semibold text-slate-800 leading-relaxed max-w-3xl'>
                {supplier.address || '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <SupplierForm 
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialData={supplier}
      />
    </>
  );
}
