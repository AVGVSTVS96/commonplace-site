import { $ } from "bun";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";

import { fixture, today } from "./fixture.ts";

/**
 * Runs the shipped sources and the real CLI on the made-up archive in fixture.ts, then writes what the
 * CLI printed to out/ and into the `<!-- demo:… -->` blocks of site/index.html.
 * Usage: bun demo/run.ts [path to the commonplace repo, default ../commonplace]
 */

const here = import.meta.dir;
const repo = process.argv[2] ?? `${here}/../../commonplace`;
const work = mkdtempSync(`${tmpdir()}/commonplace-demo-`);
const [code, data, home] = [`${work}/repo`, `${work}/data`, `${work}/home`];

mkdirSync(code);
await $`git -C ${repo} archive HEAD src sources package.json | tar -x -C ${code}`;
copyFileSync(`${here}/commonplace.config.ts`, `${code}/commonplace.config.ts`);
fixture(data, home);

/** No PATH to your tools and a made-up home, so a source that fetched by mistake would find nothing of yours. */
const cli = async (...args: ReadonlyArray<string>) => {
  const run = Bun.spawn([process.execPath, `${code}/src/cli.ts`, ...args], {
    env: { PATH: "/usr/bin:/bin", HOME: home, TZ: "UTC", COMMONPLACE_DATA: data },
    stdout: "pipe",
    stderr: "pipe",
  });
  const [out, err, exit] = await Promise.all([
    new Response(run.stdout).text(),
    new Response(run.stderr).text(),
    run.exited,
  ]);
  if (exit !== 0) throw new Error(`commonplace ${args.join(" ")} exited ${exit}\n${err}${out}`);
  return { out: out.trimEnd(), err };
};

interface Hit {
  readonly id: string;
  readonly what: string;
  readonly title: string | null;
  readonly text: string | null;
}

/** What one command printed, and for `search` and `timeline` the same hits as JSON, to find the IDs in it. */
interface Ran {
  readonly command: string;
  readonly out: string;
  readonly hits: ReadonlyArray<Hit> | null;
}

const session = async (...commands: ReadonlyArray<ReadonlyArray<string>>): Promise<ReadonlyArray<Ran>> => {
  const done: Array<Ran> = [];
  for (const args of commands) {
    const shown = args.map((arg) => (/\s/.test(arg) ? `"${arg}"` : arg)).join(" ");
    const listed = args[0] === "search" || args[0] === "timeline";
    done.push({
      command: `commonplace ${shown}`,
      out: (await cli(...args)).out,
      hits: listed ? (JSON.parse((await cli(...args, "--json")).out) as ReadonlyArray<Hit>) : null,
    });
  }
  return done;
};

await cli("build");

const hero = await session(["search", "kyoto", "--limit", "5"], ["timeline", "--limit", "3"], ["stats"]);
const why = await session(["search", "packing list"], ["search", "kyoto april"], ["search", "fushimi"]);
const [ledger] = await session(["timeline", "--limit", "12"]);

copyFileSync(`${here}/sources/chrome.ts`, `${code}/sources/chrome.ts`);
const config = readFileSync(`${code}/commonplace.config.ts`, "utf8");
writeFileSync(
  `${code}/commonplace.config.ts`,
  `import chrome from "./sources/chrome.ts";\n${config.replace("sources: [", "sources: [chrome, ")}`,
);
const synced = await cli("sync");
const fetched = synced.err
  .trim()
  .split("\n")
  .map((line) => line.replace(/^\S+ /, ""));
if (fetched.join() !== "fetch chrome") throw new Error(`sync fetched more than chrome:\n${synced.err}`);
const added = await session(["timeline", "--verb", "visited", "--limit", "3"]);
const chromeLines = readFileSync(`${here}/sources/chrome.ts`, "utf8").trimEnd().split("\n").length;

await $`chmod -R u+w ${work}`;
rmSync(work, { recursive: true });

// Plain text, as a terminal shows it.

const plain = (s: ReadonlyArray<Ran>) => s.map(({ command, out }) => `$ ${command}\n${out}`).join("\n\n");
mkdirSync(`${here}/out`, { recursive: true });
writeFileSync(`${here}/out/hero.txt`, `${plain(hero)}\n`);
writeFileSync(`${here}/out/why.txt`, `${plain(why)}\n`);
writeFileSync(`${here}/out/add-source.txt`, `$ commonplace sync\n${synced.out}\n\n${plain(added)}\n`);

