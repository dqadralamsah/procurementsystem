import prisma from "@/lib/prisma";
import { codeGenerator } from "@/utils/codeGenerator";
import { SupplierValues } from "@/schemas/supplier.schema";

export const supplierService = {
  // GET All
  async getAll() {
    return await prisma.supplier.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
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
          startsWith: "SPPLR-",
        },
      },
      orderBy: {
        supplierCode: "desc",
      },
      select: {
        supplierCode: true,
      },
    });

    const supplierCode = codeGenerator({
      prefix: "SPPLR",
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
