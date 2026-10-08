# commonplace site copy

Final copy. Use it word for word. Text in `code` is shown as code. Notes in *(italics)* are for the designer, not the page. Anything marked **coming** isn't built yet and has to look it on the page (muted, with a small "coming" tag).

Every section is one headline, one short line and a visual. Terminal mocks do most of the explaining, so keep them real: real commands, real output shapes, real file names. Nothing on this page may claim something the code doesn't do today.

## Page

- `<title>`: commonplace · your personal data kit for agents
- Meta description: A commonplace book for the age of agents. commonplace copies everything you've made, saved and said into a private archive on your machine, keeps it current, and gives every agent one safe door to it. A template you own, about a thousand lines, MIT.
- Nav: Sources · How it works · Privacy · Docs · GitHub

## Hero

- Wordmark: commonplace
- Tagline, under the wordmark: your personal data kit for agents
- Hero line: Everything you've made, saved and said. One door for every agent.
- Sub line: A private archive on your machine that keeps itself current. Agents read it through a CLI or MCP, and only the parts you allow.
- Primary CTA: Use this template
- Secondary CTA: Read the source

*(The hero visual is a terminal, light. One session, three commands. Every line is illustrative, none of it is real data, and together the hits span a whole life: a card charge, a flight email, a saved thread, a video, a text, a page. Keep the output shape exactly as the CLI prints it: date, kind or verb, id, title.)*

```
$ commonplace search "japan trip"
2026-09-28  txn      bank:txn:7a3e9c1d                    (ANA Airlines  $1,184.20)
2026-09-27  email    gmail:msg:18f2c0a4b                  (Flight to Tokyo confirmed)
2026-09-21  post     url:redd.it/1g4x2k                   (Japan in two weeks: what worked)
2026-09-19  video    yt:video:kX9rT2mQ4bA                 (Tokyo on a budget, 10 days)
2026-09-18  message  chat:imessage:c81f4e                 ("japan trip is happening. april?")
2026-09-14  page     url:japan-guide.com/jrpass          (JR Pass, worth it?)

$ commonplace timeline --since 2026-10-07 --limit 5
2026-10-08  prompted    prompts:3e9a71c8             ("plan japan from my saves")
2026-10-08  watched     yt:video:p7Lq0WnE3xY         (Shinkansen timetables)
2026-10-08  paid        bank:txn:9d02b6f1            (PG&E  $142.60)
2026-10-07  sent        chat:imessage:c81f4e         ("landed. dinner?")
2026-10-07  saved       url:x.com/i/status/18834920  (a thread on kerning)

$ commonplace stats
gmail          latest 2026-10-08  31 snapshot(s)  48211 things  52904 events
chrome         latest 2026-10-08  31 snapshot(s)  39480 things  61117 events
youtube        latest 2026-10-08  31 snapshot(s)  12306 things  14872 events
imessage       latest 2026-10-08  31 snapshot(s)   9418 things  88250 events
x              latest 2026-10-08  31 snapshot(s)   7905 things   9131 events
bank           latest 2026-10-08  31 snapshot(s)   3266 things   3266 events
github         latest 2026-10-08  31 snapshot(s)   2521 things   1404 events
reddit         latest 2026-10-06   4 snapshot(s)   2140 things   2588 events
instagram      latest 2026-10-05   2 snapshot(s)   1972 things   1972 events
prompts        latest 2026-10-08  31 snapshot(s)   1170 things   1158 events
```

Caption under the terminal: Ten sources in one archive. Three are built in today, the rest are coming or one ask away.

*(The caption keeps the terminal honest: it shows what the archive is for, and the Sources section says what ships today. `charged` and `paid` are verbs the schema still needs.)*

## Strip

*(A one-line strip under the hero, four facts, monospace.)*

- 1 archive: texts, mail, charges, history, saves, code, prompts
- ~1,000 lines of TypeScript
- 0 dependencies: Bun and its SQLite
- MIT, and a template you own

## Everything

Section title: Not just your GitHub. Everything.
Line: Your texts, your mail, your card charges and bills, your browser and YouTube history, what you saved, what you liked, your notes and your calendar, every prompt you ever typed. All the small things that show what you pay attention to.

