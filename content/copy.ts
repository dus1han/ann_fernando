/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE COPY
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  The site ships in ENGLISH today. Every place where Sinhala would genuinely
 *  earn its place is already marked below with a `si` field and a `slot`
 *  priority. Flip SINHALA_ENABLED to true and the marked lines render with a
 *  Sinhala accent - no component changes required.
 *
 *  SLOT PRIORITY - where Sinhala pays for itself:
 *
 *   "high"   Emotional / relational moments. Greeting, headlines, CTAs, the
 *            questions a nervous buyer is actually asking, client voices.
 *            This is where "she is one of us" gets communicated. Sinhala here
 *            is worth more than anywhere else on the page.
 *
 *   "medium" Section titles and labels. Adds texture and signals identity
 *            without carrying meaning the reader depends on.
 *
 *   (none)   Money, law, figures, process detail, disclaimers. These stay in
 *            English permanently. A reader deciding whether to wire AED 900k
 *            wants these to read as professional, not familiar.
 *
 *  ⚠ All Sinhala below is a PROPOSED draft pending native-speaker review.
 *    Ann should read the `si` lines and correct anything that sounds stiff.
 *    Nothing outside this file needs to change when she does.
 */

export const SINHALA_ENABLED = false;

export type SlotPriority = "high" | "medium";

export type Bi = {
  en: string;
  si?: string;
  slot?: SlotPriority;
  /** Why Sinhala does or doesn't belong here. */
  why?: string;
};

export const t = (en: string, si?: string, slot?: SlotPriority, why?: string): Bi => ({
  en,
  si,
  slot,
  why,
});

/* ─── Identity ──────────────────────────────────────────────────────────── */

export const agent = {
  name: "Ann Fernando",
  role: "Property Consultant",
  company: "GCC Real Estate",
  companyLegal: "GCC Real Estate LLC",
  companySite: "https://gccrealestate.co/",
  city: "Dubai, UAE",
  address: "1910 Regal Tower, Business Bay, Dubai",

  /**
   * Office location - exact coordinates supplied by the client. Used only for
   * the "open in Maps" links in the footer and the Verify section; there is
   * no embedded map on the site.
   *
   * Note: a Google Maps marker cannot be given a custom name through a URL -
   * the pin's name comes from Google's own place data, so it will show as
   * coordinates until GCC Real Estate has a Google Business Profile here.
   */
  mapLat: "25.186462369792675",
  mapLng: "55.26058220981199",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=25.186462369792675%2C55.26058220981199",

  /**
   * ⚠ LICENSING - READ BEFORE EDITING.
   *
   * Ann does NOT personally hold a RERA broker number. GCC Real Estate holds
   * the brokerage licence and she works as a consultant under it. Therefore:
   *
   *   • Never describe Ann as "RERA licensed" or "a licensed broker".
   *   • Attribute every licensing claim to the COMPANY.
   *   • Do not print a personal BRN anywhere on this site.
   *
   * TODO(office): in Dubai, individuals brokering property are generally
   * required to hold their own RERA broker card, and advertising must carry
   * the relevant registration details. Worth confirming Ann's position with
   * the brokerage's compliance contact - and adding her BRN here once issued.
   */
  brn: "", // intentionally empty; see note above
  // TODO(office): company ORN + trade licence were not published on gccrealestate.co
  orn: "ORN 00000",
  tradeLicense: "Trade Licence 000000",

  /** Ann's direct line - all CTAs route here. */
  phone: "+971 52 303 3521",
  whatsapp: "971523033521",
  /** Office line, shown in the footer for company verification. */
  officePhone: "+971 52 303 3516",

  email: "ann@gccrealestate.co",
  officeEmail: "info@gccrealestate.co",

  instagram: "https://www.instagram.com/dxbrealtor_annfernando",
  instagramHandle: "@dxbrealtor_annfernando",
  facebook: "https://www.facebook.com/share/1JuwLsqfje/",
  linkedin: "", // TODO(Ann): add if you have one, otherwise this link is hidden
};

/**
 * Company-level credibility, taken from gccrealestate.co.
 *
 * This is the backbone of the trust argument while Ann is new: the FIRM has
 * the record, and it is attributed to the firm - never silently transferred
 * to her. Read every line below as "GCC has this", not "Ann has this".
 */
export const company = {
  positioning: "An award-winning Sri Lankan real estate company in Dubai.",
  teamExperience: "30+ years",
  teamExperienceLabel: "Combined team experience in the Dubai market",
  award: "Top Performing Partner, Azizi Developments",
  specialism: "Off-plan and luxury residential",
};

