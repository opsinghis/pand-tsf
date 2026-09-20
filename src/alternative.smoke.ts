/**
 * Alternative-approach smoke:
 * 1. Data-derived parity — SSR-render <App/> and assert every content string
 *    (>= 24 chars) from data/alternative.ts appears in the rendered text.
 * 2. Structural assertions — 30 dial rows, 20 goal rows, 4 foundation pillars,
 *    4 horizon blocks, both governance layers, empty Lane-2 state at 3 months.
 * 3. Dist checks — single-file, CSP-clean, no mojibake, within size budget.
 */
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import App from "./App";
import { maturityHorizons, servicePlatforms } from "./components/AltRun";
import { PresentationSite } from "./components/PresentationSite";
import * as alt from "./data/alternative";

function normalize(value: string): string {
  return value.replace(/\*\*/g, "").replace(/\s+/g, " ").replace(/ ([;:,.])/g, "$1").trim();
}

function toText(markup: string): string {
  return markup
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function collectStrings(value: unknown, out: string[]): void {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) collectStrings(item, out);
  else if (value && typeof value === "object") for (const item of Object.values(value)) collectStrings(item, out);
}

const markup = renderToStaticMarkup(createElement(App));
const renderedText = normalize(toText(markup));
const presentationMarkup = renderToStaticMarkup(createElement(PresentationSite));
const vercelConfig = JSON.parse(readFileSync(resolve(import.meta.dirname, "../vercel.json"), "utf8")) as {
  rewrites?: Array<{ source: string; destination: string }>;
};
const vercelRewrites = vercelConfig.rewrites ?? [];

const allStrings: string[] = [];
collectStrings(alt, allStrings);
const contentStrings = [...new Set(allStrings.filter((value) => value.length >= 24))];
const missing = contentStrings.filter((value) => !renderedText.includes(normalize(value)));
if (missing.length > 0) {
  throw new Error(
    `Data-derived parity failed: ${missing.length} string(s) not rendered:\n` +
      missing.slice(0, 6).map((value) => `  - ${value.slice(0, 90)}`).join("\n")
  );
}

const missingPresentationLinks = alt.navSections.filter((section) => !presentationMarkup.includes(`#${section.id}`));
if (missingPresentationLinks.length > 0) {
  throw new Error(
    `Presentation coverage failed: ${missingPresentationLinks.length} section link(s) missing:\n` +
      missingPresentationLinks.slice(0, 8).map((section) => `  - ${section.num} ${section.label}`).join("\n")
  );
}

