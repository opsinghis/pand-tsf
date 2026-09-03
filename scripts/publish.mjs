import { copyFile, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const builtHtml = resolve(root, "dist/index.html");
const targetHtml = resolve(root, "../alternative-approach.html");

await copyFile(builtHtml, targetHtml);

const html = await readFile(targetHtml, "utf8");
await writeFile(
  targetHtml,
  `<!-- Generated from alternative-site. Edit src/data/alternative.ts and run npm run build:publish --workspace @pandav/alternative-site. -->\n${html}`,
  "utf8"
);

console.log(`Published ${builtHtml} to ${targetHtml}`);
