import opentype from "opentype.js"
import { mkdirSync, writeFileSync } from "node:fs"

const out = import.meta.dirname
mkdirSync(out, { recursive: true })

const mono = opentype.loadSync(new URL("ttf/IBMPlexMono-Medium.ttf", import.meta.url).pathname)
const sans = opentype.loadSync(new URL("ttf/IBMPlexSans-SemiBold.ttf", import.meta.url).pathname)
const SIZE = 100
const em = (font, units) => (units / font.unitsPerEm) * SIZE
const INK = "#141412", INK_DARK = "#ECEAE4", RED = "#D2451E", RED_DARK = "#F06A42"

const text = (font, str, x, y, spacing = 0, size = SIZE) => {
  let cx = x
  const parts = []
  for (const ch of str) {
    const g = font.charToGlyph(ch)
    parts.push(g.getPath(cx, y, size).toPathData(2))
    cx += (g.advanceWidth / font.unitsPerEm) * size + spacing
  }
  return { d: parts.join(""), end: cx }
}

const svg = (w, h, body, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w.toFixed(1)} ${h.toFixed(1)}" role="img" aria-label="${label}">${body}</svg>\n`

const xh = em(mono, mono.tables.os2.sxHeight)
const asc = em(mono, mono.tables.os2.sTypoAscender)
const base = 90
const pad = 6

// A: commonplace + block cursor, x-height tall, one cell wide, in red
const a = text(mono, "commonplace", pad, base)
const cell = em(mono, mono.charToGlyph("m").advanceWidth)
const cursorX = a.end + cell * 0.3
const cursorW = cell * 0.78
const bodyA = (ink, red) =>
  `<path fill="${ink}" d="${a.d}"/><rect fill="${red}" x="${cursorX.toFixed(1)}" y="${(base - xh).toFixed(1)}" width="${cursorW.toFixed(1)}" height="${xh.toFixed(1)}"/>`
const wA = cursorX + cursorW + pad
const hA = base + em(mono, -mono.tables.os2.sTypoDescender) * 0.6
writeFileSync(`${out}/explore-a-cursor.svg`, svg(wA, hA, bodyA(INK, RED), "commonplace"))

// B: bookplate: cp in a hairline square, wordmark in Plex Sans
const box = 100
const cpSize = 78
const cpW = text(mono, "cp", 0, 0, 0, cpSize).end
const desc = em(mono, -mono.tables.os2.sTypoDescender)
const boxTop = base - box + 10
const cpPath = text(mono, "cp", pad + (box - cpW) / 2 + 1, boxTop + box / 2 + (xh - desc) * 0.39, 0, cpSize)
const bW = text(sans, "commonplace", pad + box + 24, base, -1.2)
const bodyB = (ink, red) =>
  `<rect fill="none" stroke="${red}" stroke-width="3" x="${pad + 1.5}" y="${base - box + 10 + 1.5}" width="${box - 3}" height="${box - 3}"/><path fill="${red}" d="${cpPath.d}"/><path fill="${ink}" d="${bW.d}"/>`
writeFileSync(`${out}/explore-b-bookplate.svg`, svg(bW.end + pad, hA, bodyB(INK, RED), "commonplace"))

// C: ledger rows: three rules, snapshots of unequal length, newest in red; wordmark mono
const rowH = 8, rowGap = 10
const rows = [1, 0.55, 0.8]
const markW = 62
const top = base - xh + 4
const bodyC = (ink, red) =>
  rows
    .map((f, i) => `<rect fill="${i === rows.length - 1 ? red : ink}" x="${pad}" y="${(top + i * (rowH + rowGap)).toFixed(1)}" width="${(markW * f).toFixed(1)}" height="${rowH}"/>`)
    .join("") + `<path fill="${ink}" d="${text(mono, "commonplace", pad + markW + 22, base).d}"/>`
const cW = text(mono, "commonplace", pad + markW + 22, base).end + pad
writeFileSync(`${out}/explore-c-rows.svg`, svg(cW, hA, bodyC(INK, RED), "commonplace"))

// Pick: A. Ship light, dark, mark, favicon.
writeFileSync(`${out}/commonplace.svg`, svg(wA, hA, bodyA(INK, RED), "commonplace"))
writeFileSync(`${out}/commonplace-dark.svg`, svg(wA, hA, bodyA(INK_DARK, RED_DARK), "commonplace"))
writeFileSync(`${out}/commonplace-mono.svg`, svg(wA, hA, bodyA("currentColor", "currentColor"), "commonplace"))

// Mark: c + cursor, square
const c = text(mono, "c", 0, 0)
const mS = 100
const markCursorW = cursorW * 0.8
const markGap = cell * 0.22
const cBox = mono.charToGlyph("c").getPath(0, 0, SIZE).getBoundingBox()
const cVis = cBox.x2 - cBox.x1
const cPath = text(mono, "c", (mS - (cVis + markGap + markCursorW)) / 2 - cBox.x1, 50 + xh / 2)
cPath.end = (mS - (cVis + markGap + markCursorW)) / 2 + cVis
const mCursorX = cPath.end + markGap
const mark = (bg, ink, red) =>
  `<rect fill="${bg}" width="${mS}" height="${mS}" rx="18"/><g transform="translate(50 50) scale(.82) translate(-50 -50)"><path fill="${ink}" d="${cPath.d}"/><rect fill="${red}" x="${mCursorX.toFixed(1)}" y="${(50 - xh / 2).toFixed(1)}" width="${markCursorW.toFixed(1)}" height="${xh.toFixed(1)}"/></g>`
writeFileSync(`${out}/mark.svg`, svg(mS, mS, mark("#FAF9F6", INK, RED), "commonplace"))
writeFileSync(`${out}/mark-dark.svg`, svg(mS, mS, mark("#121211", INK_DARK, RED_DARK), "commonplace"))
writeFileSync(
  `${out}/favicon.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${mS} ${mS}"><style>:root{color-scheme:light dark}.bg{fill:#FAF9F6}.ink{fill:${INK}}.red{fill:${RED}}@media(prefers-color-scheme:dark){.bg{fill:#121211}.ink{fill:${INK_DARK}}.red{fill:${RED_DARK}}}</style><rect class="bg" width="${mS}" height="${mS}" rx="18"/><g transform="translate(50 50) scale(.82) translate(-50 -50)"><path class="ink" d="${cPath.d}"/><rect class="red" x="${mCursorX.toFixed(1)}" y="${(50 - xh / 2).toFixed(1)}" width="${markCursorW.toFixed(1)}" height="${xh.toFixed(1)}"/></g></svg>\n`,
)
console.log({ wA, hA, xh, cell })
