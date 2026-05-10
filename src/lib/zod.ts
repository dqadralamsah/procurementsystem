import { z } from 'zod';

export const SignInZod = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const warehouseZod = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
});

export const supplierZod = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  contactPerson: z.string().optional(),
});

// Search & Pagination
export const pageSchema = z.coerce.number().min(1).catch(1);
