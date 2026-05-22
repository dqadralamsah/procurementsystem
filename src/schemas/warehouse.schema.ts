import { z } from 'zod';

export const warehouseSchema = z.object({
  name: z.string().min(3, { message: 'Name Required' }),
  address: z.string().min(5, { message: 'Address Required' }),
  description: z
    .string()
    .transform((val) => (val === '' ? null : val))
    .optional()
    .nullable(),
  isActive: z.boolean().default(true),
});

export type WarehouseInput = z.input<typeof warehouseSchema>;
export type WarehouseValues = z.infer<typeof warehouseSchema>;
