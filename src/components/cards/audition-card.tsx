import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { auditionCategoryMap, auditionStatusMap } from "@/lib/constants";
import type { Database } from "@/types/database";

type Audition = Database["public"]["Tables"]["auditions"]["Row"];

export function AuditionCard({ audition }: { audition: Audition }) {
  return (
    <Link href={`/auditions/${audition.slug}`} className="group overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="h-40 w-full bg-zinc-100" style={{ backgroundImage: `url(${audition.thumbnail_url})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{auditionCategoryMap[audition.category]}</Badge>
          <Badge variant="secondary">{auditionStatusMap[audition.status]}</Badge>
        </div>
        <h3 className="line-clamp-1 font-semibold group-hover:text-violet-600">{audition.title}</h3>
        <p className="line-clamp-2 text-sm text-zinc-600">{audition.short_description}</p>
        <p className="text-xs text-zinc-500">
          {formatDate(audition.start_date)} - {formatDate(audition.end_date)}
        </p>
      </div>
    </Link>
  );
}
