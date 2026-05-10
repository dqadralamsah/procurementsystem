'use client';

import { WarehouseType } from '@/types/warehouse';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { handleWarehouseSubmit } from '@/actions/warehouseAction';
import WarehouseForm from './WarehouseForm';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: WarehouseType | null;
};

export default function FormDialog({ isOpen, onOpenChange, initialData }: Props) {
  const handleSubmit = async (FormData: FormData) => {
    const result = await handleWarehouseSubmit(FormData);

    if (result.success) {
      onOpenChange(false);
    } else {
      alert(result.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Warehouse' : 'Add Warehouse'}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Make changes to warehouse information here. Click save when you're done."
              : 'Fill in the details to create a new warehouse entry.'}
          </DialogDescription>
        </DialogHeader>
        <WarehouseForm initialData={initialData} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
