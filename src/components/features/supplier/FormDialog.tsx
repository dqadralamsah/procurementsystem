'use client';

import { SupplierType } from '@/types/supplier';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { handleSupplierSubmit } from '@/actions/supplierAction';
import SupplierForm from './SupplierForm';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: SupplierType | null;
};

export default function FormDialog({ isOpen, onOpenChange, initialData }: Props) {
  const handleSubmit = async (FormData: FormData) => {
    const result = await handleSupplierSubmit(FormData);

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
          <DialogTitle>{initialData ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Make changes to warehouse information here. Click save when you're done."
              : 'Fill in the details to create a new warehouse entry.'}
          </DialogDescription>
        </DialogHeader>
        <SupplierForm initialData={initialData} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
