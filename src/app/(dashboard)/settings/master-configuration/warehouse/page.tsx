import { WarehouseList } from "@/features/master-data/warehouse/components/warehouse-list";

export const metadata = {
  title: "Warehouse Configuration",
};

export default function WarehousePage() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Warehouse Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Manage your warehouse locations and details.
        </p>
      </div>
      <WarehouseList />
    </div>
  );
}
