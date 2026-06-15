'use client';

import { useState } from 'react';
import { WarehouseType } from '@/types/warehouse';
import { MapPin, AlignLeft, SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WarehouseForm from './WarehouseForm';

export function WarehouseDetailCard({ data }: { data: WarehouseType }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="w-full p-6 border border-slate-200/80 rounded-xl bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-slate-100">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{data.name}</h1>
          <p className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-150 inline-block">
            Warehouse Code: {data.warehouseCode}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              data.isActive
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-rose-50 border-rose-200 text-rose-700'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                data.isActive ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
            {data.isActive ? 'Active' : 'Inactive'}
          </span>
          <Button
            onClick={() => setIsEditOpen(true)}
            variant="outline"
            size="sm"
            className="gap-2 text-xs font-medium border-slate-200 hover:bg-slate-50 hover:text-slate-950 transition-colors shadow-sm"
          >
            <SquarePen size={14} className="text-slate-500" />
            Edit Detail
          </Button>
        </div>
      </div>

      {/* Konten Informasi Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {/* Alamat */}
        <div className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50/40">
          <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100">
            <MapPin size={18} className="text-indigo-600" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">Address</p>
            <p className="text-sm text-slate-600 leading-relaxed">{data.address}</p>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50/40">
          <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200">
            <AlignLeft size={18} className="text-slate-600" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">Description</p>
            <p className="text-sm text-slate-600 italic leading-relaxed">
              {data.description || 'No description provided.'}
            </p>
          </div>
        </div>
      </div>

      <WarehouseForm isOpen={isEditOpen} onOpenChange={setIsEditOpen} initialData={data} />
    </div>
  );
}
