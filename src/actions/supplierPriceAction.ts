'use server';

import { revalidatePath } from 'next/cache';
import { supplierPriceSchema, SupplierPriceForm } from '@/schemas/supplierPrice.schema';
import { supplierPriceService } from '@/services/supplierprice.service';

export async function handleSupplierPriceSubmit(data: SupplierPriceForm) {
  try {
    const validated = supplierPriceSchema.parse(data);

    await supplierPriceService.create(validated);

    // Revalidate paths to reflect new prices
    revalidatePath(`/supplier/${validated.supplierId}`);
    revalidatePath(`/item-catalog/${validated.itemId}`);

    return { success: true, message: 'Created Supplier Price Data!' };
  } catch (error: any) {
    console.error('Submit Error:', error);
    
    // Handle Prisma unique constraint error
    if (error.code === 'P2002') {
      return { success: false, message: 'Price for this Supplier, Item, and Effective Date already exists.' };
    }
    
    return { success: false, message: 'System Error' };
  }
}
