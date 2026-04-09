"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";

const menus = [
  { href: "/", label: "홈" },
  { href: "/challenges", label: "챌린지" },
  { href: "/auditions", label: "오디션" },
  { href: "/magazines", label: "매거진" },
  { href: "/about", label: "회사소개" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="size-5 text-violet-500" />
          Lunetra Network
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="주요 메뉴">
          {menus.map((menu) => (
            <Link key={menu.href} href={menu.href} className="text-sm text-zinc-700 hover:text-zinc-950">
              {menu.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/login"
            className="hidden rounded-full border px-4 py-2 text-sm hover:bg-zinc-50 md:inline-flex"
          >
            관리자 로그인
          </Link>
          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-3 border-t bg-white px-4 py-3 md:hidden"
          aria-label="모바일 메뉴"
        >
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="text-sm text-zinc-700 hover:text-zinc-950"
              onClick={() => setOpen(false)}
            >
              {menu.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            className="rounded-full border px-4 py-2 text-center text-sm hover:bg-zinc-50"
            onClick={() => setOpen(false)}
          >
            관리자 로그인
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
