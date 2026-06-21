import prisma from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';
import { getPagination } from '@/utils/pagination';
import { buildDynamicSearch } from '@/utils/search';
import { SupplierPriceValue } from '@/schemas/supplierPrice.schema';

export const supplierPriceService = {
  // GET Items by Supplier ID
  async getBySupplierId(
    supplierId: string,
    search?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const { skip, take } = getPagination(safePage, safeLimit);
    const itemSearch = buildDynamicSearch(search,['name','sku']);

    const where: Prisma.SupplierPricesWhereInput = {
      supplierId,
      item:search ? itemSearch : undefined,
    };

    const [data, total] = await Promise.all([
      prisma.supplierPrices.findMany({
        where,
        skip,
        take,
        include: {
          item: {
            include: {
              category: true,
              uom: true,
            },
          },
          uom: true,
        },
        orderBy: {
          item: {
            sku: 'asc',
          },
        },
      }),
      prisma.supplierPrices.count({ where }),
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

  // GET Suppliers by Item ID
  async getByItemId(
    itemId: string,
    search?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const { skip, take } = getPagination(safePage, safeLimit);
    const supplierSearch = buildDynamicSearch(search, ['name', 'supplierCode']);

    const where: Prisma.SupplierPricesWhereInput = {
      itemId,
      supplier: search ? supplierSearch : undefined,
    };

    const [data, total] = await Promise.all([
      prisma.supplierPrices.findMany({
        where,
        skip,
        take,
        include: {
          supplier: true,
          uom: true,
        },
        orderBy: {
          supplier: {
            name: 'asc',
          },
        },
      }),
      prisma.supplierPrices.count({ where }),
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

  // CREATE Supplier Price
  async create(data: SupplierPriceValue) {
    return await prisma.supplierPrices.create({
      data,
    });
  },
};
