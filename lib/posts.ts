import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "_posts");

export type PostSummary = {
  slug: string;
  title: string;
  dateLabel: string;
  iso: string;
  excerpt: string;
  image?: string;
  imageAlt?: string;
  topics: string[];
  category: string;
};

type Post = PostSummary & { markdown: string; dateValue: number };

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

function collectMarkdown(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collectMarkdown(full));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) files.push(full);
  }
  return files;
}

function parseDate(value: unknown, filename: string): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "string" && value.trim()) {
    const normalized = value
      .trim()
      .replace(" ", "T")
      .replace(/([+-]\d{2})(\d{2})$/, "$1:$2");
    const parsed = new Date(normalized);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  const match = path.basename(filename).match(/^(\d{4}-\d{2}-\d{2})/);
  if (match) return new Date(`${match[1]}T12:00:00+05:30`);
  return new Date(0);
}

function normalizeImageUrl(url: string): string | undefined {
  const cleaned = url.replace(/\{\{[^}]*\}\}/g, "").trim();
  const match = cleaned.match(/images\/([^)\s]+)/i);
  if (!match) return undefined;
  const file = decodeURIComponent(match[1]).split("?")[0];
  const src = `/images/${file.split("/").map((part) => encodeURIComponent(part)).join("/")}`;
  const diskPath = path.join(
    process.cwd(),
    "public",
    src.replace(/^\//, "").split("/").map((part) => decodeURIComponent(part)).join(path.sep),
  );
  return fs.existsSync(diskPath) ? src : undefined;
}

function extractImage(markdown: string): { src?: string; alt?: string } {
  const match = markdown.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  if (!match) return {};
  return { src: normalizeImageUrl(match[2]), alt: match[1] };
}

function rewriteImages(markdown: string): string {
  return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt: string, url: string) => {
    const src = normalizeImageUrl(url);
    return src ? `![${alt}](${src})` : "";
  });
}

function excerptFrom(markdown: string): string {
  const withoutImages = markdown.replace(/!\[[^\]]*\]\([^)]+\)/g, " ");
  const paragraphs = withoutImages
    .split(/\n\s*\n/)
    .map((paragraph) =>
      paragraph
        .replace(/^#+\s+/gm, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`>#]/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter((paragraph) => paragraph.length > 40);

  const text = paragraphs[0] ?? "";
  const words = text.split(" ").filter(Boolean);
  if (words.length <= 36) return words.join(" ");
  return `${words.slice(0, 36).join(" ")}…`;
}

function topicsFor(title: string, markdown: string): string[] {
  const hay = `${title}\n${markdown}`.toLowerCase();
  const topics = ["Data Loss Prevention"];
  if (/genai|chatgpt|ai tool|ai agent|shadow ai|copilot/.test(hay)) {
    topics.push("GenAI Security");
  }
  if (/soc\s*2|iso\s*27001|finra|\bsec\b|pci|audit|compliance|recordkeeping/.test(hay)) {
    topics.push("Compliance");
  }
  return topics;
}

function categoryFor(topics: string[]): string {
  if (topics.includes("GenAI Security")) return "GenAI Security";
  if (topics.includes("Compliance")) return "Compliance";
  return "Data Loss Prevention";
}

function slugBase(filename: string): string {
  return path
    .basename(filename, path.extname(filename))
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .toLowerCase();
}

function loadPosts(): Post[] {
  const files = collectMarkdown(POSTS_DIR).sort();
  const used = new Set<string>();

  const posts = files.map((file) => {
    const raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimStart();
    const parsed = matter(raw);
    const markdown = parsed.content.trim();
    const date = parseDate(parsed.data.date, file);
    const title =
      typeof parsed.data.title === "string" && parsed.data.title.trim()
        ? parsed.data.title.trim()
        : slugBase(file).replace(/-/g, " ");
    const image = extractImage(markdown);
    const topics = topicsFor(title, markdown);

    let slug = slugBase(file);
    if (used.has(slug)) {
      const stamp = date.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
      slug = `${slug}-${stamp}`;
    }
    if (used.has(slug)) slug = `${slug}-${used.size}`;
    used.add(slug);

    return {
      slug,
      title,
      dateLabel: dateFormat.format(date),
      iso: date.toISOString(),
      dateValue: date.getTime(),
      excerpt: excerptFrom(markdown),
      image: image.src,
      imageAlt: image.alt,
      topics,
      category: categoryFor(topics),
      markdown,
    };
  });

  return posts.sort((a, b) => b.dateValue - a.dateValue);
}

let cached: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cached && process.env.NODE_ENV === "production") return cached;
  const posts = loadPosts();
  if (process.env.NODE_ENV === "production") cached = posts;
  return posts;
}

export function toSummary(post: Post): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    dateLabel: post.dateLabel,
    iso: post.iso,
    excerpt: post.excerpt,
    image: post.image,
    imageAlt: post.imageAlt,
    topics: post.topics,
    category: post.category,
  };
}

export function articleBody(markdown: string): string {
  let text = markdown.replace(/^\uFEFF/, "").trim();
  text = text.replace(/^#\s+[^\n]+\n+/, "");
  text = text.replace(/^!\[[^\]]*\]\([^)]+\)\n+/, "");
  return rewriteImages(text).trim();
}

export async function renderPostHtml(markdown: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkHtml).process(articleBody(markdown));
  return String(file).replace(
    /<a href="(https?:\/\/[^"]+)"/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer"',
  );
}

export async function getPost(slug: string) {
  const post = getAllPosts().find((item) => item.slug === slug);
  if (!post) return undefined;
  const html = await renderPostHtml(post.markdown);
  return { ...toSummary(post), html };
}
