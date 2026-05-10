'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UomType, UomCategoryType } from '@/types/uom';
import { UomSchema, UomFormInput } from '@/schemas/uom.schema';
import { handleUomSubmit } from '@/actions/uomAction';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SubmitButton from '@/components/shared/SubmitButton';

type Props = {
  initialData: UomType | null;
  categories: UomCategoryType[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function UomForm({ initialData, categories, isOpen, onOpenChange }: Props) {
  const form = useForm<UomFormInput>({
    resolver: zodResolver(UomSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      categoryId: initialData?.categoryId ?? '',
    },
  });

  const onSubmit = async (data: UomFormInput) => {
    const parsed = UomSchema.parse(data);
    const res = await handleUomSubmit(initialData?.id || null, parsed);

    if (res.success) {
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Uom' : 'Create New Uom'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4 text-sm">
          <div className="space-y-1">
            <label className="font-medium">Nama Uom</label>
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

          <div className="space-y-1">
            <label className="font-mmedium">Category</label>
            <Controller
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <SubmitButton
            text={initialData ? 'Save Changes' : 'Create Uom'}
            loadingText="Saving..."
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
