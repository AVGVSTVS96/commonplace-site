# video

The launch video, made from HTML in the brand's own type and colours. `scenes.js` is the whole script: each scene is a title, a terminal panel and a list of steps (type a command, print output, wait, show a caption). `video.js` lays the steps out on one clock and seeks to any time, so headless Chrome can render it frame by frame; `sound.js` turns the same clock's events (keystrokes, output landing, the build line) into the soundtrack, so picture and sound can't drift.

```sh
bun install
bun render.mjs stills 12 30.5     # PNGs of single moments, in out/
bun render.mjs sheet 2            # a contact sheet, one frame every 2 s
bun render.mjs audio              # out/soundtrack.wav, mastered to -16 LUFS
bun render.mjs video              # out/commonplace-launch.mp4 at 60 fps, with the soundtrack if it exists
```

Open `index.html` through any static server rooted at the repo (fonts come from `../brand/fonts/`) to watch it live; `?t=30` jumps to a time.

Timing is data: `CHAR` is seconds per typed character, `ENTER` the pause before return, `LATENCY` the pause before output. A step's `hold` or `every` is how long the scene sits after it; a scene's `hold` is the beat at its end. Markup in output lines: `[[id]]` blue, `((dim))`, `{{now}}` red, `«hit»` search highlight, `@@comment@@`.

`LEARNED.md` is what the hex launch video taught us, and why this one is paced and sounds the way it does.
