import Link from "next/link";
import { GraduationCap, ArrowUpRight } from "lucide-react";
import type { SkillGapSummaryItem } from "@/lib/types";

export function PriorityGapsCard({ gaps }: { gaps: SkillGapSummaryItem[] }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <h3 className="mb-3 text-sm font-semibold text-text-primary">Приоритетные пробелы в навыках</h3>
      <div className="space-y-2">
        {gaps.map((gap, i) => (
          <div
            key={gap.skill}
            className="flex items-center justify-between gap-3 rounded-md border border-line bg-surface-2 px-3 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text-primary">{gap.skill}</p>
                <p className="text-xs text-text-muted">
                  Встречается в {gap.count} {gap.count === 1 ? "предложении" : "предложениях"}
                </p>
              </div>
            </div>
            {gap.course && (
              <Link
                href={gap.course.url}
                target="_blank"
                rel="noreferrer"
                className="flex shrink-0 items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                <GraduationCap size={13} />
                Курс
                <ArrowUpRight size={11} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
