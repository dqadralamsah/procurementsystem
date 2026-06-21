import { UOMCategoryList } from "@/features/master-data/uom-category/components/uom-category-list";

export const metadata = {
  title: "UOM Category Configuration",
};

export default function UOMCategoryPage() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">UOM Category Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Manage UOM Categories for grouping Units of Measurement.
        </p>
      </div>
      <UOMCategoryList />
    </div>
  );
}
