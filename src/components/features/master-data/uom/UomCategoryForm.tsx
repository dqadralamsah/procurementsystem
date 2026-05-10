'use client';

import { UomCategoryInput } from '@/types/uom';
import SubmitButton from '@/components/shared/SubmitButton';

type Props = {
  initialData: UomCategoryInput | null;
  onSubmit: (FormData: FormData) => void;
};

export default function UomCategoryForm({ initialData, onSubmit }: Props) {
  const isEdit = !!initialData;

  return (
    <form action={onSubmit} className="space-y-4 py-4">
      <div>
        <label className="block text-sm font-medium">Nama Kategori</label>
        <input
          name="name"
          defaultValue={initialData?.name}
          className="w-full border rounded p-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Deskripsi</label>
        <textarea
          name="description"
          defaultValue={initialData?.description}
          className="w-full border rounded p-2 mt-1"
          rows={3}
        />
      </div>

      <div className="pt-2">
        <SubmitButton text={isEdit ? 'Save' : 'Create'} loadingText="Menyimpan..." />
      </div>
    </form>
  );
}