export const whatsappPrefill =
  "Hi Ann, I saw your website and I'd like to know more about investing in Dubai property.";

export const whatsappHref = `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(
  whatsappPrefill
)}`;

/* ─── Nav ───────────────────────────────────────────────────────────────── */

export const nav = [
  // Gold-highlighted in the nav while the event is live; see Nav.tsx.
  { label: "Colombo, 5th & 6th Sept", href: "#roadshow", highlight: true },
  { label: "About Ann", href: "#about" },
  { label: "How I work", href: "#principles" },
  { label: "Verify me", href: "#verify" },
  { label: "Why Dubai", href: "#why-dubai" },
  { label: "Affordability", href: "#afford" },
  { label: "Golden Visa", href: "#visa" },
  { label: "FAQ", href: "#faq" },
];

/* ─── 1. Hero ───────────────────────────────────────────────────────────── */

/**
 * PERSONAL BRANDING FIRST.
 *
 * Ann's name is the H1, not the product. The property proposition sits
 * underneath as her tagline. This is a personal brand site that happens to
 * sell Dubai real estate, not a listings site with a photo on it.
 */
export const hero = {
  eyebrow: t(
    "Ayubowan",
    "ආයුබෝවන්",
    "high",
    "The single highest-value Sinhala word on the page. A Sri Lankan reader knows within one word that this site was built for them."
  ),
  headlineLead: "Ann Fernando",
  roleLine: "Property Consultant · Dubai",
  taglineLead: "Dubai property,",
  headlineAccent: t(
    "in your language.",
    "ඔබේ භාෂාවෙන්.",
    "high",
    "Mixed-script tagline. The English carries the subject, the Sinhala carries the promise. Strongest single line on the site."
  ),
  sub: t(
    "Buying property abroad is hard, and most of the advice you will get is quietly self-interested. I'm a property consultant with GCC Real Estate, a Sri Lankan-owned and DLD-registered brokerage in Business Bay. Ask me anything before you commit to anything.",
    "විදේශයක property එකක් ගන්න එක අමාරු වැඩක්. ඕන දෙයක් අහන්න, කලින් කිසි දෙයක් කරන්න කලින්.",
    "high",
    "Ann speaking in her own voice, offering help rather than claiming a record. Reads warmer in the mother tongue."
  ),
  ctaPrimary: t(
    "Ask me anything",
    "ඕන දෙයක් අහන්න",
    "high",
    "Lowest-commitment entry on the CTA ladder. A nervous first-time buyer will not 'book a consultation' but will ask one question."
  ),
  ctaSecondary: t("Get a proposal", undefined, undefined),
  scrollCue: "Scroll",
};

/* ─── 1b. Roadshow ──────────────────────────────────────────────────────── */
/**
 * Time-boxed event band. Sits directly under the trust bar because while it
 * is running it is the most important thing on the page, and it is where paid
 * traffic lands.
 *
 * `endsAt` drives everything: the countdown, the nav item, and the switch to
 * the after-the-event message. Change that one date and the whole section
 * follows. Set `active: false` to remove it entirely once there is no next
 * event scheduled.
 */
export const roadshow = {
  active: true,
  /** Sri Lanka is UTC+5:30. Doors close 6pm on the second day. */
  endsAt: "2026-09-06T18:00:00+05:30",

  eyebrow: "In Sri Lanka",
  title: t(
    "Meet me in Colombo.",
    "කොළඹදී හමුවෙමු.",
    "high",
    "An invitation, not an announcement. Warmer in the mother tongue, and the whole point of the event is that she is there in person."
  ),
  dates: "5th & 6th September",
  venue: "Cinnamon Grand, Colombo",
  time: "10.00 am to 6.00 pm",
  entry: "Free entry",

  intro:
    "Two days, in person. Walk in any time between 10am and 6pm, or message me and I'll set aside a time for you.",
  // The single biggest reason people do not come is fear of a hard sell in a
  // hotel function room. Say the opposite, plainly, before anything else.
  reassurance:
    "Bring a budget figure and a question. Nobody will ask you to sign anything, and there is no presentation to sit through.",

  facts: [
    { k: "When", v: "5th & 6th September, 10am to 6pm" },
    { k: "Where", v: "Cinnamon Grand, Colombo" },
    { k: "Cost", v: "Free, no ticket needed" },
    { k: "Bring", v: "Your budget and your questions" },
  ],

  cta: t("Reserve your slot", "වෙලාවක් වෙන් කරන්න", "high"),
  ctaNote: "Or just walk in. Both work.",
  countdownLabel: "Until doors open",

  /** Shown automatically once `endsAt` has passed. */
  afterTitle: "I was in Colombo on the 5th and 6th of September.",
  afterBody:
    "If we did not get to meet, message me and we will do it on video instead. Same conversation, same questions, no travel.",
  afterCta: "Let's talk on video",
};

