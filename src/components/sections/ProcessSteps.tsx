import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";

const steps = [
  {
    number: "01",
    title: "Contractor Lists Their Business",
    text: "A spray foam business submits their license, insurance, and certifications through a short signup form.",
  },
  {
    number: "02",
    title: "A Real Person Reviews It",
    text: "A CCA team member reviews the submission before anything goes live &mdash; no self-serve publishing of credential claims.",
  },
  {
    number: "03",
    title: "The Profile Goes Live",
    text: "A public credentials page is published, and a QR sticker is generated linking directly to it.",
  },
  {
    number: "04",
    title: "Anyone Can Scan It On-Site",
    text: "A homeowner or GC scans the sticker on the truck and sees the credentials in about 10 seconds, before work starts.",
  },
];

export function ProcessSteps() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold">From Signup to the Job Site</h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="relative">
                <span className="text-5xl font-heading font-bold text-primary/20">{step.number}</span>
                <h3 className="mt-3 text-lg font-heading font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: step.text }} />
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
