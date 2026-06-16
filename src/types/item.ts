// ===== ITEM CATEGORIES =====
export type ItemCategoryType = {
  id: string;
  name: string;
  description: string | null;
};

// ===== ITEM =====
export type ItemType = {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  categoryId: string;
  category: { name: string };
  uomId: string;
  uom: { name: string };
  isActive: boolean;
};
