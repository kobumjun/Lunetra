import Link from "next/link";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  link_url: string | null;
};

export function HeroCarousel({ banners }: { banners: Banner[] }) {
  const items = banners.length ? banners : [];
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {items.map((banner) => (
        <article
          key={banner.id}
          className="relative overflow-hidden rounded-3xl border bg-white shadow-sm"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.82), rgba(255,255,255,0.35)), url(${banner.image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex min-h-[280px] flex-col justify-end gap-3 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">Featured</p>
            <h3 className="text-xl font-semibold text-zinc-900">{banner.title}</h3>
            <p className="line-clamp-2 text-sm text-zinc-700">{banner.subtitle}</p>
            {banner.link_url && (
              <Link href={banner.link_url} className="w-fit rounded-full bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700">
                자세히 보기
              </Link>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
