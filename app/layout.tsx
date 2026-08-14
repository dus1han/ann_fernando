import type { Metadata } from "next";
import { Inter, Noto_Sans_Sinhala, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConversionTracking from "@/components/ConversionTracking";
import { SITE_URL } from "@/lib/site";
import { agent, faq } from "@/content/copy";
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
  /**
   * ⚠ "Property Consultant, Dubai" is required in the title. Ann's call, do not
   * swap it out for a keyword phrase.
   *
   * One separator only; two pipes read as clutter in a browser tab. The Sri
   * Lankan phrase lives in the description and the OpenGraph title instead,
   * both of which Google also reads.
   */
  title: `${agent.name} | ${agent.role}, Dubai`,
  // Kept under ~155 characters. The previous version ran to 242 and Google
  // simply truncated it mid-sentence in the results page.
  description:
    "Dubai property for Sri Lankan investors. Ann Fernando, Property Consultant at GCC Real Estate: freehold ownership, strong yields, and the UAE Golden Visa.",
  alternates: { canonical: "/" },
  /**
   * ⚠ This tag does nothing for Google. It has been ignored as a ranking signal
   * since 2009, and Google has said so publicly. It is kept only because a few
   * minor engines still read it and it costs nothing.
   *
   * What actually ranks this page is the visible copy, the title above, and
   * links pointing at it. If you want to target a new phrase, put it in a
   * heading or a paragraph a reader will actually see. Adding it here achieves
   * nothing at all.
   */
  keywords: [
    "Dubai property for Sri Lankans",
    "invest in Dubai real estate from Sri Lanka",
    "buy Dubai property from Sri Lanka",
    "Sri Lankan property consultant Dubai",
    "Sri Lankan real estate agent Dubai",
    "Dubai Golden Visa property investment",
    "Dubai property investment for Sri Lankan expats",
    "Dubai off plan property Sri Lanka",
    "Dubai rental yields for foreign buyers",
    "freehold property Dubai foreign ownership",
    "Dubai property Colombo",
    "Ann Fernando real estate",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    // Google reads this as a site-name candidate too, so it must agree with the
    // WebSite node below. When they disagreed, Google printed the bare domain.
    siteName: agent.name,
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
  /**
   * Two nodes, not one.
   *
   * The RealEstateAgent node alone was why Google printed "annfernando.com" as
   * the site name above the result. Its site-name feature looks for a WebSite
   * node's `name` on the home page first, then og:site_name, and falls back to
   * the bare domain when it finds neither. There was no WebSite node.
   *
   * `name` here, og:site_name above and the <title> must all say the same thing,
   * or Google picks for itself.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: agent.name,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}#agent` },
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${SITE_URL}#agent`,
        name: agent.name,
        jobTitle: agent.role,
        url: SITE_URL,
        telephone: agent.phone,
        email: agent.email,
        // Sri Lanka is listed because that is where the clients are, not where
        // the property is. Both are genuine service areas.
        areaServed: ["Dubai", "United Arab Emirates", "Sri Lanka"],
        knowsLanguage: ["en", "si", "ta"],
        worksFor: { "@type": "Organization", name: agent.company },
        address: {
          "@type": "PostalAddress",
          streetAddress: agent.address,
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
        sameAs: [agent.instagram, agent.facebook, agent.companySite],
      },
      /**
       * The FAQ answers are the longest, most specific prose on the site and the
       * only part that matches how people actually search: "do I have to go to
       * Dubai to buy", "what if the market falls". Marking them up makes that
       * text machine readable rather than leaving it as anonymous page body.
       *
       * Be clear about the payoff: Google restricted FAQ rich results in 2023 to
       * government and health sites, so this will NOT render an accordion in the
       * results for a brokerage. It is worth doing because it states the
       * question/answer pairing explicitly for search and for the AI answer
       * surfaces that increasingly sit in front of it. Do not expect a visible
       * change in the SERP from this alone.
       */
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}#faq`,
        isPartOf: { "@id": `${SITE_URL}#website` },
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.q.en,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
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
