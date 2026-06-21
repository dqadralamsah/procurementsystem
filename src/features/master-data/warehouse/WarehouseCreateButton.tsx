'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WarehouseForm from './WarehouseForm';

export default function WarehouseCreateButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className=' flex justify-center gap-2 text-white bg-blue-500 hover:bg-blue-600'
      >
        <Plus strokeWidth={3} data-icon='inline-start' />
        Create
      </Button>

      {isOpen && (
        <WarehouseForm
        initialData={null}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
      )}
    </>
  );
}
