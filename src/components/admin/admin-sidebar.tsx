import Link from "next/link";

const menus = [
  ["/admin", "대시보드"],
  ["/admin/banners", "배너 관리"],
  ["/admin/challenges", "챌린지 관리"],
  ["/admin/auditions", "오디션 관리"],
  ["/admin/magazines", "매거진 관리"],
  ["/admin/settings", "사이트 설정"],
  ["/admin/applications", "지원서 조회"],
] as const;

export function AdminSidebar() {
  return (
    <aside className="w-full rounded-2xl border bg-white p-4 md:w-56">
      <p className="mb-3 text-sm font-semibold">Admin Console</p>
      <nav className="space-y-1">
        {menus.map(([href, label]) => (
          <Link key={href} href={href} className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
