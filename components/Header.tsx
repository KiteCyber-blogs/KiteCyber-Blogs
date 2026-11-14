"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { demoUrl, trialUrl } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/#topics", label: "Topics" },
  { href: "/#about", label: "About" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="shell header-bar">
        <Link href="/" className="logo">
          <img src="/images/brand/kite-logo.png" alt="KiteCyber" />
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <div className={open ? "header-panel is-open" : "header-panel"} id="site-nav">
          <nav className="site-nav" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(pathname, link.href) ? "nav-link is-active" : "nav-link"}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <a className="button button-ghost" href={trialUrl} target="_blank" rel="noopener noreferrer">
              Start Free Trial
            </a>
            <a className="button button-primary" href={demoUrl} target="_blank" rel="noopener noreferrer">
              Request a Demo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