/* ─── 2. Trust bar ──────────────────────────────────────────────────────── */
/*
 *  ⚠ READ THIS BEFORE EDITING.
 *
 *  This site must never state or imply a personal track record, tenure, or
 *  transaction volume that is not real and defensible. Inflated experience
 *  claims are (a) a RERA advertising problem and (b) commercially suicidal -
 *  the Sri Lankan investor community in Dubai is small and it talks.
 *
 *  So the trust bar carries VERIFIABLE facts rather than achievements.
 *  Every item below can be independently checked by the reader. That is the
 *  entire point: she is not asking to be believed, she is asking to be
 *  checked. Do not replace these with volume or transaction statistics until
 *  they are real, attributable, and defensible.
 */

export const trustPoints = [
  {
    value: "RERA",
    label: "Registered brokerage",
    detail:
      "GCC Real Estate is licensed with the Dubai Land Department. Verify the company yourself.",
  },
  {
    value: "30+ yrs",
    label: "GCC Real Estate team experience",
    detail: "Combined experience of the brokerage standing behind every deal.",
  },
  {
    value: "10",
    label: "Direct developer partnerships",
    detail: "Emaar, DAMAC, Sobha, Omniyat and more, booked at developer price.",
  },
  {
    value: "Minutes",
    label: "Typical reply time",
    detail: "WhatsApp messages answered within minutes, Dubai time (GMT+4).",
  },
];

/* ─── 3. Why Dubai ──────────────────────────────────────────────────────── */

export const whyDubai = {
  title: t(
    "Why Dubai?",
    "ඇයි ඩුබායි?",
    "medium",
    "Section title. Short, punchy, universally understood, cheap to translate, adds rhythm to the page."
  ),
  intro:
    "Not a sales pitch. Here is the actual case, with sources. Check every number yourself.",
  cards: [
    {
      headline: t(
        "The rupee falls. The dirham holds.",
        "රුපියල අඩුවෙනවා. දිරාම් එක ස්ථිරයි.",
        "high",
        "This is the emotional core of the entire investment argument for a Sri Lankan. It should hit in Sinhala."
      ),
      body: "The UAE dirham has been pegged to the US dollar at 3.6725 since 1997. Your capital sits in a dollar-linked currency rather than a depreciating one.",
      source: "UAE Central Bank",
      img: "/images/city-04.jpg",
    },
    {
      headline: t("Zero income tax. Zero capital gains tax."),
      body: "The UAE levies no personal income tax, no capital gains tax, and no annual property tax on residential real estate. Rental income is received gross.",
      source: "UAE Ministry of Finance",
      img: "/images/city-09.jpg",
    },
    {
      headline: t("Gross yields of roughly 6–9%."),
      body: "Prime Dubai residential districts have been producing gross rental yields materially above Colombo, London, and Mumbai. Verify current figures before committing.",
      source: "Dubai Land Department / Property Monitor",
      img: "/images/city-05.jpg",
    },
    {
      headline: t("Freehold title. Not leasehold."),
      body: "In designated freehold zones, foreign nationals own the property outright and in perpetuity. The title deed is issued by the Dubai Land Department in your name.",
      source: "Dubai Land Department",
      img: "/images/city-01.jpg",
    },
    {
      headline: t("Four and a half hours from Colombo."),
      body: "Multiple daily direct flights, and a time difference of only 90 minutes. Close enough to visit on a weekend, and to call your agent during your own working day.",
      img: "/images/city-06.jpg",
    },
    {
      headline: t("You will not be the only one."),
      body: "The UAE is home to one of the largest Sri Lankan communities outside South Asia. There is an established network here: legal, banking, and social.",
      img: "/images/int-05.jpg",
    },
  ],
};

/* ─── 4. Affordability ──────────────────────────────────────────────────── */

