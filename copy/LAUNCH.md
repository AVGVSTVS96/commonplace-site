# commonplace launch

The X post, two alternates, and the launch video in beats. The post is in Bassim's own voice: lowercase, plain, says it's good without dressing it up. The link goes in the first reply so the post itself gets the reach.

## The post

```
introducing commonplace: your personal data kit for agents

a commonplace book for the age of agents. it copies everything you've made, saved and said into a private archive on your machine, keeps it current, and gives every agent one safe door to it

- not just your github. texts, mail, review comments, what you watched, what you saved, every prompt you ever typed
- agents read it over mcp or the cli
- five sources built in, three that read an export, and anything with an export, db, api or cli is one ask away: the add-source skill has your agent write it
- a template you own, not an app you install. ~1,400 lines of typescript, zero deps, sqlite, mit

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

it's a template you own, not an app. ~1,400 lines, zero deps, sqlite. agents add the sources for you

agents can already read your code. this is the rest of you
```

*(The last line is a plain statement, not a twist: the claim is literally what the archive holds.)*

## Alternate B: the why first

```
your agent has read all your code and none of your judgment

what you saved, what you liked, what you starred, what you rejected, how you asked for it last time. that's where your taste lives, and it's scattered across twenty apps

commonplace puts it in one private archive on your machine, keeps it current, and gives every agent one safe door to it, over mcp or the cli

a template you own. ~1,400 lines, zero deps, sqlite, mit. github, imessage, x, mail and every claude code, codex and pi prompt built in; takeout, the x archive and raindrop from their exports; anything else is one ask away
```

## Launch video, about 100 seconds

`video/out/commonplace-launch.mp4`, rendered from `video/scenes.js`. The site's look: one framed sheet on the grey page, the sky band on top, a black strip at the foot, terminals as plates with crop marks. No voiceover, captions burned in. Typing is real-time and the output lands whole, as the CLI prints it. Sound is keypress ticks and a tone on the moments that matter, no music bed.

| # | time | on screen | caption |
|---|---|---|---|
| 01 | 0:00 | **Your agent has read all your code.** Then, dimmed: **And none of your judgment.** | |
| 02 | 0:05 | "introducing", the mark and **commonplace**, the tagline. | your personal data kit for agents |
| 03 | 0:09 | `$ commonplace timeline --limit 6`: a prompt, a text sent, a liked post, a text received, a post, a commit. | One archive on your machine. One shape for all of it: things, events, links. |
| 04 | 0:19 | `$ commonplace search kyoto --limit 5`: a group chat, a Google search, a saved page, a prompt, a text. | A group chat, a Google search, a saved page, a prompt, a text. One query. |
| 05 | 0:26 | `$ commonplace sync`: four fetches, the build report, the database line; beside it the `data/raw/` tree gains today's folders. | Build replays every snapshot into one SQLite file. Same `raw/`, same database. |
| 06 | 0:35 | `you  make me a packing list for kyoto`; the agent runs three searches, then answers from what it found. | The more an agent can look up, the less you have to say. |
| 07 | 0:49 | `commonplace.config.ts`: `sources`, then `drop`, then `redact` highlighted. | A source you leave off is never read. `drop` keeps messages out of snapshots, `redact` keeps rows out of the database. |
| 08 | 1:00 | `you  add my browser history to commonplace` → `agent  wrote sources/chrome.ts (58 lines)` → `timeline --verb visited`. | One file in your repo. Any coding agent with file and terminal access can follow the skill. |
| 09 | 1:10 | `$ wc -l src/*.ts` (1,390 total at v0.1.0), `$ jq .dependencies package.json` → `null`. | About 1,400 lines of TypeScript, no runtime packages. Read it in an afternoon. Change anything. |
| 10 | 1:20 | The six start commands, typed at speed. | Then ask your agent something only your history can answer. |
| 11 | 1:33 | The mark and **commonplace**, a commonplace book for the age of agents, the URL. Hold. | |

Cut for a 60-second version: drop 04 and 09.

*(Every terminal line is real output of commonplace v0.1.0 on the made-up archive in `demo/`, the same one the site's terminals show. Nothing in the video may show a source that isn't built in today as if it were running: the only source not built in, Chrome history, is shown being written by the agent.)*
