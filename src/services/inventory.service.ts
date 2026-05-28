import prisma from '@/lib/prisma';
import { getPagination } from '@/utils/pagination';
import { PaginatedInventoryResponse } from '@/types/inventory';
import { Prisma } from '@/generated/prisma/client';

export const inventoryService = {
  // GET Paginated & Filtered Inventories for a Warehouse
  async getInventoriesByWarehouseId(
    warehouseId: string,
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedInventoryResponse> {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const { skip, take } = getPagination(safePage, safeLimit);

    const where: Prisma.InventoryWhereInput = {
      warehouseId,
      ...(search
        ? {
            OR: [
              {
                item: {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                item: {
                  sku: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
            ],
          }
        : {}),
    };

    const [inventories, total] = await Promise.all([
      prisma.inventory.findMany({
        where,
        skip,
        take,
        include: {
          item: {
            include: {
              uom: true,
            },
          },
        },
        orderBy: {
          item: {
            sku: 'asc',
          },
        },
      }),
      prisma.inventory.count({ where }),
    ]);

    // Serialize Decimal types to number for the client
    const serializedData = inventories.map((inv) => ({
      ...inv,
      quantity: Number(inv.quantity),
      reorderPoint: Number(inv.reorderPoint),
      minimumStock: Number(inv.minimumStock),
      item: {
        id: inv.item.id,
        sku: inv.item.sku,
        name: inv.item.name,
        uom: {
          id: inv.item.uom.id,
          name: inv.item.uom.name,
        },
      },
    }));

    return {
      data: serializedData,
      meta: {
        page: safePage,
        total,
        take: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    };
  },
};
