export function WarehouseDetailTable({ data }: { data: any[] }) {
  return (
    <div className='border rounded-lg overflow-hidden bg-white shadow-sm'>
      <table className='w-full text-left border-collapse'>
        <thead>
          <tr className='bg-muted/50 border-b text-xs font-bold text-muted-foreground uppercase tracking-wider'>
            <th className='p-4'>SKU</th>
            <th className='p-4'>Item Name</th>
            <th className='p-4 text-right'>Quantity</th>
            <th className='p-4 text-right'>Reorder Point</th>
          </tr>
        </thead>
        <tbody className='divide-y text-sm'>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className='p-8 text-center text-muted-foreground italic'
              >
                No items found in this warehouse.
              </td>
            </tr>
          ) : (
            data.map((inv: any) => (
              <tr key={inv.id} className='hover:bg-muted/20 transition-colors'>
                <td className='p-4 font-mono font-medium'>{inv.item.sku}</td>
                <td className='p-4'>{inv.item.name}</td>
                <td className='p-4 text-right font-bold'>
                  {Number(inv.quantity)}
                </td>
                <td className='p-4 text-right text-orange-600'>
                  {Number(inv.reorderPoint)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
