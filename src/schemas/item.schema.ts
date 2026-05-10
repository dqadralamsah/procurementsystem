import { z } from 'zod';

// ========== Item Category schema ==========
export const itemCategorySchema = z.object({
  name: z.string().min(1, 'Name Required'),
  description: z.string().optional().nullable(),
});

export type ItemCategoryInput = z.input<typeof itemCategorySchema>;
export type ItemCategoryValue = z.infer<typeof itemCategorySchema>;

// ========== Item Schema ==========
export const itemSchema = z.object({
  name: z.string().min(1, 'Name required'),
  description: z.string().optional().nullable(),
  categoryId: z.string().uuid('Select category'),
  uomId: z.string().uuid('Select one'),
  reorderPoint: z.coerce.number().min(0, 'Minimum 0'),
  minimumStock: z.coerce.number().min(0, 'Minimum 0'),
  isActive: z.boolean().default(true),
});

export type ItemFormInput = z.input<typeof itemSchema>;
export type ItemFormValue = z.infer<typeof itemSchema>;
