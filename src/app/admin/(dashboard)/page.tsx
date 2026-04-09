import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabase();
  const [
    { count: challengesCount },
    { count: ongoingCount },
    { count: auditionsCount },
    { count: magazinesCount },
    { count: applicationsCount },
    { data: recent },
  ] = await Promise.all([
    supabase.from("challenges").select("*", { count: "exact", head: true }),
    supabase.from("challenges").select("*", { count: "exact", head: true }).eq("status", "ongoing"),
    supabase.from("auditions").select("*", { count: "exact", head: true }),
    supabase.from("magazines").select("*", { count: "exact", head: true }),
    supabase.from("audition_applications").select("*", { count: "exact", head: true }),
    supabase.from("audition_applications").select("id,name,email,created_at").order("created_at", { ascending: false }).limit(8),
  ]);

  const stats = [
    ["총 챌린지", challengesCount ?? 0],
    ["진행중 챌린지", ongoingCount ?? 0],
    ["오디션 수", auditionsCount ?? 0],
    ["매거진 수", magazinesCount ?? 0],
    ["지원서 수", applicationsCount ?? 0],
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">운영 대시보드</h1>
      <div className="grid gap-3 md:grid-cols-3">
        {stats.map(([label, value]) => (
          <Card key={label}><CardHeader><CardTitle className="text-sm text-zinc-500">{label}</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{value}</p></CardContent></Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>최근 지원자</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {(recent ?? []).map((r) => <p key={r.id}>{r.name} · {r.email}</p>)}
          <Link href="/admin/applications" className="inline-block text-violet-600">전체 지원서 보기</Link>
        </CardContent>
      </Card>
    </div>
  );
}
