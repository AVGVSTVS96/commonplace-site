import { github } from "./sources/github.ts";
import { imessage } from "./sources/imessage.ts";
import { prompts } from "./sources/prompts.ts";
import raindrop from "./sources/raindrop.ts";
import takeout from "./sources/takeout.ts";
import { x } from "./sources/x.ts";
import { defineConfig } from "./src/config.ts";

export default defineConfig({
  sources: [raindrop, takeout, x(), prompts(), github(), imessage()],

  redact: (row) => row.type === "event" && /\b(password|api[_ -]?key|secret)\b/i.test(row.text ?? ""),
});
