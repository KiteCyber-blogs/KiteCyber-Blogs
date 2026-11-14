import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogExplorer } from "@/components/BlogExplorer";
import { getAllPosts, toSummary } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Buyer guides, audit notes, and product comparisons for data loss prevention and GenAI security.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  const posts = getAllPosts().map(toSummary);

  return (
    <>
      <section className="page-intro">
        <div className="shell">
          <p className="kicker">The library</p>
          <h1>Blogs</h1>
          <p className="lede">
            Buyer guides, audit notes, and product comparisons for data loss
            prevention and GenAI security.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <Suspense fallback={<p className="result-count">Loading articles…</p>}>
            <BlogExplorer posts={posts} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