export const afford = {
  title: t(
    "Where do I start?",
    "කොහොමද පටන් ගන්නේ?",
    "medium",
    "Phrased as the reader's own internal question. Sinhala makes it feel like their thought rather than a sales header."
  ),
  intro:
    "Entry is lower than most people expect. Off-plan payment plans spread the balance over construction. You do not need the full amount up front.",
  disclaimer:
    "Indicative figures only. Prices move; payment plans vary by developer and project.",
  tiers: [
    {
      type: "Studio",
      // No district names here - the right area depends entirely on the
      // client's requirement, so naming one pre-empts the conversation.
      area: "Lowest entry point",
      priceAed: 650000,
      downPct: 20,
      yield: "7.5–8.5%",
      note: "The most common first purchase. Strong tenant demand, lowest entry.",
      img: "/images/int-06.jpg",
    },
    {
      type: "1 Bedroom",
      area: "Best all-round balance",
      priceAed: 1250000,
      downPct: 20,
      yield: "6.5–7.5%",
      note: "Best balance of rental demand and resale liquidity.",
      img: "/images/int-01.jpg",
    },
    {
      type: "2 Bedroom",
      area: "Crosses the Golden Visa threshold",
      priceAed: 2100000,
      downPct: 20,
      yield: "6–7%",
      note: "Crosses the Golden Visa threshold. Family tenants, longer leases.",
      img: "/images/int-05.jpg",
    },
  ],
};

/* ─── 5. Golden Visa ────────────────────────────────────────────────────── */

export const visa = {
  title: t(
    "Ten years' residency, with your whole family.",
    "පවුලම එක්ක, වසර 10ක පදිංචිය.",
    "high",
    "For this audience the visa often matters more than the yield. Schooling, healthcare, mobility, a plan B. Deeply emotional. Belongs in Sinhala."
  ),
  body: "A property investment of AED 2 million or more qualifies the owner for a renewable 10-year UAE residency visa. It extends to spouse and children, requires no local sponsor, and does not require you to live in the UAE full time.",
  points: [
    "Covers spouse and dependent children",
    "Renewable every 10 years",
    "No local sponsor required",
    "No minimum stay requirement",
    "Can be secured on a single property or a combination",
  ],
  disclaimer:
    "Eligibility criteria are set by the UAE government and change from time to time. Confirm current requirements before purchasing on this basis.",
};

/* ─── 6. About Ann ──────────────────────────────────────────────────────── */

/**
 * ⚠ THE ONE RULE FOR THIS SECTION.
 *
 * Never state or imply a length of experience, a number of units closed, or a
 * transaction volume that is not real and defensible. Inflated claims are a
 * RERA advertising problem and, in a community this small, commercially fatal.
 *
 * Credibility on this page comes from things a reader can independently check:
 * the RERA licence, the brokerage behind her, escrow law, the DLD register and
 * the developer partnerships. That is a stronger foundation than tenure, and
 * it is why the `verify` section below exists.
 */
export const about = {
  eyebrow: t(
    "My story",
    "මගේ කතාව",
    "medium",
    "A label introducing something personal. Sinhala suits it."
  ),
  title: "I'd rather tell you not to buy than sell you the wrong thing.",
  // TODO(Ann): replace paragraphs 1 and 2 with your own words. Keep them
  // personal and specific - this is the only part of the page that is you
  // rather than the market.
  body: [
    "Most of the advice a Sri Lankan gets about Dubai property is quietly self-interested. I know, because those were the conversations my own family had before anyone in it bought anything.",
    "I know what it feels like to send money somewhere you have never been, and to wonder whether the person on the other end is telling you everything. The questions my clients worry about were mine first.",
    "Behind me is GCC Real Estate, a Sri Lankan-owned, award-winning brokerage in Business Bay, with more than thirty years of combined experience across the team and direct channel partnerships with Emaar, DAMAC, Sobha, Omniyat and six more. Every transaction I handle is reviewed by that firm.",
    "So this is what I offer: I will tell you when the timing is wrong for you, show you every fee in writing before you commit to anything, and answer the awkward questions properly. Judge me on that rather than on a brochure.",
  ],
  credentials: [
    { label: "Role", value: `${agent.role}, ${agent.company}` },
    { label: "Brokerage", value: "DLD registered · Business Bay, Dubai" },
    { label: "Languages", value: "English · Sinhala · Tamil" },
    { label: "Focus", value: "Off-plan & luxury residential" },
  ],
};

/* ─── 6a. How I work - the personal brand promise ───────────────────────── */
/*
 *  This is the personal-branding core: four commitments in Ann's own voice.
 *  It is what a client repeats to a friend when recommending her, and it is
 *  the part of the site no competitor can copy without sounding hollow.
 *  Keep it in first person, keep it specific, keep it to things she will
 *  genuinely do every time.
 */

