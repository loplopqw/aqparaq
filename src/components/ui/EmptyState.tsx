import { SearchX } from "lucide-react";

export function EmptyState({
  title = "Ничего не найдено",
  description = "Попробуйте изменить фильтры или сбросить их",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line py-16 text-center">
      <SearchX className="text-text-muted" size={28} />
      <p className="text-sm font-medium text-text-primary">{title}</p>
      <p className="text-xs text-text-muted">{description}</p>
    </div>
  );
}
