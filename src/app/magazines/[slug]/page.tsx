import { notFound } from "next/navigation";
import { PublicShell } from "@/components/common/public-shell";
import { MagazineCard } from "@/components/cards/magazine-card";
import { createServerSupabase } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function MagazineDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createServerSupabase();
  const { data: magazine } = await supabase.from("magazines").select("*").eq("slug", slug).eq("is_public", true).maybeSingle();
  if (!magazine) notFound();
  const { data: related } = await supabase.from("magazines").select("*").neq("id", magazine.id).limit(3);

  return (
    <PublicShell>
      <article className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        <div className="h-72 bg-zinc-100" style={{ backgroundImage: `url(${magazine.cover_image_url})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="space-y-4 p-8">
          <h1 className="text-3xl font-semibold">{magazine.title}</h1>
          <p className="text-sm text-zinc-500">{formatDate(magazine.published_at)}</p>
          <p className="text-zinc-700">{magazine.content}</p>
        </div>
      </article>
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">관련 게시글</h2>
        <div className="grid gap-4 md:grid-cols-3">{(related ?? []).map((item) => <MagazineCard key={item.id} magazine={item} />)}</div>
      </section>
    </PublicShell>
  );
}
