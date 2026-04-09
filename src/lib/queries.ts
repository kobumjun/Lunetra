import { cache } from "react";
import { createServerSupabase } from "@/lib/supabase/server";

export const getHomeData = cache(async () => {
  const supabase = await createServerSupabase();
  const [{ data: settings }, { data: banners }, { data: challenges }, { data: auditions }, { data: magazines }] =
    await Promise.all([
      supabase.from("site_settings").select("*").limit(1).maybeSingle(),
      supabase.from("banners").select("*").eq("is_active", true).order("sort_order", { ascending: true }),
      supabase.from("challenges").select("*").eq("status", "ongoing").order("created_at", { ascending: false }).limit(3),
      supabase.from("auditions").select("*").order("created_at", { ascending: false }).limit(4),
      supabase.from("magazines").select("*").eq("is_public", true).order("published_at", { ascending: false }).limit(3),
    ]);
  return { settings, banners: banners ?? [], challenges: challenges ?? [], auditions: auditions ?? [], magazines: magazines ?? [] };
});
