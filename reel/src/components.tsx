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
 * rather than a dip to black. Dipping to black on every beat of a 21 second
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
    </AbsoluteFill>
  );
};

/**
 * Text entrance. Rise, fade and a short defocus.
 *
 * The blur is the part that makes it feel shot rather than animated: type that
 * resolves into focus reads as photographic, where opacity alone reads as a
 * slide deck. Cheap in Chromium, impossible in GDI+, and the reason this reel
 * is built in Remotion at all.
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
 * Slow continuous push or pull on a still. Direction alternates between beats
 * so six consecutive photographs do not all drift the same way.
 */
export const KenBurns: React.FC<{
  src: string;
  from: number;
  to: number;
  durationInFrames: number;
  focus?: string;
  grade?: number;
  /**
   * Per-shot correction. The library mixes dusk skylines with midday blue, and
   * an ungraded midday frame dropped into this sequence reads as a different
   * video. Pull saturation and brightness down on those.
   */
  filter?: string;
}> = ({
  src,
  from,
  to,
  durationInFrames,
  focus = "50% 45%",
  grade = 0.3,
  filter,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [from, to], {
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
          transform: `scale(${scale})`,
          filter,
          willChange: "transform",
        }}
      />
      {/* Pulls the photography toward the site's charcoal so six different
          sources read as one graded sequence. */}
      <AbsoluteFill
        style={{ backgroundColor: ink, opacity: grade, mixBlendMode: "multiply" }}
      />
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

export const Rule: React.FC<{ width?: number }> = ({ width = 92 }) => (
  <div style={{ width, height: 2, backgroundColor: gold }} />
);

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

/** Watch-through cue. A filling bar measurably lifts completion rate. */
export const Progress: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5 }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(248,246,241,0.16)" }} />
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
