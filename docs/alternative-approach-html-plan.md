# Alternative Approach → Interactive HTML — Build Plan
### Converting `alternative-approach-outline.md` into the journey app, with diagrams — due Thursday 10 Sep 2026

> **What this plan converts:** the full Alternative Approach outline (two lanes · 30-item scope dial · B.2/C.2 goal traceability · rebased horizons · honest trade-offs) **plus one narrative addition requested since the outline: Readiness Foundations** — the explicit prerequisites that must be true *before* anything agentic touches the estate.
>
> **The balance to hold on every page:** the agentic fabric is never dropped and never pushed. It is always visible as the destination (Lane 2, the dial's upper levels, the fabric sections that survive from the current app) — but every path to it now runs through foundations, evidence, and Pandora's own hand on the dial.

---

## 0. The new narrative element: Readiness Foundations (Gate 0)

The outline's gates said *what evidence unlocks autonomy*. This addition says something the customer will find even more reassuring: **the prerequisites themselves are work we do first, inside Lane 1** — so the gentle path isn't just cautious, it is *technically necessary and productive*.

Four foundation pillars, each with **assess → build → evidence** stages, together forming **Gate 0** (nothing agentic enters the estate until Gate 0 passes):

| Pillar | Assess (joint, months 1–3) | Build (months 3–9, inside Lane 1) | Gate-0 evidence |
|---|---|---|---|
| **Infrastructure & security maturity** | Security posture review: secrets/Key Vault hygiene, RBAC & network policy, environment isolation, audit-sink coverage, LLM gateway readiness | Close the found gaps; stand up the gateway + guardrails ("AI-ready ≠ AI-running" — this is also RFP goal B.2.2 #3, so it's paid-for scope, not overhead) | Security sign-off; gateway live with policy, logging, cost controls; audit sink proven end-to-end |
| **People & AI-tool fluency** | Skills baseline vs the RFP's own named gaps (K8s, Kafka, DevOps fundamentals) + AI-tool usage baseline | Copilot/Claude enablement (tools Pandora already approved — RFP goal C.2.2 #2), prompt literacy, training paths, champions seeded | Adoption + proficiency thresholds met (e.g. X% engineers active weekly, certified cohort); first Pandora-run retro on AI-assisted work |
| **Operations: trace & measure** | Observability baseline: tracing coverage, SLO coverage, runbook coverage, MTTA/MTTD/MTTR measurability, alert quality | Dashboards, SLOs, runbooks to 95%+; baselines banked (DORA, NPS 16, cost, ticket volumes) | *You cannot gate agents on evidence you cannot measure.* Trace/measure capability demonstrated on live incidents for a full quarter |
| **Governance readiness** | Decision-rights map, audit completeness check, risk appetite per domain | Risk-tier model (T0–T4), gate charter (W2 workshop artifact), decision records | Charter signed by Pandora owners; audit completeness ≥ threshold on Lane-1 operations |

Narrative framing (verbatim candidate): *"Before any agent acts in your estate, four things must already be true: the infrastructure and security posture can contain it, your people can supervise it, your operations can trace and measure it, and your governance can approve it. Lane 1 builds all four as a by-product of running the service well — which is why running as-is first isn't a delay on the agentic journey. It **is** the agentic journey's first leg."*

This reframes the whole alternative: **agentic-first wasn't just ambitious — it would have been premature.** The foundations must exist first, and most of them are already RFP scope.

---

## 1. Where it gets built

- **Vehicle:** the existing journey-site app (`developerportal/journey-site`) — React 19 + Vite, data-driven content in `journey.ts`, single-file build, data-derived smoke, publish script. The pipeline is proven; this is a content-model + section retrofit, not a new stack.
- **Evolve in place, same page** (recommended): the app is the living pursuit artifact; the pursuit's question has moved from *"how will you lead us"* to *"show us the alternative."* The fabric content (landscape map, capability readiness, fabric architecture, gates, governance) **survives inside the new narrative** as Lane-2 and Foundations material — nothing built is thrown away.
- **Publish target decision (open):** existing Artifact URL publishes from `pandav/docs/agentic-fabric-journey.html`; `publish.mjs` now points at `developerportal/agentic-fabric-journey.html` after the move. Default: point publish back at the pandav path to **keep the stakeholder URL stable**. Confirm at P0.

## 2. Asset inventory → section map (`pandav/docs/htmls`, 27 pages reviewed)

These are self-contained HTML diagram pages, each with its own styling — they **cannot be iframed or linked from inside the single-file artifact** (CSP + one-file distribution). Port strategy per asset: **[R] Redraw** as a data-driven SVG/JSX component in the app's design system (the proven pattern — fabric diagram, ops loop, hub already done this way) · **[M] Mine** for content/structure only · **[C] Companion** — optionally publish as a separate Artifact and link by URL (navigation links are allowed; only resource fetches are CSP-blocked).

| Asset | What it holds | Use | Feeds section |
|---|---|---|---|
| `rfp-transformation-roadmap.html` — *"From stable operations to agentic enablement"* | The exact arc of this narrative, pre-existing | **[R]** primary | §3 Two-lane spine |
| `rfp-what-are-we-solving.html` | One-slide problem summary | **[M]** | §1 What we heard / hero context |
| `rfp-devops-scope.html` + `rfp-data-integration-scope.html` — *"connected operating model"* | Scope items as a connected map | **[R]** | §5 Scope dial (the dial explorer's map view) |
| `rfp-data-platform-objectives.html` (B.2.1) · `rfp-integration-objectives.html` (B.2.2) · `rfp-devops-objectives.html` (C.2) | Objective-by-objective visuals — direct B.2/C.2 sources | **[M]** (+ selective [R]) | §5b Goal traceability |
| `pandav-data-workspace-usecase.html` + `pandav-data-mesh-light.html` | The <30-min workspace end-to-end story | **[R]** as the "dial in action" walkthrough | §5 dial example + §11 trade-offs |
| `rfp-paks-provisioning.html` | PAKS shared AKS / self-service / deploy | **[R]** as second dial walkthrough (L0→L1→L2 on one concrete service) | §5 dial example |
| `agentic-fabric-architecture.html` + `pandav-architecture-v3.html` | Fabric & system architecture | **[M]** — app already has a redrawn fabric diagram; enrich labels only | Lane-2 / fabric section |
| `pandav-governance-layer.html` + `pandav-graph-explorer.html` | Governance layer, access graph | **[M]** (+ [C] graph explorer as companion) | §10 Governance |
| `rfp-operational-model.html` + `rfp-operating-model-map.html` | Roles & operating model | **[M]** | §4 Run as-is / operating model |
| `rfp-agentic-migrations.html` | ADO→GitHub, OpsGenie→PagerDuty agentic migrations | **[M]** — reposition: factories at L0, agentic conversion as our internal L1 accelerant | §5 dial rows / §8 Technology |
| `rfp-slide7-flywheel.html` | Continuous-improvement flywheel | **[R]** small | Lane-2 engine visual (§3) |
| `token-cost-model-guide.html` · `slingshot-ai-journey.html` | Cost model; AI journey reference | **[M]** / **[C]** appendix | §12 Commercial |
| `rfp-developer-portal.html` · `pandav_vs_backstage_port.html` | Portal / IDP positioning | **[M]** appendix | §4 / appendix |
| `rfp-solution-architecture.html` · `rfp-overall-proposal.html` · `rfp-workstream-bridge-slides.html` · `rfp-devops-tooling-direction.html` | Overall architecture, proposal, bridges, tooling direction | **[M]** background | Various |

**Rule:** nothing gets iframed or screenshotted — redrawn visuals inherit the app's tokens so the page reads as one designed document, and every redrawn diagram is driven from `journey.ts` data (keeps the data-derived smoke authoritative).

## 3. Information architecture (new nav chapters × sections)

Five chapters, mirroring the outline's flow — fabric present throughout, never leading:

| Chapter | Sections (outline ref) | Signature visual |
|---|---|---|
| **The Ask** | Hero: their quote + the one idea (§1) · What changes vs July (§2, honesty table) | Their message as the opening quote; before/after coupling card |
| **The Model** | Two-lane model (§3) · **Readiness Foundations / Gate 0 (§0 above — NEW)** | Two-lane board over governance base-layer [R from transformation-roadmap]; foundations scorecard |
| **Run As-Is** | Day one Lane 1 (§4) · People/Tech/Ops as-is-first (§7–9) · Governance two layers (§10) | RFP-literal transition timeline; dormant-vs-active governance toggle |
| **The Dial** | 30-item scope dial (§5) · **B.2/C.2 goal traceability (§5b)** · Dial-in-action walkthroughs (workspace <30min, PAKS) | **The dial explorer** (interactive centrepiece); goal-traceability chips; two walkthrough strips |
| **The Journey & The Ask** | Horizons rebased (§6) · Cost of caution (§11) · Commercial (§12) · Low-risk proof (§13) · Pandora's part (§14) · Start (§15) · Ask (§16) | Horizon scrubber (survives, two-lane aware); two benefit curves; dial-review cadence |

**Surviving fabric sections (relocated, not removed):** the agentic landscape map (now under Foundations — "know your landscape before you adopt"), capability readiness ledger (now Lane-2 evidence: "the fabric is built and costs nothing to keep ready"), fabric architecture diagram (Lane-2 explainer), gates & autonomy tiers (now Gate 0 + Gates 1–3), operating-model hub (late-horizon view).

## 4. Interactivity specification (the "interactive with diagrams" ask)

1. **The Dial Explorer** (new flagship; implements the missing `ScopeMappingSection` that currently breaks the build):
   - 30 scope rows as cards/rows with a **three-position level indicator** (L0 as-is · L1 assisted · L2 agentic); filters by platform (DevOps / Data & Integration), by "needs which level for full RFP target", by horizon.
   - Clicking a row expands: day-1 conventional delivery, what each level changes, earliest horizon, gate required, B.2/C.2 goals it serves (cross-linked to §5b).
   - A global **"what if" toggle**: view the estate at "all dials at L0" vs "recommended dials by Sep 2027" — makes the choice tangible without prescribing it.
2. **Readiness Foundations scorecard**: four pillar cards with assess/build/evidence stages; a Gate-0 progress bar per pillar (illustrative positions, labelled as such); hovering evidence rows shows the measure and owner.
3. **Two-lane horizon scrubber**: existing scrubber, now driving a two-lane board — Lane 1 always shows delivery milestones; Lane 2 shows *nothing* at 3 mo (deliberate empty state: "nothing in your estate"), then gated entries.
4. **Goal traceability (B.2/C.2)**: filterable table — filter by "met at L0 / needs L1", by platform; headline counter (12/16 + 3/4) animates on view.
5. **Two benefit curves** (motion SVG): original vs alternative, with the delta annotated at each horizon.
6. **Governance layer toggle**: Layer 1 active / Layer 2 dormant visual that "activates" as you scrub past the first dial-up.
7. Retained: chapter nav + popovers, reading progress, reduced-motion compliance, hash deep-links (`#dial/paks`, `#goals/b21-1`).

## 5. Content model changes (`journey.ts` v2)

New typed exports (all smoke-covered automatically): `askContext` (customer quote, honesty table) · `twoLaneModel` (rules, lane definitions) · `readinessFoundations` (4 pillars × assess/build/evidence) · `scopeDial` (30 items × {level0, level1, level2, earliest, gate, goalsServed[]}) · `goalTraceability` (B.2.1[8] · B.2.2[8] · B.2.3 · C.2[4+2] with metAt/horizon/note) · `horizonsV2` (per-horizon × per-lane) · `costOfCaution` (target × level table + curve points) · `commercialWedge` · `proofPoints` (reused). Rebased or retired: current `lanes` milestones (rebased into Lane-1/Lane-2 split), `sapientCards` (survives, re-anchored), `navChapters` (new five chapters).

## 6. Phases & gates

| Phase | Work | Gate | Est. |
|---|---|---|---|
| **P0 Repair & decisions** | Fix red build (implement `ScopeMappingSection` stub → becomes Dial Explorer); repoint `publish.mjs` (decision); confirm calendar anchor + Thursday format (open decisions from outline) | Build green; publish target confirmed | ½ h + your answers |
| **P1 Content model v2** | All §5 data authored from the outline (30 dial items, 22 goal rows, 4 foundation pillars, horizons v2); smoke keeps passing on old page during authoring | Typecheck + data complete vs outline checklist | 2–3 h |
| **P2 Visual ports** | [R] items from the asset map: two-lane roadmap, connected scope maps, workspace + PAKS walkthroughs, flywheel; redrawn on tokens as data-driven components | Each visual renders from journey.ts data; CSP grep clean | 2–3 h |
| **P3 Section build** | New IA composition; relocate surviving fabric sections; Dial Explorer + Foundations scorecard + traceability table + curves | SSR structural assertions per section (counts: 30 dial rows, 22 goal rows, 4 pillars, 2 curves) | 3–4 h |
| **P4 Polish & verify** | Motion pass (reduced-motion), a11y (dial keyboard-operable), size budget ≤1.2 MB, smoke extended, cross-breakpoint check | All green; internal read-through against outline section map — every outline section present | 1–2 h |
| **P5 Deliverables** | `build:publish` + Artifact; extract the 10–12-slide email summary (from the same data, section screenshots or rebuilt slides); companion artifacts if chosen | Sent for internal review **Tue 8 Sep**; customer send Wed/Thu | 1–2 h |

Total ≈ 1.5–2 focused days — fits the Thursday deadline with Tuesday review margin.

## 7. Risks & guardrails

- **Message drift** — the page accidentally reads as "we retreated from agentic." Guardrail: the fabric appears in every chapter (destination in the hero, Lane 2 in the model, upper dial levels, Lane-2 horizon column, gates) and P4's read-through includes a tone check against outline §1's positioning discipline.
- **Scope bloat before Thursday** — the dial explorer can absorb infinite polish. Guardrail: L0/L1/L2 content is data-complete first (P1); interactivity beyond expand/filter/toggle is cut-line.
- **Old narrative loss** — current page answers a question stakeholders may still reference. Guardrail: tag the current build output as `journey-v1` in the repo before the retrofit; the Artifact version history also preserves it.
- **Two artifacts confusion** — if companion pages are published, name them clearly as appendices of the main page.

## 8. What I need from you before P1

1. The four open decisions from the outline: **calendar anchor** (Sep 2026 vs award-anchored) · **Thursday format** (recommend: HTML + short deck) · **commercials in/out** · **tone confirmation**.
2. Blessing for **evolve-in-place** (same page, same Artifact URL) vs a separate new page.
3. Any **Gate-0 thresholds** you want stated as numbers now (e.g. "X% engineers active on AI tooling") vs left as "agreed in W2" — outline default: illustrative numbers, labelled as opening positions.
