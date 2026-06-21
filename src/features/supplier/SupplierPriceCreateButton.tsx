'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SupplierPriceFormDialog from './SupplierPriceFormDialog';
import { SupplierType } from '@/types/supplier';
import { ItemType } from '@/types/item';
import { UomType } from '@/types/uom';

type Props = {
  fixedSupplierId?: string;
  fixedItemId?: string;
  suppliers?: SupplierType[];
  items?: ItemType[];
  uoms: UomType[];
};

export default function SupplierPriceCreateButton({
  fixedSupplierId,
  fixedItemId,
  suppliers,
  items,
  uoms,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="flex items-center gap-2">
        <Plus className="size-4" />
        Add Price
      </Button>

      {isOpen && (
        <SupplierPriceFormDialog
          fixedSupplierId={fixedSupplierId}
          fixedItemId={fixedItemId}
          suppliers={suppliers}
          items={items}
          uoms={uoms}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        />
      )}
    </>
  );
}