export const principles = {
  eyebrow: "How I work",
  title: t(
    "Four things I promise every client.",
    "මම හැම කෙනෙකුටම දෙන පොරොන්දු හතරක්.",
    "high",
    "Her personal covenant, spoken directly. This is the emotional centre of the personal brand, and it belongs in the mother tongue."
  ),
  intro:
    "Not a service list. These are the rules I hold myself to, and you should hold me to them too.",
  items: [
    {
      no: "01",
      title: t("I'll tell you when not to buy.", "ගන්න එපා කියලත් මම කියනවා.", "high"),
      body: "If the timing, the building or the budget is wrong for you, you will hear it from me plainly. No sale is worth a bad outcome you remember for ten years.",
    },
    {
      no: "02",
      title: t("Every number in writing, first.", undefined, undefined),
      body: "Full cost breakdown, realistic rent, service charges and net yield, all before you commit to anything. If a figure changes later, you get the reason in writing.",
    },
    {
      no: "03",
      title: t("Your language, your hours.", "ඔබේ භාෂාවෙන්, ඔබේ වෙලාවට.", "high"),
      body: "Sinhala, Tamil or English, whichever is easiest for you. And I answer at the times that suit Colombo, Melbourne or Toronto, not only Dubai office hours.",
    },
    {
      no: "04",
      title: t("I stay after the sale.", undefined, undefined),
      body: "Handover, snagging, furnishing, finding a tenant, rent collection, resale. Most agents disappear at the title deed. The whole point of a personal reputation is that I cannot.",
    },
  ],
};

/* ─── 6b. Verify - the trust centrepiece ────────────────────────────────── */
/*
 *  The strategic move: stop asking to be trusted and start showing the reader
 *  how to check. Every item here can be confirmed without involving Ann at
 *  all. Counter-intuitively this converts better than projected confidence,
 *  because it is what a person with nothing to hide would actually do - and
 *  it builds credibility from verifiable facts rather than from claims.
 */

export const verify = {
  eyebrow: "Due diligence",
  title: t(
    "Don't take my word for any of this.",
    "මගේ වචනේ විශ්වාස කරන්න එපා.",
    "high",
    "Disarming, slightly provocative, and the single most trust-building line on the page. Reads as candour in Sinhala rather than as a slogan."
  ),
  intro:
    "This is a large decision made from a long way away, and you have every reason to be careful with it. So here is exactly how to check me, the company and the property, without taking anything I say on faith.",
  items: [
    {
      title: "Check the brokerage on the DLD register",
      body: `${agent.companyLegal} is a Dubai Land Department registered brokerage. Look the company up on the Dubai REST app or the DLD website before you deal with anyone here, including me.`,
      action: "Dubai REST app · dubailand.gov.ae",
    },
    {
      title: "Check the office is real",
      body: `We are at ${agent.address}. Find us on the map, call the office line, ask for me by name, or visit if you are in Dubai. A brokerage that cannot be found at a fixed address is not one to send money to.`,
      action: "View on Google Maps",
      href: agent.mapUrl,
    },
    {
      title: "Your money never comes to me",
      body: "Off-plan payments go into a DLD-supervised escrow account in the developer's project name, released to the developer only against verified construction milestones. Neither I nor GCC ever holds your funds.",
      action: "Law No. 8 of 2007, Dubai",
    },
    {
      title: "Verify the title deed yourself",
      body: "Once issued, your title deed is checkable on the DLD public register using the property number. You do not need me, or the developer, to confirm you own it.",
      action: "dubailand.gov.ae",
    },
    {
      title: "Every fee in writing, before you commit",
      body: "DLD transfer fee, trustee fee, service charges, mortgage costs if any. Every charge itemised in one document, before you pay anything. If a number changes later, you get the reason in writing.",
      action: "Standard on every enquiry",
    },
  ],
};

/* ─── 6c. Lead magnet - the personalised proposal ───────────────────────── */
/*
 *  There is no generic PDF guide, so the site does not offer one. Instead the
 *  offer is a document Ann genuinely produces: a proposal built around the
 *  client's own budget, timeline and purpose, using what is actually available.
 *
 *  This is the stronger offer anyway. A generic download costs the reader
 *  nothing to ignore; a bespoke document requires a conversation to produce -
 *  which is exactly the lead Ann wants, and it arrives qualified.
 */

