import { websiteUrl, withBase } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-simple">
        <a className="footer-logo" href={websiteUrl}>
          <img src={withBase("/images/brand/kite-logo.png")} alt="KiteCyber" />
        </a>
        <p>© {new Date().getFullYear()} KiteCyber. All rights reserved.</p>
      </div>
    </footer>
  );
}
