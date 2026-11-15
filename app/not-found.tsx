import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-intro">
      <div className="shell">
        <p className="kicker">404</p>
        <h1>That page is unavailable.</h1>
        <p className="lede">The blogs library has the current articles.</p>
        <Link className="button button-primary" href="/blogs">
          Go to blogs
        </Link>
      </div>
    </section>
  );
}
