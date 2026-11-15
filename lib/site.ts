export const siteName = "KiteCyber";

export const siteDescription =
  "Insights on data loss prevention, cybersecurity, regulatory compliance, and GenAI security.";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kitecyber-blogs.github.io/KiteCyber-Blogs";

export function withBase(src: string) {
  if (!basePath || !src.startsWith("/")) return src;
  return `${basePath}${src}`;
}

export const websiteUrl = "https://www.kitecyber.com/";
