import { Prisma } from '@/generated/prisma/client';
import { z } from 'zod';

export const warehouseSchema = z.object({
  name: z.string().min(3, { message: 'Name Required' }),
  address: z.string().min(5, { message: 'Address Required' }),
  description: z
    .string()
    .optional()
    .transform((val) => (val === '' ? null : val))
    .nullable(),
  isActive: z.boolean().default(true),
});

export type WarehouseInput = z.infer<typeof warehouseSchema>;
export type WarehouseValues = Prisma.WarehouseUncheckedCreateInput;
