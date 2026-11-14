# commonplace · brand

**The idea in a sentence:** a commonplace book for the age of agents, laid out like a field sheet: framed panels, ink, one sky blue, and real output as the picture.

The look is direction A, "Field sheet", from `~/Developer/brand-it-directions/commonplace/` (built on @kyleanthony's "Utilitarian style website design" and "Neo Industrial" posts; see `references.md`). The site in `site/` is the living specimen: when this file and the site disagree, the site wins and this file gets fixed.

## Personality

- **Plain.** It says what it does in the words a README would use. No marketing voice, no setup-and-punchline.
- **Yours.** A template you own, not an app you install. Everything on the page should look readable, editable, forkable: file trees, config, one-file sources.
- **Quiet about privacy, loud about structure.** Trust comes from showing the mechanism (dated read-only snapshots, one door, you choose what goes in), not from a lock icon.
- **Data-powerful, not data-dashboard.** Numbers are real, set big in a black cell or as a bar of cells, never as a KPI tile with a trend arrow.
- **Developer, in the sense of hackable.** Terminal and tree views, framed like plates on a spec sheet. Light by default, with a dark theme that is the same tokens swapped.

## What it is and isn't

| it is | it isn't |
| --- | --- |
| a template repo and a CLI | an app, a dashboard, a system |
| a book you add to for life | a feed, a graph of your brain |
| one door for every agent | an agent itself |
| a ledger of things, events, links | a second brain, a knowledge graph, a PKM tool |

## The visual system

### Type: Inter Tight + Geist Mono (OFL, free)

- **Inter Tight** for everything a person says: headlines at 600 with `-0.035em` tracking and line-height about 1 (hero `clamp(44px, 4.9vw, 70px)`, section heads `clamp(32px, 3.4vw, 48px)`); body 400 at 16–18px/1.55; labels and captions 500 at 13px, sentence case. No serif, no uppercase tracking.
- **Geist Mono** for everything the computer says: terminals, paths, commands, `needs` notes, verbs in the ledger. 13px in terminals, 12–12.5px in dense notes. Ligatures off (`font-variant-ligatures: none`).
- Geist Mono has no box-drawing or arrow glyphs, so the same family name also loads Ioskeley Mono 400 for `U+2190–21FF, U+2500–257F, U+25A0–25FF` only. Both are 600 units wide, so trees and columns still line up. Inter Tight gets the arrows from the same file.
- Files: `site/public/fonts/inter-tight.woff2`, `geist-mono.woff2`, `ioskeley-mono-400.woff2`.

### Color: ink, sheet, one sky blue

Light is the default. Dark is the same tokens swapped, never a second design.

| token | light | dark | use |
| --- | --- | --- | --- |
| `--page` | `#E9ECEF` | `#08090B` | the field the sheets sit on |
| `--sheet` | `#FFFFFF` | `#0F1216` | every framed panel |
| `--plate` | `#F6F8FA` | `#0B0E11` | terminal and code plates |
| `--ink` | `#0D1117` | `#E8EBEF` | text, frames, crop marks |
| `--ink-2` | `#555D68` | `#A2A9B3` | secondary text, output |
| `--ink-3` | `#747B86` | `#7D858F` | labels, IDs, prompts |
| `--frame` | `#0D1117` | `rgb(232 235 239 / .36)` | the 1px frame of every sheet and cell |
| `--line` | `rgb(13 17 23 / .12)` | `rgb(232 235 239 / .10)` | rows inside a cell, plate borders |
| `--solid` / `--on-solid` | `#0D1117` / `#FFFFFF` | `#E8EBEF` / `#0D1117` | black strips, figure cells, buttons |
| `--sky` / `--on-sky` | `#9DDCFF` / `#0D1117` | `#8FD3FB` / `#0D1117` | the nav band, the second series in a bar |
| `--sky-ink` | `#0B6AA8` | `#8FD3FB` | blue text: "you", strings, the newest entry, focus rings |
| `--solid-accent` | `#9DDCFF` | `#0B6AA8` | blue text on a solid strip |
| `--hit` | `rgb(80 180 245 / .26)` | `rgb(143 211 251 / .22)` | search hits, today's date, the highlighted config lines |

Rule: **sky blue is the only colour, and it means "this one" or "yours"**: the band you navigate by, the hit you searched for, the line you're reading, the second kind in a count. Everything else is ink at three strengths. No red, no green, no amber.

### Frames and spacing

- The page is a stack of framed sheets on `--page`, 40px apart and inset (14px below 1100px). Max width 1440px.
- Every sheet is a grid of cells divided by 1px `--frame` rules; rows inside a cell use `--line`. Square corners, no shadows.
- Padding is 32px inside a cell (18px on phones). Section heads are a 2:1 split: heading and line left, a data panel right.
- Terminals never clip: long output wraps with a hanging indent (the hero) or scrolls sideways with a 40px fade at the edge that disappears once scrolled to the end.

### Motifs

1. **The sheet.** One framed panel per section, with a numbered label (`01 Everything`) above a big heading.
2. **The strip.** A black strip of facts across the top of the first sheet, and a ruled strip for captions at its foot.
3. **The band.** The sky-blue nav band with the logo and tagline. Once it scrolls away, the same band slides in fixed at the top.
4. **The figure.** One real number, big, in a black cell: `~1,400` lines in the core.
5. **The plate.** Terminals, code and trees sit on a plate with two ink crop marks, top left and bottom right. The primary button gets four corner brackets.
6. **The cell bar.** A count as a row of squares: solid for built in, sky for from an export, an empty outline for what your agent writes.

### Data viz

A count is a cell bar; a number is a figure cell; a list is a ruled grid of cells. Only numbers that exist in the real code or the demo archive, with the date they were true.

### Motion

- **Follows state.** Something moves because something happened: the band leaves the screen, a rule is hovered, Copy is pressed. Nothing on scroll position or timers, apart from the terminal cursor's 1s blink.
- 120ms for colour and hover, 200ms for the fixed band; `cubic-bezier(.2, .7, .2, 1)`. `prefers-reduced-motion` turns transitions off.
- Terminals show their whole output at once. The output is the proof; nobody should wait for it.

### Video

The same system on a 1920×1080 stage: sheets, strips, plates and the sky band, every scene a real command and its real output. Hard cuts on the beat, no crossfades. See `video/README.md` and `video/LEARNED.md`.

## Logo

The mark is a square grid, three rows with the bottom two split: an index card, a ledger, a table. 22-unit viewBox, 2-unit stroke, square caps, `currentColor`. The wordmark is the word **commonplace** in Inter Tight 600 at `-0.03em`, set 10px to the right of the mark at 20–24px, live text rather than outlines. Next to it, after a thin rule, the tagline in lowercase: *your personal data kit for agents*.

- `logo/grid.svg`: the mark alone, in `currentColor`.
- `site/public/favicon.svg`: the mark in ink on a sky rounded square, the same in both themes; `apple-touch-icon.png` is rendered from it by `bun --filter site shots`.

## Files

```
brand/
├ BRAND.md            this
├ references.md       what the system is built on
├ logo/grid.svg       the mark
└ fonts/              Ioskeley Mono and Plex Sans, used by the retired system and the box-drawing fallback
```

### Retired: paper, mono and one red (Oct 2026)

The first system: Ioskeley Mono and Plex Sans on warm paper, a red rubric and a block-cursor wordmark. Its files stay for the record: `specimen.html`, `fonts-compare.html`, `fonts.md`, `render.mjs`, `shots/`, and `logo/` apart from `grid.svg` (`gen.mjs` regenerates the cursor wordmark). Don't use them for new work.
