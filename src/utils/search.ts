// import { Prisma } from '@/generated/prisma/client';

// export function buildSearchWhere(
//   search: string | undefined,
//   fields: string[],
// ): Prisma.ItemWhereInput {
//   if (!search) return {};

//   return {
//     OR: fields.map((field) => ({
//       [field]: {
//         contains: search,
//         mode: 'insensitive',
//       },
//     })),
//   };
// }

import { Prisma } from '@/generated/prisma/client'; // Sesuaikan jika kamu pakai custom output path

type GenericSearchWhere<T> =
  | {
      OR: Array<{
        [K in keyof T]?: {
          contains: string;
          mode: Prisma.QueryMode;
        };
      }>;
    }
  | Record<string, never>;

export function buildSearchWhere<T>(
  search: string | undefined,
  fields: (keyof T & string)[],
): GenericSearchWhere<T> {
  if (!search) return {};

  return {
    OR: fields.map(
      (field) =>
        ({
          [field]: {
            contains: search,
            mode: 'insensitive',
          },
        }) as { [K in keyof T]?: { contains: string; mode: Prisma.QueryMode } },
    ),
    // Type Assertion di atas ( baris 'as { [K in keyof T]?: ... }' ) mengunci kecocokan tipe data
  };
}
