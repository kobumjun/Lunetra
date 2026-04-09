"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { auditionApplicationSchema, bannerSchema } from "@/lib/validations/forms";

export async function adminLogin(_: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: error.message };
  redirect("/admin");
}

export async function adminLogout() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/");
}

export async function upsertBanner(_: unknown, formData: FormData) {
  await requireAdmin();
  const parsed = bannerSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    image_url: formData.get("image_url"),
    link_url: formData.get("link_url"),
    sort_order: formData.get("sort_order"),
    is_active: formData.get("is_active") === "on",
  });
  if (!parsed.success) return { ok: false, message: "입력값을 확인해 주세요." };
  const supabase = await createServerSupabase();
  const payload = { ...parsed.data, link_url: parsed.data.link_url || null };
  const { error } = parsed.data.id
    ? await supabase.from("banners").update(payload).eq("id", parsed.data.id)
    : await supabase.from("banners").insert(payload);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/");
  revalidatePath("/admin/banners");
  return { ok: true, message: "저장되었습니다." };
}

export async function removeById(table: "banners" | "challenges" | "auditions" | "magazines", id: string) {
  await requireAdmin();
  const supabase = await createServerSupabase();
  await supabase.from(table).delete().eq("id", id);
  revalidatePath("/");
  revalidatePath(`/admin/${table}`);
}

export async function upsertContent(table: "challenges" | "auditions" | "magazines", formData: FormData) {
  await requireAdmin();
  const supabase = await createServerSupabase();
  const id = String(formData.get("id") ?? "");
  const payload = Object.fromEntries(formData.entries());
  delete payload.id;

  const { error } = id
    ? await supabase.from(table).update(payload).eq("id", id)
    : await supabase.from(table).insert(payload);
  if (error) return { ok: false, message: error.message };
  revalidatePath(`/${table}`);
  revalidatePath(`/admin/${table}`);
  return { ok: true, message: "저장되었습니다." };
}

export async function submitAuditionApplication(input: {
  audition_id: string;
  name: string;
  birth_date: string;
  gender: string;
  email: string;
  phone: string;
  region: string;
  sns_url?: string;
  portfolio_url?: string;
  self_intro: string;
  category: string;
  attachment_url?: string;
  consent_privacy: boolean;
}) {
  const parsed = auditionApplicationSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: "입력값을 확인해 주세요." };
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("audition_applications").insert(parsed.data);
  if (error) {
    if (error.message.includes("duplicate") || error.code === "23505") {
      return { ok: false, message: "동일 연락처/이메일로 이미 접수된 지원서가 있습니다." };
    }
    return { ok: false, message: error.message };
  }
  revalidatePath("/admin/applications");
  return { ok: true, message: "지원이 정상 접수되었습니다." };
}
