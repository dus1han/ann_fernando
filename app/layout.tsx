import type { Metadata } from "next";
import { Inter, Noto_Sans_Sinhala, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConversionTracking from "@/components/ConversionTracking";
import { agent } from "@/content/copy";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Loaded but not preloaded - costs nothing until a Sinhala string actually
 * renders. The moment SINHALA_ENABLED flips to true this is already wired.
 */
const notoSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-sinhala",
  display: "swap",
  preload: false,
});

/**
 * ⚠ This must resolve to a URL that is actually reachable.
 *
 * `metadataBase` is what Next uses to turn the share card into an absolute
 * og:image URL. It was hardcoded to a placeholder domain that does not exist,
 * so Facebook and WhatsApp were being told to fetch the preview image from a
 * dead host - which is why link previews came back blank.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL - override in Vercel if the domain ever changes
 *   2. The live domain
 *   3. localhost, only when running outside a deployment
 */
const PRODUCTION_URL = "https://annfernando.com";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL ? PRODUCTION_URL : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // One separator only - two pipes read as clutter in a browser tab. The
  // Sri Lankan keyword phrase lives in the description instead.
  title: `${agent.name} | ${agent.role}, Dubai`,
  description:
    "Buy Dubai property from anywhere in the world. Ann Fernando is a property consultant with GCC Real Estate, a DLD-registered brokerage in Dubai, working with Sri Lankan investors: freehold ownership, 6–9% gross yields, and the UAE Golden Visa.",
  keywords: [
    "Dubai property for Sri Lankans",
    "invest in Dubai real estate",
    "Sri Lankan property consultant Dubai",
    "Dubai Golden Visa property",
    "buy Dubai property from Sri Lanka",
    "Ann Fernando real estate",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${agent.name} · ${agent.company}`,
    title: `${agent.name} | Dubai property, in your language`,
    description:
      "Dubai property consultant with GCC Real Estate, helping Sri Lankan families invest remotely, and without guesswork.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${agent.name} | ${agent.role}, Dubai`,
    description:
      "Dubai property investment guidance for Sri Lankan buyers, at home and abroad.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: agent.name,
    jobTitle: agent.role,
    url: SITE_URL,
    telephone: agent.phone,
    email: agent.email,
    areaServed: ["Dubai", "United Arab Emirates"],
    knowsLanguage: ["en", "si", "ta"],
    worksFor: { "@type": "Organization", name: agent.company },
    address: {
      "@type": "PostalAddress",
      streetAddress: agent.address,
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    sameAs: [agent.instagram, agent.facebook, agent.companySite],
  };

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${notoSinhala.variable} grain antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}

        {/* Traffic and Core Web Vitals, straight from Vercel. No cookies, so
            no consent banner is required. */}
        <Analytics />
        <SpeedInsights />
        <ConversionTracking />
      </body>
    </html>
  );
}
