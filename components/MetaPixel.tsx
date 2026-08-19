import { META_PIXEL_ID } from "@/lib/pixel";

/**
 * Meta (Facebook) Pixel base code.
 *
 * ⚠ WHY THIS IS A PLAIN <script> AND NOT next/script
 *
 * It used `next/script` with `strategy="afterInteractive"`, which is what the
 * Next docs recommend for analytics tags. On this site that produced a pixel
 * that never fired: nothing executable reached the HTML at all. The snippet was
 * serialised into the RSC flight payload as a string inside
 * `self.__next_f.push([...])` — data describing a component, not code a browser
 * runs — leaving the pixel dependent on React hydrating and then injecting it.
 *
 * That is easy to misdiagnose, because grepping the page for `fbq(` finds the
 * string in the flight data and looks like a healthy install. The only reliable
 * check is whether `fbq(` appears inside a <script> tag that is NOT
 * `self.__next_f.push`.
 *
 * A plain inline script is in the document from the first byte, runs during
 * parse, and cannot be affected by hydration timing or a next/script behaviour
 * change. The JSON-LD in app/layout.tsx is written exactly this way for the
 * same reason.
 *
 * The cost is negligible: the snippet only defines fbq() and appends a script
 * element. fbevents.js itself is fetched with `async` by that code, so nothing
 * here blocks rendering.
 *
 * WHY IT IS OFF IN DEVELOPMENT
 * `next dev` is where the enquiry form gets submitted over and over while
 * something is being changed, and every one of those would report a `Lead` —
 * the exact event a campaign is optimised against. A handful of fake leads is
 * enough to teach the algorithm to chase the wrong people. Preview deploys DO
 * report; they are rare enough not to matter.
 *
 * PageView fires once per load. The site is a single page with in-page anchor
 * navigation only, so there is no second PageView to fire. If real routes are
 * ever added, this needs a usePathname() effect and becomes a client component.
 */
export default function MetaPixel() {
  if (process.env.NODE_ENV === "development") return null;

  const pixel = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: pixel }} />

      {/* Counts visitors with JavaScript disabled, and - more usefully here -
          is what Meta's Pixel Helper and the Events Manager "test events" tab
          look for when verifying the install. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1" />`,
        }}
      />
    </>
  );
}
