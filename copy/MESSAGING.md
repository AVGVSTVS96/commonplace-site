# commonplace messaging

The source of truth for how we talk about commonplace. The site, README, launch post and video all draw from here. When something here and something there disagree, fix it here first.

## The idea in one sentence

commonplace copies everything you've made, saved and said into a private archive on your machine, keeps it current, and gives every agent you use one safe door to it.

Shorter, for a bio or a card: a commonplace book for the age of agents.

## Tagline

**your personal data kit for agents**

It's Bassim's own phrase, it says what the thing is, and "kit" says template, not app. Lowercase next to the wordmark; sentence case in prose.

Runners-up, in order:

1. **a commonplace book for the age of agents.** The story line. Use it right under the tagline, in the README's first line, and as the launch post's second line. It explains the name without a footnote.
2. **everything you've made, saved and said.** The scope line. Good as a section title and as the "everything" list's heading.
3. **one door for every agent.** The access line. Fine in a sub line, too thin on its own.

## Hero

- **Headline:** Everything you've made, saved and said.
- **Sub line:** A private archive that keeps itself current, with one door for every agent.

The headline is the scope line on its own, so it stays three short lines beside the terminal. The access line moves into the sub line. How the door works (CLI, MCP, only the sources you allow) belongs in the sections below, not the hero.

## The story

Three moves. Tell them in this order and don't skip the first one.

**1. It's all your data, not just GitHub.**
Agents can already read your code. Everything else about you is scattered: texts, mail, card charges and bills, browser history, YouTube history, Reddit posts and saves, Instagram and Pinterest saves, the articles and inspiration you saved, your notes and calendar, GitHub comments and review comments, every prompt you ever typed. All that small activity is the record of what you pay attention to and what you chose. commonplace is the one place it all lands, with one shape: things, events, links.

**2. That's how an agent learns your intent and judgment.**
Your taste isn't in any one file. It's in what you saved, what you liked, what you starred, how you asked for things last time. An agent that can search that stops guessing what you mean. It knows which libraries you've already rejected, which writers you read, what you were working on the week you first tried something.

**3. That's what a high-trust relationship with an agent is built on.**
Touch this lightly. One or two lines on the page, never a section. The more an agent knows about you, the less you have to say, and the more you can hand it. Trust runs both ways: commonplace decides what agents may see, so you can give them a lot because you're never giving them everything.

Don't say "digital twin", "second brain", "memory layer", "context engine", "knowledge graph". Don't say the agent "knows you better than you know yourself". Say what's in the archive and what an agent can do with it.

## What it is

- **A template repo.** You copy it into a private repo of your own. The code is yours, in your repo, next to your data. About 1,300 lines of TypeScript you can read in an afternoon, with no runtime dependencies: Bun, its built-in SQLite, and plain files.
- **An archive that keeps itself.** One dated, read-only snapshot per source per day in `data/raw/`, kept forever. One SQLite database rebuilt from those snapshots anytime. Full-text search.
- **One door.** A CLI and an MCP server, both over the same store. MCP clients see only the sources you allow; the CLI shows everything. Claude Code, Codex, Claude Desktop, and anything else that speaks MCP.
- **Sources that agents write.** Four built in today (GitHub; every Claude Code, Codex and Pi prompt; iMessage; X, read from your own signed-in browser), three that read an export you download (Google Takeout, the X archive, Raindrop), and anything with an export, a local database, an API or a CLI is one ask away: the `add-source` skill has your agent write it, one file, usually under 80 lines.

## What it isn't

- **Not an app you install.** Nothing runs on its own except a sync: when an agent session ends, and on a Mac at login and when a message arrives, if you run `commonplace install`. No tray icon, no account.
- **Not a dashboard.** There's no UI. The readers are you at a terminal and your agents.
- **Not a system or a platform.** It's a folder. Change anything.
- **Not a cloud.** Your archive never leaves your machine, and sources run there too, on your own sign-ins and exports, with no paid APIs. Remote MCP for ChatGPT and claude.ai on the web is on the list, and it'll be your choice, per client.
- **Not a memory feature.** Memory is what an agent decides to remember about you. commonplace is what actually happened, from the source, with timestamps.

## Privacy, told plainly

Say these as facts, in this order, without softening or hedging:

- Your data lives in `data/`, which never enters git.
- Agents never open the database. Over MCP they see only the sources you allow, and each MCP client can be narrowed further. The CLI shows everything to whoever runs it.
- `redact` rules keep rows out of the archive entirely. They're never written.
- A row is visible only if the reader may read every source that contributed to it, so a hidden source can't leak through a merge.
- Snapshots are read-only. A crash never leaves half a snapshot.

Don't say "secure", "safe by default", "privacy-first", "end-to-end". Say what the code does.

## Voice

Plain words a smart friend would use. Specific over clever. Short. Let the work speak.

**Do**
- Show a whole life in every example: a charge, a bill, a text, a mail, a video, a page, a save, a prompt. GitHub is one line among many, never the subject.
- State what's there. "Every prompt you typed into Claude Code, Codex and Pi."
- Use the real names of things: `data/raw/`, `commonplace sync`, `redact`, `add-source`.
- Give real numbers when we have them: "one snapshot per source per day", "usually under 80 lines".
- Write the way Bassim calls his work good: directly. "This is the way for agents to understand you."
- One headline, one line, one visual per section. Let the visual explain.
- Lowercase in the launch post and anywhere Bassim speaks in his own voice. Sentence case on the site.

**Don't**
- No setup-and-punchline lines. Not "an archive so private even your agent can't find it", not "finally, an agent that gets you". A twist at the end of a line is what makes it sound like marketing.
- No mannered or corporate words: leverage, seamless, unlock, supercharge, empower, robust, harness (the noun is fine, the verb isn't), ecosystem, journey.
- No jargon stand-ins for plain things: "ingestion pipeline" is a fetch, "normalization" is one shape, "observability" is `stats`.
- No fear. Don't sell privacy by describing what others do with your data.
- No promises about what agents will feel or become. Say what they can search.
- Don't call it a product, a platform, an app or a system. Call it a kit, a template, a repo, a folder, yours.

**Examples**

| Don't | Do |
|---|---|
| Unlock the full power of your personal data. | Everything you've made, saved and said, searchable by any agent. |
| A seamless ingestion pipeline for all your sources. | One dated snapshot per source per day. Build replays them into one database. |
| Finally, an AI that actually knows you. | An agent that can search what you saved stops guessing what you mean. |
| Enterprise-grade privacy controls. | MCP clients only see the sources you allow. `redact` rules keep rows out entirely. |
| Add any source in seconds with our powerful plugin API. | Ask your agent to add your Obsidian vault. The `add-source` skill writes the source: one file, usually under 80 lines. |
| Your second brain, supercharged. | A commonplace book for the age of agents. |

## Name

The commonplace book: the notebook where people like Bacon and Locke kept everything they read, saved and thought, added to for life. Explain it once, in one line, near the top. Never capitalize the project name, even at the start of a sentence. Never "Commonplace", "CommonPlace" or "cp".
