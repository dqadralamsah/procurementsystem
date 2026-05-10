'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ItemCategoryForm from './ItemCategoryForm';

export default function ItemCategoryCreateButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center gap-2">
      <Button onClick={() => setIsOpen(true)} className="text-white bg-blue-500 hover:bg-blue-600">
        <Plus strokeWidth={3} data-icon="inline-start" />
        Create
      </Button>

      <ItemCategoryForm isOpen={isOpen} onOpenChange={setIsOpen} initialData={null} />
    </div>
  );
}
