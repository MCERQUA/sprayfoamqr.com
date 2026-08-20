"use client";
import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { site } from "@/lib/site";

export function ContactForm() {
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

      if (!res.ok) throw new Error("Failed to send message. Please try again or call us directly.");
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-24 md:py-32">
        <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
          <FadeIn>
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold">Thank You!</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;ve received your message and will get back to you within one business day. For
              anything urgent, call us at{" "}
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
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <FadeIn direction="left">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Contact Us</p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold">Questions About the Directory?</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Send a question about anything on this site. Looking to list your business or request
              a sticker instead? Use our{" "}
              <a href="/join" className="text-primary underline underline-offset-2">
                List Your Business
              </a>{" "}
              form.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a href={`tel:${site.phoneDigits}`} className="text-sm text-muted-foreground hover:text-primary">
                    {site.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{site.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{site.addressFull}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Do not fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              <input type="hidden" name="traffic_source" id="__aeo_src_contact" ref={srcRef} defaultValue="" />
              <input type="hidden" name="landing_url" id="__aeo_url_contact" ref={urlRef} defaultValue="" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input id="name" name="name" type="text" required placeholder="Your name"
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                  <input id="phone" name="phone" type="tel" required placeholder="(555) 555-5555"
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@email.com"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea id="message" name="message" required rows={5} placeholder="What would you like to know?"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none" />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {isSubmitting ? "Sending..." : (<>Send Message <Send className="w-4 h-4" /></>)}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
