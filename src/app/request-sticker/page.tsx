import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { StickerRequestForm } from "@/components/forms/StickerRequestForm";
import { TrustBar } from "@/components/shared/TrustBar";
import { FadeIn } from "@/components/animations/FadeIn";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Sticker",
  description: "Request a printed QR sticker for your spray foam truck or rig, linking directly to your public credentials profile.",
};

const steps = [
  "You submit your business name and shipping address.",
  "A real CCA team member confirms the details with you before anything is printed or mailed.",
  "Your sticker links directly to your public profile — no delivery timeline is promised here.",
];

export default function RequestStickerPage() {
  return (
    <main>
      <Navbar businessName={site.businessName} phone={site.phone} />

      <section className="pt-36 pb-10 md:pt-44 bg-muted/40">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <FadeIn>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Request a Sticker</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold">Get a Sticker for Your Truck</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Already have a listed profile? Request a printed QR sticker that links straight to
              it — the same one shown on your profile page.
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
                Not listed yet?{" "}
                <a href="/join" className="text-primary font-semibold">List your business first</a>.
              </p>
            </FadeIn>
          </div>
          <div className="lg:col-span-3">
            <FadeIn direction="right" delay={0.1}>
              <StickerRequestForm />
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
