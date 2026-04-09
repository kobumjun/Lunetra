import { PublicShell } from "@/components/common/public-shell";
import { MagazineCard } from "@/components/cards/magazine-card";
import { SectionHeader } from "@/components/common/section-header";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function MagazinesPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("magazines").select("*").eq("is_public", true).order("published_at", { ascending: false });
  const featured = data?.find((item) => item.is_featured);
  const list = (data ?? []).filter((item) => item.id !== featured?.id);

  return (
    <PublicShell>
      <SectionHeader eyebrow="Magazine" title="매거진" description="뉴스, 이벤트, 아티스트 스토리를 한 곳에서 확인하세요." />
      {featured && (
        <a href={`/magazines/${featured.slug}`} className="mb-8 block overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="h-64 bg-zinc-100" style={{ backgroundImage: `url(${featured.cover_image_url})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="p-6"><h2 className="text-2xl font-semibold">{featured.title}</h2><p className="mt-2 text-zinc-600">{featured.summary}</p></div>
        </a>
      )}
      <div className="grid gap-4 md:grid-cols-3">{list.map((item) => <MagazineCard key={item.id} magazine={item} />)}</div>
    </PublicShell>
  );
}
