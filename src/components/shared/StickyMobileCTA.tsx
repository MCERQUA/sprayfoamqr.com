import Link from "next/link";
import { Phone, QrCode } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Mobile-only sticky bottom bar. Direct tel: link — no modal, no confirmation step.
 */
export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-primary shadow-[0_-4px_16px_rgba(0,0,0,0.15)] flex">
      <a
        href={`tel:${site.phoneDigits}`}
        className="flex-1 flex items-center justify-center gap-2 py-4 text-center text-primary-foreground font-bold cursor-pointer"
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
      <Link
        href="/join"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-center text-primary-foreground font-bold border-l border-white/25 cursor-pointer"
      >
        <QrCode className="w-4 h-4" />
        List Business
      </Link>
    </div>
  );
}
