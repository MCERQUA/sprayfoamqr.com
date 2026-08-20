import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main>
      <Navbar businessName={site.businessName} phone={site.phone} />
      <section className="pt-40 pb-24 text-center px-4">
        <h1 className="text-5xl font-heading font-bold">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">We couldn&apos;t find that page.</p>
        <Link href="/" className="mt-8 inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl">
          Back to Home
        </Link>
      </section>
      <Footer />
    </main>
  );
}
