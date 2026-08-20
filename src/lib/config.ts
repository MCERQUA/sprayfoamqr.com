/**
 * v1 launch config. Both flags below intentionally live in data/config, not in
 * component logic — flipping them later is an edit here (or per-record) plus a
 * redeploy, never a rewrite of the rendering components.
 */

/**
 * Master switch for the "Confirmed by CCA" badge state across the ENTIRE site.
 *
 * When false: the confirmed-badge component is never invoked anywhere, regardless
 * of any per-claim `confirmed_at` value in contractors.json. This is deliberate —
 * a disabled/greyed "verified-ish" badge is worse than no badge at all, since a
 * homeowner scanning in a driveway could read it as a weak yes. If verification
 * isn't actually happening yet, the only badge that should exist in the rendered
 * output is the self-reported one ("Documents provided by the contractor").
 *
 * When true: per-claim `confirmed_at` (see src/lib/contractors.ts) controls which
 * of the two badge strings renders for that specific claim.
 */
export const VERIFICATION_ENABLED = false;

/**
 * Single source of truth for sticker-fulfillment commitment language. The
 * request-sticker form, webhook, and confirmation-screen LOGIC are identical
 * regardless of which commitment level is chosen — only this string changes.
 * Currently set to the safest, most honest option (request-only, no timeline
 * promised) per the hard rule: never promise a sticker turnaround time.
 */
export const STICKER_FULFILLMENT_COPY =
  "Your request has been received. A CCA team member will follow up to confirm the details before your sticker is mailed — we don't promise a delivery timeline here, since printing and mailing depends on order volume.";
