import Link from "next/link";
import { QrCode } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Deliberately minimal — not the full site Navbar. This page is what someone sees
 * in a driveway, on a scan, in under 10 seconds. Every extra element competes with
 * the credentials for attention, so the header is a single small link back to the
 * directory, nothing more.
 */
export function ProfileHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-heading font-bold text-foreground">
          <QrCode className="w-4 h-4 text-primary" />
          {site.businessName}
        </Link>
        <a href={`tel:${site.phoneDigits}`} className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
          {site.phone}
        </a>
      </div>
    </header>
  );
}
