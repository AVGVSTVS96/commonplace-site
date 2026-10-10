# commonplace · brand

**The idea in a sentence:** a commonplace book for the age of agents, and it looks like one that a developer keeps in a terminal: paper, mono, one red pen.

## Personality

- **Plain.** It says what it does in the words a README would use. No marketing voice, no setup-and-punchline.
- **Yours.** A template you fork, not an app you install. Everything on the page should look readable, editable, forkable: file trees, config, one-file sources.
- **Quiet about privacy, loud about structure.** Trust comes from showing the mechanism (dated read-only snapshots, one door, sources you allow), not from a lock icon.
- **Data-powerful, not data-dashboard.** Numbers are real and set in a ledger, never in a KPI tile.
- **Developer, in the sense of hackable.** Terminal and tree views, but light, airy and friendly. Never the dark-neovim-rice look.

## What it is and isn't

| it is | it isn't |
| --- | --- |
| a template repo and a CLI | an app, a dashboard, a system |
| a book you add to for life | a feed, a graph of your brain |
| one door for every agent | an agent itself |
| a ledger of things, events, links | a second brain, a knowledge graph, a PKM tool |

## The visual system

### Type: Ioskeley Mono + IBM Plex Sans (OFL, free)

Two voices. Ioskeley Mono is an Iosevka build in the proportions of Berkeley Mono (the mono he admires, see `references.md`), free under the OFL, and it ships every glyph the system draws with: box drawing `├ └ │ ─`, arrows `→ ↗`, the block `▮`. Plex Sans carries the prose.

- **Ioskeley Mono** for everything the computer says: terminal, tables, labels, paths, dates, numbers, the wordmark. 14px is the working size (`0.875rem/1.6`); 12px uppercase tracked `0.08em` for labels; 13px in diagrams and dense panels. Weights 400 and 500 only, 500 for the wordmark. Ligatures off everywhere (`font-variant-ligatures: none`): `=>` and `--` stay two characters, like a terminal.
- **Plex Sans** (variable) for everything a person says: headlines at 540–560, letter-spacing `-0.02` to `-0.028em`, line-height 1.02–1.1; body at 400, 17px/1.55; small body 15px. Enable `ss01` and `cv05` (the single-storey a and open g make it friendlier). Measure 64ch.
- The mono is one CSS token, `--font-mono`, so swapping it is one line. Shipped as subsets (`fonts/ioskeley-mono-{400,500,600}.woff2`, Latin plus U+2190–21FF, U+2500–257F, U+25A0–25FF, about 17 KB each); the full builds are in `fonts/ioskeley/`.
- Upgrade path if he wants to spend money: **Berkeley Mono** ($75, US Graphics) swaps in for Ioskeley with no other change; the proportions already match.

### Color: paper, ink, one red

Light is the default (the brief says light-terminal). Dark is the same tokens swapped, never a second design.

| token | light | dark | use |
| --- | --- | --- | --- |
| `--bg` | `#FAF9F6` | `#121211` | the page: paper, not white; near-black, not black |
| `--bg-2` | `#F1EFEA` | `#1A1A18` | terminal and panel fill |
| `--ink` | `#141412` | `#ECEAE4` | text, rules, filled buttons |
| `--ink-2` | `#5C5A55` | `#A7A49D` | secondary text, terminal output |
| `--ink-3` | `#6F6C66` | `#8F8C85` | labels, hints, dimmed rows |
| `--hair` | `rgb(20 20 18 / .14)` | `rgb(236 234 228 / .16)` | 1px rules and borders |
| `--hair-2` | `rgb(20 20 18 / .07)` | `rgb(236 234 228 / .08)` | row dividers, bar tracks |
| `--red` | `#D2451E` | `#F06A42` | the rubric: `$`, section labels, the newest snapshot, the cursor, the "now" row |
| `--red-soft` | `rgb(210 69 30 / .10)` | `rgb(240 106 66 / .14)` | search-term highlight, selection |
| `--green` | `#2F7D4A` | `#5FBF80` | done, built, added |
| `--blue` | `#2A56C6` | `#83A6FF` | IDs and links inside terminal output only |
| `--amber` | `#B06F0A` | `#E2A43C` | pending, coming |

Rule: **red is the only brand colour, and it means "this one, now".** Green, blue and amber live inside terminal output and status chips, like a light terminal theme, and never become decoration. The reason it holds together: a medieval commonplace book used red (rubrication) for headings and the marks that said "look here"; a shell uses one colour for the prompt. Same job, one colour.

### Grid and spacing

