import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { getAllPosts, getPost, toSummary } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .map((item) => ({
      post: item,
      score: item.topics.filter(
        (topic) => topic !== "Data Loss Prevention" && post.topics.includes(topic),
      ).length,
    }))
    .sort((a, b) => b.score - a.score || b.post.dateValue - a.post.dateValue)
    .slice(0, 3)
    .map((item) => toSummary(item.post));

  return (
    <article className="post-layout">
      <p className="breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/blogs">Blogs</Link>
      </p>
      <p className="kicker">{post.category}</p>
      <h1>{post.title}</h1>
      <time dateTime={post.iso}>{post.dateLabel}</time>
      {post.image ? (
        <img className="post-hero-image" src={post.image} alt={post.imageAlt ?? ""} />
      ) : null}
      <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />

      {related.length > 0 ? (
        <section className="related">
          <h2>More from the blogs</h2>
          <div className="card-grid">
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
