import { scenes, CHAR, ENTER, LATENCY } from "./scenes.js"

const stage = document.getElementById("stage")
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
const rich = text =>
  text
    .replace(/«([^»]+)»/g, '<mark class="hl">$1</mark>')
    .replace(/\[\[([^\]]+)\]\]/g, '<span class="id">$1</span>')
    .replace(/\{\{([^}]+)\}\}/g, '<b class="now">$1</b>')
    .replace(/\(\(([^)]+)\)\)/g, '<span class="d">$1</span>')
    .replace(/@@([^@]+)@@/g, '<span class="c">$1</span>')

const cues = []
const timed = []
let clock = 0

function lay(scene, index) {
  const start = clock
  const n = String(index + 1).padStart(2, "0")
  const el = document.createElement("section")
  el.className = `scene ${scene.kind ?? "term"}`
  el.dataset.n = n
  let t = start
  let caption = null
  let buildAt = null
  const body = []
  const push = (kind, text, extra = {}) => body.push({ t, kind, text, ...extra })

  for (const step of scene.steps) {
    if (step.wait !== undefined) t += step.wait
    else if (step.cap !== undefined) caption = { t, html: step.cap }
    else if (step.gap !== undefined) push("gap", "")
    else if (step.cmd !== undefined) {
      const char = step.char ?? CHAR
      const typed = step.cmd.length * char
      push("cmd", step.cmd, { prompt: step.prompt ?? "$", pcls: step.pcls ?? "p", pre: step.pre ?? "", until: t + typed, char })
      for (let i = 0; i < step.cmd.length; i++) if (step.cmd[i] !== " ") cues.push({ t: t + i * char, kind: "key" })
      t += typed + ENTER
      cues.push({ t, kind: "enter" })
      t += step.latency ?? LATENCY
    } else {
      const lines = step.out !== undefined ? [step.out].flat() : step.row !== undefined ? [step.row] : [step.html]
      for (const line of lines) push(line === "" && step.html === undefined ? "gap" : "out", line, { raw: step.cls === "html" || step.html !== undefined, cls: step.html !== undefined ? step.cls : "" })
      const tone = step.tone ?? (step.row !== undefined ? "row" : step.html !== undefined ? null : "land")
      if (tone) cues.push({ t, kind: tone })
      if (tone === "build" || tone === "answer") buildAt ??= t
      t += step.hold ?? step.every ?? (step.row !== undefined ? 0.18 : 0)
    }
  }
  const end = t + (scene.hold ?? 1.2)

  if (scene.html) {
    el.innerHTML = scene.html
    for (const node of el.querySelectorAll("[data-t]")) node.dataset.t = start + +node.dataset.t
  } else {
    const rows = body
      .map(line => {
        if (line.kind === "cmd")
          return `<div class="line cmd" data-t="${line.t}" data-until="${line.until}" data-char="${line.char}" data-text="${esc(line.text)}">${line.pre}<b class="${line.pcls}">${esc(line.prompt)}</b><span class="t"></span><i class="cur"></i></div>`
        if (line.kind === "gap") return `<div class="line gap" data-t="${line.t}"></div>`
        return `<div class="line out ${line.cls ?? ""}" data-t="${line.t}">${rich(line.raw ? line.text : esc(line.text))}</div>`
      })
      .join("")
    const head = scene.head ? `<div class="head"><b>${esc(scene.head[0])}</b><span>${esc(scene.head[1] ?? "")}</span></div>` : ""
    const tree = scene.tree ? `<pre class="tree" data-t="${buildAt ?? start}">${rich(scene.tree)}</pre>` : ""
    const cap = caption ? `<p class="cap" data-t="${caption.t}">${caption.html}</p>` : ""
    el.innerHTML = `<header class="title"><span class="rubric">${n}  ${esc(scene.rubric ?? "")}</span><h2>${scene.title}</h2></header><div class="panels"><div class="panel">${head}<div class="body">${rows}</div></div>${tree}</div>${cap}`
  }
  el.dataset.s = start
  el.dataset.e = end
  stage.append(el)
  timed.push(...el.querySelectorAll("[data-t]"))
  clock = end
}

scenes.forEach(lay)
const sections = [...stage.querySelectorAll(".scene")]
const bodies = [...stage.querySelectorAll(".body")]
const cmds = [...stage.querySelectorAll(".cmd")]
const END = clock
const counter = document.getElementById("count")

function seek(t) {
  for (const s of sections) {
    const on = t >= +s.dataset.s && t < +s.dataset.e
    s.classList.toggle("on", on)
    if (on) counter.textContent = `${s.dataset.n} / ${String(sections.length).padStart(2, "0")}`
  }
  stage.classList.toggle("blink", Math.floor(t * 2) % 2 === 0)
  for (const el of timed) el.classList.toggle("on", t >= +el.dataset.t)
  for (const c of cmds) {
    const at = +c.dataset.t
    const n = t >= at ? Math.min(c.dataset.text.length, Math.floor((t - at) / +c.dataset.char + 1e-6) + 1) : 0
    c.querySelector(".t").textContent = c.dataset.text.slice(0, n)
    c.classList.toggle("idle", t >= +c.dataset.until)
  }
  for (const b of bodies) {
    const on = [...b.querySelectorAll(".line.on")]
    const style = getComputedStyle(b)
    const room = Math.floor((b.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)) / parseFloat(style.lineHeight))
    const gone = Math.max(0, on.filter(l => !l.classList.contains("gap")).length - room)
    let hide = gone
    for (const l of on) l.classList.toggle("gone", hide > 0 && hide-- > 0)
    for (const c of b.querySelectorAll(".cmd")) c.classList.toggle("live", c === on.at(-1))
  }
}

window.seek = seek
window.END = END
window.CUES = cues

if (!navigator.webdriver) {
  const from = +new URLSearchParams(location.search).get("t") || 0
  const t0 = performance.now() - from * 1000
  const tick = now => {
    seek(((now - t0) / 1000) % END)
    requestAnimationFrame(tick)
  }
  document.fonts.ready.then(() => requestAnimationFrame(tick))
}
