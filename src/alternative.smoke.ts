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
import { BoothVisitSite } from "./components/BoothVisitSite";
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
const siteWalkthroughMarkup = presentationMarkup.split('id="site-walkthrough"')[1]?.split('id="booth-walkthrough"')[0] || "";
const boothWalkthroughMarkup = presentationMarkup.split('id="booth-walkthrough"')[1]?.split('id="meet-your-team"')[0] || "";
const boothMarkup = renderToStaticMarkup(createElement(BoothVisitSite));
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
  "commercial section absent from main site": !markup.includes('id="commercials"') &&
    !markup.includes('href="#commercials"') &&
    !markup.includes("Commercials - restricted access") &&
    !markup.includes("Commercial cockpit"),
  "customer ask team model present": markup.includes("Customer ask operating model") &&
    markup.includes("34 FTE steady team with 24x7 on-call") &&
    markup.includes("Overall Engineering Lead") &&
    markup.includes("Kafka / Kong engineers") &&
    markup.includes("Base support + 24x7 on-call"),
  "team roster model present": markup.includes("24x7 roster model") &&
    markup.includes("The delivery engineers also take the night and weekend rota") &&
    markup.includes("There is no separate Ops L1 or night-shift team") &&
    markup.includes("Major incident layer") &&
    markup.includes("SME / burst pull-in") &&
    markup.includes("Two-week rota"),
  "team two-week rota defined": readFileSync(resolve(import.meta.dirname, "components/AltTeam.tsx"), "utf8")
    .includes("Representative two-week rota, including weekends") &&
    readFileSync(resolve(import.meta.dirname, "components/AltTeam.tsx"), "utf8")
      .includes("slot labels are replaced") &&
    readFileSync(resolve(import.meta.dirname, "components/AltTeam.tsx"), "utf8")
      .includes("Weekend cover uses the same engineering pool and primary / secondary pattern"),
  "skills model uses one engineering pool": markup.includes("One engineering pool across every column") &&
    markup.includes("One engineering team builds and runs from day one") &&
    markup.includes("How does the same engineer take a case from alert to lasting fix?") &&
    !markup.includes("When does a case move from Ops L1") &&
    !markup.includes("Extra L1 / incident command reserve"),
  "team capacity controls defined": readFileSync(resolve(import.meta.dirname, "components/AltTeam.tsx"), "utf8")
    .includes("Hidden capacity update screen") &&
    readFileSync(resolve(import.meta.dirname, "components/AltTeam.tsx"), "utf8")
      .includes("Extra Improve & Evolve engineers") &&
    readFileSync(resolve(import.meta.dirname, "components/AltTeam.tsx"), "utf8")
      .includes("Extra quarterly burst reserve"),
  "FAQ present": markup.includes('id="faq"') && renderedText.includes("Customer Q&A map"),
  "presentation route covers menu": presentationMarkup.includes("Pandora T&amp;SF - Site Visit") &&
    missingPresentationLinks.length === 0,
  "presentation follows customer agenda": presentationMarkup.includes("Meet &amp; Greet") &&
    presentationMarkup.includes("PS site walkthrough - team areas visit") &&
    presentationMarkup.includes("Client examples - booth walkthrough") &&
    presentationMarkup.includes("Exec intros - PS in India") &&
    presentationMarkup.includes("Commercials &amp; Team Model") &&
    presentationMarkup.includes("Exec closure - online meet"),
  "presentation agenda handout complete": presentationMarkup.includes("Pandora T&amp;SF - Site Visit") &&
    presentationMarkup.includes("ongoing RFP process to choose the right platform partner") &&
    (presentationMarkup.match(/Tea \/ Coffee Break/g) || []).length >= 2 &&
    presentationMarkup.includes("Lunch") &&
    readFileSync(resolve(import.meta.dirname, "components/PresentationSite.css"), "utf8").includes("A4 landscape"),
  "presentation cover agenda links": (presentationMarkup.match(/<a class="pres-agenda-row/g) || []).length >= 9 &&
    presentationMarkup.includes('href="#site-walkthrough"') &&
    presentationMarkup.includes('href="#booth-walkthrough"') &&
    presentationMarkup.includes('href="#commercial-model"') &&
    presentationMarkup.includes('href="#faq-close"'),
  "presentation slides return to agenda": (presentationMarkup.match(/class="pres-slide-agenda-link"/g) || []).length >= 12 &&
    presentationMarkup.includes('href="#presentation-start"') &&
    presentationMarkup.includes(">Agenda</a>"),
  "presentation generic tag rows removed": !presentationMarkup.includes("pres-talk-track") &&
    !presentationMarkup.includes("Named team shape") &&
    !presentationMarkup.includes("Presenter controlled"),
  "presentation P03 named meet team model": presentationMarkup.includes("P03 | 12:30 - 1:00") &&
    presentationMarkup.includes("Customer ask mapped to the org model.") &&
    presentationMarkup.includes("People Pandora will meet") &&
    presentationMarkup.includes("11 named specialists visible today.") &&
    presentationMarkup.includes("29 roles across lead, DevOps, Data and Integration") &&
    presentationMarkup.includes("18 role names still need to be confirmed") &&
    presentationMarkup.includes("Om Singh") &&
    presentationMarkup.includes("DevOps / AKS") &&
    presentationMarkup.includes("Integration") &&
    presentationMarkup.includes("SRE") &&
    presentationMarkup.includes("Manish Kukreti") &&
    presentationMarkup.includes("Reena Sharma") &&
    presentationMarkup.includes("Rajesh Sinha") &&
    presentationMarkup.includes("Vaibhav Chaturvedi") &&
    presentationMarkup.includes("Kalpesh to add") &&
    presentationMarkup.includes("Pandora on the wheel") &&
    presentationMarkup.includes("Overall engineering lead") &&
    presentationMarkup.includes("Om Singh identified") &&
    presentationMarkup.includes("8 DevOps engineers") &&
    presentationMarkup.includes("10 integration engineers + 1 QE + 1 BA") &&
    presentationMarkup.includes("7 data engineers + 1 BA") &&
    presentationMarkup.includes("SRE named coverage to confirm") &&
    readFileSync(resolve(import.meta.dirname, "components/PresentationSite.tsx"), "utf8").includes('view: "team-member"') &&
    readFileSync(resolve(import.meta.dirname, "components/PresentationSite.tsx"), "utf8").includes("Open mugshot for") &&
    readFileSync(resolve(import.meta.dirname, "components/PresentationSite.css"), "utf8").includes("pres-passport-card") &&
    readFileSync(resolve(import.meta.dirname, "components/PresentationSite.css"), "utf8").includes("--paper: #fff7fa"),
  "presentation includes leadership sessions": presentationMarkup.includes("Sanjay") &&
    presentationMarkup.includes("Managing Director, Publicis Sapient India") &&
    presentationMarkup.includes("Subject: Exec intros - PS in India") &&
    presentationMarkup.includes("Tilak Doddapaneni") &&
    presentationMarkup.includes("Executive Vice President and Global Head of Engineering at Publicis Sapient") &&
    presentationMarkup.includes("End-of-day executive session") &&
    presentationMarkup.includes("Tilak portrait") &&
    !presentationMarkup.includes("Shubhra"),
  "presentation cover includes Pandora brand imagery": presentationMarkup.includes("/pandora/model1.webp") &&
    presentationMarkup.includes("/pandora/model2.webp") &&
    presentationMarkup.includes("Site visit agenda") &&
    presentationMarkup.includes("Platform partner selection"),
  "presentation keeps Nexus and Fabric proof in journey": presentationMarkup.includes("113 activities") &&
    presentationMarkup.includes("4-phase model") &&
    presentationMarkup.includes("Agentic fabric at scale") &&
    presentationMarkup.includes("Fabric: graph, policy, evidence ledger"),
  "presentation includes journey until now": presentationMarkup.includes("May 2026") &&
    presentationMarkup.includes("August 2026") &&
    presentationMarkup.includes("September 2026") &&
    presentationMarkup.includes("1 October 2026") &&
    presentationMarkup.includes("Site Visit"),
  "presentation keeps agenda conductor pages": presentationMarkup.includes("P01 | 9:45 - 10:45") &&
    presentationMarkup.includes("Ravi Shankar") &&
    presentationMarkup.includes("India Retail CTO") &&
    presentationMarkup.includes("Pandora") &&
    presentationMarkup.includes("Optum") &&
    presentationMarkup.includes("Kingfisher") &&
    presentationMarkup.includes("B&amp;O") &&
    presentationMarkup.includes("Engage with team members") &&
    presentationMarkup.includes("Databricks") &&
    presentationMarkup.includes("medallion architecture") &&
    presentationMarkup.includes("Unity Catalog") &&
    presentationMarkup.includes("AKS cluster operations") &&
    presentationMarkup.includes("/cases/aso.jpg") &&
    presentationMarkup.includes("/cases/nissan.jpg") &&
    presentationMarkup.includes("/cases/optum.jpg") &&
    presentationMarkup.includes("/cases/pandora.jpg") &&
    presentationMarkup.includes("/cases/kingfisher.jpg") &&
    presentationMarkup.includes("/cases/bo.jpg") &&
    presentationMarkup.includes("Development + platform + operations") &&
    presentationMarkup.includes("Platform capabilities + operations") &&
    presentationMarkup.includes("Data platform + operations") &&
    presentationMarkup.includes("Kalpesh") &&
    presentationMarkup.includes("McDonalds") &&
    presentationMarkup.includes("Loreal") &&
    presentationMarkup.includes("Three booths. One operating model.") &&
    presentationMarkup.includes("/cases/mcdonalds.jpg") &&
    presentationMarkup.includes("/cases/loreal.jpg") &&
    presentationMarkup.includes("AI load reduction") &&
    presentationMarkup.includes("Adoption + shift-left") &&
    presentationMarkup.includes("/booth#booth-overview") &&
    presentationMarkup.includes("Meet The Team"),
  "Nissan case moves from P01 to P02": siteWalkthroughMarkup.includes("Customer case walkthrough: ASO + Optum") &&
    !siteWalkthroughMarkup.includes("Nissan") &&
    boothWalkthroughMarkup.includes("Booth 3") &&
    (boothWalkthroughMarkup.match(/class="pres-booth-card"/g) || []).length === 3 &&
    boothWalkthroughMarkup.includes("Nissan") &&
    boothWalkthroughMarkup.includes("/cases/nissan.jpg"),
  "presentation deep links curated for P01 and P02": presentationMarkup.includes("Scope: DevOps, Data, Integration") &&
    presentationMarkup.includes("Skills and knowledge transfer") &&
    presentationMarkup.includes("Proof and customer cases") &&
    presentationMarkup.includes("/booth#data-operating-model") &&
    presentationMarkup.includes("/booth#integration-operating-model") &&
    presentationMarkup.includes("/booth#paks-operations") &&
    presentationMarkup.includes("/booth#incident-reliability") &&
    !presentationMarkup.includes("McDonalds: DevOps operations") &&
    !presentationMarkup.includes("Loreal: Data platform management"),
  "presentation revised approach preserved": presentationMarkup.includes("P06 | 2:00 - 3:00") &&
    (presentationMarkup.match(/Same north star\. Safer adoption path\./g) || []).length >= 1 &&
    (presentationMarkup.match(/We run as-is first, stabilise, transform through maturity gates/g) || []).length >= 1 &&
    (presentationMarkup.match(/North star/g) || []).length >= 1 &&
    presentationMarkup.includes("View baseline") &&
    presentationMarkup.includes("Watch gated flow") &&
    presentationMarkup.includes("See dial in action") &&
    presentationMarkup.includes("Watch north star"),
  "presentation maturity baseline source": servicePlatforms.length === 17 &&
    maturityHorizons.some((horizon) => horizon.id === "now") &&
    maturityHorizons.some((horizon) => horizon.id === "m6"),
  "presentation P08 explains Lane 2 movement": presentationMarkup.includes("P08 | 2:00 - 3:00") &&
    presentationMarkup.includes("One item earns each step: L0, L1, then L2.") &&
    presentationMarkup.includes("Gate 0 · once for the estate") &&
    presentationMarkup.includes("L0 → L1: AI can assist") &&
    presentationMarkup.includes("L1 → L2: bounded agent action") &&
    presentationMarkup.includes("Named Pandora owner") &&
    presentationMarkup.includes("Human approval path proven") &&
    presentationMarkup.includes("Incident drill passed") &&
    presentationMarkup.includes("M0–M5 measures operational maturity") &&
    presentationMarkup.includes("Kafka connector"),
  "presentation P09 operating model": presentationMarkup.includes("P09 | 2:00 - 3:00") &&
    presentationMarkup.includes("One engineering team. A smarter way to run.") &&
    presentationMarkup.includes("Pandora retains: planning") &&
    presentationMarkup.includes("SMART operations layer") &&
    presentationMarkup.includes("Primary + secondary on-call") &&
    presentationMarkup.includes("Service management + governance across every step") &&
    presentationMarkup.includes("Work covered"),
  "presentation P10 commercial model": presentationMarkup.includes("P10 | 3:00 - 3:30") &&
    presentationMarkup.includes("Time &amp; Material") &&
    presentationMarkup.includes("Managed Services") &&
    presentationMarkup.includes("Outcome-based") &&
    presentationMarkup.includes("Requested TO-BE team") &&
    presentationMarkup.includes("One portfolio, different contracts") &&
    !presentationMarkup.includes("Net monthly model") &&
    !presentationMarkup.includes("EUR "),
  "presentation P11 engineering leadership": presentationMarkup.includes("P11 | 3:45 - 4:15") &&
    presentationMarkup.includes("Tilak closes with AI and innovation reassurance.") &&
    presentationMarkup.includes("AI, innovation and engineering confidence.") &&
    presentationMarkup.includes("Capability depth"),
  "presentation proof modals available": (presentationMarkup.match(/Open proof/g) || []).length >= 3,
  "deleted standalone pages absent": !presentationMarkup.includes('id="nexus-proof"') &&
    !presentationMarkup.includes('href="#nexus-proof"') &&
    !presentationMarkup.includes('id="fabric-architecture"') &&
    !presentationMarkup.includes('href="#fabric-architecture"') &&
    !presentationMarkup.includes('id="revised-approach"') &&
    !presentationMarkup.includes('href="#revised-approach"'),
  "presentation page references available": presentationMarkup.includes("<em>P00</em>") &&
    presentationMarkup.includes("P01 | 9:45 - 10:45") &&
    presentationMarkup.includes("P02 | 11:00 - 11:45") &&
    presentationMarkup.includes("P03 | 12:30 - 1:00") &&
    presentationMarkup.includes("P12 | 4:15 - 4:30"),
  "presentation journey includes post-RFP proof button": presentationMarkup.includes("Post-RFP discussion") &&
    presentationMarkup.includes("Ambition recalibrated") &&
    presentationMarkup.includes("Customer ask: alternative approach") &&
    (presentationMarkup.match(/Open proof/g) || []).length >= 3,
  "presentation deep links return": presentationMarkup.includes("from=presentation") &&
    presentationMarkup.includes("return="),
  "vercel presentation rewrite": vercelRewrites.some((rewrite) => rewrite.source === "/presentation" && rewrite.destination === "/index.html") &&
    vercelRewrites.some((rewrite) => rewrite.source === "/presentation/:path*" && rewrite.destination === "/index.html"),
  "booth walkthrough route": boothMarkup.includes("Booth walkthrough") &&
    boothMarkup.includes("01") &&
    boothMarkup.includes("12") &&
    boothMarkup.includes("Data Operating Model") &&
    boothMarkup.includes("Integration Operating Model") &&
    boothMarkup.includes("PAKS Operations") &&
    boothMarkup.includes("Developer Portal + Tooling") &&
    !boothMarkup.includes("B00"),
  "booth scope coverage": boothMarkup.includes("B.3.1") &&
    boothMarkup.includes("B.3.7") &&
    boothMarkup.includes("C.3.1") &&
    boothMarkup.includes("C.3.4") &&
    boothMarkup.includes("Generic page numbering"),
  "vercel booth rewrite": vercelRewrites.some((rewrite) => rewrite.source === "/booth" && rewrite.destination === "/index.html") &&
    vercelRewrites.some((rewrite) => rewrite.source === "/booth/:path*" && rewrite.destination === "/index.html"),
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
const omPortraitPath = resolve(import.meta.dirname, "../dist/teams/om.jpeg");
const execImagePaths = ["sanjay.webp", "shubhra.webp", "tilak.jpg"].map((file) => resolve(import.meta.dirname, "../dist/exec", file));
const caseImagePaths = [
  "aso.jpg",
  "nissan.jpg",
  "optum.jpg",
  "pandora.jpg",
  "kingfisher.jpg",
  "bo.jpg",
  "mcdonalds.jpg",
  "loreal.jpg"
].map((file) => resolve(import.meta.dirname, "../dist/cases", file));
const html = readFileSync(htmlPath, "utf8");
const size = statSync(htmlPath).size;
const videoSize = statSync(videoPath).size;
const agenticFabricVideoSize = statSync(agenticFabricVideoPath).size;
const pandoraModel1Size = statSync(pandoraModel1Path).size;
const pandoraModel2Size = statSync(pandoraModel2Path).size;
const omPortraitSize = statSync(omPortraitPath).size;
const execImageSizes = execImagePaths.map((path) => statSync(path).size);
const caseImageSizes = caseImagePaths.map((path) => statSync(path).size);
if (/(?:src|href)="http|url\(http/i.test(html)) throw new Error("Build is not self-contained");
if (/[\u00c2\u00c3]/.test(html)) throw new Error("Possible mojibake in built HTML");
if (!/data:image\/(?:webp|jpeg|png)/.test(html)) throw new Error("Build has no inlined presentation images");
if (!html.includes("/video/gatedcontrol.mp4")) throw new Error("Presentation video route missing from built HTML");
if (!html.includes("/video/agenticfabric.mp4")) throw new Error("Agentic fabric video route missing from built HTML");
if (!html.includes("/pandora/model1.webp") || !html.includes("/pandora/model2.webp")) {
  throw new Error("Pandora cover image routes missing from built HTML");
}
if (!html.includes("/exec/sanjay.webp") || !html.includes("/exec/shubhra.webp") || !html.includes("/exec/tilak.jpg")) {
  throw new Error("Presentation exec portrait routes missing from built HTML");
}
if (!html.includes("/teams/om.jpeg")) {
  throw new Error("Om team portrait route missing from built HTML");
}
if (
  !html.includes("/cases/aso.jpg") ||
  !html.includes("/cases/nissan.jpg") ||
  !html.includes("/cases/optum.jpg") ||
  !html.includes("/cases/kingfisher.jpg") ||
  !html.includes("/cases/bo.jpg") ||
  !html.includes("/cases/mcdonalds.jpg") ||
  !html.includes("/cases/loreal.jpg")
) {
  throw new Error("Case study brand image routes missing from built HTML");
}
if (videoSize < 10_000) throw new Error(`Presentation video asset missing or too small: ${videoSize} bytes`);
if (agenticFabricVideoSize < 10_000) {
  throw new Error(`Agentic fabric video asset missing or too small: ${agenticFabricVideoSize} bytes`);
}
if (pandoraModel1Size < 5_000 || pandoraModel2Size < 5_000) {
  throw new Error(`Pandora cover assets missing or too small: ${pandoraModel1Size} / ${pandoraModel2Size} bytes`);
}
if (execImageSizes.some((execImageSize) => execImageSize < 3_000)) {
  throw new Error(`Exec portrait assets missing or too small: ${execImageSizes.join(" / ")} bytes`);
}
if (omPortraitSize < 10_000) throw new Error(`Om portrait asset missing or too small: ${omPortraitSize} bytes`);
if (caseImageSizes.some((caseImageSize) => caseImageSize < 4_000)) {
  throw new Error(`Case study brand assets missing or too small: ${caseImageSizes.join(" / ")} bytes`);
}
const budget = 1_311_000;
if (size > budget) throw new Error(`Build is ${size} bytes, over budget`);

console.log(
  `Alternative smoke passed: ${contentStrings.length} data strings render-verified, ` +
    `${Object.keys(structural).length} structural checks, dist ${size} bytes`
);
