import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

import { agent, roadshow } from "../../content/copy";
import { PRODUCTION_URL } from "../../lib/site";

import figure from "../assets/ann-figure.png";
import annQr from "../assets/ann-qr.png";
import logo from "../../public/brand/gcc-logo-light.png";
import city08 from "../../public/images/city-08.jpg";
import city05 from "../../public/images/city-05.jpg";
import city02 from "../../public/images/city-02.jpg";
import city03 from "../../public/images/city-03.jpg";
import int01 from "../../public/images/int-01.jpg";

import {
  Bloom,
  Body,
  Eyebrow,
  Grid,
  KenBurns,
  Progress,
  Rise,
  Rule,
  Scene,
  Scrim,
  Source,
} from "./components";
import { bone, gold, goldHi, ink, XFADE } from "./theme";

/**
 * Only the weights and subset actually used. Left unconstrained these two
 * calls fired 126 font requests per render, which is slow and makes every
 * render depend on the network holding up.
 */
const { fontFamily: playfair } = loadPlayfair("normal", {
  weights: ["400"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});
loadInter("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

const SITE = PRODUCTION_URL.replace(/^https?:\/\//, "");

const display = (size: number): React.CSSProperties => ({
  fontFamily: playfair,
  fontSize: size,
  fontWeight: 400,
  lineHeight: 1.08,
  color: bone,
  letterSpacing: "-0.01em",
});

/** Bottom-left type block, the layout every photo beat shares. */
const Block: React.FC<{ children: React.ReactNode; bottom?: number }> = ({
  children,
  bottom = 300,
}) => (
  <AbsoluteFill
    style={{
      justifyContent: "flex-end",
      alignItems: "flex-start",
      padding: `0 76px ${bottom}px 76px`,
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {children}
    </div>
  </AbsoluteFill>
);

/**
 * A single claim over a photograph: two lines of Playfair and a source.
 *
 * Every line below is lifted verbatim from content/copy.ts. Nothing is
 * asserted here that the site does not already say, and per the standing
 * rules there is no timeline, no tenure, no commission figure, and no
 * licensing claim attached to Ann rather than to GCC.
 */
const Claim: React.FC<{
  img: string;
  from: number;
  to: number;
  focus: string;
  durationInFrames: number;
  l1: string;
  l2: string;
  accent?: string;
  source?: string;
  size?: number;
  grade?: number;
  filter?: string;
}> = ({
  img,
  from,
  to,
  focus,
  durationInFrames,
  l1,
  l2,
  accent = goldHi,
  source,
  size = 78,
  grade,
  filter,
}) => (
  <>
    <KenBurns
      src={img}
      from={from}
      to={to}
      focus={focus}
      durationInFrames={durationInFrames}
      grade={grade}
      filter={filter}
    />
    <Scrim />
    <Block>
      <Rise delay={4}>
        <div style={display(size)}>{l1}</div>
      </Rise>
      <Rise delay={12}>
        <div style={{ ...display(size), color: accent }}>{l2}</div>
      </Rise>
      {source ? (
        <Rise delay={24} y={20} blur={5} style={{ marginTop: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Rule width={72} />
            <Source>{source}</Source>
          </div>
        </Rise>
      ) : null}
    </Block>
  </>
);

const SCENES = [
  { id: "hook", d: 96 },
  { id: "ann", d: 90 },
  { id: "rupee", d: 84 },
  { id: "tax", d: 81 },
  { id: "freehold", d: 81 },
  { id: "visa", d: 84 },
  { id: "roadshow", d: 96 },
  { id: "end", d: 114 },
] as const;

/** Overlapping starts, so Scene's fade in and fade out become a dissolve. */
export const starts = SCENES.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + SCENES[i - 1].d - XFADE);
  return acc;
}, []);

export const TOTAL =
  starts[starts.length - 1] + SCENES[SCENES.length - 1].d;

export const Reel: React.FC = () => {
  const at = (i: number) => ({
    from: starts[i],
    durationInFrames: SCENES[i].d,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: ink }}>
      {/* 1. Hook. Her tagline over the strongest frame in the library, because
             the first second decides whether the rest is watched at all. */}
      <Sequence {...at(0)} name="Hook">
        <Scene durationInFrames={SCENES[0].d}>
          <KenBurns
            src={city08}
            from={1.02}
            to={1.16}
            focus="50% 45%"
            durationInFrames={SCENES[0].d}
            grade={0.34}
          />
          <Scrim from="30%" />
          <Block bottom={330}>
            <Rise delay={6} y={46}>
              <div style={display(104)}>Dubai property,</div>
            </Rise>
            <Rise delay={18} y={46}>
              <div style={{ ...display(104), color: goldHi }}>
                in your language.
              </div>
            </Rise>
          </Block>
        </Scene>
      </Sequence>

      {/* 2. Who. Straight after the hook, before any argument is made. */}
      <Sequence {...at(1)} name="Ann">
        <Scene durationInFrames={SCENES[1].d}>
          <Grid />
          <Bloom x="-22%" y="-16%" size="1100px" opacity={0.3} />
          <Bloom x="6%" y="4%" size="960px" opacity={0.2} />
          <FigureRise />
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(to bottom, rgba(18,21,28,0) 44%, rgba(18,21,28,1) 60%)",
            }}
          />
          <Block bottom={340}>
            <Rise delay={4} y={18} blur={4}>
              <Eyebrow>Property Consultant · Dubai</Eyebrow>
            </Rise>
            <Rise delay={12} y={34}>
              <div style={display(88)}>{agent.name}</div>
            </Rise>
            <Rise delay={24} y={20} blur={5} style={{ marginTop: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Rule />
                <Body color="rgba(248,246,241,0.72)">
                  GCC Real Estate. Sri Lankan-owned,
                  <br />
                  DLD-registered, Business Bay.
                </Body>
              </div>
            </Rise>
          </Block>
        </Scene>
      </Sequence>

      {/* 3. The emotional core of the whole argument for this audience. */}
      <Sequence {...at(2)} name="Currency">
        <Scene durationInFrames={SCENES[2].d}>
          <Claim
            img={city05}
            from={1.16}
            to={1.02}
            focus="50% 32%"
            durationInFrames={SCENES[2].d}
            l1="The rupee falls."
            l2="The dirham holds."
            source="Pegged to the US dollar at 3.6725 since 1997"
          />
        </Scene>
      </Sequence>

      <Sequence {...at(3)} name="Tax">
        <Scene durationInFrames={SCENES[3].d}>
          {/* int-05 read as hazy grey here. int-01 is warm and holds the
              charcoal-and-gold grade far better. */}
          <Claim
            img={int01}
            from={1.03}
            to={1.17}
            focus="55% 50%"
            durationInFrames={SCENES[3].d}
            l1="Zero income tax."
            l2="Zero capital gains tax."
            accent={bone}
            source="UAE Ministry of Finance"
            size={76}
            grade={0.34}
            filter="saturate(0.92)"
          />
        </Scene>
      </Sequence>

      <Sequence {...at(4)} name="Freehold">
        <Scene durationInFrames={SCENES[4].d}>
          <Claim
            img={city02}
            from={1.17}
            to={1.03}
            focus="50% 40%"
            durationInFrames={SCENES[4].d}
            l1="Freehold title."
            l2="In your name."
            source="Title deed issued by the Dubai Land Department"
            grade={0.5}
            filter="saturate(0.68) brightness(0.84)"
          />
        </Scene>
      </Sequence>

      {/* 6. For this audience the visa often outranks the yield. */}
      <Sequence {...at(5)} name="Visa">
        <Scene durationInFrames={SCENES[5].d}>
          <Claim
            img={city03}
            from={1.02}
            to={1.15}
            focus="50% 42%"
            durationInFrames={SCENES[5].d}
            l1="Ten years' residency,"
            l2="with your whole family."
            source="On a property of AED 2 million or more"
            size={74}
            grade={0.5}
            filter="saturate(0.64) brightness(0.8)"
          />
        </Scene>
      </Sequence>

      {/* 7. The live, time-boxed reason to act now. */}
      <Sequence {...at(6)} name="Roadshow">
        <Scene durationInFrames={SCENES[6].d}>
          <Grid />
          <Bloom x="-20%" y="8%" size="1200px" opacity={0.34} />
          <Bloom x="42%" y="52%" size="1000px" opacity={0.2} />
          <Img
            src={logo}
            style={{ position: "absolute", top: 96, right: 76, width: 210 }}
          />
          {/* Held inside the site's own edge-gold panel. Centred type alone
              left the top half of the frame dead, and a bordered card is also
              how this event is presented on the site itself. */}
          <AbsoluteFill
            style={{ justifyContent: "center", padding: "0 68px" }}
          >
            <Rise delay={2} y={30} blur={6}>
              <div
                style={{
                  border: "1px solid rgba(217,189,128,0.42)",
                  borderRadius: 30,
                  backgroundColor: "rgba(23,27,36,0.55)",
                  padding: "104px 62px 96px 62px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 26,
                }}
              >
                <Rise delay={8} y={14} blur={3}>
                  <Eyebrow>{roadshow.eyebrow}</Eyebrow>
                </Rise>
                <Rise delay={14} y={34}>
                  <div style={display(90)}>
                    Meet me
                    <br />
                    in Colombo.
                  </div>
                </Rise>
                <Rise delay={28} y={22} blur={5} style={{ marginTop: 24 }}>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 20 }}
                  >
                    <Rule />
                    <div style={{ ...display(70), color: goldHi, lineHeight: 1 }}>
                      {roadshow.dates}
                    </div>
                    <Body>{roadshow.venue}</Body>
                    <Body color="rgba(248,246,241,0.6)">
                      {roadshow.time} · {roadshow.entry}
                    </Body>
                  </div>
                </Rise>
                <Rise delay={46} y={14} blur={3} style={{ marginTop: 30 }}>
                  <Eyebrow size={21}>{SITE}</Eyebrow>
                </Rise>
              </div>
            </Rise>
          </AbsoluteFill>
        </Scene>
      </Sequence>

      {/* 8. End card. One scannable route and one typed route out. */}
      <Sequence {...at(7)} name="End">
        <Scene durationInFrames={SCENES[7].d}>
          <Grid />
          <Bloom x="-20%" y="-14%" size="1100px" opacity={0.28} />
          <Bloom x="18%" y="12%" size="900px" opacity={0.2} />
          {/* Larger and higher than before. At 690px she left a band of dead
              charcoal between her and the type. */}
          <AbsoluteFill style={{ alignItems: "center" }}>
            <Img
              src={figure}
              style={{ width: 800, marginTop: 88, objectFit: "contain" }}
            />
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(to bottom, rgba(18,21,28,0) 36%, rgba(18,21,28,1) 52%)",
            }}
          />
          <Img
            src={logo}
            style={{ position: "absolute", top: 96, right: 76, width: 210 }}
          />
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              padding: "0 76px 120px 76px",
              gap: 18,
            }}
          >
            <Rise delay={3} y={16} blur={4}>
              <Eyebrow>Property Consultant · Dubai</Eyebrow>
            </Rise>
            <Rise delay={10} y={32}>
              <div style={display(84)}>{agent.name}</div>
            </Rise>
            <Rise delay={20} y={20} blur={5} style={{ marginTop: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Rule />
                <div
                  style={{
                    fontFamily: playfair,
                    fontSize: 34,
                    fontStyle: "italic",
                    color: goldHi,
                  }}
                >
                  Dubai property, in your language.
                </div>
              </div>
            </Rise>
            <Rise delay={32} y={24} blur={6} style={{ marginTop: 34 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
                <div
                  style={{
                    backgroundColor: bone,
                    padding: 12,
                    borderRadius: 14,
                    lineHeight: 0,
                  }}
                >
                  <Img src={annQr} style={{ width: 176, height: 176 }} />
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  <Eyebrow size={19}>Scan to WhatsApp</Eyebrow>
                  <Body>{agent.phone}</Body>
                  <Body color="rgba(248,246,241,0.72)">{SITE}</Body>
                  <Body color="rgba(248,246,241,0.55)">{agent.email}</Body>
                </div>
              </div>
            </Rise>
          </AbsoluteFill>
        </Scene>
      </Sequence>

      <Progress total={TOTAL} />
    </AbsoluteFill>
  );
};

/** Her cut-out settling into frame over the whole beat, never quite still. */
const FigureRise: React.FC = () => (
  <AbsoluteFill style={{ alignItems: "center" }}>
    <Rise delay={0} y={44} blur={0} style={{ marginTop: 120 }}>
      <Img src={figure} style={{ width: 840, objectFit: "contain" }} />
    </Rise>
  </AbsoluteFill>
);