*(The visual is a ledger of events, newest first, in the CLI's shape. Every line is a verb and a thing, and the verbs are the real ones from `src/schema.ts`, plus `charged` and `paid` for money. No auto-scroll: motion follows events, not timers.)*

```
charged    $1,184.20 to ANA Airlines
received   "Your flight to Tokyo is confirmed"
saved      a thread on two weeks in Japan
watched    a talk on structured concurrency
sent       "landed. dinner?"
paid       PG&E, $142.60
visited    a page on commonplace books
liked      a post about kerning by hand
prompted   "make the sidebar follow the system theme"
commented  on a review: "this allocates on every keystroke"
searched   "how did Locke index his notebook"
saved      an article about SQLite's write-ahead log
```

Caption: One shape for all of it: things, events, links. Same page saved in two apps is one record.

## Why

Section title: This is how an agent learns your judgment.
Line: Your taste isn't in any one file. It's in what you saved, what you starred, what you rejected, and how you asked last time. An agent that can search that stops guessing what you mean.

*(One terminal: your ask, the searches the agent ran and what they found, its answer. Keep it to one exchange, and keep it about a life, not a codebase.)*

```
you    plan the japan trip. same vibe as portugal, under $4k, mid april.

agent  search "portugal"  ·  timeline --verb charged --since 2025-05
       2025-05-12  txn      bank:txn:2c7e40a9      (TAP Air Portugal  $812.40)
       2025-05-14  txn      bank:txn:5b19f3d2      (Casa do Conto  $698.00  ·  4 nights)
       2025-05-18  message  chat:imessage:c81f4e   ("that tiny hotel in porto was the best part")
       2026-09-21  post     url:redd.it/1g4x2k     (Japan in two weeks: what worked)
       2026-09-28  txn      bank:txn:7a3e9c1d      (ANA Airlines  $1,184.20)

agent  Portugal was nine days, $3,120, one small hotel you loved and no tours. You already
       bought the ANA flight for April 14. A ryokan in Kyoto like the Porto place, and the
       Reddit itinerary you saved cut to ten days, lands at $3,860. Want the day-by-day?
```

Closing line: The more an agent knows about you, the less you have to say, and the more you can hand it.

## Sources

Section title: Sources, by how much setup they need.
Line: Three work the moment you sync. Four are on the way. Everything else is one ask away.

### Built in

*(Table. "needs" column in monospace.)*

| source | what | needs |
|---|---|---|
| `github` | your pull requests, issues and stars | `gh` signed in |
| `prompts` | every prompt you typed into Claude Code and Codex | nothing, read from disk |
| `imessage` | your conversations | macOS, Full Disk Access |

### Coming built in

*(Same table, muted, "coming" tag on the heading.)*

| source | what | needs |
|---|---|---|
| X archive | your posts, likes, DMs and Grok chats, all of them | the archive from X's settings |
| X | new posts, likes and bookmarks every day | an X developer app, cents a day |
| Google Takeout | searches, YouTube, Maps, Chrome, Calendar | a Takeout export |
| Raindrop | bookmarks and collections | a CSV export or API token |

### One ask away

Line: Anything with an export, a local database, an API or a CLI. Ask your agent, and the `add-source` skill has it write the source: one file, usually under 80 lines.

*(Chips, wrapping. Each chip is a thing people have. Keep them in these groups.)*

- Money: bank and card CSV exports, Apple Card, receipts in Gmail
- Browsing: Chrome, Safari, Arc, Dia
- Mail and calendar: Gmail via Takeout, any mbox, any `.ics`
- Chat: Slack, Discord, Telegram exports
- Saves: Instagram, Pinterest, Reddit, Readwise, Pocket
- Notes: Obsidian, any folder of markdown, Apple Notes
- Media: YouTube via Takeout, Letterboxd, Goodreads, Spotify

*(Below the chips, a tiny terminal: the ask and the result.)*

```
you    add my obsidian vault to commonplace

agent  wrote sources/obsidian.ts (61 lines)
       added it to commonplace.config.ts
       $ commonplace sync
       obsidian   2026-10-08   1,204 things   1,204 events
```

Caption: The skill works for any agent that reads files, not just Claude Code.

## How it works

Section title: Three steps, one direction.
Line: Fetch writes. Build reads snapshots. Agents read the database through one door. Nothing goes the other way.

*(The visual is the diagram from the README, drawn clean: three boxes down the left, one arrow each, labels on the right. Monospace labels.)*

```
your accounts    GitHub, Claude Code, Codex, …
     │  fetch: one dated snapshot per source per day
data/raw/        read-only, kept forever, never in git
     │  build: replay every snapshot, redact as you go
commonplace.db   things · events · links · search
     │
commonplace      CLI ── search · timeline · show · stats
     └── mcp     Claude Code, Codex, Claude Desktop, any MCP client
```

1. **Fetch.** `commonplace sync` takes one snapshot per source per day into `data/raw/<source>/<date>/`. Each one is written through a `.partial` directory and made read-only, so a crash never leaves half a snapshot. The Claude Code plugin runs it whenever a session ends.
2. **Build.** Every build starts from empty and replays every snapshot into one SQLite database. The same `raw/` always gives the same database, so you can fix a source and rebuild years of history.
3. **Read.** The CLI and the MCP server go through the same store, which shows a reader only the sources you allow. `search`, `timeline`, `show`, `stats`, and read-only `sql` for you.

## Privacy

Section title: What agents see is up to you.
Line: Your data lives in `data/`, which never enters git. Agents never open the database. They go through the CLI or MCP server, which only show the sources you allow.

*(The visual is the config file, real, with three lines highlighted in turn.)*

```ts
export default defineConfig({
  sources: [github, prompts, imessage],

  mcp: ["github", "prompts"],

  redact: (row) =>
    row.type === "event" && /\b(password|api[_ -]?key|secret)\b/i.test(row.text ?? ""),
});
```

- **`mcp`** is the list of sources any MCP client may read. `commonplace mcp --sources github` narrows it further for one client. `imessage` is in `sources` but not in `mcp`, so your messages stay local until you add it.
- **`redact`** rules keep rows out of the archive entirely. They're never written.
- **All or nothing per row.** A reader sees a row only if it may read every source that contributed to it, so a hidden source can't leak through a merge.

## Yours

Section title: A template you own. Not an app you install.
Line: About a thousand lines of TypeScript in your own repo, next to your own data. Read it in an afternoon. Change anything.

*(Three cards, each a small file tree or terminal.)*

1. **Read it.** `src/` is eight files. One schema, one builder, one store, two doors.
   ```
   src/schema.ts   things, events, links, verbs
   src/build.ts    replays snapshots; the only writer
   src/store.ts    every read, filtered by what you allow
   src/cli.ts      one door
   src/mcp.ts      the other
   ```
2. **Change it.** A source is one file with two halves: `fetch` copies what the service gives, `rows` turns one snapshot into things, events and links.
   ```ts
   export default defineSource({
     name: "bookmarks",
     fetch: async ({ dir }) => { … },
     rows: async function* ({ dir }) { … },
   });
   ```
3. **Keep it.** Your repo, your data, your rules. Updates to the template never touch `data/` or your config.
   ```
   my-commonplace/
     commonplace.config.ts   yours
     sources/                yours, plus ours
     data/                   yours, never in git
   ```

## Start

Section title: Start
Line: You need Bun, and `gh` signed in for the GitHub source.

```sh
gh repo create my-commonplace --template AVGVSTVS96/commonplace --private --clone
cd my-commonplace
bun install
bun add -g "$PWD"
commonplace sync
```

Copy button: Copy · after click: Copied

Then connect your agents:

```sh
# Claude Code: MCP server, add-source skill, sync when a session ends
/plugin marketplace add AVGVSTVS96/commonplace
/plugin install commonplace@commonplace

# Codex
codex mcp add commonplace -- commonplace mcp

# anything else that speaks MCP
command: commonplace   args: ["mcp"]
```

Closing line: Then ask something only your history can answer. *"What was I working on the week I first used Effect?"*

## Next

*(A short muted strip, "next" tag.)*

Remote MCP for ChatGPT and claude.ai on the web. The sources marked coming. Yours, if you send one back.

## Footer

- Open source under MIT. A commonplace book for the age of agents.
- github.com/AVGVSTVS96/commonplace
- by [bassim](https://github.com/AVGVSTVS96)

---

## Docs outline

Short pages, one per question. Every page opens with the command or file it's about.

1. **Start** — the five commands above, what `sync` prints the first time, where things went (`data/raw/`, `data/commonplace.db`).
2. **Connect an agent** — Claude Code plugin (what the plugin installs: MCP server, the skill, the SessionEnd hook), Codex, Claude Desktop, any MCP client, shell agents through the CLI. Narrowing per client with `--sources`.
3. **CLI** — every command with one real example each: `search` (FTS5 syntax: words, "phrases", prefix*, OR, NOT), `timeline`, `show`, `stats`, `sync`, `build`, `mcp`, `sql`, `root`. `--json` and `--limit`.
4. **Sources** — the three tiers, with the "needs" column, and what each built-in source actually fetches.
5. **Add a source** — the `add-source` skill, in prose: find the data, write `fetch`, write `rows`, register, run. The IDs-from-content rule, the verbs, "times are real or null". The bookmarks example in full.
6. **The schema** — things, events, links. Once verbs and repeat verbs. How merging works: by ID, strongest source wins per field, nulls never erase, once-only events merge across sources and keep every collection.
7. **Privacy** — `mcp`, `redact`, all-or-nothing visibility, what's in git and what isn't, what `sql` can and can't do.
8. **How it's built** — snapshots and `.partial`, rebuild from empty, why the same `raw/` always gives the same database, the lock that keeps two syncs from running at once.
