import Link from "next/link";
import { GraduationCap, Send, MessagesSquare, ArrowUpRight, Lock } from "lucide-react";
import type { RoadmapStage } from "@/lib/types";

const KIND_ICON: Record<RoadmapStage["kind"], typeof GraduationCap> = {
  skill: GraduationCap,
  apply: Send,
  interview: MessagesSquare,
};

export function RoadmapTimeline({ stages }: { stages: RoadmapStage[] }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <h3 className="mb-4 text-sm font-semibold text-text-primary">Рекомендуемый план действий</h3>
      <ol className="space-y-6 border-l border-line pl-6">
        {stages.map((stage, i) => {
          const Icon = KIND_ICON[stage.kind];
          return (
            <li key={stage.id} className="relative">
              <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-surface bg-accent text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <Icon size={14} className="shrink-0 text-accent" />
                <p className="text-sm font-semibold text-text-primary">{stage.title}</p>
                <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-text-muted">
                  {stage.timeframe}
                </span>
              </div>
              <p className="mt-1 text-xs text-text-secondary">{stage.description}</p>
              {stage.course && (
                <Link
                  href={stage.course.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                >
                  Пройти курс «{stage.course.title}» ({stage.course.university})
                  <ArrowUpRight size={11} />
                </Link>
              )}
              {stage.kind === "interview" && (
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                  <Lock size={9} />
                  MOCK-интервью с ИИ — скоро
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
