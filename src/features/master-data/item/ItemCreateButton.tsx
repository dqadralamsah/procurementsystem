'use client';

import { useState } from 'react';
import { ItemCategoryType } from '@/types/item';
import { UomType } from '@/types/uom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ItemForm from './ItemForm';

type Props = {
  categories: ItemCategoryType[];
  uoms: UomType[];
};

export default function ItemCreateButton({ categories, uoms }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center gap-2">
      <Button onClick={() => setIsOpen(true)} className="text-white bg-blue-500 hover:bg-blue-600">
        <Plus strokeWidth={3} data-icon="inline-start" />
        Create
      </Button>

      <ItemForm
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        initialData={null}
        categories={categories}
        uoms={uoms}
      />
    </div>
  );
}
