'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supplierPriceSchema, SupplierPriceForm } from '@/schemas/supplierPrice.schema';
import { SupplierType } from '@/types/supplier';
import { ItemType } from '@/types/item';
import { UomType } from '@/types/uom';
import { handleSupplierPriceSubmit } from '@/actions/supplierPriceAction';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import SubmitButton from '@/components/shared/SubmitButton';

type Props = {
  initialData?: SupplierPriceForm | null;
  fixedSupplierId?: string;
  fixedItemId?: string;
  suppliers?: SupplierType[];
  items?: ItemType[];
  uoms: UomType[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SupplierPriceFormDialog({
  initialData,
  fixedSupplierId,
  fixedItemId,
  suppliers,
  items,
  uoms,
  isOpen,
  onOpenChange,
}: Props) {
  const form = useForm({
    resolver: zodResolver(supplierPriceSchema),
    defaultValues: initialData || {
      supplierId: '',
      itemId: '',
      price: 0,
      conversionRatio: 0,
      minimumOrder: 0,
      effectiveDate: new Date(),
      endDate:  new Date()
    }
  })

  const onSubmit = async (data: SupplierPriceForm) => {
    const res = await handleSupplierPriceSubmit(data);

    if (res.success) {
      toast.success(res.message);
      form.reset();
      onOpenChange(false);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Supplier Price' : 'Add Supplier Price'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4 text-sm">
          {/* Supplier & Item Selection based on what is fixed */}
          <div className="grid grid-cols-2 gap-4">
            {!fixedSupplierId && suppliers && (
              <div className="space-y-1">
                <label className="font-medium">Supplier</label>
                <Controller
                  control={form.control}
                  name="supplierId"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.supplierId && (
                  <p className="text-red-500 text-xs">{form.formState.errors.supplierId.message}</p>
                )}
              </div>
            )}

            {!fixedItemId && items && (
              <div className="space-y-1">
                <label className="font-medium">Item</label>
                <Controller
                  control={form.control}
                  name="itemId"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Item" />
                      </SelectTrigger>
                      <SelectContent>
                        {items.map((i) => (
                          <SelectItem key={i.id} value={i.id}>
                            {i.name} ({i.sku})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.itemId && (
                  <p className="text-red-500 text-xs">{form.formState.errors.itemId.message}</p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium">Price</label>
              <Input
                type="number"
                step="0.01"
                {...form.register('price')}
              />
              {form.formState.errors.price && (
                <p className="text-red-500 text-xs">{form.formState.errors.price.message}</p>
              )}
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
              {form.formState.errors.uomId && (
                <p className="text-red-500 text-xs">{form.formState.errors.uomId.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium">Conversion Ratio</label>
              <Input
                type="number"
                step="0.01"
                {...form.register('conversionRatio')}
              />
              {form.formState.errors.conversionRatio && (
                <p className="text-red-500 text-xs">{form.formState.errors.conversionRatio.message}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <label className="font-medium">Minimum Order</label>
              <Input
                type="number"
                step="0.01"
                {...form.register('minimumOrder')}
              />
              {form.formState.errors.minimumOrder && (
                <p className="text-red-500 text-xs">{form.formState.errors.minimumOrder.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium">Effective Date</label>
              <Input
                type="date"
                {...form.register('effectiveDate')}
                // HTML date input expects YYYY-MM-DD
                onChange={(e) => form.setValue('effectiveDate', new Date(e.target.value))}
              />
              {form.formState.errors.effectiveDate && (
                <p className="text-red-500 text-xs">{form.formState.errors.effectiveDate.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="font-medium">End Date (Optional)</label>
              <Input
                type="date"
                {...form.register('endDate')}
                onChange={(e) => form.setValue('endDate', e.target.value ? new Date(e.target.value) : null)}
              />
              {form.formState.errors.endDate && (
                <p className="text-red-500 text-xs">{form.formState.errors.endDate.message}</p>
              )}
            </div>
          </div>

          <SubmitButton
            text={initialData ? "Save Changes" : "Add Price"}
            loadingText="Saving..."
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
