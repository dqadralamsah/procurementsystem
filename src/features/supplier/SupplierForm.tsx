'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SupplierType } from '@/types/supplier';
import { supplierSchema, SupplierInput } from '@/schemas/supplier.schema';
import { handleSupplierSubmit } from '@/actions/supplierAction';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import SubmitButton from '@/components/shared/SubmitButton';

type Props = {
  initialData: SupplierType | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SupplierForm({
  initialData,
  isOpen,
  onOpenChange,
}: Props) {
  const form = useForm<SupplierInput>({
    resolver: zodResolver(supplierSchema),
    defaultValues: initialData || {
      name: '',
      address: '',
      email: '',
      contact: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(
        initialData || {
          name: '',
          address: '',
          email: '',
          contact: '',
          isActive: true,
        },
      );
    }
  }, [isOpen, initialData, form]);

  const onSubmit = async (data: SupplierInput) => {
    const parsed = supplierSchema.parse(data);
    const res = await handleSupplierSubmit(initialData?.id || null, parsed);

    if (res.success) {
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-xl'>
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Supplier' : 'Create New Supplier'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 py-4'>
          {/* Name */}
          <div className='space-y-1'>
            <label className='text-sm font-medium'>Supplier Name</label>
            <input
              {...form.register('name')}
              className='w-full p-2 border rounded'
            />
            {form.formState.errors.name && (
              <p className='text-red-500 text-xs'>
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className='grid gap-2'>
            <label className='text-sm font-medium'>Address</label>
            <textarea
              {...form.register('address')}
              rows={3}
              className='resize-none p-2 border rounded'
            />
          </div>

          {/* Email */}
          <div className='space-y-1'>
            <label className='text-sm font-medium'>Email</label>
            <input
              {...form.register('email')}
              className='w-full p-2 border rounded'
            />
            {form.formState.errors.email && (
              <p className='text-red-500 text-xs'>
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Contact */}
          <div className='space-y-1'>
            <label className='text-sm font-medium'>Contact</label>
            <input
              {...form.register('contact')}
              className='w-full p-2 border rounded'
            />
            {form.formState.errors.contact && (
              <p className='text-red-500 text-xs'>
                {form.formState.errors.contact.message}
              </p>
            )}
          </div>

          <div className='flex items-center space-x-2'>
            <Controller
              control={form.control}
              name='isActive'
              render={({ field }) => (
                <Switch
                  checked={Boolean(field.value)}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <label className='font-medium'>
              {form.watch('isActive') ? 'Active' : 'Inactive'}
            </label>
          </div>

          <SubmitButton
            text={initialData ? 'Save Changes' : 'Create Supplier'}
            loadingText='Saving...'
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
