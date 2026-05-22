'use server';

import { revalidatePath } from 'next/cache';
import { warehouseSchema, WarehouseValues } from '@/schemas/warehouse.schema';
import { warehouseService } from '@/services/warehouse.service';

// Handle Submit
export async function handleWarehouseSubmit(
  id: string | null,
  data: WarehouseValues,
) {
  try {
    const validated = warehouseSchema.parse(data);

    if (id && validated) {
      await warehouseService.update(id, validated);
    } else {
      await warehouseService.create(validated);
    }

    revalidatePath('/settings/warehouse');
    return { success: true, message: id ? 'Updated Data!' : 'Created Data!' };
  } catch (error) {
    console.error('Submit Error:', error);
    return { success: false, message: 'System error' };
  }
}

// Hanlde Delete
