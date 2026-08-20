"use client";
import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle, Phone } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { site } from "@/lib/site";
import { STICKER_FULFILLMENT_COPY } from "@/lib/config";

export function StickerRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const srcRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      let src = p.get("utm_source") || p.get("ref") || "";
      if (!src && document.referrer) {
        try {
          src = new URL(document.referrer).hostname;
        } catch {
          src = document.referrer;
        }
      }
      if (srcRef.current) srcRef.current.value = src || "direct";
      if (urlRef.current) urlRef.current.value = window.location.href;
    } catch {
      /* noop */
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      if (!res.ok) throw new Error("Failed to send your request. Please try again or call us directly.");
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
          <FadeIn>
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold">Request Received</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {STICKER_FULFILLMENT_COPY} Questions sooner? Call{" "}
              <a href={`tel:${site.phoneDigits}`} className="text-primary font-semibold">
                {site.phone}
              </a>
              .
            </p>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <form
      name="stickerrequest"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="space-y-6 bg-card border border-border rounded-2xl p-6 md:p-8"
    >
      <input type="hidden" name="form-name" value="stickerrequest" />
      <p className="hidden">
        <label>
          Do not fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <input type="hidden" name="traffic_source" id="__aeo_src_sticker" ref={srcRef} defaultValue="" />
      <input type="hidden" name="landing_url" id="__aeo_url_sticker" ref={urlRef} defaultValue="" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sr-business" className="block text-sm font-medium mb-2">Business Name / Profile</label>
          <input id="sr-business" name="business_name" type="text" required placeholder="Your listed business name"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
        </div>
        <div>
          <label htmlFor="sr-contact" className="block text-sm font-medium mb-2">Contact Name</label>
          <input id="sr-contact" name="contact_name" type="text" required placeholder="Your name"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sr-phone" className="block text-sm font-medium mb-2">Phone</label>
          <input id="sr-phone" name="phone" type="tel" required placeholder="(555) 555-5555"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
        </div>
        <div>
          <label htmlFor="sr-email" className="block text-sm font-medium mb-2">Email</label>
          <input id="sr-email" name="email" type="email" required placeholder="you@business.com"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
        </div>
      </div>

      <div>
        <label htmlFor="sr-address" className="block text-sm font-medium mb-2">Shipping Address</label>
        <input id="sr-address" name="shipping_address" type="text" required placeholder="Street, City, State, ZIP"
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
      </div>

      <div>
        <label htmlFor="sr-qty" className="block text-sm font-medium mb-2">Quantity</label>
        <input id="sr-qty" name="quantity" type="number" min="1" defaultValue="1" required
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
      </div>

      <div>
        <label htmlFor="sr-notes" className="block text-sm font-medium mb-2">Notes (optional)</label>
        <textarea id="sr-notes" name="notes" rows={3} placeholder="Anything about placement, additional trucks, etc."
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none" />
      </div>

      <p className="text-sm text-muted-foreground bg-muted/40 rounded-lg p-3">{STICKER_FULFILLMENT_COPY}</p>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        {isSubmitting ? "Submitting..." : (<>Request Sticker <Send className="w-4 h-4" /></>)}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Prefer to talk? Call{" "}
        <a href={`tel:${site.phoneDigits}`} className="inline-flex items-center gap-1 text-primary font-semibold">
          <Phone className="w-3.5 h-3.5" />
          {site.phone}
        </a>
      </p>
    </form>
  );
}
