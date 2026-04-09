import { PublicShell } from "@/components/common/public-shell";
import { ChallengeCard } from "@/components/cards/challenge-card";
import { SectionHeader } from "@/components/common/section-header";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function ChallengesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: "ongoing" | "upcoming" | "ended" }>;
}) {
  const { status } = await searchParams;
  const supabase = await createServerSupabase();
  let query = supabase.from("challenges").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data } = await query;

  return (
    <PublicShell>
      <SectionHeader eyebrow="Challenges" title="챌린지 프로젝트" description="진행중/예정/종료 상태별로 프로젝트를 확인하세요." />
      <div className="mb-6 flex gap-2 text-sm">
        {["ongoing", "upcoming", "ended"].map((s) => (
          <a key={s} href={`/challenges?status=${s}`} className="rounded-full border bg-white px-3 py-1.5 capitalize">
            {s}
          </a>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">{(data ?? []).map((item) => <ChallengeCard key={item.id} challenge={item} />)}</div>
    </PublicShell>
  );
}
