"use client";
import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle, Phone } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { site } from "@/lib/site";

export function JoinForm() {
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

      if (!res.ok) throw new Error("Failed to send your submission. Please try again or call us directly.");
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
            <h2 className="text-3xl font-heading font-bold">Submission Received</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A CCA team member will review your information and follow up — by email, for
              anything sensitive like your insurance certificate — before your profile goes live.
              We&apos;ll never publish your insurance certificate, policy number, or home address
              on the public page. Questions sooner? Call{" "}
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
      name="join"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="space-y-6 bg-card border border-border rounded-2xl p-6 md:p-8"
    >
      <input type="hidden" name="form-name" value="join" />
      <p className="hidden">
        <label>
          Do not fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <input type="hidden" name="traffic_source" id="__aeo_src_join" ref={srcRef} defaultValue="" />
      <input type="hidden" name="landing_url" id="__aeo_url_join" ref={urlRef} defaultValue="" />

      <p className="text-sm text-muted-foreground bg-muted/40 rounded-lg p-3">
        Please don&apos;t attach or paste sensitive documents (insurance certificates, license
        scans) into this form. Once we review your submission, we&apos;ll follow up by email for
        anything that needs to be collected securely.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="jn-business" className="block text-sm font-medium mb-2">Business Name</label>
          <input id="jn-business" name="business_name" type="text" required placeholder="Your business name"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
        </div>
        <div>
          <label htmlFor="jn-contact" className="block text-sm font-medium mb-2">Your Name</label>
          <input id="jn-contact" name="contact_name" type="text" required placeholder="Contact name"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="jn-phone" className="block text-sm font-medium mb-2">Phone</label>
          <input id="jn-phone" name="phone" type="tel" required placeholder="(555) 555-5555"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
        </div>
        <div>
          <label htmlFor="jn-email" className="block text-sm font-medium mb-2">Email</label>
          <input id="jn-email" name="email" type="email" required placeholder="you@business.com"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="jn-area" className="block text-sm font-medium mb-2">Service Area</label>
          <input id="jn-area" name="service_area" type="text" required placeholder="e.g. Phoenix Metro, AZ"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
        </div>
        <div>
          <label htmlFor="jn-years" className="block text-sm font-medium mb-2">Years in Business</label>
          <input id="jn-years" name="years_in_business" type="number" min="0" required placeholder="e.g. 8"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="jn-license" className="block text-sm font-medium mb-2">License Number &amp; State</label>
          <input id="jn-license" name="license" type="text" required placeholder="e.g. #123456, AZ"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
        </div>
        <div>
          <label htmlFor="jn-insurance" className="block text-sm font-medium mb-2">Insurance Coverage</label>
          <input id="jn-insurance" name="insurance_summary" type="text" required placeholder="e.g. General Liability $2M"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
        </div>
      </div>

      <div>
        <label htmlFor="jn-certs" className="block text-sm font-medium mb-2">Certifications (optional)</label>
        <input id="jn-certs" name="certifications" type="text" placeholder="e.g. SPFA Professional Certification"
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
      </div>

      <div>
        <label htmlFor="jn-notes" className="block text-sm font-medium mb-2">Anything Else? (optional)</label>
        <textarea id="jn-notes" name="notes" rows={4} placeholder="Anything you'd like us to know before we review your submission."
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none" />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        {isSubmitting ? "Submitting..." : (<>Submit for Review <Send className="w-4 h-4" /></>)}
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
