# commonplace launch

The X post, two alternates, and the launch video in beats. The post is in Bassim's own voice: lowercase, plain, says it's good without dressing it up. The link goes in the first reply so the post itself gets the reach.

## The post

```
introducing commonplace: your personal data kit for agents

a commonplace book for the age of agents. it copies everything you've made, saved and said into a private archive on your machine, keeps it current, and gives every agent one safe door to it

- not just your github. texts, mail, review comments, what you watched, what you saved, every prompt you ever typed
- agents read it through a cli or mcp, and only the sources you allow
- two sources built in, five coming, and anything with an export, db, api or cli is one ask away: the add-source skill has your agent write it
- a template you own, not an app you install. ~1k lines of typescript, zero deps, sqlite, mit

this is how an agent learns your intent and your judgment, not just your code
```

First reply:

```
github.com/AVGVSTVS96/commonplace

make it yours with one command, run `commonplace sync`, then ask your agent something only your history can answer
```

Second reply, optional, the video.

*(Attach the launch video, or the hero terminal as an image. Video gets no ranking bonus on its own; what counts is time spent after the tap, so the video opens on the point and has burned-in captions.)*

## Alternate A: the short one

```
i built commonplace: a commonplace book for the age of agents

everything you've made, saved and said, in a private archive on your machine, with one door for every agent (cli + mcp). it keeps itself current

it's a template you own, not an app. ~1k lines, zero deps, sqlite. agents add the sources for you

agents can already read your code. this is the rest of you
```

*(The last line is a plain statement, not a twist: the claim is literally what the archive holds.)*

## Alternate B: the why first

```
your agent has read all your code and none of your judgment

what you saved, what you liked, what you starred, what you rejected, how you asked for it last time. that's where your taste lives, and it's scattered across twenty apps

commonplace puts it in one private archive on your machine, keeps it current, and gives every agent one safe door to it. cli + mcp, only the sources you allow

a template you own. ~1k lines, zero deps, sqlite, mit. github, claude code and codex prompts built in; x, imessage, takeout, raindrop coming; anything else is one ask away
```

## Launch video, 60–90 seconds

Same look as the site: a light terminal, monospace, no voiceover, captions burned in. Every beat is one card of text and one visual. The typing is real-time, the output appears as the CLI prints it. Music is quiet and stays under the captions.

| # | time | on screen | caption |
|---|---|---|---|
| 01 | 0:00 | Empty terminal. Cursor blinks. | **your agent has read all your code.** |
| 02 | 0:03 | Still empty. | **and none of your judgment.** |
| 03 | 0:06 | A fast scroll of app icons or names, muted: X, iMessage, Gmail, YouTube, Reddit, Raindrop, GitHub, Claude Code, Codex. They blur past. | what you saved, liked, watched, said. scattered across twenty apps. |
| 04 | 0:11 | The names fall into one folder: `data/raw/`. Then a single file: `commonplace.db`. | **commonplace** · your personal data kit for agents |
| 05 | 0:15 | `$ commonplace sync` types out. Output lines appear one by one: `github  2026-10-08  2521 things  1404 events`, `prompts 2026-10-08  1170 things  1158 events`. | one dated snapshot per source per day. kept forever, never in git. |
| 06 | 0:22 | `$ commonplace search "syntax highlighting"` and three real results: a saved repo, a prompt, a PR. | everything you've made, saved and said. one shape: things, events, links. |
| 07 | 0:29 | `$ commonplace timeline --since 2026-10-01 --verb prompted` and three prompts. | every prompt you ever typed, with the date. |
| 08 | 0:35 | Split: an agent's question on the left, `search "markdown streaming"` and two hits on the right, then its one-line answer citing what you saved in July. | an agent that can search this stops guessing what you mean. |
| 09 | 0:43 | `commonplace.config.ts`, the `mcp: ["github", "prompts"]` line highlighted, then the `redact` line. | agents only see the sources you allow. redact rules keep rows out entirely. |
| 10 | 0:50 | The sources table, three tiers. "built in" is solid, "coming" is muted, "one ask away" is a row of chips. | two built in. five coming. anything with an export is one ask away. |
| 11 | 0:56 | `you  add my obsidian vault to commonplace` → `agent  wrote sources/obsidian.ts (61 lines)` → `$ commonplace sync` → one new line in stats. | your agent writes the source. one file, usually under 80 lines. |
| 12 | 1:04 | A file tree: `src/` with its eight files, one line each. A counter runs up to ~1,000 lines, 0 dependencies. | a template you own. read it in an afternoon. change anything. |
| 13 | 1:11 | The five start commands, typed at speed, ending on `commonplace sync`. | start in five lines. |
| 14 | 1:17 | Wordmark, tagline, URL. Hold. | **commonplace** · a commonplace book for the age of agents · github.com/AVGVSTVS96/commonplace |

Cut for a 60-second version: drop 07 and 13, and shorten 03.

*(Beats 05–07 use Bassim's real archive output, with any private text removed. Nothing in the video may show a source that isn't built in today as if it were running.)*
