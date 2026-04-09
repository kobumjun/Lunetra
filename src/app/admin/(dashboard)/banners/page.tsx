import { BannerForm } from "@/components/admin/banner-form";
import { removeById } from "@/lib/actions";
import { createServerSupabase } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default async function AdminBannersPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("banners").select("*").order("sort_order");
  return (
    <div className="space-y-4">
      <BannerForm />
      <div className="rounded-2xl border bg-white p-4">
        <h2 className="mb-3 font-semibold">배너 목록</h2>
        <div className="space-y-2 text-sm">
          {(data ?? []).map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg border p-2">
              <p>{item.title} · {formatDate(item.created_at)}</p>
              <form action={async () => { "use server"; await removeById("banners", item.id); }}>
                <Button size="sm" variant="outline">삭제</Button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
