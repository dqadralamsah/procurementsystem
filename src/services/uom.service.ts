import prisma from '@/lib/prisma';
import { UomCategoryValue, UomFormValue } from '@/schemas/uom.schema';

export const uomCategoryService = {
  async getAll() {
    return await prisma.uomCategory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async getById(id: string) {
    return await prisma.uomCategory.findUnique({
      where: { id },
    });
  },

  async create(data: UomCategoryValue) {
    return await prisma.uomCategory.create({ data });
  },

  async update(id: string, data: UomCategoryValue) {
    return await prisma.uomCategory.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return await prisma.uomCategory.delete({
      where: { id },
    });
  },
};

// ========== UOM SERVICE ==========
export const uomService = {
  async getAll() {
    return await prisma.uom.findMany({
      include: { category: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async getById(id: string) {
    return await prisma.uom.findUnique({
      where: { id },
    });
  },

  async create(data: UomFormValue) {
    return await prisma.uom.create({ data });
  },

  async update(id: string, data: UomFormValue) {
    return await prisma.uom.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return await prisma.uom.delete({
      where: { id },
    });
  },
};
