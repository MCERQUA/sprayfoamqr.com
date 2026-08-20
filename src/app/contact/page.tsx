import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ContactForm } from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${site.businessName} with questions about the contractor directory, credential badges, or listing your business.`,
};

export default function ContactPage() {
  return (
    <main>
      <Navbar businessName={site.businessName} phone={site.phone} />
      <section className="pt-36 pb-8 md:pt-44">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-heading font-bold">Get in Touch</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Questions about the directory? Reach out and we&apos;ll respond within one business day.
            </p>
          </FadeIn>
        </div>
      </section>
      <ContactForm />
      <Footer />
    </main>
  );
}
