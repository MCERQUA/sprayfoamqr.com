import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CTA } from "@/components/sections/CTA";
import { FadeIn } from "@/components/animations/FadeIn";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    publisher: { "@type": "Organization", name: site.businessName },
  };

  return (
    <main>
      <Navbar businessName={site.businessName} phone={site.phone} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="pt-32 pb-16 md:pt-40">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <FadeIn>
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to blog
            </Link>

            <div className="mb-8">
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-md text-xs font-semibold">{post.category}</span>
                <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                <span>&middot;</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight">{post.title}</h1>
            </div>

            {post.image && (
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10">
                <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              </div>
            )}

            <div className="post-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
          </FadeIn>
        </div>
      </article>

      <CTA />
      <Footer />
    </main>
  );
}
