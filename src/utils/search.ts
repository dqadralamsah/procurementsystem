import { Prisma } from '@/generated/prisma/client';

export function buildSearchWhere(
  search: string | undefined,
  fields: string[],
): Prisma.ItemWhereInput {
  if (!search) return {};

  return {
    OR: fields.map((field) => ({
      [field]: {
        contains: search,
        mode: 'insensitive',
      },
    })),
  };
}
