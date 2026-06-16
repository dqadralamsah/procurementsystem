'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ItemType, ItemCategoryType } from '@/types/item';
import { UomType } from '@/types/uom';
import { itemSchema, ItemFormInput } from '@/schemas/item.schema';
import { handleItemSubmit } from '@/actions/itemAction';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import SubmitButton from '@/components/shared/SubmitButton';

type Props = {
  initialData: ItemType | null;
  categories: ItemCategoryType[];
  uoms: UomType[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ItemForm({ initialData, categories, uoms, isOpen, onOpenChange }: Props) {
  const form = useForm<ItemFormInput>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      categoryId: initialData?.categoryId ?? '',
      uomId: initialData?.uomId ?? '',
      isActive: initialData?.isActive ?? true,
    },
  });

  const onSubmit = async (data: ItemFormInput) => {
    const parsed = itemSchema.parse(data);
    const res = await handleItemSubmit(initialData?.id || null, parsed);

    if (res.success) {
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Item' : 'Create New Item'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4 text-sm">
          {/* Nama & Deskripsi */}
          <div className="space-y-1">
            <label className="font-medium">Item Name</label>
            <input {...form.register('name')} className="w-full border rounded p-2" />
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
            )}
          </div>

          {/* Kategori & UoM (Gunakan Controller Select seperti kode Anda sebelumnya) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium">Category</label>
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
            <div className="space-y-1">
              <label className="font-medium">UoM</label>
              <Controller
                control={form.control}
                name="uomId"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select UoM" />
                    </SelectTrigger>
                    <SelectContent>
                      {uoms.map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>



          <div className="flex items-center gap-3 py-2 border-t">
            <Controller
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <label className="font-medium">{form.watch('isActive') ? 'Active' : 'Inactive'}</label>
          </div>

          <SubmitButton
            text={initialData ? 'Save Changes' : 'Create Item'}
            loadingText="Saving..."
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
