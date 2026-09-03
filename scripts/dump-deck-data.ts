import { writeFileSync } from "node:fs";
import * as d from "../src/data/alternative";
// Only const data serializes; interfaces/types are compile-time only.
const out: Record<string, unknown> = {};
for (const [k, v] of Object.entries(d)) {
  if (typeof v !== "function") out[k] = v;
}
writeFileSync("scripts/deck-data.json", JSON.stringify(out, null, 2));
console.log("dumped", Object.keys(out).length, "exports");
