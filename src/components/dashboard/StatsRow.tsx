import type { Listing } from "@/lib/types";
import { daysUntil } from "@/lib/data";
import { StatTile } from "@/components/ui/StatTile";

export function StatsRow({ listings }: { listings: Listing[] }) {
  const total = listings.length;
  const avgMatch = total ? Math.round(listings.reduce((sum, l) => sum + l.matchScore, 0) / total) : 0;
  const partnerCount = listings.filter((l) => l.isB2BPartner).length;
  const closest = listings.reduce<Listing | null>((closestListing, l) => {
    if (!closestListing) return l;
    return daysUntil(l.deadline) < daysUntil(closestListing.deadline) ? l : closestListing;
  }, null);

  const stats = [
    { label: "Найдено предложений", value: String(total) },
    { label: "Средний Match Score", value: `${avgMatch}%` },
    { label: "От партнёров вуза", value: String(partnerCount) },
    { label: "Ближайший дедлайн", value: closest ? `${Math.max(daysUntil(closest.deadline), 0)} дн.` : "—" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 px-6 py-4 sm:grid-cols-4">
      {stats.map((s) => (
        <StatTile key={s.label} label={s.label} value={s.value} />
      ))}
    </div>
  );
}
