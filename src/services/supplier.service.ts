import prisma from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';
import { codeGenerator } from '@/utils/codeGenerator';
import { SupplierValues } from '@/schemas/supplier.schema';
import { getPagination } from '@/utils/pagination';
import { buildDynamicSearch } from '@/utils/search';

export const supplierService = {
  // GET All
  async getAll(search?: string, page: number = 1, limit: number = 10) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const { skip, take } = getPagination(safePage, safeLimit);

    const where = buildDynamicSearch(search, ['name', 'supplierCode']);

    const [data, total] = await Promise.all([
      prisma.supplier.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.supplier.count({ where }),
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
    return await prisma.supplier.findUnique({
      where: { id },
    });
  },

  // CREATE
  async create(data: SupplierValues) {
    const lastEntry = await prisma.supplier.findFirst({
      where: {
        supplierCode: {
          startsWith: 'SPPLR-',
        },
      },
      orderBy: {
        supplierCode: 'desc',
      },
      select: {
        supplierCode: true,
      },
    });

    const supplierCode = codeGenerator({
      prefix: 'SPPLR',
      digits: 3,
      lastEntry: lastEntry?.supplierCode,
    });

    return prisma.supplier.create({
      data: {
        ...data,
        supplierCode,
        isActive: true,
      },
    });
  },

  // UPDATE
  async update(id: string, data: SupplierValues) {
    return await prisma.supplier.update({
      where: { id },
      data,
    });
  },
};
