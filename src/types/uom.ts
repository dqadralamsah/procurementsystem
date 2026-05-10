// ===== UOM Ctegoriy Type =====
export type UomCategoryType = {
  id: string;
  name: string;
  description: string | null;
};

// ===== UOM Type =====
export type UomType = {
  id: string;
  name: string;
  description: string | null;
  categoryId: string;
  category: { name: string };
};
