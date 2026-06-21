import prisma from '@/lib/prisma';
import { WarehouseValues } from '@/schemas/warehouse.schema';
import { codeGenerator } from '@/utils/codeGenerator';
import { getPagination } from '@/utils/pagination';
import { buildDynamicSearch } from '@/utils/search';

export const warehouseService = {
  // GET All
  async getAll(search?: string, page: number = 1, limit: number = 10) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const { skip, take } = getPagination(safePage, safeLimit);
    const where = buildDynamicSearch(search, ['name', 'warehouseCode']);

    const [data, total] = await Promise.all([
      prisma.warehouse.findMany({
        where,
        skip,
        take,
        orderBy: {
          warehouseCode: 'asc',
        },
      }),
      prisma.warehouse.count({ where }),
    ]);

    return {
      data,
      meta: {
        page: safePage,
        total,
        take,
        totalPages: Math.ceil(total / take),
      },
    };
  },

  // GET By ID
  async getById(id: string) {
    return await prisma.warehouse.findUnique({
      where: { id },
    });
  },

  // CREATE
  async create(data: Omit<WarehouseValues, 'warehouseCode'>) {
    const lastEntry = await prisma.warehouse.findFirst({
      where: {
        warehouseCode: {
          startsWith: 'WRHS-',
        },
      },
      orderBy: { warehouseCode: 'desc' },
      select: { warehouseCode: true },
    });

    const warehouseCode = codeGenerator({
      prefix: 'WRHS',
      digits: 3,
      lastEntry: lastEntry?.warehouseCode,
    });

    return prisma.warehouse.create({
      data: {
        ...data,
        warehouseCode,
        isActive: true,
      },
    });
  },

  // UPDATE
  async update(id: string, data: Partial<Omit<WarehouseValues, 'warehouseCode'>>) {
    return await prisma.warehouse.update({
      where: { id },
      data,
    });
  },
};
