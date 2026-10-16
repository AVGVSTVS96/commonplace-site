import { Database } from "bun:sqlite";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

/** A made-up week, in the formats the shipped sources read. Every name, number and account is fictional. */

const day = 86_400_000;

export const today = new Date().toISOString().slice(0, 10);

const date = (daysAgo: number) => new Date(Date.parse(today) - daysAgo * day).toISOString().slice(0, 10);

const at = (daysAgo: number, time: string) => new Date(`${date(daysAgo)}T${time}:00Z`).toISOString();

/** x.com's `Thu Oct 15 18:20:00 +0000 2026`. */
const xTime = (iso: string) => {
  const [weekday, dd, month, yyyy, hms] = new Date(iso).toUTCString().replace(",", "").split(" ");
  return `${weekday} ${month} ${dd} ${hms} +0000 ${yyyy}`;
};

const write = (path: string, text: string) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
};

const jsonl = (items: ReadonlyArray<unknown>) => items.map((item) => `${JSON.stringify(item)}\n`).join("");

const csvCell = (value: string) => (/[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value);

const imessage = (raw: string) => {
  const crew = "iMessage;+;chat482913570";
  const sam = "iMessage;-;+15550103";
  const chats = [
    {
      guid: crew,
      name: "kyoto crew",
      service: "iMessage",
      group: true,
      handles: ["+15550101", "+15550102"],
      inferred: false,
    },
    { guid: sam, name: null, service: "iMessage", group: false, handles: ["+15550103"], inferred: false },
  ];
  const message = (guid: string, chat: string, handle: string | null, ts: string, text: string) => ({
    guid,
    chat,
    handle,
    from_me: handle === null,
    ts,
    text,
    service: "iMessage",
    attachments: false,
    associated: null,
    inferred: false,
  });
  const days = {
    2: [
      message(
        "6B2E1F0A-3C4D-4E5F-8A9B-0C1D2E3F4A51",
        crew,
        "+15550101",
        at(4, "19:40"),
        "ryokan in kyoto is booked! april 14 to 18, right by the philosopher's path",
      ),
      message(
        "6B2E1F0A-3C4D-4E5F-8A9B-0C1D2E3F4A52",
        crew,
        null,
        at(4, "19:42"),
        "amazing. i'll do the jr pass math",
      ),
      message(
        "6B2E1F0A-3C4D-4E5F-8A9B-0C1D2E3F4A53",
        sam,
        null,
        at(2, "12:15"),
        "dinner thursday? the noodle place on 9th",
      ),
    ],
    1: [
      message(
        "6B2E1F0A-3C4D-4E5F-8A9B-0C1D2E3F4A54",
        crew,
        "+15550102",
        at(1, "19:03"),
        "found a ramen counter by kyoto station that opens at 6am",
      ),
    ],
    0: [
      message(
        "6B2E1F0A-3C4D-4E5F-8A9B-0C1D2E3F4A55",
        sam,
        null,
        at(0, "08:31"),
        "running late, save me a seat",
      ),
    ],
  };

  for (const [ago, messages] of Object.entries(days)) {
    write(`${raw}/imessage/${date(Number(ago))}/chats.jsonl`, jsonl(chats));
    write(`${raw}/imessage/${date(Number(ago))}/messages.jsonl`, jsonl(messages));
  }
};

const prompts = (raw: string) => {
  const prompt = (agent: string, session: string, project: string, ts: string, text: string) => ({
    agent,
    session,
    ts,
    cwd: `/Users/me/code/${project}`,
    project,
    model: agent === "codex" ? "gpt-5.5-codex" : "claude-opus-5-5",
    text,
    channel: null,
  });
  const app = "c8f3a2e1-5d4b-4a3c-9e2f-1a0b9c8d7e61";
  const days = {
    2: [
      prompt(
        "claude",
        "a1d4e7b2-6c9f-4e3a-8b1d-2f5c8e0a9b74",
        "trips",
        at(165, "10:02"),
        "packing list for lisbon. carry-on only, i never check a bag",
      ),
      prompt(
        "claude",
        "a1d4e7b2-6c9f-4e3a-8b1d-2f5c8e0a9b74",
        "trips",
        at(6, "22:40"),
        "cheapest way from kansai airport to kyoto with two bags",
      ),
      prompt(
        "claude",
        app,
        "tidepool",
        at(3, "10:20"),
        "tighten the kerning in the wordmark svg, the r and n are touching",
      ),
    ],
    1: [
      prompt(
        "codex",
        "019a3c7e-2b1f-7d40-9e8a-5c6b4d3e2f10",
        "tidepool",
        at(1, "11:30"),
        "add a test for the tide table parser, the noaa file with the blank rows",
      ),
    ],
    0: [
      prompt(
        "claude",
        app,
        "tidepool",
        at(0, "09:12"),
        "the tide chart is unreadable in dark mode. follow the system theme, no toggle",
      ),
    ],
  };

  for (const [ago, lines] of Object.entries(days)) {
    write(`${raw}/prompts/${date(Number(ago))}/prompts.jsonl`, jsonl(lines));
  }
};

const github = (raw: string) => {
  const prs = [
    {
      repository: { nameWithOwner: "me/tidepool" },
      number: 12,
      title: "Kern the wordmark by hand",
      body: "",
      state: "merged",
      isDraft: false,
      createdAt: at(2, "14:02"),
      closedAt: at(1, "09:00"),
      url: "https://github.com/me/tidepool/pull/12",
    },
  ];
  const commit = (sha: string, date: string, subject: string) => ({
    sha,
    date,
    author: "me",
    email: "me@example.com",
    subject,
    body: "",
    repo: "me/tidepool",
    remote: "git@github.com:me/tidepool.git",
    path: "/Users/me/code/tidepool",
  });
  const days = {
    2: [
      commit(
        "4c1e9a7b2d3f5e6a8b9c0d1e2f3a4b5c6d7e8f90",
        at(2, "13:50"),
        "Kern the wordmark: r, n and the tail of the p",
      ),
    ],
    1: [
      commit(
        "9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d",
        at(1, "16:45"),
        "Read tide tables in the station's local time",
      ),
    ],
    0: [],
  };

  for (const [ago, commits] of Object.entries(days)) {
    const dir = `${raw}/github/${date(Number(ago))}`;
    write(`${dir}/prs.json`, JSON.stringify(prs));
    write(`${dir}/issues.json`, "[]");
    write(`${dir}/stars.jsonl`, "");
    write(`${dir}/commits.jsonl`, jsonl(commits));
  }
};

const x = (raw: string) => {
  const me = "1001";
  const post = (id: string, user: string, handle: string, created: string, text: string) => ({
    rest_id: id,
    core: { user_results: { result: { rest_id: user, core: { screen_name: handle } } } },
    legacy: { full_text: text, created_at: xTime(created) },
  });
  const page = (
    key: "bookmark_timeline_v2" | "bookmark_collection_timeline" | "user",
    posts: ReadonlyArray<object>,
  ) => {
    const timeline = {
      timeline: {
        instructions: [
          {
            type: "TimelineAddEntries",
            entries: posts.map((result, i) => ({
              entryId: `tweet-${i}`,
              content: { itemContent: { tweet_results: { result } } },
            })),
          },
        ],
      },
    };
    return `${JSON.stringify({ data: key === "user" ? { user: { result: { timeline } } } : { [key]: timeline } })}\n`;
  };
  const kerning = post(
    "1846203117740000101",
    "2001",
    "typenotes",
    at(5, "17:30"),
    "kerning by hand: space the n and the o first, then set every other letter against them",
  );
  const kyoto = post(
    "1846203117740000102",
    "2002",
    "slowtravelnotes",
    at(2, "20:00"),
    "two weeks in kyoto and osaka. what worked: arashiyama before 8am, fushimi inari at dawn (two hours of stairs, wear real shoes), one ryokan night is plenty",
  );
  const folders = [
    { id: "55", name: "type" },
    { id: "56", name: "travel" },
  ];

  const first = `${raw}/x/${date(2)}`;
  write(`${first}/viewer.json`, JSON.stringify({ id: me }));
  write(`${first}/bookmarks.jsonl`, page("bookmark_timeline_v2", [kyoto, kerning]));
  write(
    `${first}/folders.json`,
    JSON.stringify({
      data: { viewer: { user_results: { result: { bookmark_collections_slice: { items: folders } } } } },
    }),
  );
  write(`${first}/folders/55.jsonl`, page("bookmark_collection_timeline", [kerning]));
  write(`${first}/folders/56.jsonl`, page("bookmark_collection_timeline", [kyoto]));

  const second = `${raw}/x/${date(1)}`;
  write(`${second}/viewer.json`, JSON.stringify({ id: me }));
  write(
    `${second}/likes.jsonl`,
    page("user", [
      post(
        "1846203117740000103",
        "2003",
        "sqlitefacts",
        at(1, "21:50"),
        "a database in one file, with full-text search built in, on every phone you've ever owned",
      ),
    ]),
  );
  write(
    `${second}/posts.jsonl`,
    page("user", [
      post(
        "1846203117740000104",
        me,
        "me",
        at(1, "18:20"),
        "first pass at kerning the tidepool wordmark by hand. the r and n were fighting",
      ),
    ]),
  );

  write(`${raw}/x/${date(0)}/viewer.json`, JSON.stringify({ id: me }));
};

const takeout = (raw: string) => {
  const root = `${raw}/takeout/${date(1)}/Takeout`;
  write(
    `${root}/My Activity/Search/MyActivity.json`,
    JSON.stringify([
      {
        header: "Search",
        title: "Searched for ryokan kyoto",
        titleUrl: "https://www.google.com/search?q=ryokan+kyoto",
        time: at(2, "21:05"),
      },
      {
        header: "Search",
        title: "Searched for noaa tide predictions api",
        titleUrl: "https://www.google.com/search?q=noaa+tide+predictions+api",
        time: at(3, "08:15"),
      },
    ]),
  );
  write(
    `${root}/My Activity/YouTube/MyActivity.json`,
    JSON.stringify([
      {
        header: "YouTube",
        title: "Watched Kyoto in three days, on foot",
        titleUrl: "https://www.youtube.com/watch?v=Qm3kT8yLp2A",
        subtitles: [
          { name: "Slow Travel Notes", url: "https://www.youtube.com/channel/UCq7Lm2Xr9Tb4Kd1Wn8Ys3Fa" },
        ],
        time: at(2, "21:30"),
      },
      {
        header: "YouTube",
        title: "Watched Kerning by hand, explained",
        titleUrl: "https://www.youtube.com/watch?v=Vt9cKx2LmQe",
        subtitles: [
          { name: "Letterform Lab", url: "https://www.youtube.com/channel/UCz3Pq8Nv1Hc6Rj2Ld9Mt4Ks" },
        ],
        time: at(3, "20:40"),
      },
    ]),
  );
  write(
    `${root}/Maps (your places)/Saved Places.json`,
    JSON.stringify({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [135.7727, 34.9671] },
          properties: {
            date: at(4, "13:00"),
            google_maps_url: "http://maps.google.com/?cid=17291468421904536081",
            location: {
              name: "Fushimi Inari Taisha",
              address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto",
            },
          },
        },
      ],
    }),
  );
};

