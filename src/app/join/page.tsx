import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { JoinForm } from "@/components/forms/JoinForm";
import { TrustBar } from "@/components/shared/TrustBar";
import { FadeIn } from "@/components/animations/FadeIn";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "List Your Business",
  description: "List your spray foam business in the SprayFoamQR directory — submit your credentials for review and get a public trust profile with a QR sticker for your truck.",
};

const steps = [
  "You submit your business, license, insurance summary, and certifications through the form.",
  "A real CCA team member reviews your submission and follows up by email for anything sensitive.",
  "Your profile goes live, and you can request a printed QR sticker for your truck or rig.",
];

export default function JoinPage() {
  return (
    <main>
      <Navbar businessName={site.businessName} phone={site.phone} />

      <section className="pt-36 pb-10 md:pt-44 bg-muted/40">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <FadeIn>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">List Your Business</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold">Get a Trust Profile for Your Business</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Submit your credentials, get reviewed by a real person, and show up in the directory
              with a QR sticker for your truck.
            </p>
          </FadeIn>
        </div>
        <TrustBar />
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <FadeIn direction="left">
              <h2 className="text-2xl font-heading font-bold">What Happens Next</h2>
              <ol className="mt-6 space-y-6">
                {steps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-heading font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm text-muted-foreground">
                Prefer to skip the form? Call{" "}
                <a href={`tel:${site.phoneDigits}`} className="text-primary font-semibold">{site.phone}</a>{" "}
                directly.
              </p>
            </FadeIn>
          </div>
          <div className="lg:col-span-3">
            <FadeIn direction="right" delay={0.1}>
              <JoinForm />
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
