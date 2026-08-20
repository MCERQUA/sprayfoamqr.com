import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CTA } from "@/components/sections/CTA";
import { Stats } from "@/components/sections/Stats";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { site } from "@/lib/site";
import { FileX, ShieldCheck, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.businessName} is a public directory of spray foam contractor credentials, built by Contractors Choice Agency.`,
};

const values = [
  {
    icon: FileX,
    title: "No Raw Documents, Public",
    text: "Insurance certificates, policy numbers, and home addresses never appear on a public profile &mdash; only a plain-language status line for each credential.",
  },
  {
    icon: ShieldCheck,
    title: "Labeled Honestly, Always",
    text: "A credential is either self-reported or independently confirmed, and the badge always says which &mdash; never a blurred middle state.",
  },
  {
    icon: Users,
    title: "Built by Former-Contractor Experience",
    text: "20+ years of Contractors Choice Agency's contractor-side experience behind the directory, for a trade CCA already works with.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar businessName={site.businessName} phone={site.phone} />

      <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">About Us</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
              A Trust Directory, Not a Sales Page
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Before someone lets a crew spray chemicals in their attic, they should be able to
              know, quickly, who's actually standing on their property. {site.businessName} is a
              public directory of spray foam contractor credentials — license, insurance status,
              and certifications — reachable by scanning a QR sticker on the contractor's truck.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              We're backed by Contractors Choice Agency, bringing over 20 years of
              former-contractor experience to how this is built. Every claim on a profile is
              labeled honestly — contractor-reported or CCA-confirmed — and we never publish the
              underlying insurance certificate, policy number, or home address on a public page.
            </p>
          </FadeIn>
          <FadeIn direction="right" delay={0.15}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/images/about-credibility.jpg" alt={`${site.businessName} trust directory`} fill className="object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold">How We Build This</h2>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="p-8 rounded-xl bg-card border border-border h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: value.text }} />
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <Stats />

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-heading font-bold">Built for a Trade CCA Already Works With</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Contractors Choice Agency works with spray foam contractors across the country today
              &mdash; this directory grows from those same relationships, one reviewed profile at a
              time.
            </p>
          </FadeIn>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
