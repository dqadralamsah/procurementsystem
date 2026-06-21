'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Warehouse } from '@/generated/prisma/client';
import { warehouseSchema, WarehouseInput } from '@/schemas/warehouse.schema';
import { handleWarehouseSubmit } from '@/actions/warehouseAction';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import SubmitButton from '@/components/shared/SubmitButton';

type Props = {
  initialData: Warehouse | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WarehouseForm({ initialData, isOpen, onOpenChange }: Props) {
  const form = useForm({
    resolver: zodResolver(warehouseSchema),
    defaultValues: initialData || {
      name: '',
      address: '',
      description: '',
      isActive: true,
    },
  });

  const onSubmit = async (data: WarehouseInput) => {
    const res = await handleWarehouseSubmit(initialData?.id|| null, data);

    if (res.success) {
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Warehouse' : 'Create New Warehouse'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          {/* Name & Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Warehouse Name</label>
            <input {...form.register('name')} className="w-full p-2 border rounded " />
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
            )}
          </div>

          {/* Adrress */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Address</label>
            <textarea
              {...form.register('address')}
              rows={3}
              className="resize-none p-2  border rounded"
            />
            {form.formState.errors.address && (
              <p className="text-red-500 text-xs">{form.formState.errors.address.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...form.register('description')}
              rows={3}
              className="resize-none p-2  border rounded"
            />
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
            text={initialData ? 'Save Changes' : 'Create Warehouse'}
            loadingText="Saving..."
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
