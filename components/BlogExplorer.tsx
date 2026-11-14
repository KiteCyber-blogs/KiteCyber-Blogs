"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import type { PostSummary } from "@/lib/posts";

const TOPICS = ["All", "Data Loss Prevention", "GenAI Security", "Compliance"] as const;

export function BlogExplorer({ posts }: { posts: PostSummary[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const requested = params.get("topic");
  const topic =
    requested && TOPICS.includes(requested as (typeof TOPICS)[number]) ? requested : "All";
  const [query, setQuery] = useState("");

  const topics = TOPICS.filter(
    (item) => item === "All" || posts.some((post) => post.topics.includes(item)),
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTopic = topic === "All" || post.topics.includes(topic);
      const hay = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      return matchesTopic && hay.includes(needle);
    });
  }, [posts, query, topic]);

  function selectTopic(next: string) {
    const href = next === "All" ? "/blogs" : `/blogs?topic=${encodeURIComponent(next)}`;
    router.replace(href, { scroll: false });
  }

  const emptyMessage = query.trim()
    ? "No articles match that search."
    : "No articles in this topic yet.";

  return (
    <div>
      <div className="toolbar">
        <div className="filters" role="group" aria-label="Filter by topic">
          {topics.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={topic === item}
              onClick={() => selectTopic(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="search">
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={query}
            placeholder="Search articles"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <p className="result-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
      </p>

      {filtered.length === 0 ? (
        <p className="empty">{emptyMessage}</p>
      ) : (
        <div className="card-grid">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
