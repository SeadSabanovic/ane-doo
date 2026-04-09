import type { MetadataRoute } from "next";
import { getParentCategories, getProducts } from "@/sanity/lib/api";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://ane-doo.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    getProducts(),
    getParentCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/shop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/o-nama`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/kontakt`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${siteUrl}/politika-privatnosti`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/politika-povrata`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/uslovi-koristenja`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products
    .filter((p) => p.slug?.current)
    .map((p) => ({
      url: `${siteUrl}/shop/${p.slug.current}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const categoryRoutes: MetadataRoute.Sitemap = categories
    .filter((c) => c.slug?.current)
    .map((c) => ({
      // Kategorije su u shop filteru preko query parametra.
      url: `${siteUrl}/shop?kategorija=${encodeURIComponent(c.slug.current)}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
