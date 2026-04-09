import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { challengeStatusMap } from "@/lib/constants";
import type { Database } from "@/types/database";

type Challenge = Database["public"]["Tables"]["challenges"]["Row"];

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <Link href={`/challenges/${challenge.slug}`} className="group overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="h-40 w-full bg-zinc-100" style={{ backgroundImage: `url(${challenge.thumbnail_url})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="space-y-2 p-4">
        <Badge variant="secondary">{challengeStatusMap[challenge.status]}</Badge>
        <h3 className="line-clamp-1 font-semibold group-hover:text-violet-600">{challenge.title}</h3>
        <p className="line-clamp-2 text-sm text-zinc-600">{challenge.short_description}</p>
        <p className="text-xs text-zinc-500">
          {formatDate(challenge.start_date)} - {formatDate(challenge.end_date)}
        </p>
      </div>
    </Link>
  );
}
