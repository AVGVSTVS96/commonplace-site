export const CHAR = 0.045
export const ENTER = 0.22
export const LATENCY = 0.16

const D = "2026-11-14"
const you = { prompt: "you", pcls: "who you", cls: "say" }
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
      <p class="label line" data-t="0">introducing</p>
      <p class="word big line" data-t="0.5"><svg><use href="#mark"/></svg>commonplace</p>
      <p class="tagline-big line" data-t="1.3">your personal data kit for agents</p>`,
    steps: [{ wait: 0.5 }, { html: ``, tone: "answer" }, { wait: 4.0 }],
    hold: 0,
  },
  {
    rubric: "Everything",
    title: `Not just your code. Your texts, what you liked and posted, every prompt you typed.`,
    head: ["~/my-commonplace", "bash"],
    hang: "12ch",
    steps: [
      { wait: 0.5 },
      { cmd: `commonplace timeline --limit 6` },
      { row: `${D}  prompted    [[prompts:beb29332c5155063]]  (((tidepool)))` },
      { row: `((            the tide chart is unreadable in dark mode. follow the system theme, no toggle))`, every: 0.36 },
      { row: `${D}  sent        [[imessage:6B2E1F0A-3C4D-4E5F-8A9B-0C1D2E3F4A55]]  (((+15550103)))` },
      { row: `((            running late, save me a seat))`, every: 0.36 },
      { row: `2026-11-13  liked       [[liked:x:tweet:1846203117740000103]]` },
      { row: `((            a database in one file, with full-text search built in, on every phone you've ever owned))`, every: 0.36 },
      { row: `2026-11-13  received    [[imessage:6B2E1F0A-3C4D-4E5F-8A9B-0C1D2E3F4A54]]  (((kyoto crew)))` },
      { row: `((            found a ramen counter by kyoto station that opens at 6am))`, every: 0.36 },
      { row: `2026-11-13  posted      [[posted:x:tweet:1846203117740000104]]` },
      { row: `((            first pass at kerning the tidepool wordmark by hand. the r and n were fighting))`, every: 0.36 },
      { row: `2026-11-13  committed   [[github:commit:9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d]]  (((me/tidepool)))` },
      { row: `((            Read tide tables in the station's local time))`, every: 0.36 },
      { wait: 0.5 },
      { cap: `One archive on your machine. One shape for all of it: things, events, links.` },
    ],
    hold: 4.0,
  },
  {
    rubric: "Search",
    title: `One search over all of it.`,
    head: ["~/my-commonplace", "bash"],
    hang: "12ch",
    steps: [
      { wait: 0.5 },
      { cmd: `commonplace search kyoto --limit 5` },
      {
        out: [
          `2026-11-13  chat        [[chat:imessage:iMessage;+;chat482913570]]  (((kyoto crew)))`,
          `((            «kyoto» crew))`,
          `2026-11-12  query       [[query:ryokan kyoto]]  (((ryokan kyoto)))`,
          `((            ryokan «kyoto»))`,
          `2026-11-11  url         [[url:japan-guide.com/railpass/kyoto]]  (((Kyoto by train: is the JR Pass worth it?)))`,
          `((            «Kyoto» by train: is the JR Pass worth it?))`,
          `2026-11-08  prompted    [[prompts:26348b2f071effb3]]  (((trips)))`,
          `((            cheapest way from kansai airport to «kyoto» with two bags))`,
          `2026-11-13  received    [[imessage:6B2E1F0A-3C4D-4E5F-8A9B-0C1D2E3F4A54]]  (((kyoto crew)))`,
          `((            found a ramen counter by «kyoto» station that opens at 6am))`,
        ],
      },
      { wait: 0.5 },
      { cap: `A group chat, a Google search, a saved page, a prompt, a text. One query.` },
    ],
    hold: 4.0,
  },
  {
    rubric: "Sync",
    title: `One dated, read-only snapshot per source per day. Kept forever. Never in git.`,
    head: ["~/my-commonplace", "bash"],
    kind: "term small",
    steps: [
      { wait: 0.5 },
      { cmd: `commonplace sync` },
      { row: `((fetch x))`, every: 0.3 },
      { row: `((fetch prompts))`, every: 0.3 },
      { row: `((fetch github))`, every: 0.3 },
      { row: `((fetch imessage))`, every: 0.8 },
      {
        out: [
          `source            snapshot             things   events    links redacted`,
          `imessage          2026-11-12                2        3        0        0`,
          `imessage          2026-11-13                2        1        0        0`,
          `imessage          {{${D}}}                2        1        0        0`,
          `github            2026-11-12                3        2        1        0`,
          `github            2026-11-13                3        2        1        0`,
          `github            {{${D}}}                2        1        1        0`,
          `prompts           2026-11-12                2        3        0        0`,
          `prompts           2026-11-13                1        1        0        0`,
          `prompts           {{${D}}}                1        1        0        0`,
          `x                 2026-11-12                4        4        0        0`,
          `x                 2026-11-13                2        2        0        0`,
          `x                 {{${D}}}                0        0        0        0`,
          `takeout           2026-11-13                5        5        0        0`,
          `raindrop          2026-11-11                3        3        0        0`,
          ``,
        ],
        hold: 0.6,
      },
      { out: `commonplace.db  19 things · 25 events · 1 links`, tone: "build" },
      { wait: 0.5 },
      { cap: `Build replays every snapshot into one SQLite file. Same <code>raw/</code>, same database.` },
    ],
    tree: `data/
├ raw/
│ ├ github/
│ │ ├ 2026-11-12/
│ │ <i class="old">└</i><i class="new">├</i> 2026-11-13/<i class="new">
│ │ └ {{${D}/}}</i>
│ ├ imessage/
│ │ ├ 2026-11-12/
│ │ <i class="old">└</i><i class="new">├</i> 2026-11-13/<i class="new">
│ │ └ {{${D}/}}</i>
│ └ @@… four more@@
└ commonplace.db`,
    hold: 4.5,
  },
  {
    rubric: "Why",
    title: `Let your agent look up the history behind your request.`,
    head: ["claude", "bash · commonplace"],
    kind: "term small",
    hang: "19ch",
    steps: [
      { wait: 0.5 },
      { cmd: `make me a packing list for kyoto`, ...you, latency: 0.7 },
      { gap: true },
      { row: `${agent}<b class="p">$</b>commonplace search "packing list"`, raw: true, tone: "land", every: 0.5 },
      { row: `${cont}2026-06-02  prompted    [[prompts:7e5f78a55710462f]]  (((trips)))`, raw: true, every: 0.14 },
      { row: `${cont}((            «packing» «list» for lisbon. carry-on only, i never check a bag))`, raw: true, every: 0.6 },
      { row: `${cont}<b class="p">$</b>commonplace search "kyoto april"`, raw: true, tone: "land", every: 0.5 },
      { row: `${cont}2026-11-10  received    [[imessage:6B2E1F0A-3C4D-4E5F-8A9B-0C1D2E3F4A51]]  (((kyoto crew)))`, raw: true, every: 0.14 },
      { row: `${cont}((            ryokan in «kyoto» is booked! «april» 14 to 18, right by the philosopher's path))`, raw: true, every: 0.6 },
      { row: `${cont}<b class="p">$</b>commonplace search fushimi`, raw: true, tone: "land", every: 0.5 },
      { row: `${cont}2026-11-10  place       [[place:17291468421904536081]]  (((Fushimi Inari Taisha)))`, raw: true, every: 0.14 },
      { row: `${cont}((            «Fushimi» Inari Taisha))`, raw: true, every: 0.14 },
      { row: `${cont}2026-11-12  tweet       [[x:tweet:1846203117740000102]]`, raw: true, every: 0.14 },
      { row: `${cont}((            …arashiyama before 8am, «fushimi» inari at dawn (two hours of stairs, wear real shoes), one ryokan night is plenty))`, raw: true, every: 1.2 },
      { gap: true },
      {
        out: `${agent}Carry-on only, like your Lisbon list. You're in Kyoto April 14 to 18, so five days of clothes, and real shoes for the two hours of stairs at Fushimi Inari. Want it as a checklist?`,
        raw: true,
        cls: "say",
        tone: "answer",
      },
      { wait: 0.5 },
      { cap: `The more an agent can look up, the less you have to say.` },
    ],
    hold: 5.5,
  },
  {
    rubric: "Privacy",
    title: `Choose what you collect and what agents can read.`,
    head: ["commonplace.config.ts", "typescript"],
    steps: [
      { wait: 0.5 },
      {
        out: [
          `<span class="kw">export default</span> defineConfig({`,
          `<span class="hi hi-sources">  sources: [</span>`,
          `<span class="hi hi-sources">    github(),</span>`,
          `<span class="hi hi-sources">    prompts(),</span>`,
          `<span class="hi hi-sources hi-drop">    imessage({ drop: (m) =&gt; m.handle === <span class="str">"+15550100"</span> }),</span>`,
          `<span class="hi hi-sources">  ],</span>`,
          ``,
          `<span class="hi hi-redact">  redact: (row) =&gt;</span>`,
          `<span class="hi hi-redact">    row.type === <span class="str">"event"</span> &amp;&amp; <span class="str">/\\b(password|api[_ -]?key|secret)\\b/i</span>.test(row.text ?? <span class="str">""</span>),</span>`,
          `});`,
        ],
        raw: true,
        hold: 1.2,
      },
      { html: ``, cls: "mark-sources", tone: "row" },
      { wait: 2.0 },
      { html: ``, cls: "mark-drop", tone: "row" },
      { wait: 2.0 },
      { html: ``, cls: "mark-redact", tone: "row" },
      { wait: 0.3 },
      { cap: `A source you leave off is never read. <code>drop</code> keeps messages out of snapshots, <code>redact</code> keeps rows out of the database.` },
    ],
    hold: 5.0,
  },
  {
    rubric: "Add a source",
    title: `Anything with an export, a database, an API or a CLI. Your agent writes the source.`,
    head: ["claude", "skill · add-source"],
    hang: "19ch",
    steps: [
      { wait: 0.5 },
      { cmd: `add my browser history to commonplace`, ...you, latency: 1.0 },
      { gap: true },
      { row: `${agent}found Chrome's history and wrote [[sources/chrome.ts]] (((58 lines)))`, raw: true, cls: "say", every: 0.8 },
      { row: `${cont}added it to [[commonplace.config.ts]] and ran commonplace sync`, raw: true, cls: "say", every: 0.8 },
      { row: `${cont}<b class="p">$</b>commonplace timeline --verb visited --limit 3`, raw: true, tone: "land", every: 0.5 },
      {
        out: [
          `${cont}${D}  visited     [[chrome:4182]]  (((prefers-color-scheme - CSS | MDN)))`,
          `${cont}2026-11-13  visited     [[chrome:4181]]  (((Kyoto by train: is the JR Pass worth it?)))`,
          `${cont}((            Which passes pay off for Kyoto, Osaka and Nara day trips))`,
          `${cont}2026-11-13  visited     [[chrome:4180]]  (((Tide Predictions - NOAA Tides &amp; Currents)))`,
        ],
        raw: true,
      },
      { wait: 0.5 },
      { cap: `One file in your repo. Any coding agent with file and terminal access can follow the skill.` },
    ],
    hold: 4.5,
  },
  {
    rubric: "Yours",
    title: `A template you own. Not an app you install.`,
    head: ["~/my-commonplace", "bash"],
    steps: [
      { wait: 0.5 },
      { cmd: `wc -l src/*.ts` },
      {
        out: [
          `  309 src/build.ts`,
          `  171 src/cli.ts`,
          `    9 src/config.ts`,
          `   61 src/install.ts`,
          `    6 src/launcher.ts`,
          `  175 src/mcp.ts`,
          `  209 src/schema.ts`,
          `  117 src/source.ts`,
          `  178 src/store.ts`,
          `  155 src/sync.ts`,
          ` 1390 total`,
        ],
        hold: 1.8,
      },
      { cmd: `jq .dependencies package.json` },
      { out: `null` },
      { wait: 0.5 },
      { cap: `About 1,400 lines of TypeScript, no runtime packages. Read it in an afternoon. Change anything.` },
    ],
    hold: 4.5,
  },
  {
    rubric: "Start",
    title: `Start in six lines.`,
    head: ["~", "bash"],
    steps: [
      { wait: 0.5 },
      { cmd: `gh repo create my-commonplace --template AVGVSTVS96/commonplace --private --clone`, char: 0.025, latency: 0.4 },
      { cmd: `cd my-commonplace`, char: 0.025, latency: 0.1 },
      { cmd: `bun install`, char: 0.025, latency: 0.3 },
      { cmd: `bun add -g "$PWD"`, char: 0.025, latency: 0.3 },
      { cmd: `commonplace sync`, char: 0.025, latency: 0.3 },
      { cmd: `commonplace install   # on a Mac: sync on its own`, char: 0.025, latency: 0.3 },
      { wait: 0.5 },
      { cap: `Then ask your agent something only your history can answer.` },
    ],
    hold: 4.0,
  },
  {
    kind: "end",
    html: `
      <p class="word big line" data-t="0.2"><svg><use href="#mark"/></svg>commonplace</p>
      <p class="tagline-big line" data-t="0.9">a commonplace book for the age of agents</p>
      <p class="url line" data-t="1.4"><span>github.com/AVGVSTVS96/commonplace</span></p>
      <span class="sig line" data-t="2.2">— bassim</span>`,
    steps: [{ wait: 0.2 }, { html: ``, tone: "end" }, { wait: 5.8 }],
    hold: 0,
  },
]
