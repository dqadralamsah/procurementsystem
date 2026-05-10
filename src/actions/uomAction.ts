'use server';

import { revalidatePath } from 'next/cache';
import { uomCategoryService, uomService } from '@/services/uom.service';
import { UomCategorySchema, UomSchema, UomCategoryValue, UomFormValue } from '@/schemas/uom.schema';

// ========== UOM Categories Action ==========
export async function handleCategorySubmit(id: string | null, data: UomCategoryValue) {
  try {
    const validated = UomCategorySchema.parse(data);

    if (id && validated) {
      await uomCategoryService.update(id, validated);
    } else {
      await uomCategoryService.create(validated);
    }

    revalidatePath('/settings/uom-configuration');
    return { success: true, message: id ? 'Updated Data!' : 'Created Data!' };
  } catch (error) {
    console.log('Action Error:', error);
    return { success: false, message: 'System Error' };
  }
}

export async function handleCategoryDelete(id: string) {
  try {
    await uomCategoryService.delete(id);
    revalidatePath('/settings/uom-configuration');
    return { success: true, message: 'Deleted Data!' };
  } catch (error) {
    return { success: false, message: 'Failed to Delete Data' };
  }
}

// ========== UOM Action ==========
export async function handleUomSubmit(id: string | null, data: UomFormValue) {
  try {
    const validated = UomSchema.parse(data);

    if (id && validated) {
      await uomService.update(id, validated);
    } else {
      await uomService.create(validated);
    }

    revalidatePath('/settings/uom-configuration');
    return { success: true, message: id ? 'Updated Data!' : 'Created Data!' };
  } catch (error) {
    console.log('Action Error:', error);
    return { success: false, message: 'System Error' };
  }
}

export async function handleUomDelete(id: string) {
  try {
    await uomCategoryService.delete(id);
    revalidatePath('/settings/uom-configuration');
    return { success: true, message: 'Deleted Data!' };
  } catch (error) {
    return { success: false, message: 'Failed to Delete Data' };
  }
}
