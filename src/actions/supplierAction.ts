'use server';

import { revalidatePath } from 'next/cache';
import { supplierService } from '@/services/supplier.service';

export async function handleSupplierSubmit(formData: FormData) {
  const id = formData.get('id') as string | null;

  const name = formData.get('name') as string;
  const email = formData.get('email') as string | null;
  const phone = formData.get('phone') as string | null;
  const address = formData.get('address') as string | null;
  const contactPerson = formData.get('contacPerson') as string | null;

  try {
    if (id) {
      const isActive = formData.get('isActive') === 'true';

      await supplierService.update(id, {
        name,
        email,
        phone,
        address,
        contactPerson,
        isActive,
      });
    } else {
      await supplierService.create({
        name,
        email,
        phone,
        address,
        contactPerson,
      });
    }

    revalidatePath('/supplier');
    return { success: true };
  } catch (error) {
    console.log('Action Error:', error);
    return { success: false, message: 'System Error' };
  }
}
