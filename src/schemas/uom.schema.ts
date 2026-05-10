import { z } from 'zod';

// ========== Uom Category Schema ==========
export const UomCategorySchema = z.object({
  name: z.string().min(1, 'Name Required'),
  description: z.string().optional().nullable(),
});

export type UomCategoryInput = z.input<typeof UomCategorySchema>;
export type UomCategoryValue = z.infer<typeof UomCategorySchema>;

// ========== Uom Schema ==========
export const UomSchema = z.object({
  name: z.string().min(1, 'Name required'),
  description: z.string().optional().nullable(),
  categoryId: z.string().uuid('Select category'),
});

export type UomFormInput = z.input<typeof UomSchema>;
export type UomFormValue = z.infer<typeof UomSchema>;
