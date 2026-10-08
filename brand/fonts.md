# Mono compare

`fonts-compare.html` sets the same terminal, ledger, tree, wordmark and code in each font; renders in `shots/fonts-light.png` and `shots/fonts-close.png` (2x).

- **All three are 600-unit wide with x-heights within 1% (516 · 518 · 520)**, so swapping is free: no line, column or table width moves.
- **IBM Plex Mono** (current): the warmest of the three, slab `i l r`, and it matches Plex Sans in the ledger. But it has **no box-drawing glyphs or arrows**, so `├ └ │ → ↗` in the tree fall back to the system mono (Noto Sans Mono here, Menlo/SF Mono on a Mac). OFL, free, 15 KB per weight.
- **Berkeley Mono**: rounder and more geometric, crisp numerals, its own box-drawing, and the wordmark reads most like a machine label. Rendered from the Regular and Bold webfonts usgraphics.com serves on its product page (the free 7-day trial swaps `/`↔`\` and `*`↔`#`, which breaks paths), so the 500s fall to Regular and the 600 wordmark falls to Bold. Commercial, $75 developer licence; web embedding needs its own licence tier, so check that before shipping it on the site.
- **Ioskeley Mono** (Iosevka build plan by ahatem, 2.4k stars, `fonts/ioskeley/`, prebuilt v2.1.0): closest to Berkeley at a glance, but strokes are thinner and the letters narrower inside the same cell, so paragraphs look greyer and more spaced out. Full weights and box-drawing, dotted zero. Its ligatures are on by default (`=>` `!=`), so set `font-variant-ligatures: none` or use the NL build. OFL, free, 96 KB per weight before subsetting.
- **Wordmark**: Plex 600 is the friendliest and carries the cursor best; Berkeley Bold is the boldest and most iconic; Ioskeley 600 looks like Berkeley set lighter.

**Recommendation:** keep Plex Mono, since it matches Plex Sans and the warm book idea. Add a box-drawing fallback (Ioskeley, subset to `U+2500–257F, U+2190–21FF`) so the tree stops depending on the system font. Buy Berkeley only if you want the colder, more machine-like look.
