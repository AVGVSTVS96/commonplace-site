# commonplace site copy

Final copy. Use it word for word. Text in `code` is shown as code. Notes in *(italics)* are for the designer, not the page. Anything marked **coming** isn't built yet and has to look it on the page (muted, with a small "coming" tag).

Every section is one headline, one short line and a visual. Nothing on this page may claim something the code doesn't do today.

**The terminals are real output.** `bun demo/run.ts` writes a small made-up archive in the formats the shipped sources read (`demo/fixture.ts`), runs the real CLI from the public repo on it, and writes what it printed to `demo/out/` and into the `<!-- demo:… -->` blocks of `site/index.html`. Never edit inside those blocks by hand: change the fixture or the commands in `demo/run.ts` and run it again. What the user asks and what the agent answers sits outside the blocks, and the answer may only say what the output above it shows. Every name, number and account in the fixture is made up.

## Page

- `<title>`: commonplace · your personal data kit for agents
- Meta description: Your personal data kit for agents. commonplace brings your accounts, local files and exports into one archive on your machine, and your agents search it through a CLI or MCP server. A template you own, MIT.
- Nav: Sources · How it works · Privacy · Docs · GitHub

## Hero

- Wordmark: commonplace
- Tagline, under the wordmark: your personal data kit for agents
- Hero line: Your personal data, searchable by your agents.
- Sub line: Bring accounts, local files and exports into one archive on your machine. Connect agents through the CLI or MCP.
- Then: Ask your coding agent to add another source. It writes the code in your repo.
- Primary CTA: Use this template
- Secondary CTA: Read the source

*(The hero visual is a terminal, light: block `demo:hero`, which is `commonplace search kyoto --limit 5`, `commonplace timeline --limit 3` and `commonplace stats`, as printed in `demo/out/hero.txt`. The hits span texts, a search, a saved page, a prompt and a like.)*

Caption under the terminal: Real output from the shipped sources, run on a small made-up archive.

## Strip

*(A one-line strip under the hero, four facts, monospace.)*

- 1 archive: texts, saves, videos, searches, posts, code, prompts
- ~1,300 lines in the core
- 0 runtime packages: Bun and its SQLite
- MIT, and a template you own

## Everything

Section title: Bring your history together.
Line: Search messages, saved posts, watched videos and past prompts in one place. Add more sources with your agent.

*(The visual is a ledger of the made-up archive's twelve newest events, block `demo:ledger`, from `commonplace timeline --limit 12`: the verb, then what was said in quotes, or the thing's title. No auto-scroll: motion follows events, not timers.)*

Caption: One shape for all of it: things, events, links. Same page saved in two apps is one record.

## Why

Section title: Let your agent look up the history behind your request.
Line: It can find what you saved, what you said and how you asked last time.

*(One terminal: your ask, the searches the agent ran with what they found (block `demo:why`, in `demo/out/why.txt`), its answer. Keep it to one exchange, and keep it about a life, not a codebase.)*

```
you    make me a packing list for kyoto

agent  $ commonplace search "packing list"
       $ commonplace search "kyoto april"
       $ commonplace search fushimi
       (their output)

agent  Carry-on only, like your Lisbon list. You're in Kyoto April 14 to 18, so five days of clothes, and real
       shoes for the two hours of stairs at Fushimi Inari. Want it as a checklist?
```

Closing line: The more an agent can look up, the less you have to say, and the more you can hand it.

## Sources

Section title: Sources, by how much setup they need.
Line: Seven ship today: four fetch on their own and three read an export you download. Your agent can write more.

### Built in

*(Table. "needs" column in monospace.)*

