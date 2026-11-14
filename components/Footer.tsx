import Link from "next/link";
import {
  companyLinks,
  contact,
  legalLinks,
  productLinks,
  resourceLinks,
  socialLinks,
  solutionLinks,
} from "@/lib/site";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <img src="/images/brand/kite-logo.png" alt="KiteCyber" />
          </Link>
          <p>
            Endpoint-native data security for DLP, GenAI, and the audits security teams
            actually have to pass.
          </p>
          <div className="social-row">
            {socialLinks.map((link) => (
              <ExternalLink key={link.href} href={link.href}>
                {link.label}
              </ExternalLink>
            ))}
          </div>
        </div>

        <div>
          <h2>Product</h2>
          <ul>
            {productLinks.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Solutions</h2>
          <ul>
            {solutionLinks.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Resources</h2>
          <ul>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Company</h2>
          <ul>
            {companyLinks.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
          <h2 className="footer-subhead">Contact</h2>
          <address>
            {contact.address}
            <br />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <br />
            <a href={contact.phoneHref}>{contact.phone}</a>
          </address>
        </div>
      </div>

      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} KiteCyber. All rights reserved.</p>
        <p>SOC 2 Type II compliant</p>
        <p className="footer-legal">
          {legalLinks.map((link) => (
            <ExternalLink key={link.href} href={link.href}>
              {link.label}
            </ExternalLink>
          ))}
        </p>
      </div>
    </footer>
  );
}
