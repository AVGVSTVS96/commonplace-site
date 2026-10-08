import { createServer } from "node:http"
import { readFile, mkdir, readdir, rename, rm, writeFile } from "node:fs/promises"
import { extname, join, resolve } from "node:path"
import { spawn } from "node:child_process"
import { createHash } from "node:crypto"
import { existsSync } from "node:fs"
import puppeteer from "puppeteer-core"

const here = import.meta.dirname
const repo = resolve(here, "..")
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".woff2": "font/woff2" }
const served = new Map()
const server = createServer(async (req, res) => {
  try {
    const path = join(repo, decodeURIComponent(new URL(req.url, "http://x").pathname.replace(/\/$/, "/index.html")))
    const body = await readFile(path)
    served.set(path, body)
    res.writeHead(200, { "content-type": types[extname(path)] ?? "application/octet-stream" }).end(body)
  } catch {
    res.writeHead(404).end()
  }
}).listen(0, "127.0.0.1")
await new Promise(r => server.once("listening", r))

const [mode = "video", ...rest] = process.argv.slice(2)
const W = 1920, H = 1080
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME ?? "/usr/bin/google-chrome-stable",
  headless: true,
  protocolTimeout: 0,
  args: ["--force-color-profile=srgb", "--hide-scrollbars", "--disable-dev-shm-usage"],
})
let page
const open = async () => {
  await page?.close()
  page = await browser.newPage()
  await page.setViewport({ width: W, height: H })
  await page.goto(`http://127.0.0.1:${server.address().port}/video/`, { waitUntil: "networkidle0" })
  await page.evaluate(() => document.fonts.ready)
}
await open()
const end = await page.evaluate(() => window.END)
const shot = async t => {
  await page.evaluate(t => window.seek(t), t)
  return page.screenshot({ type: "png", clip: { x: 0, y: 0, width: W, height: H } })
}

const out = join(here, "out")
await mkdir(out, { recursive: true })

const ffmpeg = args => {
  const child = spawn("ffmpeg", ["-y", "-hide_banner", ...args], { stdio: ["pipe", "inherit", "pipe"] })
  let log = ""
  child.stderr.on("data", d => (log += d))
  const done = new Promise((ok, fail) => child.on("close", code => (code ? fail(new Error(log)) : ok(log))))
  return { stdin: child.stdin, done }
}

const pipe = async (times, args) => {
  const { stdin, done } = ffmpeg(["-loglevel", "error", "-f", "image2pipe", "-c:v", "png", ...args])
  for (const t of times) if (!stdin.write(await shot(t))) await new Promise(r => stdin.once("drain", r))
  stdin.end()
  return done
}

const measure = async (inputs, filter) => {
  const log = await ffmpeg([...inputs, "-filter_complex", `${filter},ebur128=peak=true`, "-f", "null", "-"]).done
  const summary = log.slice(log.lastIndexOf("Summary"))
  return { lufs: Number(summary.match(/I:\s+(-?[\d.]+)/)[1]), peak: Number(summary.match(/Peak:\s+(-?[\d.]+)/)[1]) }
}

if (mode === "audio") {
  const stems = await page.evaluate(() => window.soundtrack())
  const inputs = []
  for (const [stem, data] of Object.entries(stems)) {
    await writeFile(join(out, `${stem}.wav`), Buffer.from(data, "base64"))
    inputs.push("-i", join(out, `${stem}.wav`))
  }
  const mix = inputs.length > 2 ? `amix=inputs=${inputs.length / 2}:normalize=0` : "anull"
  const master = gain => `${mix},volume=${gain}dB,aresample=192000,alimiter=limit=0.794:attack=5:release=50:level=0:latency=1,aresample=48000`
  let gain = -14 - (await measure(inputs, mix)).lufs
  gain += -14 - (await measure(inputs, master(gain))).lufs
  const file = join(out, "soundtrack.wav")
  await ffmpeg(["-loglevel", "error", ...inputs, "-filter_complex", master(gain), "-c:a", "pcm_f32le", file]).done
  const { lufs, peak } = await measure(["-i", file], "anull")
  console.log(`${file}: ${lufs} LUFS, true peak ${peak} dBTP`)
} else if (mode === "stills") {
  for (const t of rest.map(Number)) await writeFile(join(out, `t${t.toFixed(2)}.png`), await shot(t))
} else if (mode === "sheet") {
  const step = Number(rest[0] ?? 1)
  const times = Array.from({ length: Math.ceil(end / step) }, (_, i) => i * step)
  await pipe(times, ["-i", "-", "-vf", `scale=480:-1,tile=4x${Math.ceil(times.length / 4)}`, "-frames:v", "1", join(out, "sheet.png")])
  console.log(join(out, "sheet.png"))
} else {
  const fps = Number(rest[0] ?? 60)
  const encode = [
    "-vf", "scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int,format=yuv420p,setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv",
    "-c:v", "libx264", "-preset", "slow", "-crf", "14", "-profile:v", "high", "-threads", "4",
  ]
  const hash = createHash("sha256").update(encode.join(" "))
  for (const [path, body] of [...served].sort(([a], [b]) => a.localeCompare(b))) hash.update(path).update(body)
  const parts = join(out, `parts-${fps}-${hash.digest("hex").slice(0, 12)}`)
  for (const dir of await readdir(out)) if (dir.startsWith("parts-") && join(out, dir) !== parts) await rm(join(out, dir), { recursive: true })
  await mkdir(parts, { recursive: true })
  const frames = Math.round(end * fps)
  const batch = 5 * fps
  const list = []
  for (let from = 0; from < frames; from += batch) {
    const part = `${String(from / batch).padStart(3, "0")}.mp4`
    list.push(`file '${part}'`)
    if (existsSync(join(parts, part))) continue
    await open()
    const times = Array.from({ length: Math.min(batch, frames - from) }, (_, i) => (from + i) / fps)
    await pipe(times, ["-framerate", String(fps), "-i", "-", ...encode, join(parts, `tmp-${part}`)])
    await rename(join(parts, `tmp-${part}`), join(parts, part))
    process.stdout.write(`\r${Math.min((from + batch) / fps, end)}s / ${end}s`)
  }
  await writeFile(join(parts, "list.txt"), list.join("\n"))
  const sound = join(out, "soundtrack.wav")
  const file = join(out, "commonplace-launch.mp4")
  await ffmpeg([
    "-loglevel", "error",
    "-f", "concat", "-i", join(parts, "list.txt"),
    ...(existsSync(sound) ? ["-i", sound] : ["-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo"]),
    "-c:v", "copy", "-c:a", "aac", "-b:a", "320k", "-ar", "48000", "-shortest", "-movflags", "+faststart", file,
  ]).done
  const heard = existsSync(sound) ? await measure(["-i", file], "anull") : null
  console.log(`\n${file}${heard ? `: ${heard.lufs} LUFS, true peak ${heard.peak} dBTP after AAC` : ", silent"}`)
}

await browser.close()
server.close()
