import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default async function AdminSettingsPage() {
  const supabase = await createServerSupabase();
  const { data: settings } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();

  async function saveSettings(formData: FormData) {
    "use server";
    await requireAdmin();
    const payload = Object.fromEntries(formData.entries());
    await (await createServerSupabase()).from("site_settings").upsert({ ...payload, id: settings?.id });
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/settings");
  }

  return (
    <form action={saveSettings} className="space-y-3 rounded-2xl border bg-white p-4">
      <h1 className="text-xl font-semibold">회사소개/기본정보 관리</h1>
      <Input name="company_name" defaultValue={settings?.company_name} placeholder="회사명" required />
      <Input name="hero_title" defaultValue={settings?.hero_title} placeholder="히어로 타이틀" required />
      <Input name="hero_subtitle" defaultValue={settings?.hero_subtitle} placeholder="히어로 서브텍스트" required />
      <Textarea name="about_summary" defaultValue={settings?.about_summary} placeholder="소개 문구" required />
      <Textarea name="mission" defaultValue={settings?.mission} placeholder="미션" required />
      <Textarea name="vision" defaultValue={settings?.vision} placeholder="비전" required />
      <Input name="address" defaultValue={settings?.address} placeholder="주소" required />
      <Input name="email" defaultValue={settings?.email} placeholder="이메일" required />
      <Input name="phone" defaultValue={settings?.phone} placeholder="전화번호" required />
      <Input name="business_number" defaultValue={settings?.business_number} placeholder="사업자번호" required />
      <Input name="instagram_url" defaultValue={settings?.instagram_url ?? ""} placeholder="인스타그램 URL" />
      <Input name="youtube_url" defaultValue={settings?.youtube_url ?? ""} placeholder="유튜브 URL" />
      <Textarea name="privacy_policy" defaultValue={settings?.privacy_policy} placeholder="개인정보처리방침" required />
      <Textarea name="terms_of_service" defaultValue={settings?.terms_of_service} placeholder="이용약관" required />
      <Textarea name="footer_text" defaultValue={settings?.footer_text} placeholder="푸터 문구" required />
      <Button>저장</Button>
    </form>
  );
}
