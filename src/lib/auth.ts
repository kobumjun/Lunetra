import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createServerSupabase();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,email")
    .eq("id", userData.user.id)
    .maybeSingle();

  const isWhitelist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean)
    .includes(userData.user.email ?? "");

  const isAdmin = profile?.role === "admin" || isWhitelist;
  if (!isAdmin) redirect("/");

  return { supabase, user: userData.user };
}
