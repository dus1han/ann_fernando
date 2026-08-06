import type { Metadata } from "next";
import { Inter, Noto_Sans_Sinhala, Playfair_Display } from "next/font/google";
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
 * Loaded but not preloaded — costs nothing until a Sinhala string actually
 * renders. The moment SINHALA_ENABLED flips to true this is already wired.
 */
const notoSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-sinhala",
  display: "swap",
  preload: false,
});

const SITE_URL = "https://annfernando.ae"; // TODO: real domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${agent.name} — ${agent.role}, Dubai | Property investment for Sri Lankans`,
  description:
    "Buy Dubai property from anywhere in the world. Ann Fernando is a licensed property consultant in Dubai working with Sri Lankan investors — freehold ownership, 6–9% gross yields, and the UAE Golden Visa.",
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
    title: `${agent.name} — Dubai property, in your language`,
    description:
      "Licensed Dubai property consultant helping Sri Lankan families invest — remotely, and without guesswork.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${agent.name} — ${agent.role}, Dubai`,
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
      </body>
    </html>
  );
}
