'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SupplierForm from './SupplierForm';

export default function SupplierCreateButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center gap-2">
      <Button
        onClick={() => setIsOpen(true)}
        size={'sm'}
        className="text-white bg-blue-500 hover:bg-blue-600 transition-all"
      >
        <Plus strokeWidth={3} data-icon="inline-start" />
        Create
      </Button>

      <SupplierForm isOpen={isOpen} onOpenChange={setIsOpen} initialData={null} />
    </div>
  );
}
