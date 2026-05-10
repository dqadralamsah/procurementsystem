'use client';

import { UomCategoryType } from '@/types/uom';
import { handleCategorySubmit } from '@/actions/uomAction';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import UomCategoryForm from './UomCategoryForm';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: UomCategoryType | null;
};

export default function UomCategoryDialog({ isOpen, onOpenChange, initialData }: Props) {
  const handleSubmit = async (formData: FormData) => {
    const id = initialData?.id || null;
    const result = await handleCategorySubmit(id, formData);

    if (result.success) {
      onOpenChange(false);
    } else {
      alert(result.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Item Category' : 'Add Item Category'}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Make changes to uom categories information here. Click save when you're done."
              : 'Fill in the details to create a new warehouse category.'}
          </DialogDescription>
        </DialogHeader>

        <UomCategoryForm initialData={initialData} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
