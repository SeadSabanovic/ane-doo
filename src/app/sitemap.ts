import type { MetadataRoute } from "next";
import { getProducts } from "@/sanity/lib/api";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://ane-doo.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/katalog`, changeFrequency: "daily", priority: 0.9 },
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
      url: `${siteUrl}/katalog/${p.slug.current}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...productRoutes];
}
