import prisma from '@/lib/prisma';
import { WarehouseValues } from '@/schemas/warehouse.schema';
import { codeGenerator } from '@/utils/codeGenerator';

export const warehouseService = {
  // GET All
  async getAll() {
    return await prisma.warehouse.findMany({
      orderBy: {
        warehouseCode: 'asc',
      },
    });
  },

  // GET By ID
  async getById(id: string) {
    return await prisma.warehouse.findUnique({
      where: { id },
      include: {
        _count: {
          select: { inventories: true },
        },
        inventories: {
          include: { item: true },
        },
      },
    });
  },

  // CREATE
  async create(data: WarehouseValues) {
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
  async update(id: string, data: WarehouseValues) {
    return await prisma.warehouse.update({
      where: { id },
      data,
    });
  },
};
