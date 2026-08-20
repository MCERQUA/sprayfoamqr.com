import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on how the directory works, how to read a trust profile, and why we never publish raw insurance documents.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Navbar businessName={site.businessName} phone={site.phone} />

      <section className="pt-36 pb-12 md:pt-44 bg-muted/40">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-heading font-bold">Notes on How This Works</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Support reading for both audiences — homeowners scanning a sticker, and contractors
              considering a profile.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="rounded-xl overflow-hidden bg-card border border-border group-hover:border-primary/30 transition-colors h-full flex flex-col">
                    {post.image && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-md">
                          {post.category}
                        </div>
                      </div>
                    )}
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                        <span>&middot;</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="text-lg font-heading font-semibold group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-grow">{post.description}</p>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <Footer />
    </main>
  );
}