| source | what | needs |
|---|---|---|
| `github` | your pull requests, issues, reviews, review comments, stars and commits | `gh` signed in |
| `prompts` | every prompt you typed into Claude Code, Codex and Pi, or sent from chat apps | nothing, read from disk |
| `imessage` | your conversations | macOS, Full Disk Access |
| `x` | your bookmarks with their folders, likes, posts and replies | `agent-browser`, [signed in to X](https://github.com/AVGVSTVS96/commonplace#x). No paid API key. |

### From an export

*(Same table. The last column is "the export".)*

| source | what | the export |
|---|---|---|
| `takeout` | searches, YouTube watches, comments and playlists, Maps places, Chrome | Google Takeout, My Activity as JSON |
| `x-archive` | every post, like, follow, DM and Grok chat | the archive from X's settings |
| `raindrop` | bookmarks, collections, tags and highlights | Raindrop's CSV backup |

### Written by your agent

Line: Anything with an export, a local database, an API or a CLI. Ask your agent, and the `add-source` skill has it write the source, run it and check what landed: one file in your repo.

*(Chips, wrapping. Each chip is a thing people have. Keep them in these groups.)*

- Money: bank and card CSV exports, Apple Card, receipts in Gmail
- Browsing: Chrome, Safari, Firefox, Edge, Arc, any other browser
- Mail and calendar: Gmail via Takeout, any mbox, any `.ics`
- Chat: Slack, Discord, Telegram exports
- Saves: Instagram, Pinterest, Reddit, Readwise
- Notes: Obsidian, any folder of markdown, Apple Notes
- Media: Letterboxd, Goodreads, Spotify

*(Below the chips, a tiny terminal: the ask, then block `demo:add-source`. `demo/sources/chrome.ts` is a real source written by following the skill; the demo copies it in, adds it to the config, runs `commonplace sync`, which fetches only `chrome`, and shows the visits it read. The line count is the file's.)*

```
you    add my browser history to commonplace

agent  found Chrome's history and wrote sources/chrome.ts (58 lines)
       added it to commonplace.config.ts and ran commonplace sync
       $ commonplace timeline --verb visited --limit 3
       (its output)
```

Caption: Any coding agent with file and terminal access can follow the skill, not just Claude Code.

## How it works

Section title: Keep the snapshots. Rebuild the archive.
Line: Sources save dated snapshots. Build combines them in SQLite. Agents search through read-only tools.

*(The visual is the diagram from the README, drawn clean: three boxes down the left, one arrow each, labels on the right. Monospace labels.)*

```
your data        accounts, local files, exports
     │  fetch: one dated snapshot per source per day
data/raw/        read-only, kept forever, never in git
     │  build: replay every snapshot, redact as you go
commonplace.db   things · events · links · search
     │
commonplace      CLI ── search · timeline · show · stats
     └── mcp     Claude Code, Codex, Claude Desktop, any MCP client
```

1. **Fetch.** `commonplace sync` takes one snapshot per source per day into `data/raw/<source>/<date>/`. Each one is written through a `.partial` directory and made read-only, so a crash never leaves half a snapshot. On a Mac, `commonplace install` runs it at login and when Messages changes, and the Claude Code plugin runs it when a session ends. A source with today's snapshot waits for tomorrow; an export source updates when you add a newer export.
2. **Build.** Every build starts from empty and replays every snapshot into one SQLite database. The same `raw/` always gives the same database, so you can fix a source and rebuild years of history.
3. **Read.** The CLI and the MCP server read the same store, read-only: `search`, `timeline`, `show`, `stats`, and `sql` for you.

## Privacy

Section title: Choose what you collect and expose.
Line: Data stays in your local `data/` folder, which the template keeps out of git. Connected agents can read everything in the built archive, and may send what they read to their model provider.

*(The visual is the config file, real, with three lines highlighted in turn.)*

```ts
export default defineConfig({
  sources: [
    github(),
    prompts(),
    imessage({ drop: (m) => m.handle === "+15550100" }),
  ],

  redact: (row) =>
    row.type === "event" && /\b(password|api[_ -]?key|secret)\b/i.test(row.text ?? ""),
});
```

- **`sources`** is everything the archive holds. A source you leave off is never read.
- **`drop`** keeps matching messages out of new snapshots.
- **`redact`** keeps rows out of the database. Raw snapshots stay on disk.

Under the three, small: Run `commonplace build` after changing `sources` or `redact`.

## Yours

Section title: Your repo, your sources, your archive.
Line: About 1,300 lines in the core, plus the sources. Bun and SQLite, with no runtime packages. Read it in an afternoon. Change anything.

*(Three cards, each a small file tree or terminal.)*

1. **Read it.** `src/` is ten small files. One schema, one builder, one store, two doors.
   ```
   src/schema.ts   things, events, links, verbs
   src/build.ts    replays snapshots; the only writer
   src/store.ts    every read
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
3. **Keep it.** Your repo, your data, your rules. Updates to the template never touch `data/`.
   ```
   my-commonplace/
     commonplace.config.ts   yours
     sources/                yours, plus ours
     data/                   yours, never in git
   ```

## Start

Section title: Start
Line: You need Bun, and `gh` signed in for the GitHub source. On a Mac, iMessage is on by default, so give your terminal Full Disk Access first. [X](https://github.com/AVGVSTVS96/commonplace#x) is off until you sign in and add it.

```sh
gh repo create my-commonplace --template AVGVSTVS96/commonplace --private --clone
cd my-commonplace
bun install
bun add -g "$PWD"
commonplace sync
commonplace install   # on a Mac: sync on its own
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

Closing line: Then ask something only your history can answer. *"What was I working on the week before my last trip?"*

## Next

*(A short muted strip, "next" tag.)*

Remote MCP for ChatGPT and claude.ai on the web. Mail, calendars and live browser history. Yours, if you send one back.

## Footer

- Open source under MIT. A commonplace book for the age of agents.
- github.com/AVGVSTVS96/commonplace
- by [bassim](https://github.com/AVGVSTVS96)

---

## Docs outline

Short pages, one per question. Every page opens with the command or file it's about.

1. **Start** — the commands above, what `sync` prints the first time, where things went (`data/raw/`, `data/commonplace.db`), Full Disk Access for iMessage on a Mac.
2. **Connect an agent** — Claude Code plugin (what the plugin installs: MCP server, the skill, the SessionEnd hook), Codex, Claude Desktop, any MCP client, shell agents through the CLI.
3. **CLI** — every command with one real example each: `search` (FTS5 syntax: words, "phrases", prefix*, OR, NOT), `timeline`, `show`, `stats`, `sync`, `build`, `mcp`, `sql`, `root`. `--json` and `--limit`.
4. **Sources** — the three tiers (built in, from an export, written by your agent), what each one needs, and what each built-in source actually fetches. X: signing in once with agent-browser.
5. **Add a source** — the `add-source` skill, in prose: find the data, write `fetch`, write `rows`, register, run. The IDs-from-content rule, the verbs, "times are real or null". `demo/sources/chrome.ts` in full.
6. **The schema** — things, events, links. Once verbs and repeat verbs. How merging works: by ID, strongest source wins per field, nulls never erase, once-only events merge across sources and keep every collection.
7. **Privacy** — `sources`, `drop`, `redact`, what agents can read (everything in the built archive) and where it can go from there (their model provider), what's in git and what isn't, rebuilding after a change, what `sql` can and can't do.
8. **How it's built** — snapshots and `.partial`, rebuild from empty, why the same `raw/` always gives the same database, the daily snapshot per source, the lock that keeps two syncs from running at once.
