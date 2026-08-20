import { FileX, ShieldCheck, Users, MapPin } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";

const signals = [
  {
    icon: FileX,
    title: "No Raw Documents, Ever",
    text: "Insurance certificates and policy numbers stay off the public profile entirely &mdash; only a plain-language status line is shown.",
  },
  {
    icon: ShieldCheck,
    title: "Honest About What's Verified",
    text: "If something hasn't been independently checked yet, the page says so plainly &mdash; we never dress up a contractor's own claim as a confirmed one.",
  },
  {
    icon: Users,
    title: "A Human Reviews Every Signup",
    text: "New contractor profiles aren't self-serve &mdash; a real person reviews the submission before anything goes live on the public directory.",
  },
  {
    icon: MapPin,
    title: "Backed by Contractors Choice Agency",
    text: "20+ years of former-contractor experience behind the directory, built for a trade CCA already works with every day.",
  },
];

/** Real, verifiable trust markers — deliberately no fabricated star ratings or named testimonials. */
export function TrustSignals() {
  return (
    <section className="py-24 md:py-32 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why Trust This Directory</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold">Transparency Over Trust Theater</h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {signals.map((signal) => (
            <StaggerItem key={signal.title}>
              <div className="p-6 rounded-xl bg-card border border-border h-full text-center">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <signal.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold">{signal.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: signal.text }} />
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
