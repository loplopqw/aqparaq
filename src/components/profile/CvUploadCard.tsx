"use client";

import { useRef, useState } from "react";
import { FileText, Upload, Code2, UserSquare2, Link as LinkIcon, Check } from "lucide-react";
import type { UserProfile } from "@/lib/types";

export function CvUploadCard({ user }: { user: UserProfile }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [cv, setCv] = useState(user.cv);
  const [links, setLinks] = useState(user.links);
  const [saved, setSaved] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCv({
      fileName: file.name,
      uploadedAt: new Date().toISOString().slice(0, 10),
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
    });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="space-y-4 rounded-lg border border-line bg-surface p-5">
      <h3 className="text-sm font-semibold text-text-primary">Резюме и профили</h3>

      <div className="flex items-center justify-between gap-3 rounded-md border border-line bg-surface-2 px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
            <FileText size={16} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-text-primary">{cv.fileName}</p>
            <p className="text-xs text-text-muted">
              Загружено {cv.uploadedAt} · {cv.sizeKb} КБ
            </p>
          </div>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary"
        >
          <Upload size={13} />
          Заменить
        </button>
        <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 rounded-md border border-line px-3 py-2">
          <UserSquare2 size={15} className="shrink-0 text-text-muted" />
          <input
            value={links.linkedin}
            onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
            placeholder="Ссылка на LinkedIn"
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 rounded-md border border-line px-3 py-2">
          <Code2 size={15} className="shrink-0 text-text-muted" />
          <input
            value={links.github}
            onChange={(e) => setLinks({ ...links, github: e.target.value })}
            placeholder="Ссылка на GitHub"
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 rounded-md border border-line px-3 py-2">
          <LinkIcon size={15} className="shrink-0 text-text-muted" />
          <input
            value={links.portfolio}
            onChange={(e) => setLinks({ ...links, portfolio: e.target.value })}
            placeholder="Ссылка на портфолио (необязательно)"
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="flex w-full items-center justify-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        {saved ? <Check size={15} /> : null}
        {saved ? "Сохранено" : "Сохранить изменения"}
      </button>
    </div>
  );
}
