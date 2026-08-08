import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

/**
 * CRF 18 at 1080x1920 lands well under Instagram's ceiling while surviving
 * their re-encode. Going lower barely helps once Meta transcodes it anyway.
 */
Config.setCrf(18);
Config.setCodec("h264");

/** Chromium needs this to composite the cut-out's alpha correctly on Windows. */
Config.setChromiumOpenGlRenderer("angle");
