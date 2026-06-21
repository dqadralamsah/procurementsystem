import { UOMList } from "@/features/master-data/uom/components/uom-list";

export const metadata = {
  title: "UOM Configuration",
};

export default function UOMPage() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">UOM Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Manage Units of Measurement (UOM) for items.
        </p>
      </div>
      <UOMList />
    </div>
  );
}
