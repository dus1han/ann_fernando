import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { bone, gold, gridBg, ink, XFADE } from "./theme";

/**
 * Wraps a beat and handles its own cross-dissolve.
 *
 * Scenes are laid out overlapping by XFADE frames, so a scene fading out and
 * the next fading in occupy the same frames and the cut reads as a dissolve
 * rather than a dip to black. Dipping to black on every beat of a 22 second
 * reel reads as stuttery.
 */
export const Scene: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, XFADE, durationInFrames - XFADE, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <AbsoluteFill style={{ backgroundColor: ink, opacity }}>
      {children}
      <Sweep />
    </AbsoluteFill>
  );
};

/**
 * A thin gold bar crossing the frame on every cut.
 *
 * It gives each beat a leading edge, so the eye is told where the new frame
 * starts instead of just noticing it has changed. Cheap, and it ties the cuts
 * to the gold in the palette rather than using a generic flash.
 */
export const Sweep: React.FC = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, 18], [0, 100], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 3, 14, 18], [0, 0.85, 0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (opacity <= 0.001) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: `${y}%`,
        height: 3,
        opacity,
        background: `linear-gradient(90deg, transparent, ${gold} 22%, ${bone} 50%, ${gold} 78%, transparent)`,
        filter: "blur(1.5px)",
      }}
    />
  );
};

/**
 * Text entrance. Rise, fade and a short defocus.
 *
 * The blur is what makes it feel shot rather than animated: type that resolves
 * into focus reads as photographic, where opacity alone reads as a slide deck.
 */
export const Rise: React.FC<{
  delay?: number;
  y?: number;
  blur?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, y = 38, blur = 9, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.7 },
  });
  return (
    <div
      style={{
        opacity: t,
        transform: `translateY(${(1 - t) * y}px)`,
        filter: `blur(${(1 - t) * blur}px)`,
        willChange: "transform, opacity, filter",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Headline entrance: a left-to-right reveal with a gold edge riding the wipe.
 *
 * This is the editorial title move, and it is what a plain fade cannot do. The
 * `drift` option keeps a line moving slowly after it lands, used on "The rupee
 * falls." so the sentence enacts itself.
 */
export const Wipe: React.FC<{
  delay?: number;
  drift?: number;
  durationInFrames?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, drift = 0, durationInFrames = 90, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.55 },
  });
  const slide = drift
    ? interpolate(frame, [delay, durationInFrames], [0, drift], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  return (
    <div style={{ position: "relative", ...style }}>
      <div
        style={{
          clipPath: `inset(-12% ${(1 - t) * 103}% -12% 0)`,
          transform: `translateY(${(1 - t) * 16 + slide}px)`,
          willChange: "clip-path, transform",
        }}
      >
        {children}
      </div>
      {t > 0.02 && t < 0.99 ? (
        <div
          style={{
            position: "absolute",
            top: "-8%",
            bottom: "-8%",
            left: `${t * 100}%`,
            width: 3,
            backgroundColor: gold,
            filter: "blur(1px)",
            opacity: 0.9,
          }}
        />
      ) : null}
    </div>
  );
};

/** Tracking that tightens as the label lands. */
export const TrackIn: React.FC<{
  delay?: number;
  children: React.ReactNode;
}> = ({ delay = 0, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        opacity: t,
        letterSpacing: `${0.3 + (1 - t) * 0.5}em`,
        willChange: "opacity, letter-spacing",
      }}
    >
      {children}
    </div>
  );
};

/**
 * Slow continuous push or pull on a still, with the frame drifting laterally
 * so the movement is not purely a zoom. Direction alternates between beats.
 */