export const proposal = {
  eyebrow: "Free · no obligation",
  title: t(
    "A proposal written for you, not a brochure.",
    "ඔබට කියලාම හදන එකක්, පොදු එකක් නෙවෙයි.",
    "high",
    "The core differentiator, in her voice. 'Made specifically for you' carries real warmth in Sinhala."
  ),
  intro:
    "Tell me your budget, your timeline and what you want the property to do. I'll put together a document for your situation, using what is genuinely available right now, and send it within two working days.",
  turnaround: "2 working days",
  turnaroundLabel: "Typical turnaround",
  bulletsLabel: "What's in it",
  bullets: [
    "Three to five properties matched to your budget and purpose",
    "The full cost stack: DLD transfer fee, trustee fees and service charges",
    "Each payment plan laid out instalment by instalment",
    "Realistic rent and net yield, not the developer's headline number",
    "Exactly where you stand against the Golden Visa threshold",
    "The risks I see with each option, in writing",
  ],
  cta: "Request your proposal",
  note: "I'll ask a few questions on WhatsApp first. I can't write anything useful without them. No newsletter, and your number goes nowhere else.",
};

/* ─── 7. Process ────────────────────────────────────────────────────────── */

export const process = {
  title: t(
    "You don't need to come to Dubai.",
    "ඩුබායි එන්න ඕන නෑ.",
    "high",
    "This kills the single biggest objection. Delivered in Sinhala it reads as reassurance from a friend rather than a sales claim."
  ),
  intro:
    "Every step below can be completed from where you are. Most of my clients have never visited the property before handover.",
  steps: [
    {
      label: t("Let's talk", "කතා කරමු", "high", "Repeats the primary CTA; consistency reinforces it."),
      body: "A 20-minute video call. Budget, timeline, and whether buying now is right for you at all.",
      meta: "20 minutes · video",
      img: "/images/ann-portrait.jpg",
    },
    {
      label: t("Shortlist and virtual tour"),
      body: "I send three to five options with full financials: service charges, realistic rent, net yield. We walk them on video.",
      meta: "3–5 options · full financials",
      img: "/images/ann-stone.jpg",
    },
    {
      label: t("Reserve remotely"),
      body: "A reservation form and deposit secures the unit. Signed electronically; you do not travel.",
      meta: "Signed electronically",
      img: "/images/city-03.jpg",
    },
    {
      label: t("Power of Attorney"),
      body: "You appoint a representative in Dubai through a notarised POA, executed at the UAE embassy in your country.",
      meta: "No flight required",
      img: "/images/city-08.jpg",
    },
    {
      label: t("Title deed issued"),
      body: "The Dubai Land Department issues the title deed in your name. It is verifiable on the DLD public register.",
      meta: "In your name · DLD verified",
      img: "/images/int-03.jpg",
    },
    {
      label: t("Handover and letting"),
      body: "We furnish if you wish, list the unit, place a tenant, and manage it. You receive statements quarterly.",
      meta: "Managed end to end",
      img: "/images/ann-cinema.jpg",
    },
  ],
};

/* ─── 8. Properties ─────────────────────────────────────────────────────── */

/**
 * The listings grid was removed at the client's request: a shortlist can only
 * be built once the client's requirement is known, so publishing a fixed
 * selection works against a consultative process. `shortlist` replaces it -
 * same visual weight, no committed inventory.
 */
export const shortlist = {
  eyebrow: "Finding the right one",
  title: t(
    "I don't publish a list. I build yours.",
    "මම ලැයිස්තුවක් දාන්නේ නෑ. ඔබට ගැලපෙන එක හොයනවා.",
    "high",
    "The consultative promise, in her voice. Differentiates her from every portal-style agent site. Worth the mother tongue."
  ),
  intro:
    "A studio that suits a first-time investor in Melbourne is the wrong building for a family planning to move here. So the shortlist comes after the conversation, not before it.",
  steps: [
    {
      k: "What it's for",
      v: "Pure rental yield, a home for later, or a Golden Visa threshold. These lead to genuinely different buildings.",
    },
    {
      k: "What you can commit",
      v: "Cash, a payment plan across construction, or a mortgage. This sets the realistic range before we look at anything.",
    },
    {
      k: "When you need it",
      v: "Ready units hand over immediately; off-plan launches complete in two to four years at a lower entry price.",
    },
    {
      k: "What I send back",
      v: "Three to five options with full financials: price, service charges, realistic rent, net yield, and the risks I see.",
    },
  ],
  areasLabel: "Areas I work in",
  areas: [
    "Dubai Marina",
    "Downtown Dubai",
    "Business Bay",
    "Dubai Creek Harbour",
    "Dubai Hills Estate",
    "Jumeirah Village Circle",
    "Palm Jumeirah",
    "Nad Al Sheba",
    "Arjan",
  ],
  cta: "Tell me what you need",
  disclaimer:
    "Specific offers are provided with the applicable DLD permit number at the time of enquiry.",
};

