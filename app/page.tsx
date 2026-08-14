import { Suspense } from "react";

import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFab from "@/components/WhatsAppFab";
import WhatsAppToForm from "@/components/WhatsAppToForm";
import SlotInspector from "@/components/SlotInspector";

import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Roadshow from "@/components/sections/Roadshow";
import About from "@/components/sections/About";
import Principles from "@/components/sections/Principles";
import Verify from "@/components/sections/Verify";
import Partners from "@/components/sections/Partners";
import WhyDubai from "@/components/sections/WhyDubai";
import Afford from "@/components/sections/Afford";
import Visa from "@/components/sections/Visa";
import Statement from "@/components/sections/Statement";
import Gallery from "@/components/sections/Gallery";
import Shortlist from "@/components/sections/Shortlist";
import Process from "@/components/sections/Process";
import Proposal from "@/components/sections/Proposal";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

/**
 * Order is personal-brand first, then the investment case, then conversion.
 *
 *   Hero → TrustBar        Who she is, and four checkable facts.
 *   About → Principles     Her story and her four promises. The brand core.
 *   Verify → Partners      How to check her, and who stands behind her.
 *   WhyDubai → Afford      The investment argument, once trust is established.
 *   → Visa
 *   Shortlist → Process    How working with her actually goes.
 *   Proposal → Faq         Three conversion points at increasing intent.
 *   → Contact
 *
 * Every section ends in a way to contact her - the objective is enquiries.
 */
export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Nav />

      <main>
        <Hero />
        <TrustBar />
        {/* Time-boxed. Sits this high because it is where paid traffic lands,
            and it self-retires once roadshow.endsAt has passed. */}
        <Roadshow />
        <About />
        <Principles />
        <Verify />
        <Partners />
        <WhyDubai />
        <Afford />
        <Visa />
        <Statement />
        <Gallery />
        <Shortlist />
        <Process />
        <Proposal />
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFab />

      {/* Sends every WhatsApp button except the floating one to the enquiry
          form in the Contact section, which then composes the WhatsApp message
          on submit. Mounted once; no section component knows it exists. */}
      <WhatsAppToForm />

      {/* Review tool - renders only with ?slots=1 in the URL */}
      <Suspense fallback={null}>
        <SlotInspector />
      </Suspense>
    </>
  );
}
