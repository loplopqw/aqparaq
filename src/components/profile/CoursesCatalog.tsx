import Link from "next/link";
import { Star, ExternalLink, GraduationCap } from "lucide-react";
import type { CatalogCourse } from "@/lib/types";

export function CoursesCatalog({ courses }: { courses: CatalogCourse[] }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <div className="mb-3 flex items-center gap-2">
        <GraduationCap size={16} className="text-accent" />
        <h3 className="text-sm font-semibold text-text-primary">
          Дополнительное образование от разных вузов
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {courses.map((course) => (
          <div key={course.id} className="flex flex-col gap-2 rounded-md border border-line bg-surface-2 p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium leading-snug text-text-primary">{course.title}</p>
              <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-status-warning">
                <Star size={11} fill="currentColor" />
                {course.rating}
              </span>
            </div>
            <p className="text-xs text-text-muted">{course.university}</p>
            <div className="flex flex-wrap gap-1">
              {course.skillsCovered.map((s) => (
                <span key={s} className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-medium text-text-secondary">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between pt-1">
              <span className="text-xs text-text-muted">
                {course.duration} · {course.price}
              </span>
              <Link
                href={course.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                Пройти <ExternalLink size={11} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
