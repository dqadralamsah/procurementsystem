'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ItemCategoryType } from '@/types/item';
import { itemCategorySchema, ItemCategoryInput } from '@/schemas/item.schema';
import { handleCategorySubmit } from '@/actions/itemAction';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SubmitButton from '@/components/shared/SubmitButton';

type Props = {
  initialData: ItemCategoryType | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ItemCategoryForm({ initialData, isOpen, onOpenChange }: Props) {
  const form = useForm<ItemCategoryInput>({
    resolver: zodResolver(itemCategorySchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
    },
  });

  const onSubmit = async (data: ItemCategoryInput) => {
    const parsed = itemCategorySchema.parse(data);
    const res = await handleCategorySubmit(initialData?.id || null, parsed);

    if (res.success) {
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Category' : 'Create New Category'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-4 text-sm space-y-4">
          <div className="space-y-1">
            <label className="font-medium">Nama Kategori</label>
            <input {...form.register('name')} className="w-full border rounded p-2" />
            {form.formState.errors.name && (
              <p className='text-red-500 text-xs"'>{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Deskripsi</label>
            <textarea
              {...form.register('description')}
              className="w-full border rounded p-2"
              rows={3}
            />
          </div>

          <SubmitButton
            text={initialData ? 'Save Data' : 'Create Category'}
            loadingText="Saving..."
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
