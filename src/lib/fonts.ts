import localFont from "next/font/local";

// Font pairing locked by the Stitch design system (ai/research/design-system.md) —
// a clean, utility-forward pairing distinct from the geometric-tech and serif pairings
// used on the other CCA sites in this batch. Fits this site's practical-tool tone.
export const bodyFont = localFont({
  src: [{ path: "./fonts/PublicSans-variable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-body",
  display: "swap",
});

export const headingFont = localFont({
  src: [
    { path: "./fonts/Manrope-variable.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Manrope-variable.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Manrope-variable.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Manrope-variable.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});
