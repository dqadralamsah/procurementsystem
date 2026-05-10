'use client';

import { UomType, UomCategoryType } from '@/types/uom';
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
  onSubmit: (formData: FormData) => void;
};

export default function UomForm({ initialData, categories, onSubmit }: Props) {
  return (
    <form action={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Nama Unit
        </label>
        <input
          name="name"
          defaultValue={initialData?.name}
          placeholder="e.g. Kilogram"
          className="w-full border rounded p-2 mt-1"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="categoryId">Category</label>

        <Select name="categoryId" defaultValue={initialData?.categoryId} required>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Kategori" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end pt-4">
        <SubmitButton text={initialData ? 'Update' : 'Simpan'} />
      </div>
    </form>
  );
}
