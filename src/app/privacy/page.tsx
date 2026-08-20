import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.businessName}.`,
};

export default function PrivacyPage() {
  return (
    <main>
      <Navbar businessName={site.businessName} phone={site.phone} />
      <section className="pt-36 pb-24 md:pt-44">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-heading font-bold mb-8">Privacy Policy</h1>
          <div className="post-prose">
            <p>Last updated: 2026-08-20</p>

            <h2>Information We Collect</h2>
            <p>
              When you submit a contact, listing, or sticker-request form on {site.businessName},
              we collect what you provide — including your name, business name, phone number,
              email address, shipping address, and any credential information you submit (license
              number, insurance summary, certifications). We also record the referring source and
              landing page of your visit for internal marketing attribution.
            </p>

            <h2>What We Publish Publicly vs. What We Hold Privately</h2>
            <p>
              A contractor&apos;s public profile shows a business name, service area, years in
              business, a license number, an insurance status summary, certifications, photos, and
              contact information — information the contractor submitted and chose to make public.
            </p>
            <p>
              We do not publish, on any public page: the underlying insurance certificate or
              policy number, personal home addresses (for sole proprietors), sticker shipping
              addresses, underlying license-verification documents, or internal review notes. That
              information is held privately and used only to review a submission or fulfill a
              sticker request.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We use submitted information to review and, if appropriate, publish a contractor
              profile; to fulfill sticker requests; and to respond to general inquiries. We do not
              sell your personal information to third parties.
            </p>

            <h2>Verification Status</h2>
            <p>
              As of this writing, credentials on this directory are self-reported by contractors
              and labeled &ldquo;Documents provided by the contractor.&rdquo; We are not
              independently verifying credentials against outside sources yet. If and when that
              changes, confirmed items will be labeled &ldquo;Confirmed by CCA&rdquo; with the date
              checked, and this policy will be updated to describe that process.
            </p>

            <h2>Contact</h2>
            <p>Questions about this policy can be directed to {site.email} or {site.phone}.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
