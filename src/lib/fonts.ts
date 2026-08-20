import { Manrope, Public_Sans } from "next/font/google";

// Font pairing locked by the Stitch design system (ai/research/design-system.md) —
// a clean, utility-forward pairing distinct from the geometric-tech and serif pairings
// used on the other CCA sites in this batch. Fits this site's practical-tool tone.
export const bodyFont = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const headingFont = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
