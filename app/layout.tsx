import type { Metadata } from "next";
import { Inter, Noto_Sans_Sinhala, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConversionTracking from "@/components/ConversionTracking";
import { SITE_URL } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // One separator only - two pipes read as clutter in a browser tab. The
  // Sri Lankan keyword phrase lives in the description instead.
  title: `${agent.name} | ${agent.role}, Dubai`,
  // Kept under ~155 characters. The previous version ran to 242 and Google
  // simply truncated it mid-sentence in the results page.
  description:
    "Dubai property for Sri Lankan investors. Ann Fernando, Property Consultant at GCC Real Estate: freehold ownership, strong yields, and the UAE Golden Visa.",
  alternates: { canonical: "/" },
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
