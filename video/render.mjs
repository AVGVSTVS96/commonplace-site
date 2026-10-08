import { createServer } from "node:http"
import { readFile, mkdir, writeFile } from "node:fs/promises"
import { extname, join, resolve } from "node:path"
import { spawn } from "node:child_process"
import { existsSync } from "node:fs"
import puppeteer from "puppeteer-core"

const here = import.meta.dirname
const repo = resolve(here, "..")
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".woff2": "font/woff2" }
const server = createServer(async (req, res) => {
  try {
    const path = join(repo, decodeURIComponent(new URL(req.url, "http://x").pathname.replace(/\/$/, "/index.html")))
    const body = await readFile(path)
    res.writeHead(200, { "content-type": types[extname(path)] ?? "application/octet-stream" }).end(body)
  } catch {
    res.writeHead(404).end()
  }
}).listen(0, "127.0.0.1")
await new Promise(r => server.once("listening", r))

const [mode = "video", ...rest] = process.argv.slice(2)
const W = 1920, H = 1080
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "/usr/bin/google-chrome-stable", headless: true, args: ["--force-color-profile=srgb", "--hide-scrollbars"] })
const page = await browser.newPage()
await page.setViewport({ width: W, height: H })
await page.goto(`http://127.0.0.1:${server.address().port}/video/`, { waitUntil: "networkidle0" })
await page.evaluate(() => document.fonts.ready)
const end = await page.evaluate(() => window.END)
const shot = async t => {
  await page.evaluate(t => window.seek(t), t)
  return page.screenshot({ type: "png", clip: { x: 0, y: 0, width: W, height: H } })
}

const out = join(here, "out")
await mkdir(out, { recursive: true })

const run = args => new Promise((resolve, reject) => {
  const child = spawn("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], { stdio: ["ignore", "inherit", "pipe"] })
  let err = ""
  child.stderr.on("data", d => (err += d))
  child.on("close", code => (code ? reject(new Error(err)) : resolve(err)))
})

if (mode === "audio") {
  const stems = await page.evaluate(() => window.soundtrack())
  const names = Object.keys(stems)
  for (const name of names) await writeFile(join(out, `${name}.wav`), Buffer.from(stems[name], "base64"))
  const inputs = names.flatMap(n => ["-i", join(out, `${n}.wav`)])
  const mix = names.length > 1 ? `amix=inputs=${names.length}:normalize=0` : "anull"
  const stats = await run(["-loglevel", "info", ...inputs, "-filter_complex", `${mix},ebur128=peak=true`, "-f", "null", "-"])
  const loudness = Number(stats.match(/I:\s+(-?[\d.]+) LUFS/g).at(-1).match(/-?[\d.]+/)[0])
  await run([...inputs, "-filter_complex", `${mix},volume=${-16 - loudness}dB,alimiter=limit=0.89:level=false`, "-ar", "48000", join(out, "soundtrack.wav")])
  console.log(`mixed ${names.join(" + ")} from ${loudness} LUFS to -16 LUFS → ${join(out, "soundtrack.wav")}`)
} else if (mode === "stills") {
  for (const t of rest.map(Number)) await writeFile(join(out, `t${t.toFixed(2)}.png`), await shot(t))
} else if (mode === "sheet") {
  const step = Number(rest[0] ?? 1)
  const times = Array.from({ length: Math.ceil(end / step) }, (_, i) => i * step)
  for (const t of times) await writeFile(join(out, `f${String(times.indexOf(t)).padStart(3, "0")}.png`), await shot(t))
  await run(["-framerate", "1", "-i", join(out, "f%03d.png"), "-vf", `scale=480:-1,tile=4x${Math.ceil(times.length / 4)}`, "-frames:v", "1", join(out, "sheet.png")])
  console.log(join(out, "sheet.png"))
} else {
  const fps = Number(rest[0] ?? 60)
  const file = join(out, "commonplace-launch.mp4")
  const ffmpeg = spawn("ffmpeg", [
    "-y", "-loglevel", "error",
    "-f", "image2pipe", "-framerate", String(fps), "-c:v", "png", "-i", "-",
    ...(existsSync(join(out, "soundtrack.wav")) ? ["-i", join(out, "soundtrack.wav")] : ["-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo"]),
    "-c:v", "libx264", "-preset", "slow", "-crf", "14", "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "256k", "-shortest", "-movflags", "+faststart", file,
  ], { stdio: ["pipe", "inherit", "inherit"] })
  const frames = Math.round(end * fps)
  for (let i = 0; i < frames; i++) {
    if (!ffmpeg.stdin.write(await shot(i / fps))) await new Promise(r => ffmpeg.stdin.once("drain", r))
    if (i % fps === 0) process.stdout.write(`\r${(i / fps).toFixed(0)}s / ${end}s`)
  }
  ffmpeg.stdin.end()
  await new Promise(r => ffmpeg.on("close", r))
  console.log(`\n${file}`)
}

await browser.close()
server.close()
