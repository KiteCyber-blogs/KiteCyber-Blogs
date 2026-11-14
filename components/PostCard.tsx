import Link from "next/link";
import type { PostSummary } from "@/lib/posts";

export function PostCard({
  post,
  featured = false,
}: {
  post: PostSummary;
  featured?: boolean;
}) {
  return (
    <article className={featured ? "post-card post-card-featured" : "post-card"}>
      <div className="post-card-media">
        {post.image ? (
          <img src={post.image} alt="" />
        ) : (
          <span className="post-card-fallback" aria-hidden="true" />
        )}
      </div>
      <div className="post-card-body">
        <p className="kicker">{post.category}</p>
        <h3>
          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
        </h3>
        <time dateTime={post.iso}>{post.dateLabel}</time>
        <p>{post.excerpt}</p>
        <span className="text-link">Read article</span>
      </div>
    </article>
  );
}
