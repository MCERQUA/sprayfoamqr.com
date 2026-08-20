import type { Metadata } from "next";
import Link from "next/link";
import { ScanLine, FileText, ShieldCheck, QrCode, Info } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CTA } from "@/components/sections/CTA";
import { FadeIn } from "@/components/animations/FadeIn";
import { site } from "@/lib/site";
import { VERIFICATION_ENABLED } from "@/lib/config";

export const metadata: Metadata = {
  title: "How It Works",
  description: "How the SprayFoamQR directory, the two credential badges, and the truck sticker actually work — for homeowners, general contractors, and spray foam businesses.",
};

export default function HowItWorksPage() {
  return (
    <main>
      <Navbar businessName={site.businessName} phone={site.phone} />

      <section className="pt-36 pb-16 md:pt-44 md:pb-20 bg-muted/40">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-heading font-bold">How This Actually Works</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Two audiences, one profile page. Here&apos;s exactly what happens on both sides,
              stated plainly.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-heading font-bold flex items-center gap-3">
              <ScanLine className="w-7 h-7 text-primary" /> If You&apos;re Scanning the Sticker
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              You saw a QR sticker on a spray foam truck or rig — maybe at your own house, maybe
              next door. Scanning it opens that specific contractor&apos;s public profile: business
              name, service area, years in business, license number, insurance status, and any
              certifications, plus photos of their completed work. No app, no login, no sales pitch
              in the way.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We deliberately never publish the underlying insurance certificate or a policy number
              on that page — those stay private. What you see is a plain-language status line
              instead, like <span className="font-semibold text-foreground">&ldquo;General
              Liability $2M — carrier on file.&rdquo;</span> If you need the actual document (a
              general contractor doing due diligence, for example), that&apos;s a direct request to
              the contractor, not a public download.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-12 p-6 rounded-xl bg-muted/50 border border-border">
            <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" /> The Two Badges — Read This Before You Trust Either One
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-semibold shrink-0 mt-0.5">
                  <FileText className="w-3.5 h-3.5" /> Documents provided by the contractor
                </span>
                <p className="text-sm text-muted-foreground">
                  The contractor submitted this claim themselves. Nobody outside the business has
                  independently checked it yet. This is the badge on {VERIFICATION_ENABLED ? "some" : "every single"} credential on the directory right now.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sage/10 text-sage text-xs font-semibold shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Confirmed by CCA on [date]
                </span>
                <p className="text-sm text-muted-foreground">
                  CCA independently checked this specific claim against an outside source (the
                  state licensing board, the insurance carrier, the certifying body) on the date
                  shown.{" "}
                  {VERIFICATION_ENABLED
                    ? "This badge only appears where that check has actually happened."
                    : "This badge does not exist anywhere on the site yet — independent verification isn't live as of this launch. When it is, this exact badge will start appearing on the specific claims we've actually checked, and nowhere else."}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold flex items-center gap-3">
              <QrCode className="w-7 h-7 text-primary" /> If You&apos;re a Contractor
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              You submit your business information, license, insurance details, and certifications
              through a short form. A real CCA team member reviews the submission — this isn&apos;t
              instant, self-serve publishing. Once it&apos;s live, your profile is a public,
              indexable page other people can find, and you can request a printed QR sticker sized
              for a truck door or rig panel.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We&apos;ll never publish your insurance certificate, policy number, or home address on
              the public page — only the summary status line. If you&apos;d rather we didn&apos;t
              list a particular detail publicly at all, tell us during signup.
            </p>
          </FadeIn>
        </div>
      </section>

      <CTA
        title="Ready to Get Listed?"
        description="Submit your business and credentials — a real person reviews it before anything goes public."
        primaryCTA="List Your Business"
        primaryHref="/join"
      />
      <Footer />
    </main>
  );
}
