import Link from "next/link";
import { MapPin, Calendar, ArrowRight, QrCode } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { getListedContractors } from "@/lib/contractors";

function ContractorCard({ contractor }: { contractor: ReturnType<typeof getListedContractors>[number] }) {
  return (
    <Link href={`/contractors/${contractor.slug}`} className="group block h-full">
      <article className="p-6 rounded-xl bg-card border border-border group-hover:border-primary/40 transition-colors h-full flex flex-col">
        <h3 className="text-lg font-heading font-semibold group-hover:text-primary transition-colors">
          {contractor.businessName}
        </h3>
        <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {contractor.serviceArea}
          </p>
          <p className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            {contractor.yearsInBusiness}+ years in business
          </p>
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          View profile <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </article>
    </Link>
  );
}

/**
 * The core directory listing. Deliberately renders an honest empty state instead
 * of fabricated sample contractors — the directory compounds over time as real
 * profiles get added; it starts truthfully at zero.
 */
export function ContractorGrid() {
  const contractors = getListedContractors();

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">The Directory</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold">Spray Foam Contractors</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every listed contractor has a public credentials profile linked from a QR sticker on their truck.
          </p>
        </FadeIn>

        {contractors.length > 0 ? (
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {contractors.map((c) => (
              <StaggerItem key={c.slug}>
                <ContractorCard contractor={c} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        ) : (
          <FadeIn className="max-w-xl mx-auto text-center p-10 rounded-xl bg-muted/40 border border-border">
            <QrCode className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-heading font-semibold">The Directory Is Just Getting Started</h3>
            <p className="mt-3 text-muted-foreground">
              No contractors are listed publicly yet. If you run a spray foam business, you can be
              among the first CCA-network contractors added.
            </p>
            <Link
              href="/join"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
            >
              List Your Business
            </Link>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
