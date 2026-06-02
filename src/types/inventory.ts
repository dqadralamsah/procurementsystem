export type InventoryType = {
  id: string;
  warehouseId: string;
  itemId: string;
  quantity: number;
  reorderPoint: number;
  minimumStock: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  item: {
    id: string;
    sku: string;
    name: string;
    uom: {
      id: string;
      name: string;
    };
  };
};
