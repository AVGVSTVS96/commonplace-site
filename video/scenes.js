export const CHAR = 0.045
export const ENTER = 0.22
export const LATENCY = 0.16

const D = "2026-10-08"
const Y = "2026-10-07"
const you = { prompt: "you", pcls: "who you" }
const agent = `<i class="who">agent</i>`
const cont = `<i class="who"></i>`

export const scenes = [
  {
    kind: "card",
    html: `
      <h1><span class="line" data-t="0.4">Your agent has read all your code.</span></h1>
      <h1 class="dim"><span class="line" data-t="2.0">And none of your judgment.</span></h1>`,
    steps: [{ wait: 5.0 }],
    hold: 0,
  },
  {
    kind: "end intro",
    html: `
      <span class="rubric line" data-t="0">introducing</span>
      <svg class="wordmark line" data-t="0.5" viewBox="0 0 736.8 107.1"><use href="#wordmark"/></svg>
      <p class="tagline line" data-t="1.3">your personal data kit for agents</p>`,
    steps: [{ wait: 0.5 }, { html: ``, tone: "answer" }, { wait: 4.0 }],
    hold: 0,
  },
  {
    rubric: "everything",
    title: `Not just your GitHub. Your texts, your mail, your charges, what you watched, what you saved, every prompt you typed.`,
    head: ["~/my-commonplace", "bash"],
    steps: [
      { wait: 0.5 },
      { cmd: `commonplace timeline --since ${Y}` },
      { row: `${D}  charged     [[bank:txn:7a3e9c1d]]  ((ANA Airlines  $1,184.20))` },
      { row: `${D}  received    [[gmail:msg:18f2c0a4b]]  ((Your flight to Tokyo is confirmed))` },
      { row: `${D}  prompted    [[prompts:claude:3e9a71]]  (("plan japan from what i've saved"))` },
      { row: `${D}  watched     [[yt:video:p7Lq0WnE3xY]]  ((How Shinkansen timetables are made))` },
      { row: `${D}  paid        [[bank:txn:9d02b6f1]]  ((PG&E  $142.60))` },
      { row: `${Y}  sent        [[imessage:c81f4e]]  (("landed. dinner?"))` },
      { row: `${Y}  visited     [[url:japan-guide.com/e/e2361.html]]  ((JR Pass: is it still worth it?))` },
      { row: `${Y}  saved       [[x:post:18834920]]  ((a thread on kerning by hand))` },
      { row: `${Y}  liked       [[ig:post:CzQ4pR2]]  ((a kitchen with one long oak counter))` },
      { row: `${Y}  commented   [[gh:pr:acme/app#412]]  (("this allocates on every keystroke"))` },
      { row: `${Y}  noted       [[obsidian:ideas/kitchen]]  ((ideas/kitchen.md))` },
      { wait: 0.5 },
      { cap: `One archive on your machine. One shape for all of it: things, events, links.` },
    ],
    hold: 4.0,
  },
  {
    rubric: "search",
    title: `One search over all of it.`,
    head: ["~/my-commonplace", "bash"],
    steps: [
      { wait: 0.5 },
      { cmd: `commonplace search "japan trip"` },
      {
        out: [
          `2026-09-28  txn      [[bank:txn:7a3e9c1d]]  ((ANA Airlines  $1,184.20))`,
          `2026-09-27  email    [[gmail:msg:18f2c0a4b]]  ((Your flight to Tokyo is confirmed))`,
          `2026-09-21  post     [[reddit:post:1g4x2k]]  ((Two weeks in Japan: what I'd do again))`,
          `2026-09-19  video    [[yt:video:kX9rT2mQ4bA]]  ((Tokyo on a budget: 10 days, 10 neighborhoods))`,
          `2026-09-18  message  [[imessage:c81f4e]]  (("ok «japan» «trip» is happening. april?"))`,
          `2026-09-14  page     [[url:japan-guide.com/e/e2361.html]]  ((JR Pass: is it still worth it?))`,
        ],
      },
      { wait: 0.5 },
      { cap: `A card charge, a mail, a thread you saved, a video, a text, a page. One query.` },
    ],
    hold: 4.0,
  },
  {
    rubric: "sync",
    title: `One dated, read-only snapshot per source per day. Kept forever. Never in git.`,
    head: ["~/my-commonplace", "bash"],
    steps: [
      { wait: 0.5 },
      { cmd: `commonplace sync` },
      { row: `((fetch gmail))`, every: 0.16 },
      { row: `((fetch chrome))`, every: 0.16 },
      { row: `((fetch youtube))`, every: 0.16 },
      { row: `((fetch imessage))`, every: 0.16 },
      { row: `((fetch x))`, every: 0.16 },
      { row: `((fetch bank))`, every: 0.16 },
      { row: `((fetch github))`, every: 0.16 },
      { row: `((fetch prompts))`, every: 0.6 },
      {
        out: [
          `source        snapshot         things   events    links redacted`,
          `gmail         {{${D}}}        48211    52904    48211        3`,
          `chrome        {{${D}}}        39480    61117        0        0`,
          `youtube       {{${D}}}        12306    14872    12306        0`,
          `imessage      {{${D}}}         9418    88250     9418       12`,
          `x             {{${D}}}         7905     9131     7905        0`,
          `bank          {{${D}}}         3266     3266        0        0`,
          `github        {{${D}}}         2521     1404     2521        0`,
          `prompts       {{${D}}}         1170     1158     1170        1`,
          ``,
        ],
        hold: 0.6,
      },
      { out: `commonplace.db  124,237 things · 232,102 events · 81,531 links`, tone: "build" },
      { wait: 0.5 },
      { cap: `Build replays every snapshot into one SQLite file. Same <code>raw/</code>, same database.` },
    ],
    kind: "term split",
    tree: `data/
├ raw/
│ ├ gmail/
│ │ ├ 2026-10-06/
│ │ ├ 2026-10-07/
│ │ └ {{${D}/}}
│ ├ bank/
│ │ ├ 2026-10-07/
│ │ └ {{${D}/}}
│ └ @@… six more@@
└ commonplace.db`,
    hold: 4.5,
  },
  {
    rubric: "why",
    title: `This is how an agent learns your judgment.`,
    head: ["claude", "mcp · commonplace"],
    steps: [
      { wait: 0.5 },
      { cmd: `plan the japan trip. same vibe as portugal, under $4k, mid april.`, ...you, latency: 0.7 },
      { gap: true },
      { html: `${agent}((search)) "portugal"  ((·))  ((timeline)) --verb charged --since 2025-05`, tone: "land", hold: 0.6 },
      { row: `${cont}2025-05-12  txn      [[bank:txn:2c7e40a9]]  ((TAP Air Portugal  $812.40))`, cls: "html", every: 0.14 },
      { row: `${cont}2025-05-14  txn      [[bank:txn:5b19f3d2]]  ((Casa do Conto  $698.00 · 4 nights))`, cls: "html", every: 0.14 },
      { row: `${cont}2025-05-18  message  [[imessage:c81f4e]]  (("the tiny hotel in porto was the best part"))`, cls: "html", every: 0.14 },
      { row: `${cont}2026-09-21  post     [[reddit:post:1g4x2k]]  ((Two weeks in Japan: what I'd do again))`, cls: "html", every: 0.14 },
      { row: `${cont}2026-09-28  txn      [[bank:txn:7a3e9c1d]]  ((ANA Airlines  $1,184.20))`, cls: "html", every: 1.4 },
      { gap: true },
      {
        out: [
          `${agent}Portugal was nine days, $3,120, one small hotel you loved, no tours. You already`,
          `${cont}bought the ANA flight for April 14. A ryokan in Kyoto like the Porto place, and`,
          `${cont}the Reddit itinerary you saved cut to ten days, lands at $3,860. Want the plan?`,
        ],
        cls: "html",
        tone: "answer",
      },
      { wait: 0.5 },
      { cap: `An agent that can search what you saved stops guessing what you mean.` },
    ],
    hold: 5.0,
  },
  {
    rubric: "allow",
    title: `Agents only see the sources you allow.`,
    head: ["commonplace.config.ts", "typescript"],
    steps: [
      { wait: 0.5 },
      {
        out: [
          `<span class="kw">export default</span> defineConfig({`,
          `  sources: [github, prompts, gmail, imessage, bank, chrome, youtube, x],`,
          ``,
          `  <span class="k-mcp">mcp: [<span class="str">"github"</span>, <span class="str">"prompts"</span>, <span class="str">"gmail"</span>, <span class="str">"chrome"</span>, <span class="str">"youtube"</span>, <span class="str">"x"</span>],</span>`,
          ``,
          `  <span class="k-redact">redact: (row) =></span>`,
          `  <span class="k-redact">  row.type === <span class="str">"event"</span> && <span class="str">/\\b(password|api[_ -]?key|secret)\\b/i</span>.test(row.text ?? <span class="str">""</span>),</span>`,
          `});`,
        ],
        cls: "html",
        hold: 1.5,
      },
      { html: ``, cls: "mark-mcp", tone: "row" },
      { wait: 2.5 },
      { html: ``, cls: "mark-redact", tone: "row" },
      { wait: 0.3 },
      { cap: `Agents never open the database. <code>redact</code> rows are never even written.` },
    ],
    hold: 4.5,
  },
  {
    rubric: "add a source",
    title: `Anything with an export, a database, an API or a CLI. Your agent writes the source.`,
    head: ["claude", "skill · add-source"],
    steps: [
      { wait: 0.5 },
      { cmd: `add my obsidian vault to commonplace`, ...you, latency: 1.0 },
      { gap: true },
      { row: `${agent}wrote [[sources/obsidian.ts]] ((61 lines))`, cls: "html", every: 0.8 },
      { row: `${cont}added it to [[commonplace.config.ts]]`, cls: "html", every: 0.8 },
      { cmd: `commonplace sync`, pre: cont, latency: 0.6 },
      { out: `${cont}obsidian      {{${D}}}         1204     1204        0        0`, cls: "html", tone: "build" },
      { wait: 0.5 },
      { cap: `One file, usually under 80 lines. Works with any agent that reads files.` },
    ],
    hold: 4.0,
  },
  {
    rubric: "yours",
    title: `A template you own. Not an app you install.`,
    head: ["~/my-commonplace", "bash"],
    steps: [
      { wait: 0.5 },
      { cmd: `wc -l src/*.ts` },
      {
        out: [
          `  281 src/build.ts     @@replays every snapshot; the only writer@@`,
          `  142 src/cli.ts       @@one door@@`,
          `   13 src/config.ts`,
          `  145 src/mcp.ts       @@the other@@`,
          `  141 src/schema.ts    @@things, events, links; verbs@@`,
          `   50 src/source.ts    @@defineSource and the read helpers@@`,
          `  186 src/store.ts     @@every read, filtered by what the reader may see@@`,
          `  110 src/sync.ts      @@daily snapshots on demand, then the build@@`,
          ` 1068 total`,
        ],
        hold: 1.8,
      },
      { cmd: `jq .dependencies package.json` },
      { out: `null` },
      { wait: 0.5 },
      { cap: `About a thousand lines of TypeScript, no dependencies. Read it in an afternoon. Change anything.` },
    ],
    hold: 4.5,
  },
  {
    rubric: "start",
    title: `Start in five lines.`,
    head: ["~", "bash"],
    steps: [
      { wait: 0.5 },
      { cmd: `gh repo create my-commonplace --template AVGVSTVS96/commonplace --private --clone`, char: 0.025, latency: 0.4 },
      { cmd: `cd my-commonplace`, char: 0.025, latency: 0.1 },
      { cmd: `bun install`, char: 0.025, latency: 0.3 },
      { cmd: `bun add -g "$PWD"`, char: 0.025, latency: 0.3 },
      { cmd: `commonplace sync`, char: 0.025, latency: 0.9 },
      { out: `commonplace.db  3,691 things · 2,562 events · 3,691 links`, tone: "build" },
      { wait: 0.5 },
      { cap: `Then ask your agent something only your history can answer.` },
    ],
    hold: 3.5,
  },
  {
    kind: "end",
    html: `
      <svg class="wordmark line" data-t="0.2" viewBox="0 0 736.8 107.1"><use href="#wm-text"/><rect class="cursor" x="684" y="38" width="46.8" height="52"/></svg>
      <p class="tagline line" data-t="0.9">a commonplace book for the age of agents</p>
      <p class="url line" data-t="1.4">github.com/AVGVSTVS96/commonplace</p>
      <span class="sig line" data-t="2.2">— bassim</span>`,
    steps: [{ wait: 0.2 }, { html: ``, tone: "end" }, { wait: 5.8 }],
    hold: 0,
  },
]
