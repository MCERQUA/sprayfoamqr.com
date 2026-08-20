---
title: "What \"Confirmed by CCA\" Will Actually Mean When Verification Launches"
description: "Every credential on this directory is self-reported today. Here's an honest look at what independent verification would actually require, and why we haven't turned it on yet."
date: "2026-08-14"
category: "How It Works"
image: "/images/topic-durable-tag.jpg"
---

We could have launched this directory with a green "Verified" checkmark on every profile from day one. We didn't, on purpose — and it's worth explaining what real verification would actually require, since that's exactly why it isn't live yet.

## What "Confirmed" Would Actually Require, Per Claim

A license number isn't confirmed by looking at what a contractor typed into a form — it's confirmed by checking that number against the relevant state licensing board's public lookup tool and confirming it's active, current, and registered to that business. Insurance isn't confirmed by a contractor saying "General Liability $2M" — it's confirmed by contacting the carrier or broker directly and getting them to verify the policy is active and the coverage amount is accurate. A certification isn't confirmed by a contractor listing it — it's confirmed by checking with the issuing manufacturer or body (like SPFA) that the certification is real and current.

Every one of those checks takes real time from a real person, per contractor, per claim, and needs to be repeated periodically since licenses lapse and policies change. That's a genuine operational commitment, not a checkbox to flip.

## Why We Didn't Fake It in the Meantime

The easy, wrong shortcut would have been to show a "Verified" badge based only on a contractor submitting documentation, without CCA actually checking it against anything. That's precisely the failure mode this entire directory exists to prevent — a badge that implies more certainty than actually exists, read by someone standing in their driveway who doesn't have time to investigate further. We built the badge system so that outcome is structurally impossible: the "Confirmed by CCA" label only exists in the code path when `VERIFICATION_ENABLED` is on and a specific claim actually has a confirmation date attached to it. Until both of those are true for a given claim, only the honest self-reported label can render.

## What Happens When We Do Turn It On

When independent verification launches, it will almost certainly roll out claim-by-claim and contractor-by-contractor, not as a single flip for the whole directory at once — license checks are a different process than insurance checks, and both take real staff time to do properly. You should expect to see a mix, for a while, of some claims marked "Confirmed by CCA" and others still marked "Documents provided by the contractor" on the very same profile. That's not a bug or an inconsistency — it's the honest reflection of which specific things have actually been checked so far.

## Why This Is Worth Explaining in Public

We'd rather a contractor or homeowner reading this understand exactly where the honesty line sits today than assume more rigor exists than actually does. If you're a contractor listed here, this is also our answer to "why doesn't my profile say Verified yet" — it's not a judgment about your business, it's simply that CCA hasn't done the external check yet.

[Read how the two badges work today](/how-it-works), or [list your business](/join) to be part of the directory as this develops.
