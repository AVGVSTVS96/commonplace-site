# commonplace-site

The site, brand and launch video for [commonplace](https://github.com/AVGVSTVS96/commonplace), a personal data archive template. Live at https://commonplace-eight-sable.vercel.app.

## Commands

```sh
bun run check            # lint, format, types; must pass
bun run fix              # autofix lint and format
bun run demo             # rerun the real CLI on the made-up archive, rewrite demo/out/ and site/index.html
bun --filter site dev    # the site
bun --filter site shots  # screenshots, og.png and apple-touch-icon.png
```

## Map

| Folder   | Job                                                                              |
| -------- | -------------------------------------------------------------------------------- |
| `site/`  | the page (Vite); Vercel builds it from `site/` on every push to main             |
| `demo/`  | runs commonplace at the tag in `run.ts` on a fictional archive, for the terminals |
| `copy/`  | messaging, site copy and launch post: the source of truth for words              |
| `brand/` | logo, fonts and shots; `bun --filter commonplace-brand logo` regenerates the logo |
| `video/` | the launch video, rendered with headless Chrome                                  |

`demo/commonplace.config.ts` and `demo/sources/chrome.ts` are copied into the commonplace checkout the demo runs, so they're checked by running it, not by this repo's lint.

## Rules

| Rule                                                       | Enforced by                     |
| ---------------------------------------------------------- | ------------------------------- |
| No comments, no `any`, no unchecked assertions             | oxlint (`oxlint.config.ts`)     |
| Terminal output on the page is real CLI output             | `bun run demo` writes it        |
| A word on the site matches `copy/MESSAGING.md`             | judgment: fix MESSAGING.md first |

- opentype.js stays on 1.x: 2.x draws these fonts wrong.
- Every name, number and account in `demo/fixture.ts` is made up; keep it that way.
