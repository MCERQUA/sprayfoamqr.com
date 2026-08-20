import { ShieldCheck, FileText } from "lucide-react";
import { VERIFICATION_ENABLED } from "@/lib/config";

interface TrustBadgeProps {
  /** externally-checkable claim's confirmedAt — null/absent means not confirmed */
  confirmedAt: string | null | undefined;
}

/**
 * Renders exactly ONE of two states for an externally-checkable claim.
 * When VERIFICATION_ENABLED is false, the "Confirmed" branch is never reached —
 * the component always renders the self-reported badge, regardless of confirmedAt.
 * This is deliberate: a disabled/greyed "verified-ish" badge is worse than none.
 */
export function TrustBadge({ confirmedAt }: TrustBadgeProps) {
  if (VERIFICATION_ENABLED && confirmedAt) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sage/10 text-sage text-xs font-semibold">
        <ShieldCheck className="w-3.5 h-3.5" />
        Confirmed by CCA on {new Date(confirmedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-semibold">
      <FileText className="w-3.5 h-3.5" />
      Documents provided by the contractor
    </span>
  );
}
