import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ContractorGrid } from "@/components/sections/ContractorGrid";
import { WhyThisMatters } from "@/components/sections/WhyThisMatters";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Stats } from "@/components/sections/Stats";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/lib/site";

const homeFAQs = [
  {
    question: "What does scanning the QR sticker actually show me?",
    answer:
      "The contractor's public credentials profile: business name, service area, years in business, license, insurance status, and certifications — each clearly labeled as either contractor-reported or CCA-confirmed. No sales pitch, no popup.",
  },
  {
    question: "Do you publish the actual insurance certificate or policy number?",
    answer:
      "No, and we never will on the public page. You'll see a plain-language status line like \"General Liability $2M — carrier on file\" — the underlying document stays private. A general contractor who needs the actual certificate can request it directly.",
  },
  {
    question: "What does \"Documents provided by the contractor\" mean?",
    answer:
      "It means the contractor submitted that claim themselves and CCA has not yet independently confirmed it against an outside source. We label it this way instead of implying more certainty than actually exists.",
  },
  {
    question: "Is every contractor on here independently verified?",
    answer:
      "Not yet, as of this launch — every credential on the directory today is self-reported and labeled that way. We're building toward independent verification; when a claim has actually been checked, it will say \"Confirmed by CCA\" with the date.",
  },
  {
    question: "How does a contractor get listed?",
    answer:
      "They submit their business and credential information through our signup form. A real CCA team member reviews it before the profile goes live — this isn't a self-serve, instantly-published directory.",
  },
  {
    question: "How does the physical sticker work?",
    answer:
      "Once a contractor's profile is live, they can request a printed QR sticker for their truck or rig. It's a request a real person fulfills — we don't promise a specific delivery timeline.",
  },
];

export default function HomePage() {
  return (
    <main>
      <Navbar businessName={site.businessName} phone={site.phone} />

      <Hero
        title="Know Who's Spraying Your Attic"
        subtitle="Scan the QR sticker on a contractor's truck and see their license, insurance status, and certifications in about 10 seconds — before any work starts."
        image="/images/hero-scan-driveway.jpg"
        imageAlt="A homeowner scanning a QR code sticker on a spray foam contractor's truck in a driveway"
      />

      <div id="directory">
        <ContractorGrid />
      </div>
      <WhyThisMatters />
      <ProcessSteps />
      <Stats />
      <TrustSignals />

      <FAQ
        title="How This Directory Works"
        subtitle="Real questions people ask about the credentials and the badges."
        faqs={homeFAQs}
      />

      <CTA />
      <Footer />
    </main>
  );
}
