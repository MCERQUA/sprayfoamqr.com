import { FadeIn } from "@/components/animations/FadeIn";

const stats = [
  { value: "2", label: "Audiences This Protects — Contractors and Homeowners" },
  { value: "3", label: "Things Never Published Publicly — Raw COIs, Policy Numbers, Home Addresses" },
  { value: "100%", label: "Of Claims Clearly Labeled — Contractor-Reported or CCA-Confirmed" },
  { value: "20+", label: "Years of Combined Contractor-Side Experience Behind It" },
];

/** Inverted contrast band — dark punctuation on this light-dominant site. */
export function Stats() {
  return (
    <section className="py-20 md:py-24 bg-ink">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <FadeIn className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl md:text-5xl font-heading font-bold text-accent">{stat.value}</p>
              <p className="mt-2 text-sm text-ink-foreground/80">{stat.label}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
