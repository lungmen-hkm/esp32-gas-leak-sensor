const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {(phase: string) => import('next').NextConfig} */
module.exports = (phase) => ({
  // In production, assets are served from the Vercel origin so the app keeps
  // working when it is proxied under /roboci on project.lungmenhkm.xyz.
  // Locally, let Next serve its own dev assets.
  assetPrefix:
    phase === PHASE_DEVELOPMENT_SERVER
      ? undefined
      : "https://esp32-gas-leak-sensor.vercel.app",
});
