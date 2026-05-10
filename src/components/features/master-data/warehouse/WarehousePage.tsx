'use client';

import { useState } from 'react';
import { WarehouseType } from '@/types/warehouse';
import { Plus } from 'lucide-react';
import WarehouseTable from './WarehouseTable';
import FormDialog from './FormDialog';

export default function WarehousePage({ initialData }: { initialData: WarehouseType[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WarehouseType | null>(null);

  const handleEdit = (item: WarehouseType) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <button
          onClick={handleAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Warehouse
        </button>
      </div>

      {/* TABLE SECTION */}
      <WarehouseTable data={initialData} onEdit={handleEdit} />

      {/* DIALOG SECTION */}
      <FormDialog isOpen={isOpen} onOpenChange={setIsOpen} initialData={selectedItem} />
    </div>
  );
}
