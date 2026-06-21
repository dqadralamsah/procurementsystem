import { ItemCategoryList } from "@/features/master-data/item-category/components/item-category-list";

export const metadata = {
  title: "Item Category Configuration",
};

export default function ItemCategoryPage() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Item Category Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Manage item categories for inventory classification.
        </p>
      </div>
      <ItemCategoryList />
    </div>
  );
}
