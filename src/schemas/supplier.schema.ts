import { z } from 'zod';

export const supplierSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z
    .string()
    .optional()
    .transform((val) => (val === '' ? null : val))
    .nullable(),
  email: z
    .string()
    .email('Invalid email format')
    .optional()
    .transform((val) => (val === '' ? null : val))
    .nullable(),
  contact: z
    .string()
    .optional()
    .transform((val) => (val === '' ? null : val))
    .nullable(),
  isActive: z.boolean().default(true),
});

export type SupplierInput = z.input<typeof supplierSchema>;
export type SupplierValues = z.infer<typeof supplierSchema>;
