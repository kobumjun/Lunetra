import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const formData = await request.formData();
  const bucket = String(formData.get("bucket") ?? "");
  const file = formData.get("file") as File | null;
  if (!file || !bucket) return NextResponse.json({ error: "invalid request" }, { status: 400 });

  const supabase = await createServerSupabase();
  const { data: userData } = await supabase.auth.getUser();
  const isAdminUpload = bucket !== "applications";

  if (isAdminUpload) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", userData.user?.id ?? "").maybeSingle();
    const isWhitelist = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean)
      .includes(userData.user?.email ?? "");
    if (!(profile?.role === "admin" || isWhitelist)) {
      return NextResponse.json({ error: "unauthorized" }, { status: 403 });
    }
  }

  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabaseAdmin.storage.from(bucket).upload(path, file, { upsert: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);

  return NextResponse.json({ url: bucket === "applications" ? `${bucket}/${path}` : data.publicUrl });
}
