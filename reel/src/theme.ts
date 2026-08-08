/**
 * Lifted from app/globals.css so the reel and the site cannot drift apart.
 * If a token changes there, change it here.
 */
export const ink = "#12151c";
export const ink900 = "#171b24";
export const gold = "#d9bd80";
export const goldHi = "#edd9aa";
export const bone = "#f8f6f1";
export const boneDim = "rgba(248,246,241,0.72)";
export const boneFaint = "rgba(248,246,241,0.5)";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/** Cross-dissolve length. Scenes overlap by exactly this much. */
export const XFADE = 12;

/** The 72px gold rule grid the whole site sits on. */
export const gridBg: React.CSSProperties = {
  backgroundImage: `linear-gradient(rgba(217,189,128,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(217,189,128,0.055) 1px, transparent 1px)`,
  backgroundSize: "72px 72px",
};
