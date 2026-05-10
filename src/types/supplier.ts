export type SupplierType = {
  id: string;
  supplierCode: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  contactPerson?: string | null;
  isActive: boolean;
};
