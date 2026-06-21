
export type SupplierPriceType = {
  id: string;
  supplierId: string;
  supplier: {

  };
  itemId: string;
  item: { 

  };
  price: Number;
  uomId: string;
  uom: { name: string };
  conversionRatio: number;
  minimumOrder: number;
  effectiveDate: Date;
  endDate: Date | null;
  createdAt: Date;
};
