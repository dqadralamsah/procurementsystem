'use client';

import { SupplierType } from '@/types/supplier';

type Props = {
  data: SupplierType[];
  onEdit: (item: SupplierType) => void;
};

export default function SupplierTable({ data, onEdit }: Props) {
  return (
    <div className="border rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-3 text-sm font-medium text-center">Code</th>
            <th className="p-3 text-sm font-medium text-center">Name</th>
            <th className="p-3 text-sm font-medium text-center">Status</th>
            <th className="p-3 text-sm font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sp) => (
            <tr key={sp.id} className="border-b hover:bg-muted/20 transition-colors">
              <td className="p-3 text-sm">{sp.supplierCode}</td>
              <td className="p-3 text-sm">{sp.name}</td>
              <td className="p-3 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    sp.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {sp.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="p-3 text-sm text-center">
                <button
                  onClick={() => onEdit(sp)}
                  className="text-indigo-600 hover:text-indigo-900 font-medium"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={5} className="p-8 text-center text-muted-foreground">
                No warehouses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
