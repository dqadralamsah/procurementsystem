'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WarehouseForm from './WarehouseForm';

export default function WarehouseCreateButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex justify-center gap-2'>
      <Button
        onClick={() => setIsOpen(true)}
        size={'sm'}
        className=' text-white bg-blue-500 hover:bg-blue-600'
      >
        <Plus strokeWidth={3} data-icon='inline-start' />
        Create
      </Button>

      <WarehouseForm
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        initialData={null}
      />
    </div>
  );
}
