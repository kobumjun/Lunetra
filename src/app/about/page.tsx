import { PublicShell } from "@/components/common/public-shell";
import { createServerSupabase } from "@/lib/supabase/server";
import { SectionHeader } from "@/components/common/section-header";

type SiteSettings = {
  company_name: string | null;
  mission: string | null;
  vision: string | null;
  about_summary?: string | null;
  hero_title?: string | null;
  hero_subtitle?: string | null;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  business_number?: string | null;
  instagram_url?: string | null;
  youtube_url?: string | null;
  privacy_policy?: string | null;
  terms_of_service?: string | null;
  footer_text?: string | null;
};

export default async function AboutPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
  const settings: SiteSettings | null = data as SiteSettings | null;
  const footer = settings
    ? {
        company_name: settings.company_name ?? undefined,
        address: settings.address ?? undefined,
        email: settings.email ?? undefined,
        footer_text: settings.footer_text ?? undefined,
      }
    : undefined;
  return (
    <PublicShell footer={footer}>
      <SectionHeader eyebrow="About Us" title={settings?.company_name ?? "Lunetra Entertainment Network"} description={settings?.about_summary ?? ""} />
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border bg-white p-6"><h2 className="font-semibold">Mission</h2><p className="mt-2 text-zinc-600">{settings?.mission}</p></article>
        <article className="rounded-2xl border bg-white p-6"><h2 className="font-semibold">Vision</h2><p className="mt-2 text-zinc-600">{settings?.vision}</p></article>
      </div>
      <article className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="font-semibold">Contact</h2>
        <p className="mt-2 text-zinc-600">{settings?.address}</p>
        <p className="text-zinc-600">{settings?.email}</p>
        <p className="text-zinc-600">{settings?.phone}</p>
      </article>
    </PublicShell>
  );
}
