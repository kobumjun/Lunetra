import { PublicShell } from "@/components/common/public-shell";
import { createServerSupabase } from "@/lib/supabase/server";
import { SectionHeader } from "@/components/common/section-header";

export default async function AboutPage() {
  const supabase = await createServerSupabase();
  const { data: settings } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
  return (
    <PublicShell footer={settings ?? undefined}>
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
