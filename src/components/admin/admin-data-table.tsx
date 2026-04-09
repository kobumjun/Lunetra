import { Button } from "@/components/ui/button";

export function AdminDataTable({
  headers,
  rows,
  onDelete,
}: {
  headers: string[];
  rows: { id: string; cols: string[] }[];
  onDelete?: (id: string) => Promise<void>;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50">
          <tr>{headers.map((h) => <th key={h} className="px-3 py-2">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t">
              {row.cols.map((col, idx) => <td key={`${row.id}-${idx}`} className="px-3 py-2">{col}</td>)}
              {onDelete && (
                <td className="px-3 py-2">
                  <form action={async () => onDelete(row.id)}>
                    <Button size="sm" variant="outline">삭제</Button>
                  </form>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