// The same lines, marked up for the page.

const escape = (text: string) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const snippet = (line: string) =>
  `<span class="d">${escape(line).replaceAll(/«(.*?)»/g, '<span class="hl">«$1»</span>')}</span>`;

const latest = /^(\S+ +latest )(\S+)(.*)$/;

/** A hit prints as `date  what  id  (title)`, then its text on a line of its own when it has any. */
const markup = ({ out, hits }: Ran): Array<string> => {
  const lines = out.split("\n");

  if (hits === null) {
    return lines.map((line) => {
      const [, head = "", date = "", rest = ""] = latest.exec(line) ?? [];
      return head === ""
        ? `<span class="d">${escape(line)}</span>`
        : `${escape(head)}${date === today ? `<b class="now">${date}</b>` : date}${escape(rest)}`;
    });
  }

  let next = 0;
  const marked = hits.flatMap((hit) => {
    const line = lines[next++] ?? "";
    const at = line.indexOf(hit.id);
    const title = line.slice(at + hit.id.length);
    const first = `${escape(line.slice(0, at))}<span class="id">${escape(hit.id)}</span>${title === "" ? "" : `  <span class="d ti">${escape(title.slice(2))}</span>`}`;
    return hit.text === null ? [first] : [first, snippet(lines[next++] ?? "")];
  });
  if (next !== lines.length)
    throw new Error(`the hits of ${hits.length} don't match the printed lines:\n${out}`);
  return marked;
};

const heroLines = [
  ...hero.flatMap((ran, i) => [
    ...(i === 0 ? [] : ['<span class="line gap"></span>']),
    `<span class="line cmd"><b class="p">$</b> <span class="t">${escape(ran.command)}</span></span>`,
    ...markup(ran).map((line) => `<span class="line">${line}</span>`),
  ]),
  '<span class="line gap"></span>',
  '<span class="line cmd end"><b class="p">$</b> <span class="t"></span><span class="cur"></span></span>',
];

/** What the agent says wraps like prose; what it ran keeps the terminal's lines. */
const agent = (says: ReadonlyArray<string>, ran: ReadonlyArray<string>) =>
  [...says.map((line) => ["line say", line]), ...ran.map((line) => ["line", line])].map(
    ([kind, line], i) => `<span class="${kind}"><i class="who">${i === 0 ? "agent" : ""}</i>${line}</span>`,
  );

const ran = (s: ReadonlyArray<Ran>) =>
  s.flatMap((r) => [`<b class="p">$</b> ${escape(r.command)}`, ...markup(r)]);

const said = new Set(["sent", "received", "prompted", "posted", "committed", "reviewed", "commented"]);
const clip = (text: string) => (text.length > 90 ? `${text.slice(0, 90).replace(/\W*\s+\S*$/, "")}…` : text);

const blocks = {
  hero: heroLines,
  ledger: (ledger?.hits ?? []).map(
    (hit) =>
      `<li><b>${hit.what}</b><span>${escape(hit.title !== null && !said.has(hit.what) ? hit.title : `"${clip(hit.text ?? "")}"`)}</span></li>`,
  ),
  why: agent([], ran(why)),
  "add-source": agent(
    [
      `found Chrome's history and wrote <span class="id">sources/chrome.ts</span> <span class="d">(${chromeLines} lines)</span>`,
      `added it to <span class="id">commonplace.config.ts</span> and ran commonplace sync`,
    ],
    ran(added),
  ),
};

const page = `${here}/../site/index.html`;
let html = readFileSync(page, "utf8");
for (const [name, lines] of Object.entries(blocks)) {
  const block = new RegExp(`(<!-- demo:${name} -->\\n)[\\s\\S]*?(<!-- /demo:${name} -->)`);
  if (!block.test(html)) throw new Error(`site/index.html has no demo:${name} block`);
  html = html.replace(block, (_, open: string, close: string) => `${open}${lines.join("\n")}\n${close}`);
}
writeFileSync(page, html);
console.log(`demo/out/ and site/index.html: the real output for ${today}`);
