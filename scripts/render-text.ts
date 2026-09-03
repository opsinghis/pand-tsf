// Refactor harness: server-render the app and emit its normalized text content.
// Used to prove component-split refactors are behavior-identical.
import { writeFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import App from "../src/App";

const html = renderToStaticMarkup(createElement(App));
const text = html
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&#x27;|&#39;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/\*\*/g, "")
  .replace(/\s+/g, " ")
  .trim();

const out = process.argv[2] ?? "/tmp/journey-render.txt";
writeFileSync(out, text);
console.log(`rendered ${text.length} chars -> ${out}`);
