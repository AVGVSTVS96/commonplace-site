import puppeteer from "puppeteer-core"
import { mkdirSync } from "node:fs"

const here = import.meta.dirname
const page_url = `file://${here}/specimen.html`
const out = `${here}/shots`
mkdirSync(out, { recursive: true })

const chrome = process.env.CHROME ?? "/usr/bin/google-chrome-stable"
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ["--force-color-profile=srgb", "--hide-scrollbars", "--allow-file-access-from-files"] })
const page = await browser.newPage()

for (const [name, width] of [["desktop", 1280], ["phone", 390]]) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 2 })
  for (const scheme of ["light", "dark"]) {
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }])
    await page.goto(page_url, { waitUntil: "networkidle0" })
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: `${out}/${name}-${scheme}.png`, fullPage: true })
    console.log(`${name}-${scheme}.png`)
  }
}
await browser.close()
