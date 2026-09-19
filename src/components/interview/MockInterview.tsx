"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessagesSquare, RotateCcw, Sparkles, Info } from "lucide-react";
import clsx from "clsx";
import type { Listing } from "@/lib/types";
import {
  getInterviewQuestions,
  evaluateAnswer,
  INTERVIEW_SCORE_LABELS,
  INTERVIEW_CATEGORY_LABELS,
} from "@/lib/data";
import { MatchScoreRing } from "@/components/dashboard/MatchScoreRing";

type Phase = "intro" | "question" | "result";

export function MockInterview({ listing }: { listing: Listing }) {
  const questions = useMemo(() => getInterviewQuestions(listing), [listing]);
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const current = questions[index];
  const feedbacks = useMemo(
    () =>
      phase === "result"
        ? questions.map((q) => evaluateAnswer(q, answers[q.id] ?? ""))
        : [],
    [phase, questions, answers]
  );
  const overallScore = feedbacks.length
    ? Math.round(feedbacks.reduce((sum, f) => sum + f.score, 0) / feedbacks.length)
    : 0;

  function restart() {
    setAnswers({});
    setIndex(0);
    setPhase("intro");
  }

  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <div className="rounded-lg border border-line bg-surface p-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
            <MessagesSquare size={22} />
          </div>
          <h2 className="text-lg font-bold text-text-primary">MOCK-интервью с ИИ</h2>
          <p className="mt-1 text-sm text-text-secondary">
            {listing.title} · {listing.company}
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
            Вы ответите на {questions.length} вопросов в свободной форме, составленных на основе
            требований и стека этой вакансии. После завершения вы получите обратную связь по
            каждому ответу и итоговую оценку.
          </p>
          <button
            onClick={() => setPhase("question")}
            className="mx-auto mt-5 flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Начать интервью
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-line bg-surface-2 p-3 text-xs text-text-muted">
          <Info size={14} className="mt-0.5 shrink-0" />
          <p>
            Это прототип: оценка формируется автоматически по длине ответа и совпадению ключевых
            слов с вакансией, без обращения к реальной языковой модели.
          </p>
        </div>
      </div>
    );
  }

  if (phase === "question") {
    const answer = answers[current.id] ?? "";
    const isLast = index === questions.length - 1;

    return (
      <div className="mx-auto max-w-xl space-y-4">
        <div className="flex items-center gap-2">
          {questions.map((q, i) => (
            <div
              key={q.id}
              className={clsx(
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= index ? "bg-accent" : "bg-surface-2"
              )}
            />
          ))}
        </div>
        <p className="text-xs font-medium text-text-muted">
          Вопрос {index + 1} из {questions.length}
        </p>

        <div className="space-y-4 rounded-lg border border-line bg-surface p-5">
          <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
            {INTERVIEW_CATEGORY_LABELS[current.category]}
          </span>
          <p className="text-base font-semibold leading-relaxed text-text-primary">{current.prompt}</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswers((prev) => ({ ...prev, [current.id]: e.target.value }))}
            placeholder="Введите ваш ответ..."
            rows={7}
            className="w-full resize-none rounded-md border border-line bg-surface-2 p-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="flex items-center gap-1.5 rounded-md border border-line px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={14} />
            Назад
          </button>
          <button
            onClick={() => (isLast ? setPhase("result") : setIndex((i) => i + 1))}
            className="flex items-center gap-1.5 rounded-md bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            {isLast ? "Завершить интервью" : "Далее"}
            {!isLast && <ArrowRight size={14} />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex flex-col items-center gap-3 rounded-lg border border-line bg-surface p-6 text-center">
        <Sparkles size={18} className="text-accent" />
        <MatchScoreRing score={overallScore} size={88} label="Итоговый балл" statusLabels={INTERVIEW_SCORE_LABELS} />
        <p className="max-w-md text-sm text-text-secondary">
          {overallScore >= 75
            ? "Сильное выступление — большинство ответов развёрнутые и по существу."
            : overallScore >= 50
              ? "Неплохо, но часть ответов стоит дополнить конкретными примерами и деталями."
              : "Есть заметные пробелы — попробуйте пройти интервью ещё раз, опираясь на подсказки ниже."}
        </p>
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => {
          const feedback = feedbacks[i];
          const answer = answers[q.id]?.trim();
          return (
            <div key={q.id} className="rounded-lg border border-line bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="mb-1 inline-flex items-center rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-text-muted">
                    {INTERVIEW_CATEGORY_LABELS[q.category]}
                  </span>
                  <p className="text-sm font-semibold text-text-primary">{q.prompt}</p>
                </div>
                <MatchScoreRing score={feedback.score} size={40} showLabel={false} statusLabels={INTERVIEW_SCORE_LABELS} />
              </div>
              <p className="mt-2 rounded-md bg-surface-2 p-2.5 text-xs text-text-secondary">
                {answer || <span className="italic text-text-muted">Ответ пропущен</span>}
              </p>
              <p className="mt-2 text-xs text-text-secondary">
                <span className="font-semibold text-text-primary">Обратная связь: </span>
                {feedback.comment}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          onClick={restart}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-line px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
        >
          <RotateCcw size={14} />
          Пройти ещё раз
        </button>
        <Link
          href={`/jobs/${listing.id}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Вернуться к вакансии
        </Link>
      </div>
    </div>
  );
}
