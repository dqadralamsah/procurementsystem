'use client';

import { useState } from 'react';
import { WarehouseDetailCard } from './WarehouseDetailCard';
import { WarehouseDetailTable } from './WarehouseDetailTable';

export default function WarehouseDetailView({ warehouse }: any) {
  // Menggunakan state lokal untuk mengontrol tab aktif
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory'>(
    'overview',
  );

  return (
    <div className='w-full space-y-6'>
      {/* Tab Navigation Murni HTML & Tailwind */}
      <div className='flex border-b border-gray-200'>
        <button
          type='button'
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors duration-200 ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Overview
        </button>
        <button
          type='button'
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors duration-200 ${
            activeTab === 'inventory'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Inventory ({warehouse._count?.inventories || 0})
        </button>
      </div>

      {/* Konten Tab berdasarkan State aktif */}
      <div className='w-full animation-fade-in'>
        {activeTab === 'overview' && <WarehouseDetailCard data={warehouse} />}

        {activeTab === 'inventory' && (
          <WarehouseDetailTable data={warehouse.inventories} />
        )}
      </div>
    </div>
  );
}
