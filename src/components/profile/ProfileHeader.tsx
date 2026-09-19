import { MapPin, GraduationCap } from "lucide-react";
import type { UserProfile } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

export function ProfileHeader({ user }: { user: UserProfile }) {
  const gpaPercent = (user.gpa / user.gpaScale) * 100;

  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xl font-bold text-accent">
            {user.avatarInitials}
          </div>
          <div>
            <h2 className="text-lg font-bold text-text-primary">{user.name}</h2>
            <p className="text-sm text-text-secondary">
              {user.specialty} · {user.course} курс · выпуск {user.graduationYear}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-text-muted">
              <MapPin size={12} /> {user.location}
              <span className="mx-1">·</span>
              <GraduationCap size={12} /> {user.university}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-md bg-surface-2 px-4 py-2.5">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-wide text-text-muted">GPA</p>
            <p className="text-lg font-bold text-text-primary">
              {user.gpa.toFixed(2)}
              <span className="text-xs font-normal text-text-muted">/{user.gpaScale.toFixed(1)}</span>
            </p>
          </div>
          <div className="h-8 w-px bg-line" />
          <div className="w-28">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
              <div className="h-full rounded-full bg-accent" style={{ width: `${gpaPercent}%` }} />
            </div>
            <p className="mt-1 text-[10px] text-text-muted">Академическая успеваемость</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {user.targetRoles.map((role) => (
          <Badge key={role} variant="accent">
            {role}
          </Badge>
        ))}
      </div>
    </div>
  );
}
