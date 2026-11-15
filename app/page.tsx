import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogExplorer } from "@/components/BlogExplorer";
import { getAllPosts, toSummary } from "@/lib/posts";
import { siteDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "KiteCyber Blog | Data Loss Prevention and Cybersecurity Insights",
  },
  description: siteDescription,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const posts = getAllPosts().map(toSummary);

  return (
    <>
      <section className="hero">
        <div className="shell hero-copy">
          <p className="kicker">Kite cybersecurity insights</p>
          <h1>
            Protect your data. Stay ahead of <span>emerging threats.</span>
          </h1>
          <p className="lede">
            Practical writing on data loss prevention, cybersecurity, regulatory
            compliance, and GenAI security.
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
