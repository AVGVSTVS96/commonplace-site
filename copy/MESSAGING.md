# commonplace messaging

The source of truth for how we talk about commonplace. The site, README, launch post and video all draw from here. When something here and something there disagree, fix it here first.

## The idea in one sentence

commonplace brings data from your accounts, local files and exports into one archive on your machine, and your agents search it through a CLI or MCP server.

Shorter, for a bio or a card: a commonplace book for the age of agents.

## Tagline

**your personal data kit for agents**

It's Bassim's own phrase, it says what the thing is, and "kit" says template, not app. Lowercase next to the wordmark; sentence case in prose.

Runner-up: **a commonplace book for the age of agents.** The story line. It explains the name without a footnote: use it in the footer, in the README's note on the name, and as the launch post's second line.

Retired: "everything you've made, saved and said" promises a complete archive no export gives you, and "one door for every agent" makes the reader decode a metaphor. Say what goes in and how agents read it.

## Hero

- **Headline:** Your personal data, searchable by your agents.
- **Sub line:** Bring accounts, local files and exports into one archive on your machine. Connect agents through the CLI or MCP.
- **Then:** Ask your coding agent to add another source. It writes the code in your repo.

The headline says what you get. The sub line says what goes in, where it lives and how agents get to it. The third line puts the `add-source` skill up front, because it's the reason to use a kit instead of an app.

## The story

Three moves, in this order.

**1. Your history is scattered.**
Agents can already read your code. The rest is spread across apps: texts, saved posts, watched videos, searches, bookmarks, every prompt you typed. commonplace brings it into one archive with one shape: things, events, links. Seven sources ship today.

**2. Your agent can look up the history behind a request.**
What you saved, what you said, how you asked last time. Ask for a packing list and it can find that you pack carry-on only, the dates in the group chat, and the hike you saved. Say what it can find, never what it will understand.

**3. Your agent adds the next source.**
Anything with an export, a local database, an API or a CLI. The `add-source` skill has your coding agent write the source, run it and check what landed: one file in your repo. Sources read your own sign-ins, local files and exports, so nothing needs a paid API.

Touch trust lightly, one line at most: the more an agent can look up, the less you have to say, and the more you can hand it.

Don't say "digital twin", "second brain", "memory layer", "context engine", "knowledge graph". Don't say the agent "knows you" or "learns your judgment". Say what's in the archive and what an agent can do with it.

## What it is

- **A template repo.** You copy it into a private repo of your own. The code is yours, in your repo, next to your data. About 1,300 lines in the core, plus one file per source. Bun and its built-in SQLite, with no runtime packages.
- **An archive of dated snapshots.** At most one read-only snapshot per source per day in `data/raw/`, kept forever. One SQLite database rebuilt from them anytime. Full-text search that matches word forms, not meanings.
- **A CLI and an MCP server.** Both read the same database, read-only. Claude Code, Codex, Claude Desktop, and anything else that speaks MCP.
- **Sources.** Seven ship today. Four fetch on their own: GitHub; every Claude Code, Codex and Pi prompt; iMessage; and X, read from your own signed-in agent-browser session, with no paid API key. Three read an export you download: Google Takeout, the X archive, Raindrop. Your agent writes the rest with `add-source`.

## What it isn't

- **Not an app you install.** Nothing runs on its own except `commonplace sync`: on a Mac at login and when Messages changes, if you run `commonplace install`, and when an agent session ends, through the Claude Code plugin's hook. Each source takes at most one snapshot a day, and an export source updates when you add a newer export. No tray icon, no account.
- **Not a dashboard.** There's no UI. The readers are you at a terminal and your agents.
- **Not a system or a platform.** It's a folder. Change anything.
- **Not a cloud.** The archive is stored on your machine, and sources run there too, on your own sign-ins and exports. What an agent reads from it can go to that agent's model provider, like anything else the agent reads. Remote MCP for ChatGPT and claude.ai on the web is on the list, and it'll be your choice, per client.
- **Not a memory feature.** Memory is what an agent decides to remember about you. commonplace is the records your sources provide, with the times they recorded.

## Privacy, told plainly

Title: **Choose what you collect and expose.**

Say these as facts, in this order, without softening or hedging:

- Your data stays in your local `data/` folder, which the template keeps out of git.
- Connected agents can read everything in the built archive. You choose what goes in: leave a source off, `drop` messages before they're saved, `redact` rows from the build.
- `drop` keeps matching messages out of new snapshots. `redact` keeps rows out of the database; the raw snapshots stay on disk.
- Run `commonplace build` after changing `sources` or `redact`.
- Agents may send what they read to their model provider.
- Snapshots are read-only. A crash never leaves half a snapshot.

The CLI and the MCP server open the database read-only. That's how agents are meant to read it, not a wall: an agent with a shell can open any file you can, so don't say agents can't. Don't say "secure", "safe by default", "privacy-first", "end-to-end", or that the data "never leaves your machine". Say what the code does.

## Voice

Plain words a smart friend would use. Specific over clever. Short. Let the work speak.

**Do**
- Show a whole life in every example: a text, a save, a video, a search, a post, a prompt. GitHub is one line among many, never the subject.
- Keep examples real. Every terminal on the site is what the shipped sources and the real CLI print for the made-up archive in `demo/`, never a mockup.
- State what's there. "Every prompt you typed into Claude Code, Codex and Pi."
- Use the real names of things: `data/raw/`, `commonplace sync`, `redact`, `add-source`.
- Give real numbers when we have them: "one snapshot per source per day", "about 1,300 lines in the core".
- Write the way Bassim calls his work good: directly. "This is the way for agents to understand you."
- One headline, one line, one visual per section. Let the visual explain.
- Lowercase in the launch post and anywhere Bassim speaks in his own voice. Sentence case on the site.

**Don't**
- No setup-and-punchline lines. Not "an archive so private even your agent can't find it", not "finally, an agent that gets you". A twist at the end of a line is what makes it sound like marketing.
- No mannered or corporate words: leverage, seamless, unlock, supercharge, empower, robust, harness (the noun is fine, the verb isn't), ecosystem, journey.
- No jargon stand-ins for plain things: "ingestion pipeline" is a fetch, "normalization" is one shape, "observability" is `stats`.
- Never call collection "scraping". A source reads your account, your files or your export.
- No promises of complete coverage. "Everything" is never true of an export.
- No fear. Don't sell privacy by describing what others do with your data.
- No promises about what agents will feel or become. Say what they can search.
- Don't call it a product, a platform, an app or a system. Call it a kit, a template, a repo, a folder, yours.

**Examples**

| Don't | Do |
|---|---|
| Unlock the full power of your personal data. | Your personal data, searchable by your agents. |
| A seamless ingestion pipeline for all your sources. | One dated snapshot per source per day. Build replays them into one database. |
| Finally, an AI that actually knows you. | Your agent can find what you saved, what you said and how you asked last time. |
| Enterprise-grade privacy controls. | A source you leave off is never read. `redact` keeps rows out of the database. |
| Add any source in seconds with our powerful plugin API. | Ask your agent to add your browser history. The `add-source` skill has it write the source: one file in your repo. |
| Your second brain, supercharged. | A commonplace book for the age of agents. |

## Name

The commonplace book: the notebook where people like Bacon and Locke kept everything they read, saved and thought, added to for life. Explain it once, in one line, after saying what the kit does. Never capitalize the project name, even at the start of a sentence. Never "Commonplace", "CommonPlace" or "cp".
