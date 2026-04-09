import { createServerSupabase } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function AdminApplicationsPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("audition_applications")
    .select("id,name,email,phone,status,created_at,auditions(title)")
    .order("created_at", { ascending: false });

  return (
    <div className="rounded-2xl border bg-white p-4">
      <h1 className="mb-4 text-xl font-semibold">오디션 지원서 조회</h1>
      <div className="space-y-2 text-sm">
        {(data ?? []).map((item) => (
          <div key={item.id} className="rounded-lg border p-3">
            <p className="font-medium">{item.name} · {item.email}</p>
            <p className="text-zinc-600">{item.phone} · {(item.auditions as { title?: string } | null)?.title}</p>
            <p className="text-zinc-500">{item.status} · {formatDate(item.created_at)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
