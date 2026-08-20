import { ScanLine, ShieldCheck, FileX, Users } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";

const points = [
  {
    icon: ScanLine,
    title: "Answers a Real Question, Fast",
    text: "Before someone lets a crew spray chemicals in their attic, they can know who's actually standing on their property — in the time it takes to scan a sticker.",
  },
  {
    icon: FileX,
    title: "We Never Publish Raw Documents",
    text: "No insurance certificates, no policy numbers, no home addresses go on the public page. Only a plain-language status line for each credential.",
  },
  {
    icon: ShieldCheck,
    title: "Every Claim Is Labeled, Not Blurred",
    text: "A credential is either &ldquo;documents provided by the contractor&rdquo; or &ldquo;confirmed by CCA on [date]&rdquo; &mdash; never something in between that could be misread as a stronger guarantee than it is.",
  },
  {
    icon: Users,
    title: "Built by an Agency That Works With Contractors",
    text: "20+ years of Contractors Choice Agency's contractor-side relationships, not a cold outside vendor guessing at what this trade actually needs.",
  },
];

export function WhyThisMatters() {
  return (
    <section className="py-24 md:py-32 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why This Exists</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold">A Trust Tool, Built Honestly</h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {points.map((point) => (
            <StaggerItem key={point.title}>
              <div className="p-8 rounded-xl bg-card border border-border h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <point.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: point.text }} />
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
