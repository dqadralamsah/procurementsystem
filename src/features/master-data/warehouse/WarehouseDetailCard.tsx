import { WarehouseType } from '@/types/warehouse';
import { MapPin, AlignLeft } from 'lucide-react';

export function WarehouseDetailCard({ data }: { data: WarehouseType }) {
  return (
    <div className='w-full p-4 border rounded-lg shadow-sm overflow-hidden'>
      {/* Header Panel */}
      <div className='flex items-start justify-between py-2 border-b border-gray-200'>
        <div>
          <h1 className='text-xl md:text-2xl font-bold'>{data.name}</h1>
          <p className='text-xs md:text-sm text-gray-400'>
            Warehouse Number: {data.warehouseCode}
          </p>
        </div>
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            data.isActive
              ? 'bg-green-100 border border-green-300 text-green-700'
              : 'bg-red-100 border border-red-300 text-red-700'
          }`}
        >
          {data.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Konten Informasi Utama */}
      <div className='py-2'>
        {/* Alamat */}
        <div className='flex items-start gap-4'>
          <div className='p-1 rounded bg-gray-100'>
            <MapPin size={16} className='text-gray-500' />
          </div>
          <div>
            <p className='font-semibold text-gray-900'>Address</p>
            <p className='text-gray-600 leading-relaxed'>{data.address}</p>
          </div>
        </div>

        {/* Deskripsi */}
        <div className='flex items-start gap-4'>
          <div className='p-1 rounded bg-gray-100'>
            <AlignLeft size={16} className='text-gray-500' />
          </div>
          <div>
            <p className='font-semibold text-gray-900'>Description</p>
            <p className='text-gray-600 italic'>
              {data.description || 'No description provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
