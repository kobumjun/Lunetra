import { PublicShell } from "@/components/common/public-shell";
import { AuditionCard } from "@/components/cards/audition-card";
import { SectionHeader } from "@/components/common/section-header";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function AuditionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: "singer" | "actor" | "model" | "dancer" | "creator" }>;
}) {
  const { category } = await searchParams;
  const supabase = await createServerSupabase();
  let query = supabase.from("auditions").select("*").order("created_at", { ascending: false });
  if (category) query = query.eq("category", category);
  const { data } = await query;

  return (
    <PublicShell>
      <SectionHeader eyebrow="Auditions" title="글로벌 오디션" description="카테고리별 모집 공고를 확인하고 지원할 수 있습니다." />
      <div className="mb-6 flex flex-wrap gap-2 text-sm">
        {["singer", "actor", "model", "dancer", "creator"].map((c) => (
          <a key={c} href={`/auditions?category=${c}`} className="rounded-full border bg-white px-3 py-1.5 capitalize">{c}</a>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{(data ?? []).map((item) => <AuditionCard key={item.id} audition={item} />)}</div>
    </PublicShell>
  );
}
