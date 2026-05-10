'use client';

import { SupplierType } from '@/types/supplier';

type Props = {
  initialData: SupplierType | null;
  onSubmit: (FormData: FormData) => void;
};

export default function SupplierForm({ initialData, onSubmit }: Props) {
  const isEdit = !!initialData;

  return (
    <form action={onSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
      <input type="hidden" name="id" value={initialData?.id} />

      <div>
        <label className="block text-sm font-medium">Nama Supplier</label>
        <input
          name="name"
          defaultValue={initialData?.name}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email (Opsional)</label>
        <input
          name="email"
          type="email"
          defaultValue={initialData?.email ?? ''}
          placeholder="email@perusahaan.com"
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">No. Telepon (Opsional)</label>
        <input
          name="phone"
          defaultValue={initialData?.phone ?? ''}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Alamat (Opsional)</label>
        <textarea
          name="address"
          defaultValue={initialData?.address ?? ''}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Kontak Person</label>
        <input
          name="contactPerson"
          defaultValue={initialData?.contactPerson ?? ''}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={initialData?.isActive}
          id="isActive"
        />
        <label htmlFor="isActive" className="text-sm font-medium">
          Supplier Aktif
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {isEdit ? 'Update Supplier' : 'Create Supplier'}
      </button>
    </form>
  );
}
