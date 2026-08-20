import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ShieldCheck, Award, Phone, Mail, Calendar, MapPin, Info } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { CredentialRow } from "@/components/profile/CredentialRow";
import { FadeIn } from "@/components/animations/FadeIn";
import { getAllContractors, getContractorBySlug } from "@/lib/contractors";
import { site } from "@/lib/site";
import { VERIFICATION_ENABLED } from "@/lib/config";

export function generateStaticParams() {
  return getAllContractors().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const contractor = getContractorBySlug(slug);
  if (!contractor) return {};
  return {
    title: `${contractor.businessName} — Spray Foam Contractor in ${contractor.serviceArea}`,
    description: `Credentials profile for ${contractor.businessName}: license, insurance status, and certifications. Scan the QR sticker on their truck to view this page.`,
    robots: contractor.isDemo ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function ContractorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const contractor = getContractorBySlug(slug);
  if (!contractor) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: contractor.businessName,
    areaServed: contractor.serviceArea,
    telephone: contractor.phone,
    email: contractor.email,
  };

  return (
    <main className="min-h-screen flex flex-col">
      <ProfileHeader />

      {!contractor.isDemo && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}

      {contractor.isDemo && (
        <div className="bg-accent/20 border-b border-accent/40 text-center py-2 px-4 text-sm font-semibold text-secondary">
          Sample profile for demonstration only — not a real contractor.
        </div>
      )}

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 md:py-12">
        {/* Identity block — no full-bleed hero image here on purpose: this page is
            read in ~10 seconds on a phone in a driveway, so information density
            above the fold matters more than a hero photo. */}
        <FadeIn>
          <h1 className="text-2xl md:text-4xl font-heading font-bold leading-tight">
            {contractor.businessName}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {contractor.serviceArea}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {contractor.yearsInBusiness}+ years in business
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Member since {new Date(contractor.memberSince).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
          </p>
        </FadeIn>

        {/* Credentials — the core of the page */}
        <FadeIn delay={0.05} className="mt-6 rounded-xl border border-border bg-card px-5">
          <CredentialRow
            icon={BadgeCheck}
            label="License"
            value={`#${contractor.license.number} (${contractor.license.state})`}
            confirmedAt={contractor.license.confirmedAt}
          />
          <CredentialRow
            icon={ShieldCheck}
            label="Insurance"
            value={`${contractor.insurance.coverageLabel} — carrier on file`}
            confirmedAt={contractor.insurance.confirmedAt}
          />
          {contractor.certifications.map((cert) => (
            <CredentialRow
              key={cert.name}
              icon={Award}
              label="Certification"
              value={`${cert.name} — ${cert.issuer}`}
              confirmedAt={cert.confirmedAt}
            />
          ))}
        </FadeIn>

        {/* Badge legend — critical so a cold scan doesn't misread the badges */}
        <FadeIn delay={0.1} className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg p-3">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            {VERIFICATION_ENABLED
              ? "“Documents provided by the contractor” means self-reported and not yet checked by CCA. “Confirmed by CCA” means CCA checked it against the source on the date shown."
              : "Every credential above is self-reported by the contractor and has not yet been independently checked by CCA. "}
            {!VERIFICATION_ENABLED && (
              <Link href="/how-it-works" className="underline underline-offset-2 text-primary">
                Read how this works
              </Link>
            )}
          </span>
        </FadeIn>

        {/* Photos of completed work */}
        {contractor.photos.length > 0 && (
          <FadeIn delay={0.15} className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Completed Work
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {contractor.photos.map((photo) => (
                <div key={photo} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image src={photo} alt={`${contractor.businessName} completed work`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Contact — this contractor's own info, not CCA's */}
        <FadeIn delay={0.2} className="mt-8 rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Contact {contractor.businessName}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${contractor.phone.replace(/\D/g, "")}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4" /> {contractor.phone}
            </a>
            <a
              href={`mailto:${contractor.email}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-border font-semibold rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </FadeIn>

        {/* This profile's own QR — the same one printed on the contractor's sticker */}
        <FadeIn delay={0.25} className="mt-8 flex flex-col items-center text-center">
          <Image
            src={`/qr/${contractor.slug}.svg`}
            alt={`QR code linking to this profile`}
            width={140}
            height={140}
            className="rounded-lg border border-border bg-card p-2"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            This is the QR code printed on {contractor.businessName}&apos;s truck sticker.
          </p>
        </FadeIn>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          This profile is hosted by {site.businessName}, a Contractors Choice Agency directory.{" "}
          <Link href="/how-it-works" className="underline underline-offset-2">How this works</Link>
        </p>
      </div>

      <Footer />
    </main>
  );
}