export const KenBurns: React.FC<{
  src: string;
  from: number;
  to: number;
  durationInFrames: number;
  focus?: string;
  grade?: number;
  pan?: number;
  /**
   * Per-shot correction. The library mixes dusk skylines with midday blue, and
   * an ungraded midday frame dropped into this sequence reads as a different
   * video. Pull saturation and brightness down on those.
   */
  filter?: string;
  /**
   * Gold wash on soft-light. Her portraits were shot in white marble interiors
   * against bright sheer curtains, and desaturating alone leaves them cold grey
   * next to the dusk skylines. Soft-light warms the midtones back toward the
   * palette without lifting the blacks the way a normal overlay would.
   */
  tint?: number;
}> = ({
  src,
  from,
  to,
  durationInFrames,
  focus = "50% 45%",
  grade = 0.3,
  pan = 0,
  filter,
  tint,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [from, to], {
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [0, durationInFrames], [0, pan], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: focus,
          transform: `scale(${scale}) translateX(${x}px)`,
          filter,
          willChange: "transform",
        }}
      />
      {/* Pulls the photography toward the site's charcoal so six different
          sources read as one graded sequence. */}
      <AbsoluteFill
        style={{ backgroundColor: ink, opacity: grade, mixBlendMode: "multiply" }}
      />
      {tint ? (
        <AbsoluteFill
          style={{
            backgroundColor: gold,
            opacity: tint,
            mixBlendMode: "soft-light",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

/** A single band of light crossing the frame. Used on her portrait beat. */
export const LightPass: React.FC<{ start?: number; duration?: number }> = ({
  start = 12,
  duration = 54,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + duration], [-30, 135], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(112deg, transparent ${p - 20}%, rgba(237,217,170,0.17) ${p}%, transparent ${
          p + 20
        }%)`,
        mixBlendMode: "screen",
      }}
    />
  );
};

/**
 * Film grain. Turbulence is generated at 360x640 and stretched, because at full
 * resolution it costs real render time and grain wants to be soft anyway.
 * Reseeded every frame so it moves rather than sitting there as a texture.
 */
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: 0.07, mixBlendMode: "overlay" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 360 640"
        preserveAspectRatio="none"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves={1}
            seed={frame % 24}
          />
        </filter>
        <rect width="360" height="640" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

/** Bottom scrim. Type never sits directly on a photograph. */
export const Scrim: React.FC<{ from?: string; strength?: number }> = ({
  from = "38%",
  strength = 0.97,
}) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(to bottom, rgba(18,21,28,0) ${from}, rgba(18,21,28,${
        strength * 0.85
      }) 72%, rgba(18,21,28,${strength}) 88%)`,
    }}
  />
);

export const Grid: React.FC = () => <AbsoluteFill style={gridBg} />;

/** Aurora bloom, same effect as the site's .aurora layers. */
export const Bloom: React.FC<{
  x: string;
  y: string;
  size: string;
  opacity?: number;
}> = ({ x, y, size, opacity = 0.5 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, rgba(217,189,128,${opacity}) 0%, rgba(217,189,128,0) 68%)`,
      filter: "blur(40px)",
    }}
  />
);

/** Small caps with tracking, the site's label voice. */
export const Eyebrow: React.FC<{
  children: string;
  color?: string;
  size?: number;
}> = ({ children, color = gold, size = 23 }) => (
  <div
    style={{
      fontFamily: "Inter, sans-serif",
      fontSize: size,
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color,
      fontWeight: 500,
    }}
  >
    {children}
  </div>
);

/** Gold rule that draws itself outward rather than fading in. */
export const Rule: React.FC<{ width?: number; delay?: number }> = ({
  width = 92,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return <div style={{ width: width * t, height: 2, backgroundColor: gold }} />;
};

/** Attribution line under a claim, so every number points at its source. */
export const Source: React.FC<{ children: string }> = ({ children }) => (
  <div
    style={{
      fontFamily: "Inter, sans-serif",
      fontSize: 21,
      color: "rgba(248,246,241,0.55)",
      letterSpacing: "0.02em",
    }}
  >
    {children}
  </div>
);

/**
 * QR on a bone plate, inside a rotating conic ring. The ring is the site's own
 * .ring-anim border, reused.
 *
 * ⚠ The code itself never moves or scales after it lands. It wipes in once and
 * then holds absolutely still, because a QR that is still animating cannot be
 * scanned. Only the ring around it rotates.
 */
export const QrPlate: React.FC<{
  src: string;
  size: number;
  delay?: number;
  ring?: boolean;
}> = ({ src, size, delay = 0, ring = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const settled = t > 0.995;
  return (
    <div
      style={{
        padding: ring ? 4 : 0,
        borderRadius: 20,
        background: ring
          ? `conic-gradient(from ${frame * 2.4}deg, rgba(217,189,128,0) 0deg, ${gold} 60deg, rgba(217,189,128,0) 140deg, rgba(217,189,128,0) 360deg)`
          : undefined,
        opacity: t,
        // Held at exactly 1 once settled, never a fractional transform, so the
        // modules stay pixel-aligned for the scanner.
        transform: settled ? undefined : `scale(${0.9 + t * 0.1})`,
      }}
    >
      <div
        style={{
          backgroundColor: bone,
          padding: 12,
          borderRadius: 17,
          lineHeight: 0,
        }}
      >
        <Img src={src} style={{ width: size, height: size }} />
      </div>
    </div>
  );
};

/**
 * Persistent brand layer, above every scene and outside their dissolves.
 *
 * The logo used to appear only on the last two beats, which meant most of the
 * reel carried no company mark at all. A reel is watched once, often muted and
 * at speed, so the mark has to be on screen the whole time.
 */
export const Brand: React.FC<{ logo: string; site: string }> = ({
  logo,
  site,
}) => {
  const frame = useCurrentFrame();
  const t = spring({ frame: frame - 8, fps: 30, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ opacity: t }}>
      <Img
        src={logo}
        style={{ position: "absolute", top: 84, right: 76, width: 200 }}
      />
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 76,
          fontFamily: "Inter, sans-serif",
          fontSize: 19,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "rgba(217,189,128,0.85)",
          fontWeight: 500,
        }}
      >
        {site}
      </div>
    </AbsoluteFill>
  );
};

/** Watch-through cue. A filling bar measurably lifts completion rate. */
export const Progress: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(248,246,241,0.16)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          right: "auto",
          width: `${((frame + 1) / total) * 100}%`,
          backgroundColor: gold,
        }}
      />
    </div>
  );
};

export const Body: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = bone,
}) => (
  <div
    style={{
      fontFamily: "Inter, sans-serif",
      fontSize: 30,
      lineHeight: 1.45,
      color,
    }}
  >
    {children}
  </div>
);
