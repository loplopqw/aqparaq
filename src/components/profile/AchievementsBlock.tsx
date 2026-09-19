import { Medal, GraduationCap, Trophy, Briefcase, UserCheck, Lock } from "lucide-react";
import clsx from "clsx";
import type { Achievement } from "@/lib/types";

const ICONS: Record<string, typeof Medal> = {
  medal: Medal,
  "graduation-cap": GraduationCap,
  trophy: Trophy,
  briefcase: Briefcase,
  "user-check": UserCheck,
};

export function AchievementsBlock({ achievements }: { achievements: Achievement[] }) {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Достижения</h3>
        <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-text-secondary">
          {unlockedCount}/{achievements.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {achievements.map((a) => {
          const Icon = ICONS[a.icon] ?? Medal;
          return (
            <div
              key={a.id}
              title={a.description}
              className={clsx(
                "flex flex-col items-center gap-1.5 rounded-md border p-3 text-center",
                a.unlocked ? "border-status-good-soft bg-status-good-soft/30" : "border-line bg-surface-2"
              )}
            >
              <div
                className={clsx(
                  "relative flex h-10 w-10 items-center justify-center rounded-full",
                  a.unlocked ? "bg-status-good-soft text-status-good" : "bg-surface text-text-muted"
                )}
              >
                <Icon size={18} />
                {!a.unlocked && (
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-surface-hover text-text-muted">
                    <Lock size={9} />
                  </span>
                )}
              </div>
              <p className="text-xs font-medium leading-tight text-text-primary">{a.title}</p>
              {!a.unlocked && a.progress !== undefined && a.goal !== undefined && (
                <div className="w-full">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-surface-hover">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${(a.progress / a.goal) * 100}%` }}
                    />
                  </div>
                  <p className="mt-0.5 text-[10px] text-text-muted">
                    {a.progress}/{a.goal}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
