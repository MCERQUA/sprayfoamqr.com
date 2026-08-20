import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.businessName}.`,
};

export default function TermsPage() {
  return (
    <main>
      <Navbar businessName={site.businessName} phone={site.phone} />
      <section className="pt-36 pb-24 md:pt-44">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-heading font-bold mb-8">Terms of Service</h1>
          <div className="post-prose">
            <p>Last updated: 2026-08-20</p>

            <h2>Use of This Website</h2>
            <p>
              {site.businessName} is a directory of spray foam contractor credentials operated by
              Contractors Choice Agency. Contractor profiles are published after review of
              information submitted by the contractor. Publishing a profile does not constitute an
              endorsement, guarantee, or warranty of any contractor&apos;s work.
            </p>

            <h2>What &ldquo;Confirmed&rdquo; and &ldquo;Provided by the Contractor&rdquo; Mean</h2>
            <p>
              A credential labeled &ldquo;Documents provided by the contractor&rdquo; reflects a
              claim submitted by that business and has not been independently checked by CCA
              against an outside source. A credential labeled &ldquo;Confirmed by CCA&rdquo; means
              CCA checked that specific claim against an outside source on the date shown. Absence
              of the &ldquo;Confirmed&rdquo; label does not imply a credential is false — it means
              only that CCA has not independently checked it.
            </p>

            <h2>Contractor Submissions</h2>
            <p>
              By submitting a business listing, you represent that the information provided is
              accurate to the best of your knowledge. CCA reserves the right to review, edit, or
              decline to publish any submission, and to remove a published profile at its
              discretion, including if information is found to be inaccurate.
            </p>

            <h2>Sticker Requests</h2>
            <p>
              Submitting a sticker request is a request to be contacted about printing and mailing
              a physical QR sticker. It does not create a binding agreement or guaranteed delivery
              timeline — a CCA team member will follow up to confirm details before anything is
              printed or mailed.
            </p>

            <h2>Contact</h2>
            <p>Questions about these terms can be directed to {site.email} or {site.phone}.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
