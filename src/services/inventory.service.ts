import prisma from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';
import { PaginationResponse } from '@/lib/type';
import { InventoryType } from '@/types/inventory';
import { getPagination } from '@/utils/pagination';
import { buildSearchWhere } from '@/utils/search';

// ========== INVENTORY SERVICE ==========
export const inventoryService = {
  // GET All

  // GET By ID

  // GET Paginated & Filtered Inventories for a Warehouse
  async getByWarehouseId(
    warehouseId: string,
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginationResponse<InventoryType>> {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const { skip, take } = getPagination(safePage, safeLimit);
    const itemSearch = buildSearchWhere(search, ['name', 'sku']);

    const where: Prisma.InventoryWhereInput = {
      warehouseId,
      item: search ? itemSearch : undefined,
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
