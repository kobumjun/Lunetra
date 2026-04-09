import Link from "next/link";
import { Sparkles } from "lucide-react";

const menus = [
  { href: "/", label: "홈" },
  { href: "/challenges", label: "챌린지" },
  { href: "/auditions", label: "오디션" },
  { href: "/magazines", label: "매거진" },
  { href: "/about", label: "회사소개" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="size-5 text-violet-500" />
          Lunetra Network
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {menus.map((menu) => (
            <Link key={menu.href} href={menu.href} className="text-sm text-zinc-700 hover:text-zinc-950">
              {menu.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/admin/login" className="rounded-full border px-4 py-2 text-sm hover:bg-zinc-50">
            관리자 로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
