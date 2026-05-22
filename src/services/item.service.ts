import prisma from '@/lib/prisma';
import { ItemCategoryValue, ItemFormValue } from '@/schemas/item.schema';
import { codeGenerator } from '@/utils/codeGenerator';
import { getPagination } from '@/utils/pagination';
import { buildSearchWhere } from '@/utils/search';

// ========== ITEM CATEGORY SERVICE ==========
export const itemCategoryService = {
  async getAll() {
    return await prisma.itemCategory.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async create(data: ItemCategoryValue) {
    return await prisma.itemCategory.create({
      data,
    });
  },

  async update(id: string, data: ItemCategoryValue) {
    return await prisma.itemCategory.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return await prisma.itemCategory.delete({
      where: { id },
    });
  },
};

// ========== ITEM SERVICE ==========
export const itemService = {
  // GET All Item
  async getAll(search?: string, page: number = 1, limit: number = 10) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const { skip, take } = getPagination(safePage, safeLimit);

    const where = buildSearchWhere(search, ['name', 'sku']);

    const [items, total] = await Promise.all([
      prisma.item.findMany({
        where,
        skip,
        take,
        include: {
          category: { select: { name: true } },
          uom: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.item.count({ where }),
    ]);

    const serializedItems = items.map((item) => ({
      ...item,
      reorderPoint: Number(item.reorderPoint),
      minimumStock: Number(item.minimumStock),
    }));

    return {
      data: serializedItems,
      meta: {
        page,
        total,
        take,
        totalPages: Math.ceil(total / take),
      },
    };
  },

  // GET Item by ID
  async getById(id: string) {
    return await prisma.item.findUnique({
      where: { id },
      include: { category: true, uom: true },
    });
  },

  // GET Item by status Is Active
  async getActiveItems() {
    return await prisma.item.findMany({
      where: { isActive: true },
      include: { category: true, uom: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  // CREATE Item
  async create(data: ItemFormValue) {
    const lastEntry = await prisma.item.findFirst({
      where: {
        sku: {
          startsWith: 'ITEM-',
        },
      },
      orderBy: { sku: 'desc' },
      select: { sku: true },
    });

    const sku = codeGenerator({
      prefix: 'ITEM',
      digits: 3,
      lastEntry: lastEntry?.sku,
    });

    return prisma.item.create({
      data: {
        ...data,
        sku,
        isActive: true,
      },
    });
  },

  // UPDATE Item
  async update(id: string, data: ItemFormValue) {
    return await prisma.item.update({
      where: { id },
      data,
    });
  },
};
