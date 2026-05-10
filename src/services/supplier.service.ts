import prisma from '@/lib/prisma';
import { codeGenerator } from '@/utils/codeGenerator';

export const supplierService = {
  async getAll() {
    return await prisma.supplier.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async getById(id: string) {
    return await prisma.supplier.findUnique({
      where: { id },
    });
  },

  async create(data: {
    name: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    contactPerson?: string | null;
  }) {
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

  async update(
    id: string,
    data: {
      name: string;
      email?: string | null;
      phone?: string | null;
      address?: string | null;
      contactPerson?: string | null;
      isActive: boolean;
    },
  ) {
    return await prisma.supplier.update({
      where: { id },
      data,
    });
  },
};
