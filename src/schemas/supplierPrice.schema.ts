import { Prisma } from '@/generated/prisma/client';
import { z } from 'zod';

export const supplierPriceSchema = z.object({
  supplierId: z.string().uuid({ message: 'Supplier is required' }),
  itemId: z.string().uuid({ message: 'Item is required' }),
  price: z.coerce.number().min(0, { message: 'Price must be greater than or equal to 0' }),
  uomId: z.string().uuid({ message: 'UoM is required' }),
  conversionRatio: z.coerce.number().min(0, { message: 'Conversion Ratio must be greater than or equal to 0' }),
  minimumOrder: z.coerce.number().min(0, { message: 'Minimum Order must be greater than or equal to 0' }),
  effectiveDate: z.coerce.date({ error: 'Effective Date is required' }),
  endDate: z.coerce.date().optional().nullable(),
});

export type SupplierPriceForm = z.infer<typeof supplierPriceSchema>;
export type SupplierPriceValue = Prisma.SupplierPricesUncheckedCreateInput;
