export type SupplierType = {
  id: string;
  supplierCode: string;
  name: string;
  address?: string | null;
  email?: string | null;
  contact?: string | null;
  isActive: boolean;
};
