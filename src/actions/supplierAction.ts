"use server";

import { revalidatePath } from "next/cache";
import { supplierService } from "@/services/supplier.service";
import { supplierSchema, SupplierValues } from "@/schemas/supplier.schema";

export async function handleSupplierSubmit(
  id: string | null,
  data: SupplierValues,
) {
  try {
    const validated = supplierSchema.parse(data);

    if (id && validated) {
      await supplierService.update(id, validated);
    } else {
      await supplierService.create(validated);
    }

    revalidatePath("/supplier");
    return {
      success: true,
      message: id
        ? "Supplier updated successfully"
        : "Supplier created successfully",
    };
  } catch (error) {
    console.error("Action Error:", error);
    return { success: false, message: "System Error" };
  }
}
