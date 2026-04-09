import { HeroCarousel } from "@/components/common/hero-carousel";
import { SectionHeader } from "@/components/common/section-header";
import { PublicShell } from "@/components/common/public-shell";
import { ChallengeCard } from "@/components/cards/challenge-card";
import { AuditionCard } from "@/components/cards/audition-card";
import { MagazineCard } from "@/components/cards/magazine-card";
import { getHomeData } from "@/lib/queries";

export default async function Home() {
  const { settings, banners, challenges, auditions, magazines } = await getHomeData();

  return (
    <PublicShell footer={settings ?? undefined}>
      <div className="space-y-16">
        <HeroCarousel banners={banners} />

        <section className="rounded-3xl border bg-white p-8 shadow-sm">
          <SectionHeader
            eyebrow="Brand Story"
            title={settings?.hero_title ?? "Global Entertainment Platform"}
            description={settings?.hero_subtitle ?? ""}
          />
          <p className="text-zinc-700">{settings?.about_summary}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl bg-zinc-50 p-4"><h3 className="font-semibold">Mission</h3><p className="mt-2 text-sm text-zinc-600">{settings?.mission}</p></article>
            <article className="rounded-2xl bg-zinc-50 p-4"><h3 className="font-semibold">Vision</h3><p className="mt-2 text-sm text-zinc-600">{settings?.vision}</p></article>
          </div>
        </section>

        <section>
          <SectionHeader eyebrow="Challenges" title="진행 중 챌린지" description="팬과 아티스트를 연결하는 글로벌 참여형 프로젝트" />
          <div className="grid gap-4 md:grid-cols-3">{challenges.map((item) => <ChallengeCard key={item.id} challenge={item} />)}</div>
        </section>

        <section>
          <SectionHeader eyebrow="Auditions" title="추천 오디션" description="카테고리별 신인 발굴 프로젝트" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{auditions.map((item) => <AuditionCard key={item.id} audition={item} />)}</div>
        </section>

        <section>
          <SectionHeader eyebrow="Magazine" title="최신 매거진" description="프로젝트 운영 인사이트와 뉴스" />
          <div className="grid gap-4 md:grid-cols-3">{magazines.map((item) => <MagazineCard key={item.id} magazine={item} />)}</div>
        </section>
      </div>
    </PublicShell>
  );
}