/* ─── 9. Testimonials ───────────────────────────────────────────────────── */
/* Client voices. These are the most natural Sinhala on the entire page -
   real people would have said these words in Sinhala. */

/**
 * ⚠ SIX MONTHS IN, ANN MAY HAVE FEW OR NO TESTIMONIALS YET.
 *
 * Set SHOW_TESTIMONIALS to false and the section disappears entirely. An
 * absent testimonials section is completely unremarkable; an invented one is
 * fraud, and in a community this small it will be found out.
 *
 * Quotes below are SHAPES, not content - they describe the things a client of
 * a careful new agent would actually praise (candour, clarity, responsiveness)
 * rather than a long record. Replace with real, attributable quotes, or delete.
 */
/** Currently OFF - the section is hidden until real quotes exist. Flip to
 *  true once Ann has named, attributable testimonials to put in `items`. */
export const SHOW_TESTIMONIALS = false;

export const testimonials = {
  title: t("What they say", "ඔවුන් කියන දේ", "medium"),
  note: "I'd rather show you a few real ones than forty invented ones.",
  items: [
    {
      quote: t(
        "She told me the first building I wanted was a bad buy. That is when I decided to trust her.",
        "මම කැමති වුණු මුල් එක හොඳ නෑ කියලා ඇය කිව්වා. එතකොටයි මම ඇයව විශ්වාස කළේ.",
        "high",
        "Praise for honesty rather than for track record, the kind of thing a client actually says, and the kind Ann can genuinely earn."
      ),
      name: "TODO: real client",
      location: "City, Country",
    },
    {
      quote: t(
        "Every fee was on the table before I paid anything. Nothing changed later.",
        undefined,
        undefined
      ),
      name: "TODO: real client",
      location: "City, Country",
    },
    {
      quote: t(
        "I asked a lot of questions. She answered all of them the same day, in Sinhala.",
        undefined,
        undefined
      ),
      name: "TODO: real client",
      location: "City, Country",
    },
    {
      quote: t(
        "She showed me how to check the escrow account myself instead of just telling me it was safe.",
        undefined,
        undefined
      ),
      name: "TODO: real client",
      location: "City, Country",
    },
  ],
};

/* ─── 10. FAQ ───────────────────────────────────────────────────────────── */
/* THE PATTERN: question in Sinhala, answer in English.
   The question sounds like the reader's own worry. The answer sounds like a
   licensed professional. That sequence is the whole trust mechanic. */

