import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";

export default defineConfig({
  extends: [core, antiSlop],
  ignorePatterns: [
    ...(core.ignorePatterns ?? []),
    "brand/**",
    "video/**",
    "demo/sources/**",
    "demo/commonplace.config.ts",
  ],
  jsPlugins: [{ name: "no-comments", specifier: "./tools/oxlint/no-comments.ts" }],
  options: { reportUnusedDisableDirectives: "error", typeAware: true },
  rules: {
    "eslint/no-await-in-loop": "off",
    "eslint/sort-keys": "off",
    "import/no-cycle": "error",
    "no-comments/no-comments": "error",
  },
});
