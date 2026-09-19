import type { UserProfile } from "@/lib/types";

export function AcademicCard({ user }: { user: UserProfile }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Университетский блок</h3>
        <span className="text-xs text-text-muted">{user.university}</span>
      </div>

      <div className="mb-4 overflow-hidden rounded-md border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-2 text-xs uppercase tracking-wide text-text-muted">
            <tr>
              <th className="px-3 py-2 font-medium">Курс</th>
              <th className="px-3 py-2 font-medium">Семестр</th>
              <th className="px-3 py-2 font-medium">Кредиты</th>
              <th className="px-3 py-2 text-right font-medium">Оценка</th>
            </tr>
          </thead>
          <tbody>
            {user.transcript.map((row, i) => (
              <tr key={row.id} className={i % 2 === 1 ? "bg-surface-2/40" : undefined}>
                <td className="px-3 py-2 text-text-primary">{row.course}</td>
                <td className="px-3 py-2 text-text-muted">{row.term}</td>
                <td className="px-3 py-2 text-text-muted">{row.credits}</td>
                <td className="px-3 py-2 text-right font-semibold text-accent">{row.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">Навыки</h4>
      <div className="space-y-2">
        {user.skills.map((skill) => (
          <div key={skill.name} className="flex items-center gap-3">
            <span className="w-24 shrink-0 truncate text-xs text-text-secondary">{skill.name}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full rounded-full bg-accent" style={{ width: `${(skill.level / 5) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
