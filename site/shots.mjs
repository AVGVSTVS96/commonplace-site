import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const here = import.meta.dirname;
const port = 5199;
const base = `http://localhost:${port}`;
mkdirSync(`${here}/shots`, { recursive: true });

const server = spawn("vp", ["dev", "--port", String(port), "--strictPort"], {
  cwd: here,
  stdio: "ignore",
});
for (let tries = 0; ; tries++) {
  try {
    await fetch(base);
    break;
  } catch {
    if (tries > 100) throw new Error("dev server never came up");
    await new Promise((done) => setTimeout(done, 100));
  }
}

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME ?? "/usr/bin/google-chrome-stable",
  headless: true,
  args: ["--force-color-profile=srgb", "--hide-scrollbars"],
});
const page = await browser.newPage();
const settle = () => page.evaluate(() => document.fonts.ready);

await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
for (const [name, width] of [
  ["desktop", 1280],
  ["phone", 390],
]) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 2 });
  for (const scheme of ["light", "dark"]) {
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: scheme },
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    await page.goto(`${base}/`, { waitUntil: "networkidle0" });
    await settle();
    await page.screenshot({ path: `${here}/shots/${name}-${scheme}.png`, fullPage: true });
    console.log(`shots/${name}-${scheme}.png`);
  }
}

await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(`${base}/og.html`, { waitUntil: "networkidle0" });
await settle();
await page.screenshot({ path: `${here}/public/og.png` });
console.log("public/og.png");

await page.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 });
await page.goto(`${base}/favicon.svg`, { waitUntil: "networkidle0" });
await page.screenshot({ path: `${here}/public/apple-touch-icon.png`, omitBackground: true });
console.log("public/apple-touch-icon.png");

await browser.close();
server.kill();
