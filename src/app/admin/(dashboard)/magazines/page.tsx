import { ContentForm } from "@/components/admin/content-form";
import { removeById } from "@/lib/actions";
import { createServerSupabase } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function AdminMagazinesPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("magazines").select("id,title,is_public").order("published_at", { ascending: false });
  return (
    <div className="space-y-4">
      <ContentForm table="magazines" bucket="magazines" />
      <div className="rounded-2xl border bg-white p-4 space-y-2">
        {(data ?? []).map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border p-2 text-sm">
            <p>{item.title} · {item.is_public ? "공개" : "비공개"}</p>
            <form action={async () => { "use server"; await removeById("magazines", item.id); }}>
              <Button size="sm" variant="outline">삭제</Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
