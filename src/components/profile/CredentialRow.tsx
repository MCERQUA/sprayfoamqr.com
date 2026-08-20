import type { LucideIcon } from "lucide-react";
import { TrustBadge } from "./TrustBadge";

interface CredentialRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  confirmedAt: string | null | undefined;
}

/** One stacked credential line on a profile page — label, value, and its own badge. */
export function CredentialRow({ icon: Icon, label, value, confirmedAt }: CredentialRowProps) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-border last:border-b-0">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="mt-0.5 text-base font-semibold text-foreground break-words">{value}</p>
      </div>
      <div className="shrink-0 pt-0.5">
        <TrustBadge confirmedAt={confirmedAt} />
      </div>
    </div>
  );
}
