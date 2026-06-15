/**
 * Fungsi pencarian dinamis untuk semua tabel Prisma.
 * @param query Kata kunci pencarian
 * @param fields Array berisi nama kolom yang ingin dicari (misal: ['name', 'email'])
 */
export function buildDynamicSearch(
  query: string | undefined,
  fields: string[],
) {
  if (!query || query.trim() === '') return {};

  return {
    OR: fields.map((field) => ({
      [field]: {
        contains: query,
        mode: 'insensitive',
      },
    })),
  };
}
