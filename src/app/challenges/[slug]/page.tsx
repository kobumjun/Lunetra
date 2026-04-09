import { notFound } from "next/navigation";
import { PublicShell } from "@/components/common/public-shell";
import { ChallengeCard } from "@/components/cards/challenge-card";
import { createServerSupabase } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function ChallengeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createServerSupabase();
  const { data: challenge } = await supabase.from("challenges").select("*").eq("slug", slug).maybeSingle();
  if (!challenge) notFound();
  const { data: related } = await supabase.from("challenges").select("*").neq("id", challenge.id).limit(3);

  return (
    <PublicShell>
      <article className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        <div className="h-72 bg-zinc-100" style={{ backgroundImage: `url(${challenge.cover_image_url})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="space-y-4 p-8">
          <h1 className="text-3xl font-semibold">{challenge.title}</h1>
          <p className="text-zinc-600">{challenge.short_description}</p>
          <p className="text-sm text-zinc-500">{formatDate(challenge.start_date)} - {formatDate(challenge.end_date)}</p>
          <p>{challenge.description}</p>
          <section><h2 className="font-semibold">참여 대상</h2><p className="text-zinc-600">{challenge.target_audience}</p></section>
          <section><h2 className="font-semibold">보상/혜택</h2><p className="text-zinc-600">{challenge.benefits}</p></section>
          <section><h2 className="font-semibold">유의사항</h2><p className="text-zinc-600">{challenge.precautions}</p></section>
        </div>
      </article>
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">관련 챌린지</h2>
        <div className="grid gap-4 md:grid-cols-3">{(related ?? []).map((item) => <ChallengeCard key={item.id} challenge={item} />)}</div>
      </section>
    </PublicShell>
  );
}