const raindrop = (raw: string) => {
  const header = "id,title,note,excerpt,url,folder,tags,created,cover,highlights,favorite";
  const rows = [
    [
      "801",
      "Kyoto by train: is the JR Pass worth it?",
      "do the math for april",
      "Which passes pay off for Kyoto, Osaka and Nara day trips",
      "https://www.japan-guide.com/railpass/kyoto",
      "Travel",
      "japan, trains",
      at(3, "20:15"),
      "",
      "",
      "false",
    ],
    [
      "802",
      "The commonplace book",
      "",
      "A notebook for everything you read, saved and thought",
      "https://en.wikipedia.org/wiki/Commonplace_book",
      "Reading",
      "",
      at(9, "22:10"),
      "",
      "",
      "true",
    ],
    [
      "803",
      "Optical kerning vs metric kerning",
      "",
      "When to trust the font's kerning table, and when to let the software space it",
      "https://fonts.google.com/knowledge/optical-kerning",
      "Type",
      "type",
      at(12, "09:40"),
      "",
      "",
      "false",
    ],
  ];
  write(
    `${raw}/raindrop/${date(3)}/export.csv`,
    [header, ...rows.map((row) => row.map(csvCell).join(","))].join("\n"),
  );
};

/** Chrome's own History database, as `sources/chrome.ts` finds it on Linux. */
export const chromeHistory = (home: string) => {
  const file = `${home}/.config/google-chrome/Default/History`;
  mkdirSync(dirname(file), { recursive: true });
  const db = new Database(file, { create: true });
  const chrome = (iso: string) => (Date.parse(iso) + 11_644_473_600_000) * 1000;
  const pages = [
    [
      "https://tidesandcurrents.noaa.gov/tide_predictions.html",
      "Tide Predictions - NOAA Tides & Currents",
      at(1, "11:10"),
    ],
    [
      "https://www.japan-guide.com/railpass/kyoto",
      "Kyoto by train: is the JR Pass worth it?",
      at(1, "21:40"),
    ],
    [
      "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme",
      "prefers-color-scheme - CSS | MDN",
      at(0, "09:20"),
    ],
  ] as const;

  db.exec(`
    CREATE TABLE urls(id INTEGER PRIMARY KEY AUTOINCREMENT,url LONGVARCHAR,title LONGVARCHAR,visit_count INTEGER DEFAULT 0 NOT NULL,typed_count INTEGER DEFAULT 0 NOT NULL,last_visit_time INTEGER NOT NULL,hidden INTEGER DEFAULT 0 NOT NULL);
    CREATE TABLE visits(id INTEGER PRIMARY KEY AUTOINCREMENT,url INTEGER NOT NULL,visit_time INTEGER NOT NULL,from_visit INTEGER,transition INTEGER DEFAULT 0 NOT NULL,visit_duration INTEGER DEFAULT 0 NOT NULL);
  `);
  for (const [i, [url, title, time]] of pages.entries()) {
    db.run("INSERT INTO urls (id, url, title, visit_count, last_visit_time) VALUES (?, ?, ?, 1, ?)", [
      i + 1,
      url,
      title,
      chrome(time),
    ]);
    db.run("INSERT INTO visits (id, url, visit_time) VALUES (?, ?, ?)", [4180 + i, i + 1, chrome(time)]);
  }
  db.close();
};

export const fixture = (data: string, home: string) => {
  const raw = `${data}/raw`;
  imessage(raw);
  prompts(raw);
  github(raw);
  x(raw);
  takeout(raw);
  raindrop(raw);
  chromeHistory(home);
};
