import { Database } from "bun:sqlite";
import { copyFileSync, rmSync } from "node:fs";
import { homedir } from "node:os";

import { event, iso, thing, urlRef } from "../src/schema.ts";
import { defineSource, jsonl, writeJsonl } from "../src/source.ts";

interface Visit {
  readonly id: number;
  readonly url: string;
  readonly title: string;
  readonly visit_time: number;
}

const history =
  process.platform === "darwin"
    ? `${homedir()}/Library/Application Support/Google/Chrome/Default/History`
    : `${homedir()}/.config/google-chrome/Default/History`;

/** Chrome counts microseconds from 1601-01-01 UTC, this many milliseconds before 1970. */
const epoch = 11_644_473_600_000;

/** Every page you visited in Chrome's default profile, from the History database Chrome keeps. */
export default defineSource({
  name: "chrome",

  fetch: async ({ dir, since }) => {
    // Chrome locks History while it runs, so read a copy.
    const copy = `${dir}/.History`;
    copyFileSync(history, copy);
    const db = new Database(copy, { readonly: true });
    const after = since === null ? 0 : (Date.parse(since) - 86_400_000 + epoch) * 1000;
    const visits = db
      .query(
        "SELECT v.id, u.url, u.title, v.visit_time FROM visits v JOIN urls u ON u.id = v.url WHERE v.visit_time >= ? ORDER BY v.id",
      )
      .all(after);
    db.close();
    rmSync(copy);
    await writeJsonl(`${dir}/visits.jsonl`, visits);
  },

  rows: async function* ({ dir }) {
    for await (const visit of jsonl<Visit>(`${dir}/visits.jsonl`)) {
      const ref = urlRef(visit.url);

      if (ref !== null) {
        yield thing({ ...ref, title: visit.title === "" ? null : visit.title, url: visit.url });
        yield event({
          verb: "visited",
          thing: ref.id,
          ts: iso(visit.visit_time / 1000 - epoch),
          key: String(visit.id),
        });
      }
    }
  },
});
