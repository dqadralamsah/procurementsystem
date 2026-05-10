'use server';

import { revalidatePath } from 'next/cache';
import {
  itemCategorySchema,
  itemSchema,
  ItemCategoryValue,
  ItemFormValue,
} from '@/schemas/item.schema';
import { itemCategoryService } from '@/services/item.service';
import { itemService } from '@/services/item.service';

// ========== Handle Item Category ==========
export async function handleCategorySubmit(id: string | null, data: ItemCategoryValue) {
  try {
    const validated = itemCategorySchema.parse(data);

    if (id && validated) {
      await itemCategoryService.update(id, validated);
    } else {
      await itemCategoryService.create(validated);
    }

    revalidatePath('/item-categories');

    return { success: true, message: id ? 'Updated Data!' : 'Created Data!' };
  } catch (error) {
    console.error('Submit Error:', error);
    return { success: false, message: 'System Error' };
  }
}

export async function handleCategoryDelete(id: string) {
  try {
    await itemCategoryService.delete(id);
    revalidatePath('/settings/item-category');
    return { success: true, message: 'Deleted Data' };
  } catch (error) {
    return { success: false, message: 'Failed to Delete Data' };
  }
}

// ========== Handle Item ==========
export async function handleItemSubmit(id: string | null, data: ItemFormValue) {
  try {
    const validated = itemSchema.parse(data);

    if (id && validated) {
      await itemService.update(id, validated);
    } else {
      await itemService.create(validated);
    }

    revalidatePath('/item-catalog');

    return { success: true, message: id ? 'Update Data!' : 'Create Data!' };
  } catch (error) {
    console.error('Submit Error', error);
    return { success: false, message: 'System Error' };
  }
}
