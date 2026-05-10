import prisma from '@/lib/prisma';
import { codeGenerator } from '@/utils/codeGenerator';

export const warehouseService = {
  async getAll() {
    return await prisma.warehouse.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async getById(id: string) {
    return await prisma.warehouse.findUnique({
      where: { id },
    });
  },

  async create(data: { name: string; address: string; description?: string }) {
    const lastEntry = await prisma.warehouse.findFirst({
      where: {
        warehouseCode: {
          startsWith: 'WRHAS-',
        },
      },
      orderBy: {
        warehouseCode: 'desc',
      },
      select: {
        warehouseCode: true,
      },
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

  async update(
    id: string,
    data: { name?: string; address?: string; description?: string | null; isActive: boolean },
  ) {
    return await prisma.warehouse.update({
      where: { id },
      data,
    });
  },
};
