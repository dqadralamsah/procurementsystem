'use client';

import { UomType, UomCategoryType } from '@/types/uom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { handleUomSubmit } from '@/actions/uomAction';
import UomForm from './UomForm';

type Props = {
  initialData: UomType | null;
  categories: UomCategoryType[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function UomDialog({ initialData, categories, isOpen, onOpenChange }: Props) {
  const formAction = async (formData: FormData) => {
    const res = await handleUomSubmit(initialData?.id || null, formData);
    if (res.success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit UOM' : 'Create UOM'}</DialogTitle>
        </DialogHeader>
        <UomForm initialData={initialData} categories={categories} onSubmit={formAction} />
      </DialogContent>
    </Dialog>
  );
}
