import { notFound } from "next/navigation";
import { PublicShell } from "@/components/common/public-shell";
import { ApplicationForm } from "@/components/forms/application-form";
import { createServerSupabase } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function AuditionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createServerSupabase();
  const { data: audition } = await supabase.from("auditions").select("*").eq("slug", slug).maybeSingle();
  if (!audition) notFound();

  return (
    <PublicShell>
      <article className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        <div className="h-72 bg-zinc-100" style={{ backgroundImage: `url(${audition.cover_image_url})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="space-y-4 p-8">
          <h1 className="text-3xl font-semibold">{audition.title}</h1>
          <p className="text-zinc-600">{audition.short_description}</p>
          <p className="text-sm text-zinc-500">{formatDate(audition.start_date)} - {formatDate(audition.end_date)}</p>
          <p>{audition.description}</p>
          <section><h2 className="font-semibold">지원 조건</h2><p className="text-zinc-600">{audition.requirements}</p></section>
          <section><h2 className="font-semibold">제출 자료 안내</h2><p className="text-zinc-600">{audition.submission_guide}</p></section>
        </div>
      </article>
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">지원하기</h2>
        <ApplicationForm auditionId={audition.id} />
      </section>
    </PublicShell>
  );
}
