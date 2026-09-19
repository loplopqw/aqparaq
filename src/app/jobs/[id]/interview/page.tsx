import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { MockInterview } from "@/components/interview/MockInterview";
import { getListingById, getListings } from "@/lib/data";

export function generateStaticParams() {
  return getListings().map((l) => ({ id: l.id }));
}

export default async function InterviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar title="MOCK-интервью с ИИ" subtitle={`${listing.title} · ${listing.company}`} />

      <div className="px-4 py-4 sm:px-6">
        <Link
          href={`/jobs/${listing.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent"
        >
          <ArrowLeft size={14} /> Назад к вакансии
        </Link>
      </div>

      <div className="flex-1 px-4 pb-10 sm:px-6">
        <MockInterview listing={listing} />
      </div>
    </div>
  );
}
