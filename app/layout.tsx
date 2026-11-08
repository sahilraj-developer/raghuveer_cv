import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "RaghuveerCV — PC Builds, Tech Videos & Funny Computer Vlogs",
    template: "%s | RaghuveerCV",
  },
  description: site.description,
  keywords: [
    "RaghuveerCV",
    "PC build",
    "gaming PC",
    "computer vlog",
    "laptop upgrade",
    "desktop upgrade",
    "Ranchi tech creator",
    "tech content creator",
  ],
  authors: [{ name: "RaghuveerCV" }],
  creator: "RaghuveerCV",
  alternates: { canonical: "https://raghuveer.cv" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "RaghuveerCV — PC Builds & Tech Vlogs",
    description: site.description,
    siteName: "RaghuveerCV",
    url: "https://raghuveer.cv",
    images: [{ url: site.profileImage, width: 900, height: 900, alt: "RaghuveerCV profile" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RaghuveerCV — PC Builds & Tech Vlogs",
    description: site.description,
    images: [site.profileImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
