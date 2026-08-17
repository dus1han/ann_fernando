import Script from "next/script";
import { META_PIXEL_ID } from "@/lib/pixel";

/**
 * Meta (Facebook) Pixel base code.
 *
 * WHY IT IS OFF IN DEVELOPMENT
 * `next dev` is where the enquiry form gets submitted over and over while
 * something is being changed, and every one of those would report a `Lead` —
 * the exact event a campaign is optimised against. A handful of fake leads is
 * enough to teach the algorithm to chase the wrong people. Preview deploys DO
 * report; they are rare enough not to matter.
 *
 * WHY afterInteractive
 * The pixel is an analytics tag, not a bot detector or consent manager, so it
 * has no business blocking first paint. `afterInteractive` is what next/script
 * documents for tag managers and analytics. The inline snippet queues any
 * fbq() calls made before fbevents.js finishes downloading and replays them on
 * load, so nothing is lost by not loading it earlier — a click at second two
 * still reports.
 *
 * WHY THIS IS NOT A CLIENT COMPONENT
 * There are no event handlers here, so it stays on the server: the <noscript>
 * pixel ships in the server-rendered HTML, and the component itself costs zero
 * client JS beyond fbevents.js.
 *
 * PageView fires once per load. The site is a single page with in-page anchor
 * navigation only — no route changes — so there is no second PageView to fire.
 * If real routes are ever added, this needs a usePathname() effect to fire
 * PageView on navigation, and it becomes a client component at that point.
 */
export default function MetaPixel() {
  if (process.env.NODE_ENV === "development") return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`}
      </Script>

      {/* Counts visitors with JavaScript disabled, and — more usefully here —
          is what Meta's own Pixel Helper and the Events Manager "test events"
          tab look for when verifying the install. */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
