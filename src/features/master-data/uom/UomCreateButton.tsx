'use client';

import { useState } from 'react';
import { UomCategoryType } from '@/types/uom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UomForm from './UomForm';

export default function UomCreateButton({ categories }: { categories: UomCategoryType[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center gap-2">
      <Button onClick={() => setIsOpen(true)} className="text-white bg-blue-500 hover:bg-blue-600">
        <Plus strokeWidth={3} data-icon="inline-start" />
        Create
      </Button>

      <UomForm
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        initialData={null}
        categories={categories}
      />
    </div>
  );
}