// Structural assertions
const count = (re: RegExp) => (markup.match(re) || []).length;
const structural: Record<string, boolean> = {
  "30 dial rows": count(/class="dial-item"/g) === 30,
  "20 goal rows (8+8+4)": alt.goalsB21.length + alt.goalsB22.length + alt.goalsC2.length === 20,
  "4 foundation layers + 4 detail panels": count(/aria-controls="fs-panel-/g) === 4 && count(/class="fs-detail"/g) === 4,
  "4 horizon blocks": count(/class="hblock-head"/g) === 4,
  "two governance layers": markup.includes("ACTIVE DAY 1") && markup.includes("DORMANT UNTIL DIAL-UP"),
  "Lane 2 empty at 3 months": count(/hlane2 empty/g) === 1,
  "fabric never dropped": markup.includes("agentic fabric") && markup.includes("Gate 0"),
  "landscape map present": count(/ls-item owner-/g) === 11,
  "commercial model present": markup.includes('id="commercials"') && markup.includes("Download Excel"),
  "FAQ present": markup.includes('id="faq"') && renderedText.includes("Customer Q&A map"),
  "presentation route covers menu": presentationMarkup.includes("Presentation mode") && missingPresentationLinks.length === 0,
  "presentation follows customer agenda": presentationMarkup.includes("Exec introduction + India presence") &&
    presentationMarkup.includes("Revised proposal, open Q&amp;A") &&
    presentationMarkup.includes("Operating model &amp; commercials"),
  "presentation includes leadership portraits": presentationMarkup.includes("Sanjay") &&
    presentationMarkup.includes("Managing Director, Publicis Sapient India") &&
    presentationMarkup.includes("Subject: Exec introduction + India presence") &&
    presentationMarkup.includes("Shubhra") &&
    presentationMarkup.includes("Global Chief Delivery Officer, Publicis Sapient") &&
    presentationMarkup.includes("Subject: People + Product Strategy, Organization Transformation, People Transformation"),
  "presentation cover includes Pandora brand imagery": presentationMarkup.includes("/pandora/model1.webp") &&
    presentationMarkup.includes("/pandora/model2.webp") &&
    presentationMarkup.includes("Transition with the brand in the room."),
  "presentation keeps Nexus and Fabric proof in journey": presentationMarkup.includes("113 activities") &&
    presentationMarkup.includes("4-phase model") &&
    presentationMarkup.includes("Agentic fabric at scale") &&
    presentationMarkup.includes("Fabric: graph, policy, evidence ledger"),
  "presentation includes journey until now": presentationMarkup.includes("May 2026") &&
    presentationMarkup.includes("August 2026") &&
    presentationMarkup.includes("September 2026") &&
    presentationMarkup.includes("1 October 2026") &&
    presentationMarkup.includes("Site Visit"),
  "presentation P03 mirrors revised approach": presentationMarkup.includes("P03 | 10:45 - 12:15") &&
    (presentationMarkup.match(/Same north star\. Safer adoption path\./g) || []).length >= 1 &&
    (presentationMarkup.match(/We run as-is first, stabilise, transform through maturity gates/g) || []).length >= 1 &&
    (presentationMarkup.match(/North star only after gates/g) || []).length >= 1 &&
    presentationMarkup.includes("View baseline") &&
    presentationMarkup.includes("Watch gated flow") &&
    presentationMarkup.includes("See dial in action") &&
    presentationMarkup.includes("Watch north star"),
  "presentation maturity baseline source": servicePlatforms.length === 17 &&
    maturityHorizons.some((horizon) => horizon.id === "now") &&
    maturityHorizons.some((horizon) => horizon.id === "m6"),
  "presentation proof modals available": (presentationMarkup.match(/Open proof/g) || []).length >= 3,
  "deleted standalone pages absent": !presentationMarkup.includes('id="nexus-proof"') &&
    !presentationMarkup.includes('href="#nexus-proof"') &&
    !presentationMarkup.includes('id="fabric-architecture"') &&
    !presentationMarkup.includes('href="#fabric-architecture"') &&
    !presentationMarkup.includes('id="revised-approach"') &&
    !presentationMarkup.includes('href="#revised-approach"'),
  "presentation page references available": presentationMarkup.includes("P00 | Presentation mode") &&
    presentationMarkup.includes("P01 | 9:45 - 11:00") &&
    presentationMarkup.includes("P02 | 10:45 - 12:15") &&
    presentationMarkup.includes("P03 | 10:45 - 12:15"),
  "presentation P02 includes post-RFP proof button": presentationMarkup.includes("Post-RFP discussion") &&
    presentationMarkup.includes("Ambition recalibrated") &&
    presentationMarkup.includes("Customer ask: alternative approach") &&
    (presentationMarkup.match(/Open proof/g) || []).length >= 3,
  "presentation deep links return": presentationMarkup.includes("from=presentation") &&
    presentationMarkup.includes("return="),
  "vercel presentation rewrite": vercelRewrites.some((rewrite) => rewrite.source === "/presentation" && rewrite.destination === "/index.html") &&
    vercelRewrites.some((rewrite) => rewrite.source === "/presentation/:path*" && rewrite.destination === "/index.html"),
  "no raw emphasis markers": !renderedText.includes("**")
};
const failed = Object.entries(structural).filter(([, ok]) => !ok);
if (failed.length > 0) {
  throw new Error("Structural assertions failed: " + failed.map(([name]) => name).join(" · "));
}

// Dist checks
const htmlPath = resolve(import.meta.dirname, "../dist/index.html");
const videoPath = resolve(import.meta.dirname, "../dist/video/gatedcontrol.mp4");
const agenticFabricVideoPath = resolve(import.meta.dirname, "../dist/video/agenticfabric.mp4");
const pandoraModel1Path = resolve(import.meta.dirname, "../dist/pandora/model1.webp");
const pandoraModel2Path = resolve(import.meta.dirname, "../dist/pandora/model2.webp");
const html = readFileSync(htmlPath, "utf8");
const size = statSync(htmlPath).size;
const videoSize = statSync(videoPath).size;
const agenticFabricVideoSize = statSync(agenticFabricVideoPath).size;
const pandoraModel1Size = statSync(pandoraModel1Path).size;
const pandoraModel2Size = statSync(pandoraModel2Path).size;
if (/(?:src|href)="http|url\(http/i.test(html)) throw new Error("Build is not self-contained");
if (/[\u00c2\u00c3]/.test(html)) throw new Error("Possible mojibake in built HTML");
if (!/data:image\/(?:webp|jpeg|png)/.test(html)) throw new Error("Build has no inlined presentation images");
if (!html.includes("/video/gatedcontrol.mp4")) throw new Error("Presentation video route missing from built HTML");
if (!html.includes("/video/agenticfabric.mp4")) throw new Error("Agentic fabric video route missing from built HTML");
if (!html.includes("/pandora/model1.webp") || !html.includes("/pandora/model2.webp")) {
  throw new Error("Pandora cover image routes missing from built HTML");
}
if (videoSize < 10_000) throw new Error(`Presentation video asset missing or too small: ${videoSize} bytes`);
if (agenticFabricVideoSize < 10_000) {
  throw new Error(`Agentic fabric video asset missing or too small: ${agenticFabricVideoSize} bytes`);
}
if (pandoraModel1Size < 5_000 || pandoraModel2Size < 5_000) {
  throw new Error(`Pandora cover assets missing or too small: ${pandoraModel1Size} / ${pandoraModel2Size} bytes`);
}
const budget = 1_200_000;
if (size > budget) throw new Error(`Build is ${size} bytes, over budget`);

console.log(
  `Alternative smoke passed: ${contentStrings.length} data strings render-verified, ` +
    `${Object.keys(structural).length} structural checks, dist ${size} bytes`
);
