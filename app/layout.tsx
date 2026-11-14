import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { BrandBanner } from "@/components/BrandBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { brandImages } from "@/lib/brand";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KiteCyber Blog",
    template: "%s | KiteCyber",
  },
  description: siteDescription,
  applicationName: siteName,
  openGraph: {
    type: "website",
    siteName: siteName,
    title: "KiteCyber Blog",
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#4f35e8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headerImages = brandImages("header");
  const footerImages = brandImages("footer");

  return (
    <html lang="en">
      <body className={manrope.className}>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Header />
        <BrandBanner images={headerImages} slot="header" />
        <main id="content">{children}</main>
        <BrandBanner images={footerImages} slot="footer" />
        <Footer />
      </body>
    </html>
  );
}
