'use client';

import { WarehouseType } from '@/types/warehouse';

type Props = {
  initialData: WarehouseType | null;
  onSubmit: (FormData: FormData) => void;
};

export default function WarehouseForm({ initialData, onSubmit }: Props) {
  const isEdit = !!initialData;

  return (
    <form action={onSubmit} className="space-y-4 py-4">
      {isEdit && <input type="hidden" name="id" value={initialData.id} />}

      <div className="grid gap-2">
        <label className="text-sm font-medium">Warehouse Code</label>
        <input
          name="warehouseCode"
          value={initialData?.warehouseCode || 'Auto Generated'}
          readOnly
          className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-mono"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Name</label>
        <input
          name="name"
          defaultValue={initialData?.name}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Address</label>
        <textarea
          name="address"
          defaultValue={initialData?.address}
          className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          defaultValue={initialData?.description || ''}
          className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          value="true"
          defaultChecked={initialData ? initialData.isActive : true}
        />
        <label className="text-sm">Active</label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {isEdit ? 'Update Warehouse' : 'Create Warehouse'}
      </button>
    </form>
  );
}
