'use server';

import { revalidatePath } from 'next/cache';
import { warehouseService } from '@/services/warehouse.service';

export async function handleWarehouseSubmit(formData: FormData) {
  const id = formData.get('id') as string | null;

  const name = formData.get('name') as string;
  const address = formData.get('address') as string;
  const description = (formData.get('description') as string) || undefined;

  try {
    if (id) {
      const isActive = formData.get('isActive') === 'true';

      await warehouseService.update(id, {
        name,
        address,
        description,
        isActive,
      });
    } else {
      await warehouseService.create({
        name,
        address,
        description,
      });
    }

    revalidatePath('/warehouse');
    return { success: true };
  } catch (error) {
    console.error('Action Error:', error);
    return { success: false, message: 'System error' };
  }
}
