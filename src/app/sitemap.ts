import type { MetadataRoute } from "next";

// 1. Function to escape XML special characters (especially & to &amp;)
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// 2. Function to convert Relative Image URL to Absolute URL and escape XML
function formatImageUrl(url: string | null | undefined, baseUrl: string): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  let fullUrl = trimmed;
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    fullUrl = `${baseUrl}${cleanPath}`;
  }
  return escapeXml(fullUrl);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emran.work";
  const featuredImg = formatImageUrl("/emran-hossen-developer-2026.webp", baseUrl);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      images: featuredImg ? [featuredImg] : undefined,
    },
  ];
}