- 8px base, 4px half step. Scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
- Page max 76rem with 1px hairline side rails; gutters `clamp(1rem, 4vw, 3rem)`; sections separated by hairlines, not by background changes.
- Square corners everywhere. No shadows. 1px borders in `--hair`; 1px in `--ink` only for the primary thing on screen (table head rule, a diagram box, a button).
- Tables and terminal panels go full width of their column and scroll sideways on phones rather than wrapping.

### Motifs

1. **The prompt line.** `$ commonplace sync` with a red `$`. It is the hero, the CTA (`$ gh repo create --template`) and the section opener. The prompt says "you type this, it is yours", where a button says "we run this for you".
2. **The rubric.** Every section opens with a 12px red mono label and a number: `03  SOURCES`. Headlines stay ink.
3. **The ledger.** Tables with a solid 1px head rule, hairline rows, dates first, numbers right-aligned in tabular figures, source names in 500. Dimmed rows for what's coming, never fake numbers.
4. **The snapshot tree.** `data/raw/github/2026-10-08/` drawn with box-drawing characters, newest date in red. It is the proof of "private, read-only, kept forever" and it is also the brand's one picture.
5. **The cursor.** A block at x-height in red. The wordmark ends with it, the terminal ends with it, the video ends with it.
6. **The date.** `2026-10-08` as a stamp wherever something was last true. Never "2 hours ago".

The book heritage is carried by the mono, red rubrics and ledger tables. No quills, parchment, serifs, drop caps, or ornament.

### Iconography

Almost none. Prefer glyphs the fonts already have: `→ ↗ ✓ · ─ │ ├ └ ▮ ›`. Source badges are two-to-four-letter mono chips in a hairline box (`gh`, `x`, `yt`, `rd`). If an icon is unavoidable: 16px grid, 1.5px stroke, square caps, ink only.

### Diagrams

Diagrams look typed: 1px ink boxes, mono labels, straight orthogonal wires that meet at right angles, dashed for optional, red for the path to you. Flow goes left to right: accounts → `data/raw/` → `commonplace.db` → CLI and MCP → you and your agents. Drawn as SVG so the site can animate the wires; a `<pre>` tree whenever text alone says it. Never isometric, never gradients, never icons in boxes.

### Data viz

A chart is a table row with a bar in it. Horizontal bars on a `--hair-2` track, ink fill, the row you are talking about in red, label left in `--ink-2`, number right in tabular figures. Sparklines are 1px ink. Categorical colour is ink shades first and red for one series; never a rainbow. Only numbers that exist in a real archive, with the date they were true.

### Motion

- **Follows state.** Something moves because something happened: a snapshot landed, a row appeared, a command returned. Nothing on timers or scroll position, no parallax, no scroll-jacking.
- **Three durations, one curve.** 120ms colour and hover, 200ms enter and reveal, 320ms layout and diagram wires; `cubic-bezier(.2, .7, .2, 1)`.
- **Typed, not faded.** Terminal lines appear whole and in order like real output; the cursor blinks at 1s in `steps(1)`. `prefers-reduced-motion` stops the blink and skips reveals.
- **Numbers are real.** A counter counts to a number from an archive, once, over 320ms, and stops.

### Video

Same system on a 1920×1080 paper stage. Every scene is a real command and its real output, typed at ~45ms per character with the output landing whole. Hard cuts on the beat, no crossfades. One red object per scene (the `$`, the newest snapshot, the cursor). Sound: keypress ticks and one tone when the build line lands. It ends on `commonplace▮`.

## Logo

`logo/commonplace.svg` (light), `logo/commonplace-dark.svg`, `logo/commonplace-mono.svg` (`currentColor`, for inline use), `logo/mark.svg`, `logo/mark-dark.svg`, `logo/favicon.svg` (follows the system theme). `logo/gen.mjs` regenerates all of them from the fonts with `bun logo/gen.mjs`.

Three directions were explored (`logo/explore-*.svg`, shown and argued in `specimen.html`). The pick is **A, the cursor**: the name in Ioskeley Mono with a red block cursor at x-height. It says CLI without drawing a window, it says the book is never finished, and it reduces to a 16px favicon (`c▮`) without losing anything.

Clear space: one cursor width on every side. Minimum height: 14px for the wordmark, 16px for the mark. Never recolour the cursor to anything but `--red` (or `currentColor` in the mono version).

## Files

```
brand/
├ BRAND.md            this
├ references.md       what from his own saved inspiration this is built on
├ specimen.html       the system in use
├ render.mjs          bun render.mjs → shots/{desktop,phone}-{light,dark}.png
├ fonts/              Ioskeley Mono 400/500/600 subsets (+ full builds in ioskeley/), Plex Sans variable (+italic), OFL
└ logo/               wordmark, mark, favicon, explorations, gen.mjs, the two TTFs it reads (Ioskeley Mono Medium, Plex Sans SemiBold)
```
