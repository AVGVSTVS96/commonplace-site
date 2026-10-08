# What the hex launch video taught us

Pulled from the T3 Code threads where Bassim made `~/Developer/hex-launch` (Oct 5–6, four rounds in three hours) and the kit it became (`~/Developer/hex-media/media`). His words are quoted; the rest is what they add up to, applied to this video.

## Pacing

- Nobody said "too long". He said the opposite: "some of the slides go by quite fast. like i kind of wish there was a little bit more time for them to sink in." The video grew 48 → 73 → 89 s on his asks. Here: every scene holds after its last line lands, long enough to read the caption twice.
- He asked for an "introducing" card before the name and to "sit with it for maybe a half a second more". Here: problem card → wordmark card, held.
- What he approved on sight: hard cuts, no fades, no stock-video feel, cuts on half seconds, elements staggered at 0.5 s, one statement per screen. Here: the terminal prints lines whole, on a beat; captions appear once, after the output.
- He delegates *which* scenes get more time; he does not micro-time. Pick the scenes that carry the idea (timeline, agent answer, sync) and give them the room.

## Sound

- Silence was "underwhelming". Music plus generated effects was the ask. v2's effects were "a little bit too loud and like overdone... there just for the sake of being there"; the music "too generic... not as high energy and crafty and elegant and simple and sleek and crisp as I'd expect".
- One specific rejection: a low gong under the opener. "It doesn't fit. It sounds strange." No big low hits.
- The kit settled on: cues sit on the element they belong to, used sparingly ("one for a moment that matters, not one per item"), pitched in the music's key, low-cut and panned to where the thing is on screen, in one shared room; master -14 LUFS, true peak under -2 dBTP, dynamic not squashed.
- Here, per BRAND.md's "Video" section, which he approved after hex: keypress ticks and one tone when the build line lands. Ticks are the real event (typing), the tone is the one moment. Everything in one key (A), so the tones agree. No music bed; see open questions.

## Typography and layout

- The site's look exactly, at video scale: 1920×1080 with rails (wordmark top-left, tagline top-right, scene count bottom-left, URL bottom-right). Here: the same rails in hairlines on paper.
- One big statement per screen, body mono 25–32 px, labels ~26 px. Here: Plex Sans headline 52 px, mono 29 px, caption 34 px, so a line of real CLI output still reads on a phone.
- He catches one-pixel problems and expects them fixed, not argued: a missing 2 px rule ("that feels like a missing detail"), a border missing mid-animation ("looks incomplete before the next cards come in"), dots too close to a border, foreground text over background text. Check every held frame for a line that is missing or an element that overlaps.
- Real UIs, not abstractions: "the real UIs... of the actual apps". Here the real UI is the CLI, so every line keeps the shape `commonplace` prints today (dates first, verb column, id in blue, title dimmed; the build report table from `src/build.ts`).

## Content

- Honest numbers beside named things, with the rounding against yourself. Here: real `wc -l` counts, real `{}` for dependencies, the real five start commands.
- Cut anything that reads as a feature list: "everyone has heard most those features a thousand times". Say what happened: a charge, a mail, a text, a prompt.
- The "magic underneath" beat he added late: "It's like simple. Yeah, but it's insanely like cutting edge…" Here that is `sync`: eight fetches, one report table, one database line, the dated tree.
- Fix what you notice: "you saw those two things as wrong but you didn't actually fix them."

## Process

- He reviews the mp4 at the same path each time and wants mid-work drops ("update the current video file with whatever you currently have, just so I can get a peek"). Keep `out/commonplace-launch.mp4` current.
- He wants the pipeline committed with the project, "part of the overall design system", so more videos come cheap. Here: `video/` is data (`scenes.js`) plus a 100-line engine, rendered by the same headless-Chrome-to-ffmpeg path as hex.
- Checks that earned trust: stills at chosen times, contact sheets, LUFS and true peak, cue onsets against the picture.
