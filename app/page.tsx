import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getAllPosts, toSummary } from "@/lib/posts";
import { demoUrl, productUrl, siteDescription, topics } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "KiteCyber Blog | Data Loss Prevention and Cybersecurity Insights",
  },
  description: siteDescription,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const posts = getAllPosts().map(toSummary);
  const [featured, ...rest] = posts;
  const latest = rest.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="shell hero-copy">
          <p className="kicker kicker-on-tint">Kite cybersecurity insights</p>
          <h1>
            Protect your data. Stay ahead of <span>emerging threats.</span>
          </h1>
          <p className="lede">
            Practical writing on data loss prevention, cybersecurity, regulatory
            compliance, and GenAI security for teams making a buying decision.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/blogs">
              Explore the blogs
            </Link>
            <a className="button button-ghost" href={demoUrl} target="_blank" rel="noopener noreferrer">
              Request a demo
            </a>
          </div>
          <ul className="proof">
            <li>Endpoint-native DLP</li>
            <li>GenAI and AI agent controls</li>
            <li>SOC 2 Type II compliant</li>
          </ul>
        </div>
      </section>

      {featured ? (
        <section className="section">
          <div className="shell">
            <div className="section-head">
              <div>
                <p className="kicker">Editor&apos;s pick</p>
                <h2>Featured article</h2>
                <p className="lede">
                  A current piece for security leaders comparing tools, audits, and
                  day-to-day data protection.
                </p>
              </div>
            </div>
            <PostCard post={featured} featured />
          </div>
        </section>
      ) : null}

      <section className="section" id="latest">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="kicker">From the library</p>
              <h2>Latest insights</h2>
              <p className="lede">
                New shortlists, buyer checklists, and field notes. The full set lives
                in the blogs section.
              </p>
            </div>
            <Link className="button button-ghost" href="/blogs">
              View all blogs
            </Link>
          </div>
          <div className="card-grid">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="topics">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="kicker">Topics</p>
              <h2>What the blogs cover</h2>
              <p className="lede">
                Find a piece by the decision in front of you, then open the full
                library when you want the rest.
              </p>
            </div>
          </div>
          <div className="topic-grid">
            {topics.map((topic) => (
              <Link key={topic.title} href={topic.href} className="topic-card">
                <h3>{topic.title}</h3>
                <p>{topic.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="shell">
          <div className="about-panel">
            <p className="kicker">About this publication</p>
            <h2>Notes from the KiteCyber team</h2>
            <p>
              The KiteCyber Blog brings together practical knowledge and cybersecurity
              insights to help organizations protect their most valuable asset: business
              data.
            </p>
            <p>
              From endpoint-native data loss prevention and insider threat protection
              to regulatory compliance and GenAI security, the articles help security
              teams understand risks and make better data protection decisions.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={productUrl} target="_blank" rel="noopener noreferrer">
                Discover KiteCyber
              </a>
              <Link className="button button-ghost" href="/blogs">
                Browse the blogs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
