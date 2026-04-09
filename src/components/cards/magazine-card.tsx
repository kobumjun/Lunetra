import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Database } from "@/types/database";

type Magazine = Database["public"]["Tables"]["magazines"]["Row"];

export function MagazineCard({ magazine }: { magazine: Magazine }) {
  return (
    <Link href={`/magazines/${magazine.slug}`} className="group overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="h-36 w-full bg-zinc-100" style={{ backgroundImage: `url(${magazine.thumbnail_url})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-1 font-semibold group-hover:text-violet-600">{magazine.title}</h3>
        <p className="line-clamp-2 text-sm text-zinc-600">{magazine.summary}</p>
        <p className="text-xs text-zinc-500">{formatDate(magazine.published_at)}</p>
      </div>
    </Link>
  );
}