export const faq = {
  title: t("Frequently asked", "නිතර අසන ප්‍රශ්න", "medium"),
  items: [
    {
      q: t(
        "Why should I work with you rather than a big agency?",
        "ලොකු ඒජන්සියක් වෙනුවට ඇයි ඔයා?",
        "high",
        "Invites the sceptical question rather than waiting for it to be asked privately. In Sinhala it reads as openness instead of defensiveness."
      ),
      a: "Attention, mostly. A consultant carrying forty clients cannot answer your fifth question about service charges at 9pm your time; I can. Beyond that: GCC Real Estate is a Sri Lankan-owned, DLD-registered brokerage with thirty-plus years of combined experience across the team, and every transaction I handle is reviewed by that firm. You also get a straight answer about whether something is a bad buy, which is worth more to you than a fast one.",
    },
    {
      q: t(
        "Do I have to come to Dubai to buy a property?",
        "Property එකක් ගන්න මම ඩුබායි එන්න ඕනද?",
        "high",
        "The number one objection, phrased exactly as it is thought."
      ),
      a: "No. A purchase can be completed entirely remotely through a notarised Power of Attorney executed at the UAE embassy in your country. The Dubai Land Department issues the title deed in your name regardless of where you signed.",
    },
    {
      q: t(
        "How do I send the money? Is it even legal?",
        "සල්ලි යවන්නේ කොහොමද?",
        "high",
        "The most anxious question on the page. Asking it plainly in Sinhala shows you are not avoiding it."
      ),
      a: "GCC Real Estate will guide you through it. If you earn abroad, you simply remit from your own bank. If you are resident in Sri Lanka there are Central Bank rules to follow, and we will walk you through the correct route step by step and point you to the right people at your bank. It is a well-trodden path. Just ask and we will take you through it.",
    },
    {
      q: t("Is my ownership actually secure?", undefined, undefined),
      a: "In designated freehold zones, yes. Ownership is registered with the Dubai Land Department and the title deed is verifiable on the DLD public register using the property number. You can check it yourself, independently of me.",
    },
    {
      q: t("What are the real costs on top of the price?", undefined, undefined),
      // Total stays at 7-8% because that is what a buyer actually pays. The
      // itemisation is deliberately summarised rather than fully listed, so
      // the figure is not left contradicting a short list that cannot reach
      // it. The full breakdown is promised in writing instead.
      a: "Budget roughly 7–8% above the purchase price in total transaction costs. The 4% DLD transfer fee is the largest single item; the remainder covers registration, trustee office and related transaction fees, plus mortgage costs if you are financing. I provide a full written breakdown of every charge before you commit to anything.",
    },
    {
      q: t("Who manages the property after I buy?", undefined, undefined),
      a: "We do, if you want us to. Furnishing, listing, tenant screening, rent collection, maintenance coordination and quarterly statements. Typical management fee is 5% of annual rent. You are free to use anyone else.",
    },
    {
      q: t("How easily can I sell?", undefined, undefined),
      a: "Dubai is a liquid market by regional standards, and resale is straightforward in established districts. Off-plan units can usually be assigned before completion once a developer-set percentage is paid. Liquidity is materially better in Marina, Downtown, Business Bay and Dubai Hills than in newer outlying areas.",
    },
    {
      q: t("What if the market falls?", undefined, undefined),
      a: "It can, and it has. Dubai fell significantly in 2009 and again in 2015–2019. Anyone who tells you otherwise is selling. Buy on rental yield rather than on expected capital appreciation, hold for at least five years, and do not over-leverage.",
    },
    {
      q: t("Do you work with people outside Sri Lanka?", undefined, undefined),
      a: "Yes, most of my clients are Sri Lankan but I work with buyers of any nationality. The process described here is the same for everyone.",
    },
  ],
};

/* ─── 11. Partners ──────────────────────────────────────────────────────── */

/**
 * Real partnerships, taken from gccrealestate.co. Do not add a developer to
 * this list unless GCC Real Estate genuinely transacts with them - this is
 * borrowed credibility and it only works while it is true.
 */
export const partners = {
  eyebrow: "Direct partnerships",
  title: t(
    "I book directly with Dubai's top-tier developers.",
    "ඩුබායිහි ප්‍රමුඛ පෙළේ ඩිවලපර්ස් සමඟ කෙළින්ම.",
    "medium",
    "Section headline. The developer names carry the meaning in Latin script regardless, so Sinhala here is texture rather than information."
  ),
  intro:
    "GCC Real Estate is a registered channel partner with each of these developers, so you buy at the developer's own launch price rather than through a chain of intermediaries.",
  award: company.award,
  items: [
    "EMAAR",
    "DAMAC",
    "SOBHA",
    "OMNIYAT",
    "ELLINGTON",
    "ARADA",
    "DANUBE",
    "SAMANA",
    "AZIZI",
    "FAKHRUDDIN",
  ],
};

/* ─── 12. Contact ───────────────────────────────────────────────────────── */

export const contact = {
  title: t(
    "Let's talk",
    "කතා කරමු",
    "high",
    "Closing CTA. Same two words as the hero; bookends the page."
  ),
  intro:
    "No pressure and no obligation. If buying now is wrong for you, I will say so.",
  note: "I reply to WhatsApp fastest, usually within a few minutes, Dubai time (GMT+4).",
  fields: {
    name: "Your name",
    phone: "Phone / WhatsApp number",
    email: "Email",
    interest: "I'm interested in",
    budget: "Budget",
    message: "Anything you'd like me to know",
    submit: "Send message",
  },
  interests: ["Buying to invest", "Buying to live in", "Golden Visa", "Selling a property", "Just exploring"],
  budgets: ["Under AED 1M", "AED 1M – 2M", "AED 2M – 5M", "AED 5M+", "Not sure yet"],
};

/* ─── Footer / legal ────────────────────────────────────────────────────── */

/**
 * The blanket footer disclaimer was removed at the client's request.
 * Contextual disclaimers remain inline where the specific claims are made -
 * see `afford.disclaimer`, `visa.disclaimer` and `properties.disclaimer`.
 */
export const legal = {
  copyright: `© ${new Date().getFullYear()} ${agent.name} · ${agent.company}. All rights reserved.`,
};
