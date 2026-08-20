import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { getListedContractors } from "@/lib/contractors";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url;
  const posts = getAllPosts();
  // Only real, publicly listed contractors — never the demo/QA profile.
  const contractors = getListedContractors();

  const contractorUrls = contractors.map((c) => ({
    url: `${baseUrl}/contractors/${c.slug}`,
    lastModified: new Date(c.memberSince),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...contractorUrls,
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/join`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/request-sticker`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    ...blogUrls,
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
