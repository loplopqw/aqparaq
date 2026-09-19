import { GraduationCap, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { SkillGapItem } from "@/lib/types";
import { getCourseById } from "@/lib/data";

export function SkillGapBlock({ gaps }: { gaps: SkillGapItem[] }) {
  if (gaps.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-md bg-status-good-soft px-3 py-2 text-xs font-medium text-status-good">
        <GraduationCap size={14} />
        Все ключевые навыки закрыты — пробелов не найдено
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {gaps.map((gap) => {
        const course = getCourseById(gap.recommendedCourseId);
        return (
          <div
            key={gap.skill}
            className="rounded-md border border-status-warning-soft bg-status-warning-soft/40 px-3 py-2"
          >
            <p className="text-xs leading-snug text-text-primary">
              <span className="font-semibold text-status-warning">Не хватает: {gap.skill}.</span>{" "}
              <span className="text-text-secondary">{gap.reason}</span>
            </p>
            {course && (
              <Link
                href={course.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                <GraduationCap size={13} />
                Пройти курс «{course.title}» ({course.university})
                <ArrowUpRight size={12} />
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
