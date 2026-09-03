/**
 * Content model for "The Alternative Approach — Run As-Is First, Earn Agentic".
 * Source of truth: docs/alternative-approach-outline.md (journey-site/docs).
 * Anchor: contract award 30 Oct 2026 → horizons Jan 2027 · Apr 2027 · Oct 2027 · Oct 2028.
 * Positioning rule: the agentic fabric is always the destination, never the vehicle.
 */

export type HorizonId = "h3" | "h6" | "h12" | "h24";
export type DialLevel = 0 | 1 | 2;
export type Platform = "devops" | "data";

export const brand = "Pandora TS&F · The Alternative Approach";

export interface Horizon {
  id: HorizonId;
  months: string;
  short: string;
  date: string;
  stage: string;
}

export const horizons: Horizon[] = [
  { id: "h3", months: "3 months", short: "3 mo", date: "Jan 2027", stage: "Stabilise & assess" },
  { id: "h6", months: "6 months", short: "6 mo", date: "Apr 2027", stage: "Foundations proven" },
  { id: "h12", months: "12 months", short: "12 mo", date: "Oct 2027", stage: "Selective dial-ups" },
  { id: "h24", months: "24 months", short: "24 mo", date: "Oct 2028", stage: "Earned scale" }
];

export const navChapters = [
  { id: "ask-heard", label: "The Ask", sections: [
    { id: "hero-anchor", label: "What we heard", num: "01" },
    { id: "changes", label: "What changes vs July", num: "02" }
  ]},
  { id: "scopeC", label: "The Scope", sections: [
    { id: "scope", label: "Your scope of work — 30 items", num: "03" }
  ]},
  { id: "model", label: "The Model", sections: [
    { id: "twolane", label: "The two-lane model", num: "04" },
    { id: "foundations", label: "Readiness foundations — Gate 0", num: "05" },
    { id: "landscape", label: "Know the landscape", num: "06" }
  ]},
  { id: "runasis", label: "Run As-Is", sections: [
    { id: "dayone", label: "Day one: run as-is", num: "07" },
    { id: "lanes-asis", label: "People · Technology · Ops", num: "08" },
    { id: "governance", label: "Governance: two layers", num: "09" }
  ]},
  { id: "team", label: "The Team", sections: [
    { id: "team-shape", label: "One team, three locations", num: "10" },
    { id: "team-leader", label: "One leader · Pandora in control", num: "11" },
    { id: "team-converge", label: "Why two teams? Dev & ops converge", num: "12" },
    { id: "team-skills", label: "Skills & knowledge transfer", num: "13" },
    { id: "team-capacity", label: "Capacity that compounds", num: "14" }
  ]},
  { id: "dial", label: "The Dial", sections: [
    { id: "dial-explorer", label: "The 30-item dial", num: "15" },
    { id: "walkthroughs", label: "The dial in action", num: "16" },
    { id: "goals", label: "Your goals, covered", num: "17" }
  ]},
  { id: "journey", label: "The Journey", sections: [
    { id: "horizons", label: "Horizons, re-anchored", num: "18" },
    { id: "caution", label: "The cost of caution", num: "19" },
    { id: "proof", label: "Why this is low-risk", num: "20" },
    { id: "pandora", label: "Your part", num: "21" },
    { id: "start", label: "How we start", num: "22" }
  ]}
];

export const navSections = navChapters.flatMap((chapter) => chapter.sections);

// ── 01 · Hero / what we heard ────────────────────────────────────────────
export const hero = {
  kicker: "Pandora TS&F · Strategic Partner Selection 2027 · The requested alternative",
  headline: "Same destination. A gentler on-ramp.",
  question:
    "We would like to know if you can propose an alternative approach to the scope provided, as we found the current approach to be a bit ambitious.",
  attribution: "Your message after the platform deep-dive",
  ownership: "Thank you — this is exactly the right challenge, and a welcome one. In the deep dive we showed you the destination but not the road to it, so it read as if we would do all of it from day one. We are grateful for the chance to show the opposite.",
  lede:
    "Here is the road we did not show. We run your platforms as they run today — your tools, your processes, your SLAs, the RFP's own transition plan — from day one. The agentic fabric stays exactly where you liked it: the destination. Everything below is how we travel there, step by earned step, at your pace and only ever through gates you control.",
  oneLiner: "The fabric is never a dependency — only a dividend."
};

export const pillars = [
  {
    tag: "Lane 1",
    title: "Run & Deliver",
    role: "lane" as const,
    body: "Day-one as-is takeover on the RFP's own transition plan, tooling and SLAs. Zero change imposed on Pandora teams. Every scope item has a named conventional delivery path."
  },
  {
    tag: "Lane 2",
    title: "Improve & Evolve",
    role: "lane" as const,
    body: "The agentic fabric as the continuous-improvement engine. It touches the estate only after readiness gates pass — one scope item at a time, with Pandora holding every dial."
  },
  {
    tag: "Under both, from day one",
    title: "Governance",
    role: "base" as const,
    body: "Service governance live from day one. Agentic governance pre-built but dormant until the first dial-up. Controls always arrive before autonomy."
  }
];

// ── 02 · What changes vs July ────────────────────────────────────────────
export const changesTable = [
  ["Role of the agentic fabric", "Delivery mechanism for scope", "Continuous-improvement engine behind scope"],
  ["Scope coupling", "13 of 30 scope rows delivered \"via the fabric\"", "Zero scope rows depend on the fabric"],
  ["Day-1 change for Pandora teams", "New Teams front door, new patterns", "None — same tools, same processes"],
  ["Adoption decision", "Program-level", "Per scope item, per readiness gate, Pandora-held dial"],
  ["Governance on day 1", "Agentic governance active", "Service governance active; agentic governance dormant until first dial-up"],
  ["Prerequisites", "Assumed ready", "Assessed, then built inside Lane 1 — Gate 0 before anything agentic"],
  ["Benefits curve", "Steeper, earlier", "Slower start, same destination — the delta shown openly"]
] as const;

export const changesNote =
  "What does not change: the destination, the SLAs, the assets, the RFP commitments. The July approach remains available as the accelerated option — this alternative changes sequencing and coupling, nothing else.";

// ── 03 · Two-lane model ──────────────────────────────────────────────────
export const laneRules = [
  "Lane 1 meets every SLA using conventional means alone. Nothing agentic is ever load-bearing for an SLA until after it has passed its gate.",
  "Nothing crosses into the estate without a passed readiness gate, a named Pandora owner's sign-off, and a proven rollback.",
  "Every dial-up is reversible, and every dial position is reviewed quarterly inside the existing governance cadence."
];

export const laneDefinitions = [
  {
    id: "lane1",
    name: "Lane 1 · Run & Deliver",
    detail: "Transition, operations, migrations and platform engineering on Pandora's own tools and SLAs — the RFP delivered as written."
  },
  {
    id: "lane2",
    name: "Lane 2 · Improve & Evolve",
    detail: "The agentic fabric — Teams front door, agentic SDLC, agentic ops — held ready, entering per item only through gates and dials."
  }
];

// ── 04 · Readiness foundations (Gate 0) ──────────────────────────────────
export interface FoundationPillar {
  id: string;
  title: string;
  why: string;
  assess: string;
  build: string;
  evidence: string;
}

export const foundationsIntro =
  "Before any agent acts in your estate, four things must already be true: the infrastructure and security posture can contain it, your people can supervise it, your operations can trace and measure it, and your governance can approve it. Lane 1 builds all four as a by-product of running the service well — which is why running as-is first is not a delay on the agentic journey. It is the journey's first leg.";

export const foundationsPunchline =
  "Agentic-first would not just have been ambitious — it would have been premature. The foundations must exist first, and most of them are already RFP scope.";

export const foundationPillars: FoundationPillar[] = [
  {
    id: "infra",
    title: "Infrastructure & security maturity",
    why: "An agent is only as safe as the estate that contains it.",
    assess:
      "Joint security posture review in months 1–3: secrets and Key Vault hygiene, RBAC and network policy, environment isolation, audit-sink coverage, LLM gateway readiness.",
    build:
      "Close the found gaps inside Lane 1; stand up the LLM gateway with policy, logging and cost controls. AI-ready is not AI-running — and AI-ready infrastructure is one of your own stated goals, so this is paid-for scope, not overhead.",
    evidence:
      "Security sign-off · gateway live with policy, logging and cost controls · audit sink proven end to end."
  },
  {
    id: "people",
    title: "People & AI-tool fluency",
    why: "Agents need supervisors before they need autonomy.",
    assess:
      "Skills baseline against the RFP's own named gaps (Kubernetes, Kafka, DevOps fundamentals) plus an AI-tool usage baseline across teams.",
    build:
      "Copilot and Claude enablement — tools Pandora has already approved, and one of your own stated goals — with prompt literacy, training paths and champions seeded in delivery teams.",
    evidence:
      "Adoption and proficiency thresholds met (weekly-active share, certified cohort) · first Pandora-run retro on AI-assisted work."
  },
  {
    id: "ops",
    title: "Operations: trace & measure",
    why: "You cannot gate agents on evidence you cannot measure.",
    assess:
      "Observability baseline: tracing coverage, SLO coverage, runbook coverage, MTTA/MTTD/MTTR measurability, alert quality.",
    build:
      "Dashboards, SLOs and runbooks to 95%+ coverage; baselines banked — DORA, developer NPS (16), cost, ticket volumes — during transition.",
    evidence:
      "Trace-and-measure capability demonstrated on live incidents for a full quarter before any agentic ops discussion."
  },
  {
    id: "governance",
    title: "Governance readiness",
    why: "Autonomy without an approval model is just risk.",
    assess:
      "Decision-rights map, audit completeness check, risk appetite per domain — agreed with Security and Risk in the room.",
    build:
      "Risk-tier model (T0–T4), the gate charter authored by Pandora hands in workshop W2, and decision records as standard practice.",
    evidence:
      "Charter signed by named Pandora owners · audit completeness at threshold across a quarter of Lane-1 operations."
  }
];

export const gateZero = {
  title: "Gate 0 — the foundations gate",
  body:
    "Nothing agentic enters the estate until all four pillars show their evidence. Gate 0 is assessed jointly, passes once for the whole estate, and grants nothing automatically — it only makes dial-ups possible. It is the first of exactly three gate kinds: Gates 1 and 2 then pass per scope item. The dial stays in Pandora's hand."
};

// ── 03b · The gate series & terminology ─────────────────────────────────
export const gateSeries = [
  {
    id: "g0",
    name: "Gate 0 · Foundations",
    scope: "Passes once, estate-wide",
    unlocks: "Makes any dial-up possible at all",
    evidence: "All four foundation pillars show their evidence: infra & security posture, people AI-fluency, ops trace-and-measure, governance readiness."
  },
  {
    id: "g1",
    name: "Gate 1 · Assist",
    scope: "Passes per scope item",
    unlocks: "L0 → L1 for that item",
    evidence: "Named Pandora owner · audit on for the flow · human-approval path proven · rollback demonstrated."
  },
  {
    id: "g2",
    name: "Gate 2 · Agentic",
    scope: "Passes per scope item",
    unlocks: "L1 → L2 for that item",
    evidence: "Assist track record at L1 · incident drill passed unaided · SLOs held · evaluation pass-rate at threshold."
  }
];

export const gatesAnswer =
  "Are more gates coming? No. Three gate kinds is the whole system: Gate 0 passes once for the estate; Gates 1 and 2 pass per item. Every gate has a named owner, written evidence criteria, and a reversible outcome — and no calendar date ever substitutes for a gate.";

export const terminology = [
  ["Lane 1 · Run & Deliver", "The as-is managed service: your tools, your SLAs, the RFP delivered as written. Active from day one, never dependent on Lane 2."],
  ["Lane 2 · Improve & Evolve", "The agentic fabric, held ready. Enters the estate only through gates, one scope item at a time."],
  ["L0 · L1 · L2", "The three service levels on every scope item: run as-is · AI-assisted (human executes) · agentic (bounded loop behind approvals)."],
  ["Gate 0 · 1 · 2", "The three gate kinds: foundations (once, estate-wide) · assist gate (per item, unlocks L1) · agentic gate (per item, unlocks L2)."],
  ["The dial", "Each scope item's level setting. All 30 start at L0; only Pandora turns a dial, and only after the gates for that move have passed."],
  ["Dial review", "The quarterly 30-minute agenda item in existing governance where every dial position is confirmed, changed — or explicitly kept at \"not yet\"."]
] as const;

// ── 06 · Day one: run as-is ──────────────────────────────────────────────
export const transitionPlan = [
  {
    phase: "Phase I · Support team",
    window: "Days 0–60 · Nov–Dec 2026",
    detail: "Full support team hired in; on-parallel shadow of current teams; knowledge acquisition and tooling; handling P3–P5. Bi-weekly readiness assessments throughout."
  },
  {
    phase: "Phase I · Autonomous",
    window: "Day 60+ · from late Dec 2026",
    detail: "Full on-call rotation live; P1/P2 ownership; monthly on-call quality evaluation against SLA/SLO."
  },
  {
    phase: "Phase II · Dev team",
    window: "Days 60–120 · Jan–Feb 2027",
    detail: "Full dev teams hired in; shadow; knowledge handover; feature development and system operation."
  },
  {
    phase: "Phase II · Autonomous",
    window: "Day 120+ · from Mar 2027",
    detail: "Proficient in all dev/ops tasks; proactively lifting quality and delivery efficiency; monthly performance review. Cutover on a 50+ parameter readiness assessment, agreed jointly on evidence."
  }
];

export const dayOneFacts = [
  { label: "Tooling", value: "Pandora's own table, unchanged: ServiceNow, New Relic, PagerDuty and GitHub (migrations in flight), Terraform, Jira/Confluence, Port.io." },
  { label: "SLAs", value: "The RFP's own numbers: P1 15-minute acknowledgement / 1.5h RTO · 99.99% mission-critical · error budgets per tier." },
  { label: "RACI", value: "The RFP boundary, unchanged: Pandora retains Lead and Senior Engineers, architecture, standards and roadmap; we run day-to-day." },
  { label: "Migrations", value: "Conventional migration factories: ADO→GitHub, OpsGenie→PagerDuty, Backstage→Port.io, and the BizTalk/EDW/Synapse strangler — playbooks, conversion tooling, cutover evidence." },
  { label: "The only AI on day one", value: "Inside our own delivery team (Claude, GitHub Copilot — tools Pandora already approved). It runs on our machines and pipelines, not in your estate, and needs no governance surface on your side." }
];

// ── 07 · People / Technology / Ops as-is-first ───────────────────────────
export const asIsLanes = [
  {
    id: "people",
    title: "People — as-is first",
    points: [
      "Day-one staffing is conventional roles per the RFP's resource asks — Kafka, Databricks, Kong, Kubernetes, Terraform engineers; DevOps and JS profiles — through the proven talent model: selection panels, buddy onboarding, quarterly talent reviews.",
      "Enablement targets the RFP's named gaps (Kubernetes, Kafka, DevOps fundamentals) — valuable regardless of any agentic future.",
      "Agent-supervisor skills, champions and a CoE are introduced only as dials turn."
    ],
    message: "No Pandora engineer's job changes on day one. Capability grows by invitation."
  },
  {
    id: "technology",
    title: "Technology — as-is first",
    points: [
      "Conventional automation first: runbooks, golden paths, IaC, dashboards — the unglamorous 80% of the value.",
      "Migrations as factories, not agents — wave plans, conversion playbooks, cutover evidence.",
      "The fabric sits on the shelf, already built and proven — Pandav on a standard container, skills-as-files in Git, zero net-new infrastructure. Keeping the option open costs nothing."
    ],
    message: "We are not asking you to fund an option. It already exists."
  },
  {
    id: "ops",
    title: "Operations — as-is first",
    points: [
      "ITIL discipline on the RFP's SLAs, human on-call, MTTA/MTTD/MTTR measurement from day one.",
      "Toil falls first through conventional automation; the trace-and-measure foundation (Gate 0, pillar three) is built here.",
      "Agentic ops, if and when dialled, arrives read-only first, then drafted-RCA, then gated runbooks — each step behind its own gate."
    ],
    message: "SLAs are never hostage to novelty."
  }
];

// ── 08 · Governance: two layers ──────────────────────────────────────────
export const governanceLayers = [
  {
    id: "service",
    name: "Layer 1 · Service governance",
    sub: "active from day one",
    state: "ACTIVE DAY 1",
    items: [
      "Weekly delivery forum (delivery and engineering leads, both sides)",
      "Monthly Engineering-Manager → vendor-manager performance feedback",
      "Escalation paths and joint incident/problem management",
      "Service reviews: reliability, adoption, developer experience, cost, improvement backlog"
    ]
  },
  {
    id: "agentic",
    name: "Layer 2 · Agentic governance",
    sub: "pre-built, dormant until the first dial-up",
    state: "DORMANT UNTIL DIAL-UP",
    items: [
      "Agent registry, intent catalogue and model catalogue — prepared as templates during Lane-1 quarters",
      "Risk-tiered autonomy model T0–T4 — action rights by risk, reversibility and environment",
      "Full audit trail design: every request, context package, approval, tool call and output traceable",
      "Evaluation scorecards and AI FinOps — activated with the first estate touch, never before"
    ]
  }
];

export const dialReview =
  "The standing mechanism that joins the two layers: a quarterly dial review inside the existing monthly-governance cadence — every scope item's level, its evidence status, and any proposed change, decided by Pandora. Saying \"not yet\" carries zero consequence.";

// ── 09 · The scope dial (30 items) ───────────────────────────────────────
export interface DialItem {
  id: string;
  platform: Platform;
  name: string;
  level0: string;
  level1: string;
  level1H?: string;
  level2: string;
  level2H?: string;
  sourceNo: number;
  deliveredBy: string;
  scopeDesc: string;
  targetNeedsLevel: DialLevel;
  goals?: string[];
}

export const dialLevels = [
  { level: 0, name: "Run as-is", detail: "Conventional delivery, named solution, SLA-bound. The default — forever, if Pandora chooses." },
  { level: 1, name: "AI-assisted", detail: "AI drafts and recommends inside the existing process; a human executes every action. No new estate infrastructure; audit on. Unlocked per item by Gate 1 (after Gate 0)." },
  { level: 2, name: "Agentic", detail: "The fabric owns a bounded loop behind approval gates. Unlocked per item by Gate 2 — never before a proven L1 track record." }
] as const;

export const scopeDial: DialItem[] = [
  // ── DevOps (13) ──
  { id: "paks", platform: "devops", name: "PAKS: Kubernetes, self-service namespaces, provisioning", sourceNo: 1, deliveredBy: "PAKS, Teams agent, graph policy, Terraform/GitOps recipes", scopeDesc: "Operate the shared AKS platform as namespace-as-a-service — onboarding, quotas, isolation and self-service provisioning.",
    level0: "Operate AKS per the RFP operating model; namespace-as-a-service via Terraform/GitOps and ServiceNow requests; human fulfilment.",
    level1: "Teams request front-door drafts the change; a human approves and applies.", level1H: "Apr 2027",
    level2: "Auto-provisioning within quota policy.", level2H: "Oct 2027+", targetNeedsLevel: 0, goals: ["DevOps 01"] },
  { id: "paks-opmodel", platform: "devops", name: "Operating model for PAKS & portal", sourceNo: 2, deliveredBy: "Platform operating model, ServiceNow, SLOs, on-call workflows", scopeDesc: "The service operating model for PAKS and the developer portal — ITIL operations, SLOs, 24/7 on-call and incident workflows.",
    level0: "ITIL operations, ServiceNow, SLOs, human 24/7 on-call.",
    level1: "AI triage summaries and runbook suggestions to the on-call human.", level1H: "Apr 2027",
    level2: "Agentic ops executes approved reversible runbooks.", level2H: "Oct 2027+", targetNeedsLevel: 0 },
  { id: "ado-github", platform: "devops", name: "ADO → GitHub foundation", sourceNo: 3, deliveredBy: "GitHub migration factory, repo/pipeline conversion skills", scopeDesc: "Migrate source control and pipelines from Azure DevOps to GitHub, the foundation for a modern AI-assisted development workflow.",
    level0: "Conventional migration factory: repo and pipeline conversion playbooks, wave plan, cutover evidence.",
    level1: "Our team's AI-assisted pipeline conversion — internal to us, from day one.", level1H: "internal, day 1",
    level2: "n/a — one-time project.", targetNeedsLevel: 0, goals: ["DevOps 02", "Migrations in flight"] },
  { id: "observability", platform: "devops", name: "End-to-end observability", sourceNo: 4, deliveredBy: "New Relic, SLO dashboards, alert triage, runbook automation", scopeDesc: "Build end-to-end observability flows that show business processes at a glance across organizational domains and applications.",
    level0: "New Relic dashboards, SLOs, alert routing, human triage, documented runbooks.",
    level1: "AI-drafted RCA and alert-correlation summaries.", level1H: "Apr–Oct 2027",
    level2: "Agentic ops signal-to-runbook loop.", level2H: "Oct 2027+", targetNeedsLevel: 0, goals: ["DevOps 03"] },
  { id: "devex-idp", platform: "devops", name: "DevEx & onboarding through a single IDP", sourceNo: 5, deliveredBy: "Developer portal, Teams front door, graph-backed access", scopeDesc: "Cut developer friction with golden paths, self-service environments, fast feedback loops and a single internal developer portal.",
    level0: "Port.io portal, golden-path docs, conventional joiner-mover-leaver process.",
    level1: "Teams front-door assist for requests, human-approved.", level1H: "Apr–Oct 2027",
    level2: "Graph-backed automated access provisioning.", level2H: "Oct 2027+", targetNeedsLevel: 1, goals: ["DevOps 04"] },
  { id: "helios-port", platform: "devops", name: "Helios → Port.io migration", sourceNo: 6, deliveredBy: "Port.io, catalog migration, scorecards, ownership graph", scopeDesc: "Migrate the internal developer portal from Backstage (Helios) to Port.io — catalogue, scorecards and self-service actions.",
    level0: "Conventional migration: catalogue, scorecards, integrations.",
    level1: "Catalogue enrichment assisted (internal).", level1H: "internal",
    level2: "n/a — one-time project.", targetNeedsLevel: 0, goals: ["Migrations in flight"] },
  { id: "tool-decisions", platform: "devops", name: "Tool selection decisions", sourceNo: 7, deliveredBy: "Governance board, graph evidence, decision records", scopeDesc: "Resolve open tooling decisions through a governance board — including code-quality and security scanning (Snyk vs GitHub Advanced Security).",
    level0: "Governance board, structured decision records, evaluations (e.g. Snyk vs GitHub Advanced Security).",
    level1: "Evidence packs auto-drafted from estate data.", level1H: "Oct 2027",
    level2: "n/a — decisions stay human.", targetNeedsLevel: 0, goals: ["Open decisions"] },
  { id: "opsgenie-pagerduty", platform: "devops", name: "OpsGenie → PagerDuty migration", sourceNo: 8, deliveredBy: "PagerDuty migration factory, on-call policy, incident workflows", scopeDesc: "Migrate incident management from OpsGenie to PagerDuty — on-call policies, escalation and incident workflows.",
    level0: "Conventional migration factory: on-call policies, escalation, incident workflows.",
    level1: "—", level2: "n/a — one-time project.", targetNeedsLevel: 0, goals: ["Migrations in flight"] },
  { id: "dora-nps", platform: "devops", name: "DORA & developer-NPS improvement", sourceNo: 9, deliveredBy: "DORA dashboards, agentic SDLC, DevEx measurement loop", scopeDesc: "Improve delivery performance against DORA metrics and raise developer experience from the current NPS of 16.",
    level0: "DORA dashboards, DevEx surveys, conventional improvement backlog.",
    level1: "AI dev tooling for Pandora engineers — Copilot and Claude, already approved.", level1H: "Jan–Apr 2027",
    level2: "Agentic SDLC on CI.", level2H: "Oct 2027+", targetNeedsLevel: 1, goals: ["DevOps 02", "DevEx targets"] },
  { id: "transition-ci", platform: "devops", name: "Transition & continuous improvement", sourceNo: 10, deliveredBy: "Improvement backlog, ServiceNow evidence, improvement cadence", scopeDesc: "Run the phased transition and a continuous-improvement backlog, proactively surfacing risks and opportunities.",
    level0: "The RFP transition plan; monthly improvement cadence.",
    level1: "Improvement backlog mined from tickets and telemetry.", level1H: "Apr–Oct 2027",
    level2: "Fabric-run improvement loop.", level2H: "Oct 2028", targetNeedsLevel: 0 },
  { id: "k8s-devtools", platform: "devops", name: "K8s / DevTools provisioning & support", sourceNo: 11, deliveredBy: "PAKS, GitHub Actions, runners, secrets, certs, IaC recipes", scopeDesc: "Provision and support Kubernetes and developer tooling — GitHub Actions, shared runners, secrets, certificates and IaC recipes.",
    level0: "Runbooks, GitHub Actions, runners, secrets, certificates, IaC recipes; human fulfilment.",
    level1: "Drafted changes via the request front door.", level1H: "Apr–Oct 2027",
    level2: "Self-service auto-fulfilment within policy.", level2H: "Oct 2027+", targetNeedsLevel: 0 },
  { id: "cost-devops", platform: "devops", name: "Cost transparency for the DevOps estate", sourceNo: 12, deliveredBy: "FinOps dashboards, ownership graph, budget alerts", scopeDesc: "Provide FinOps cost transparency for the DevOps estate — consumption and spend reporting, ownership and budget alerts.",
    level0: "FinOps dashboards, tagging discipline, budget alerts.",
    level1: "Cost-anomaly narratives and right-sizing drafts.", level1H: "Apr–Oct 2027",
    level2: "Automated right-sizing within guardrails.", level2H: "Oct 2028", targetNeedsLevel: 0 },
  { id: "security-decisions", platform: "devops", name: "Security, AI-platform & code-quality decisions", sourceNo: 13, deliveredBy: "Governance workflow, GitHub Advanced Security, policy gates", scopeDesc: "Maintain security posture and code-quality gates to Pandora standards, in coordination with the dedicated Security team.",
    level0: "Governance workflow, GHAS/Snyk evaluation, policy gates in CI.",
    level1: "Policy-gap findings drafted by AI.", level1H: "Oct 2027",
    level2: "n/a — decisions stay human.", targetNeedsLevel: 0, goals: ["Open decisions"] },
  // ── Data & Integration (17) ──
  { id: "workspace-30min", platform: "data", name: "Data-product workspace in under 30 minutes", sourceNo: 1, deliveredBy: "Teams agent, graph policy, ServiceNow, Databricks/Olympus recipes", scopeDesc: "Provision a new data-product workspace in under 30 minutes, without platform-engineer involvement.",
    level0: "Templated Terraform/Databricks provisioning via ServiceNow — days become hours, engineer approves.",
    level1: "Teams-agent request with human approval — this is where the sub-30-minute target lands.", level1H: "Apr–Oct 2027",
    level2: "Fully automated within policy.", level2H: "Oct 2027+", targetNeedsLevel: 1, goals: ["Data 01"] },
  { id: "nexus-unity", platform: "data", name: "Nexus → Unity Catalog flow", sourceNo: 2, deliveredBy: "Nexus, Kafka, Delta, Unity Catalog, OpenMetadata", scopeDesc: "Give teams near-real-time access to Nexus event data through Unity Catalog.",
    level0: "Conventional engineering: Kafka-to-Delta connectors, schema mapping.",
    level1: "Migration code assisted (internal, day 1).", level1H: "internal",
    level2: "—", targetNeedsLevel: 0, goals: ["Data 02"] },
  { id: "productionize", platform: "data", name: "Productionize pipelines & dashboards fast", sourceNo: 3, deliveredBy: "Agentic SDLC, reusable pipelines, data-product templates", scopeDesc: "Rapidly productionize new dashboards and data pipelines — and changes to them.",
    level0: "Reusable pipeline templates, data-product patterns, CI — weeks become same-day.",
    level1: "Assisted authoring, human-merged — the sub-hour mile.", level1H: "Apr–Oct 2027",
    level2: "Ticket-to-PR loops post-gate.", level2H: "Oct 2027+", targetNeedsLevel: 1, goals: ["Data 05"] },
  { id: "observe-triage", platform: "data", name: "Observe & triage data platforms", sourceNo: 4, deliveredBy: "Agentic Ops, New Relic, OpenMetadata lineage, platform telemetry", scopeDesc: "Observe the health and metrics of deployed dashboards and pipelines, and triage when issues arise.",
    level0: "New Relic + OpenMetadata lineage dashboards; human triage.",
    level1: "AI triage and RCA drafts.", level1H: "Apr–Oct 2027",
    level2: "Agentic ops.", level2H: "Oct 2027+", targetNeedsLevel: 0, goals: ["Data 06"] },
  { id: "cost-showback", platform: "data", name: "Cost transparency & showback", sourceNo: 5, deliveredBy: "FinOps dashboards, graph ownership, Databricks/Power BI cost tags", scopeDesc: "Provide granular cost transparency with proactive alarms when costs rise beyond a set threshold.",
    level0: "Databricks/Power BI cost tags, ownership tagging, dashboards, threshold alarms.",
    level1: "Anomaly narratives.", level1H: "Apr–Oct 2027",
    level2: "Guardrailed optimisation.", level2H: "Oct 2028", targetNeedsLevel: 0, goals: ["Data 07"] },
  { id: "governance-layer", platform: "data", name: "Single governance layer", sourceNo: 6, deliveredBy: "Graph + Unity Catalog + OpenMetadata + ServiceNow evidence", scopeDesc: "Let teams discover, understand and trust data through a single governance layer.",
    level0: "Unity Catalog + OpenMetadata rollout with a stewardship process.",
    level1: "Metadata enrichment assisted.", level1H: "Oct 2027",
    level2: "—", targetNeedsLevel: 0, goals: ["Data 03"] },
  { id: "open-format", platform: "data", name: "Open data format, centralized storage", sourceNo: 7, deliveredBy: "Delta, ADLS Gen2, open table patterns", scopeDesc: "Provide centralized data storage with an open data format for processing and analytics.",
    level0: "Delta / ADLS Gen2 open-table patterns — pure engineering.",
    level1: "n/a", level2: "n/a — never needs a dial.", targetNeedsLevel: 0, goals: ["Data 04"] },
  { id: "eng-standards", platform: "data", name: "Engineering standards for integration", sourceNo: 8, deliveredBy: "SDLC standards, Kong/Nexus templates, governed recipes", scopeDesc: "Establish industry-leading engineering standards for integration — end-to-end automation and self-service.",
    level0: "Standards, Kong/Nexus templates, code-review discipline, CI enforcement.",
    level1: "Standards-compliance review assist — the full self-service mile.", level1H: "Apr–Oct 2027",
    level2: "—", targetNeedsLevel: 1, goals: ["Integration 01"] },
  { id: "kong-portal", platform: "data", name: "Kong API portal & discoverability", sourceNo: 9, deliveredBy: "Kong/Pong, API catalog, graph-backed ownership", scopeDesc: "Stand up the Kong API developer portal and standardize APIs — design, documentation, discoverability and governance.",
    level0: "Kong developer portal, API catalogue, ownership records, design governance.",
    level1: "Catalogue enrichment.", level1H: "Oct 2027",
    level2: "—", targetNeedsLevel: 0, goals: ["Integration 07"] },
  { id: "ai-ready-infra", platform: "data", name: "AI-ready infrastructure for agents", sourceNo: 10, deliveredBy: "LLM gateway, graph memory, approved tool recipes", scopeDesc: "Provide AI-ready infrastructure on the event backbone, extensible to agentic and real-time AI use cases.",
    level0: "LLM gateway + guardrail design — prepared, not switched on. AI-ready is not AI-running.",
    level1: "Gateway serving assist use cases.", level1H: "Apr 2027",
    level2: "The fabric itself.", level2H: "Oct 2027–Oct 2028", targetNeedsLevel: 0, goals: ["Integration 03"] },
  { id: "ingestion", platform: "data", name: "Flexible ingestion patterns", sourceNo: 11, deliveredBy: "Nexus, Kafka, batch/micro-batch/event ingestion templates", scopeDesc: "Support flexible Kafka ingestion — real-time streaming, batch micro-ingestion and event-driven triggers.",
    level0: "Batch, micro-batch and event templates on Nexus/Kafka.",
    level1: "Template authoring assist (internal).", level1H: "internal",
    level2: "—", targetNeedsLevel: 0, goals: ["Integration 06"] },
  { id: "data-mart", platform: "data", name: "Real-time + relaxed-latency data mart", sourceNo: 12, deliveredBy: "Kafka, Databricks, Delta pipelines, SLO monitoring", scopeDesc: "Provide a reliable data mart supporting real-time, low-latency and relaxed-latency use cases.",
    level0: "Kafka / Databricks / Delta engineering with SLO monitoring.",
    level1: "—", level2: "—", targetNeedsLevel: 0, goals: ["Integration 02"] },
  { id: "no-data-loss", platform: "data", name: "No data loss / lifecycle transparency", sourceNo: 13, deliveredBy: "Kafka DQ, reconciliation checks, lineage, observability", scopeDesc: "Ensure no data loss and full transparency across the end-to-end data lifecycle.",
    level0: "DQ reconciliation checks, lineage, observability.",
    level1: "Reconciliation-gap analysis assist.", level1H: "Oct 2027",
    level2: "—", targetNeedsLevel: 0, goals: ["Integration 04"] },
  { id: "ai-onboarding", platform: "data", name: "AI-ready onboarding & availability", sourceNo: 14, deliveredBy: "Teams-based onboarding, graph, SLOs, runbook automation", scopeDesc: "Provide AI-ready onboarding and high availability for data-platform users.",
    level0: "Documented onboarding + ServiceNow flows, SLOs.",
    level1: "Teams-based onboarding assist.", level1H: "Apr–Oct 2027",
    level2: "Graph-driven onboarding.", level2H: "Oct 2027+", targetNeedsLevel: 0 },
  { id: "kafka-dq", platform: "data", name: "Data quality on Kafka", sourceNo: 15, deliveredBy: "Kafka schema checks, DQ gates, quarantine patterns", scopeDesc: "Enforce data quality on Kafka — completeness, accuracy, consistency and schema compliance before downstream consumption.",
    level0: "Schema checks, DQ gates, quarantine patterns.",
    level1: "DQ-rule drafting from samples.", level1H: "Oct 2027",
    level2: "—", targetNeedsLevel: 0, goals: ["Integration 05"] },
  { id: "biztalk", platform: "data", name: "Decommission BizTalk", sourceNo: 16, deliveredBy: "Migration factory, strangler pattern, ServiceNow audit", scopeDesc: "Decommission Microsoft BizTalk by next year, while retaining the competency to operate it during migration.",
    level0: "Strangler migration factory — plus the action plan and budget the RFP says do not exist yet, delivered in the first 90 days.",
    level1: "Conversion assist (internal, day 1).", level1H: "internal",
    level2: "—", targetNeedsLevel: 0, goals: ["Integration 08", "Migration strategy"] },
  { id: "synapse-exit", platform: "data", name: "Synapse / EDW exit", sourceNo: 17, deliveredBy: "Synapse-to-Databricks migration factory, validation and cutover evidence", scopeDesc: "Decommission the legacy EDW and Azure Synapse, reducing data-infrastructure cost by around 20%.",
    level0: "Migration factory: Synapse-to-Databricks, validation, cutover evidence.",
    level1: "Conversion assist (internal, day 1).", level1H: "internal",
    level2: "—", targetNeedsLevel: 0, goals: ["Data 08", "Migration strategy"] }
];

export const dialSource =
  "These 30 items are your scope of work — 13 DevOps and 17 Data & Integration items — taken directly from the platform deep-dive scope mapping. Nothing is added and nothing is dropped: we only make the service level of each item something you dial. Open any item to see what it is, where it sits in your scope, the named solution that delivers it, and the stated objective it serves.";

export const platformLabels: Record<Platform, { label: string; total: number }> = {
  devops: { label: "DevOps platform", total: 13 },
  data: { label: "Data & Integration platform", total: 17 }
};

export const dialNote =
  "Every item starts at Level 0 and stays there until Pandora turns its dial. Roughly a third of items never need Level 2 at all — which is precisely what proves the dial is real. \"(earliest)\" horizons are offers, not schedule: each requires Gate 0, its own gate, and a named Pandora owner's sign-off.";

// ── 10 · Walkthroughs (dial in action) ───────────────────────────────────
export const walkthroughs = [
  {
    id: "workspace",
    title: "Data-product workspace — the <30-minute story",
    steps: [
      { level: "Level 0 · from Jan 2027", text: "Templated Terraform + Databricks via a ServiceNow request. Days become hours. A platform engineer still approves and applies." },
      { level: "Level 1 · earliest Apr–Oct 2027", text: "The request moves to Teams; Pandav assembles context from the graph, policy decides the route, a human approves — provisioning completes in under 30 minutes with an engineer touching only the approval. The RFP target lands here." },
      { level: "Level 2 · earliest Oct 2027+", text: "For pre-approved patterns within policy, provisioning runs automatically with outcome review. Only if the evidence says so, and only if you turn the dial." }
    ]
  },
  {
    id: "paks",
    title: "PAKS namespace provisioning — the same dial on infrastructure",
    steps: [
      { level: "Level 0 · from Jan 2027", text: "Namespace-as-a-service through Terraform/GitOps with ServiceNow intake. Human-fulfilled, SLA-bound, fully conventional." },
      { level: "Level 1 · earliest Apr 2027", text: "The Teams front door drafts the namespace change with quotas and policies pre-filled; the platform engineer reviews and applies." },
      { level: "Level 2 · earliest Oct 2027+", text: "In-policy namespace requests fulfil automatically within quota guardrails; exceptions and new patterns stay human." }
    ]
  }
];

// ── 11 · Goal traceability (Pandora's stated Data/Integration/DevOps objectives) ─────────────────────────────────────
export interface GoalRow {
  ref: string;
  goal: string;
  lane1: string;
  metAt: DialLevel;
  horizon: string;
  note?: string;
}

export const goalsHeadline =
  "12 of your 16 Data & Integration platform goals and 3 of your 4 DevOps platform objectives are fully met at Level 0 — conventional delivery, nothing agentic anywhere. The remainder need Level 1, and one of those is a goal Pandora itself wrote into the RFP. Nothing requires Level 2. The dial governs pace, never coverage.";

export const goalsB21: GoalRow[] = [
  { ref: "Data 01", goal: "Data-product workspace < 30 min, no platform-engineer involvement", lane1: "Templated IaC via ServiceNow — days become hours; engineer approves", metAt: 1, horizon: "Apr–Oct 2027", note: "The no-engineer-involvement clause is literally a Level-1 outcome; Level 0 already gets hours." },
  { ref: "Data 02", goal: "Near-real-time Nexus event data via Unity Catalog", lane1: "Kafka-to-Delta connectors, schema mapping — pure build", metAt: 0, horizon: "Apr–Oct 2027" },
  { ref: "Data 03", goal: "Discover / understand / trust via a single governance layer", lane1: "Unity Catalog + OpenMetadata rollout + stewardship", metAt: 0, horizon: "Apr–Oct 2027" },
  { ref: "Data 04", goal: "Centralized storage, open data format", lane1: "Delta / ADLS Gen2 open-table patterns", metAt: 0, horizon: "Apr–Oct 2027", note: "Never needs a dial." },
  { ref: "Data 05", goal: "Rapidly productionize dashboards / pipelines (< 1 hour)", lane1: "Reusable templates + CI — weeks become same-day", metAt: 1, horizon: "Apr–Oct 2027", note: "Sub-hour needs assisted authoring; same-day is already a step-change." },
  { ref: "Data 06", goal: "Observe health & metrics; triage", lane1: "New Relic + lineage dashboards; human triage per SLO", metAt: 0, horizon: "Jan–Apr 2027" },
  { ref: "Data 07", goal: "Granular cost transparency + proactive cost alarms", lane1: "Tagging, showback dashboards, threshold alarms", metAt: 0, horizon: "Apr 2027" },
  { ref: "Data 08", goal: "Decommission EDW + Synapse; data-infra cost ~20% down", lane1: "Migration factory + storage optimisation + decommission economics", metAt: 0, horizon: "Oct 2027–Oct 2028", note: "Our internal AI conversion assist shortens the runway ~30–40% at no dial cost." }
];

export const goalsB22: GoalRow[] = [
  { ref: "Integration 01", goal: "Industry-leading standards — e2e automation, self-service", lane1: "Standards, templates, CI enforcement, review discipline", metAt: 1, horizon: "Apr–Oct 2027", note: "Automation and standards are Level 0; the full self-service clause is the Level-1 mile." },
  { ref: "Integration 02", goal: "Reliable real-time + relaxed-latency data mart", lane1: "Kafka / Databricks / Delta engineering with SLOs", metAt: 0, horizon: "Oct 2027" },
  { ref: "Integration 03", goal: "AI-ready infrastructure", lane1: "LLM gateway + guardrails + connector patterns — prepared, not switched on", metAt: 0, horizon: "Apr–Oct 2027", note: "The sharpest reframe: AI-ready ≠ AI-running. Readiness is delivered inside Lane 1; switching agents on stays behind your dial." },
  { ref: "Integration 04", goal: "No data loss + end-to-end lifecycle transparency", lane1: "DQ reconciliation, lineage, observability", metAt: 0, horizon: "Apr–Oct 2027" },
  { ref: "Integration 05", goal: "Data-quality enforcement on Kafka", lane1: "Schema checks, DQ gates, quarantine patterns", metAt: 0, horizon: "Apr–Oct 2027" },
  { ref: "Integration 06", goal: "Flexible Kafka ingestion", lane1: "Streaming / micro-batch / event-driven templates", metAt: 0, horizon: "Apr 2027" },
  { ref: "Integration 07", goal: "Kong API developer portal + API standardization", lane1: "Kong portal, catalogue, ownership, design governance", metAt: 0, horizon: "Apr–Oct 2027" },
  { ref: "Integration 08", goal: "Decommission BizTalk — while retaining operating competency", lane1: "Strangler factory + staffed BizTalk competency through migration; the missing action plan & budget delivered in the first 90 days", metAt: 0, horizon: "Strangler Oct 2027 · retired Oct 2028" }
];

export const goalsC2: GoalRow[] = [
  { ref: "DevOps 01", goal: "Shared Kubernetes infrastructure — reduce duplication & overhead", lane1: "Operate PAKS; consolidate other K8s setups onto it conventionally", metAt: 0, horizon: "Oct 2027–Oct 2028" },
  { ref: "DevOps 02", goal: "Enable AI-assisted development tooling, incl. ADO→GitHub as foundation", lane1: "ADO→GitHub = conventional factory; tooling enablement = Copilot/Claude rollout + training", metAt: 1, horizon: "Jan–Apr 2027", note: "The pivotal row: this is an AI-adoption goal Pandora wrote themselves, on tools already approved. Even the cautious path includes Level 1 here — the dial is about pace, not permission." },
  { ref: "DevOps 03", goal: "End-to-end observability for business observability at scale", lane1: "Cross-domain New Relic dashboards + SLO flows", metAt: 0, horizon: "Apr–Oct 2027" },
  { ref: "DevOps 04", goal: "DevEx & onboarding: golden paths, self-service, fast feedback, single IDP", lane1: "Port.io + golden paths + docs — onboarding days become a day", metAt: 1, horizon: "Apr–Oct 2027", note: "Minutes-level onboarding and fast-feedback loops are the Level-1 mile." }
];

export const goalsNotes = [
  "Your migration strategy maps entirely to Lane 1: strangler factories, the action plan and budget where none exists today, and the new production patterns (Flink, events-to-Databricks, Kafka connectors) as conventional engineering.",
  "Your in-flight migrations (ADO→GitHub, OpsGenie→PagerDuty, Backstage→Port.io): all Level-0 migration factories.",
  "Your open decisions — code-quality toolset, Snyk vs GHAS, and the agentic-workflow framework: resolved via the Level-0 governance board with decision records. And the agentic-workflow framework Pandora asked for is exactly the gate charter + dial model of this approach. Your open decision is answered by the approach itself."
];

// ── 12 · Horizons (two-lane) ─────────────────────────────────────────────
export interface HorizonLaneRow {
  id: HorizonId;
  lane1: string[];
  lane2: string[];
  lane2Empty?: boolean;
}

export const horizonBoard: HorizonLaneRow[] = [
  {
    id: "h3",
    lane1: [
      "Support-team transition complete (day 60, late Dec 2026): full on-call, P1/P2 owned",
      "Dev-team transition in flight (days 60–120)",
      "Baselines banked: DORA, developer NPS (16), cost, MTTx, ticket volumes",
      "Runbooks and SOPs to 95%+; bi-weekly readiness assessments",
      "Gate-0 assessments run jointly: security posture, skills, observability, governance"
    ],
    lane2: ["Nothing in your estate — deliberately.", "Our own delivery team uses AI internally (your approved tools, our machines).", "Optional W1/W2 workshops draft the gate charter — a Pandora-owned artifact for later."],
    lane2Empty: true
  },
  {
    id: "h6",
    lane1: [
      "Dev-team transition autonomous (day 120, Mar 2027); cutover on 50+ parameter evidence",
      "A full quarter of SLAs proven at the RFP's numbers",
      "Conventional automation wave 1: golden paths, dashboards, IaC",
      "Migration factories running: ADO→GitHub, OpsGenie→PagerDuty, Backstage→Port.io",
      "Gate-0 foundations largely built: gateway ready, observability baseline, enablement underway"
    ],
    lane2: [
      "If — and only if — Pandora turns the first dial: one Assist pilot in one item (e.g. access requests via Teams), 100% human-approved — through Gates 0 + 1",
      "AI dev-tooling enablement for Pandora engineers (your own stated goal)"
    ]
  },
  {
    id: "h12",
    lane1: [
      "First cost-down banked; DORA trending up",
      "Majority of one-time migrations done conventionally",
      "BizTalk strangler underway on the plan and budget delivered in the first 90 days",
      "Foundations evidence complete — Gate 0 passable for dialled items"
    ],
    lane2: [
      "Assist broadened to dialled-up items only",
      "First Delegate candidates where their Gate 2 passes",
      "Agentic governance activates with the first estate touch — never before"
    ]
  },
  {
    id: "h24",
    lane1: [
      "Legacy retired: BizTalk, EDW, Synapse",
      "All RFP targets met — at whichever level each item sits",
      "Steady-state operations with a proven improvement cadence"
    ],
    lane2: [
      "Items at whatever level Pandora chose — the fabric fully available, never mandatory",
      "Same destination as the July approach. Arrival by consent."
    ]
  }
];

// ── 13 · Cost of caution ─────────────────────────────────────────────────
export interface CautionRow {
  target: string;
  l0: string;
  l1: string;
  l2: string;
}

export const cautionIntro =
  "An alternative that pretends caution is free would be marketing. Here is exactly what each RFP target needs — most are met conventionally; four need Level 1; none need Level 2.";

export const cautionRows: CautionRow[] = [
  { target: "99.99% availability · P1–P4 SLAs", l0: "✅ from month 3", l1: "—", l2: "—" },
  { target: "Workspace provisioning: days → hours", l0: "✅", l1: "—", l2: "—" },
  { target: "Workspace < 30 minutes", l0: "✗", l1: "✅ Teams-assist path", l2: "—" },
  { target: "Onboarding days → minutes", l0: "✗ (days → a day)", l1: "✅", l2: "—" },
  { target: "Pipeline / dashboard setup < 1 hour", l0: "Partial (templates reach same-day)", l1: "✅", l2: "—" },
  { target: "~20% data-infra cost reduction", l0: "✅ majority (decommission + right-sizing)", l1: "Remainder", l2: "—" },
  { target: "DORA improvement", l0: "Partial (CI/CD hygiene)", l1: "✅ (AI dev tooling)", l2: "Full potential" },
  { target: "Developer NPS up from 16", l0: "Partial", l1: "✅", l2: "—" },
  { target: "BizTalk / EDW / Synapse decommission", l0: "✅ (factories)", l1: "Faster (~30–40% conversion assist)", l2: "—" }
];

export const cautionHonesty =
  "Three of your headline targets — sub-30-minute workspaces, minutes-level onboarding, top-quartile DORA — are Level-1 outcomes. The dial for those three is yours; Gate 0 and the item gates make turning it safe.";

export const benefitCurves = {
  label: "Illustrative benefit curves — original approach vs this alternative",
  note: "Slower start, same destination. The gap is the price of certainty — and it closes as dials turn."
};

// ── 14 · Why this is low-risk ────────────────────────────────────────────
export type ProofViz =
  | { type: "meters"; items: { label: string; value: number }[] }
  | { type: "ready"; items: string[] };

export interface ProofCard {
  chip: string;
  stat: string;
  body: string;
  viz: ProofViz;
}

export const proofCards: ProofCard[] = [
  {
    chip: "Proven at Pandora",
    stat: "100 / 95 / 90 / 97",
    body: "Our transition record in other Pandora product lines: 100% readiness criteria met, 95%+ documentation and runbooks generated, 90%+ tickets resolved independently in reverse shadow, 97%+ SLA achievement during stabilization.",
    viz: {
      type: "meters",
      items: [
        { label: "Readiness criteria met", value: 100 },
        { label: "Docs & runbooks generated", value: 95 },
        { label: "Tickets resolved independently", value: 90 },
        { label: "SLA in stabilization", value: 97 }
      ]
    }
  },
  {
    chip: "Already built",
    stat: "0 R&D risk",
    body: "The fabric is not a promise: Pandav runs on a standard container, the skill library is in production delivery use, the ops loop is designed. Keeping the option ready costs nothing.",
    viz: {
      type: "ready",
      items: ["Pandav runs on a standard container", "Skill library in production use", "Ops loop designed"]
    }
  },
  {
    chip: "Named coverage",
    stat: "30 / 30",
    body: "Every scope row has a named conventional solution at Level 0. Coverage never depends on anything novel.",
    viz: {
      type: "meters",
      items: [{ label: "Scope items with a named Level-0 solution", value: 100 }]
    }
  },
  {
    chip: "Goals covered",
    stat: "12/16 + 3/4",
    body: "Your Data, Integration and DevOps platform goals fully met at Level 0; the remainder at Level 1 — one of which is your own AI-tooling goal. Nothing requires Level 2.",
    viz: {
      type: "meters",
      items: [
        { label: "Data & Integration goals met at L0", value: 75 },
        { label: "DevOps objectives met at L0", value: 75 }
      ]
    }
  }
];

// ── 15 · What we need from Pandora ───────────────────────────────────────
export const pandoraAsks = [
  "Transition access and environments — the RFP's own mobilisation needs, nothing more",
  "Named service owners per platform",
  "Monthly governance participation (the RFP's cadence)",
  "A quarterly dial review — 30 minutes inside the existing cadence",
  "Optional: the W1/W2 workshops to co-author the gate charter for later",
  "Not needed to start: any agentic decision, any new tooling in your estate, any process change for your teams"
];

// ── 16 · How we start + the ask ──────────────────────────────────────────
export const startPlan = [
  { when: "Week 0 · on award (30 Oct 2026)", what: "Confirm transition start; mobilise Phase I support team per the RFP plan." },
  { when: "Weeks 1–6 · parallel, optional", what: "W1 \"Align — the map\" and W2 \"Define the gates\": preparing the option, not committing to it. Every artifact Pandora-owned." },
  { when: "~Day 90 · Jan 2027", what: "First quarterly dial review — the first moment any dial could turn, and equally the moment you can say \"not yet\" with zero consequence." }
];

export const askCards = [
  ["The one decision", "Approve the alternative approach and confirm the transition start date. That is the whole ask."],
  ["What stays yours", "The dials, the gates, and the pace. Every dial-up needs your named owner's signature; every dial position is reviewed quarterly; \"not yet\" is always a valid answer."],
  ["What stays ready", "The agentic fabric — built, proven, and waiting behind Gate 0. The July approach remains available as the accelerated option whenever you want it."]
] as const;

export const closeLine =
  "Run as-is from day one. Build the foundations while we run. Earn every step toward agentic — at your pace, behind your gates, with your hand on the dial.";

export const footerLines = [
  "Pandora TS&F · Strategic Partner Selection 2027 · Data, Integration & DevOps Platforms — the alternative approach",
  "Companion detail on request: full dial specifications · gate charter template · foundations assessment method · transition plan · the accelerated (July) option"
] as const;

// ── The Team — delivery model chapter ────────────────────────────────────
export const teamIntro =
  "The engine behind the plan: one team across three locations under a single accountable Sapient leader, with Pandora holding architecture, standards and every gate — and effective capacity that compounds each horizon rather than a rise in headcount.";

export interface TeamLocation {
  id: string;
  city: string;
  kind: string;
  role: string;
  roles: string[];
  lane1: number;
}

export const teamLocations: TeamLocation[] = [
  { id: "copenhagen", city: "Copenhagen", kind: "Onsite · Pandora HQ", role: "Leadership, liaison and trust — embedded with your leaders", roles: ["Sapient Delivery Lead", "Solution / Engineering lead", "Rotating SMEs, 1–2× a year"], lane1: 65 },
  { id: "bucharest", city: "Bucharest", kind: "Nearshore · Romania", role: "Timezone overlap with Copenhagen — senior engineering and fast feedback", roles: ["Senior / lead engineers", "QE / SDET", "Delivery coordination"], lane1: 80 },
  { id: "gurgaon", city: "Gurgaon", kind: "Offshore · India", role: "Engineering and 24/7 operations scale — the delivery backbone", roles: ["Data · Kafka · DevOps · Cloud engineers", "Development + Operations rotation", "AgentOps skill authoring"], lane1: 88 }
];

export interface TeamTrack {
  id: string;
  name: string;
  dev: string;
  ops: string;
}

export const teamTracks: TeamTrack[] = [
  { id: "data", name: "Data & Integration", dev: "Data · Kafka · Delta · Unity Catalog", ops: "Streaming ops · DQ · lineage" },
  { id: "devops", name: "DevOps & Cloud", dev: "CI/CD · GitHub Actions · Terraform", ops: "PAKS/AKS · SRE · 24/7 on-call" },
  { id: "agentops", name: "AgentOps & Enablement", dev: "Skills authoring · AI tooling", ops: "Evaluations · AI FinOps · adoption" }
];

export const teamLeaderNote =
  "One Sapient Delivery Lead is accountable across all three tracks and both lanes — SLAs, throughput, capability transfer and the improvement backlog roll up to one person, pairing directly with your Delivery Lead and Engineering Manager.";

export interface ControlBand {
  area: string;
  owner: "pandora" | "sapient" | "joint";
}

export const controlBands: ControlBand[] = [
  { area: "Direction & roadmap", owner: "pandora" },
  { area: "Architecture", owner: "pandora" },
  { area: "Standards", owner: "pandora" },
  { area: "Gate 0 / 1 / 2 sign-off", owner: "pandora" },
  { area: "Improvement backlog", owner: "joint" },
  { area: "Day-to-day delivery", owner: "sapient" },
  { area: "Operations & on-call", owner: "sapient" }
];

export const controlNote =
  "Control is structural, not promised. Pandora retains Lead and Senior Engineers, architecture, standards and the roadmap; we run the day-to-day. Every gate and every dial-up needs a named Pandora owner's sign-off.";

export interface SkillRow {
  skill: string;
  t1: string;
  t2: string;
  t3: string;
  dev: string;
}

export const skillRows: SkillRow[] = [
  {
    skill: "Data engineering",
    t1: "Pipeline alerts, failed-run routing, first checks",
    t2: "Rerun, quarantine, DQ triage, lineage lookup",
    t3: "Spark / Delta fix PR, model and job optimisation",
    dev: "Data-product build, medallion design, reusable templates"
  },
  {
    skill: "Kafka / Confluent",
    t1: "Lag, schema and connector alerts",
    t2: "Replay, rebalance, connector restart, config triage",
    t3: "Connector, schema or consumer fix PR",
    dev: "Event contracts, producer / consumer engineering"
  },
  {
    skill: "DevOps / CI-CD",
    t1: "Failed-build routing and known-error checks",
    t2: "Runner, secret and pipeline recovery",
    t3: "Workflow / action refactor PR, policy-gate fix",
    dev: "GitHub migration factory and platform pipeline patterns"
  },
  {
    skill: "Cloud · Kubernetes · Terraform",
    t1: "Pod, node, quota and certificate monitoring",
    t2: "Rollback, scale, config restore and access triage",
    t3: "IaC, Helm or platform fix PR",
    dev: "PAKS recipes, self-service patterns, platform engineering"
  },
  {
    skill: "SRE / Observability",
    t1: "Alert intake, severity routing, dashboard checks",
    t2: "Correlation, RCA draft, runbook-guided restore",
    t3: "Instrumentation, SLO or reliability fix PR",
    dev: "Observability-by-design and resilience engineering"
  },
  {
    skill: "QE / SDET",
    t1: "Smoke-test results and release-health checks",
    t2: "Regression triage, data-quality failure isolation",
    t3: "Test-harness and quality-gate fix PR",
    dev: "Automation strategy, contract tests, CI quality gates"
  }
];

export const skillsNote =
  "Full coverage from day one across development and operations — with operations explicitly spanning L1 monitor-and-route, L2 diagnose-and-restore and L3 engineering fix. L3 is deliberately interchangeable with development for the same skill, so production learning turns into permanent code, IaC, tests and runbook improvements.";

export const skillTierHeaders = [
  { label: "Ops L1", detail: "Monitor & route" },
  { label: "Ops L2", detail: "Diagnose & restore" },
  { label: "Ops L3", detail: "Engineer fix" },
  { label: "Development", detail: "Build & change" }
] as const;

export const skillBridge = {
  title: "L3 is not a support silo",
  detail:
    "The same senior engineering pool works L3 production fixes and development backlog items. Incidents become pull requests, reusable recipes, tests, runbooks and prevention work.",
  flow: ["Incident / request", "Ops L1", "Ops L2", "Ops L3", "Development", "Permanent fix / reusable pattern"]
};

export interface KtStep {
  step: string;
  detail: string;
}

export const ktLoop: KtStep[] = [
  { step: "Acquire", detail: "On-parallel shadow of current teams; tooling and access" },
  { step: "Document", detail: "Living runbooks, ADRs, architecture and a knowledge wiki" },
  { step: "Play back", detail: "Reverse-shadow — we play knowledge back to your incumbent SMEs" },
  { step: "Certify", detail: "Enablement clinics and certifications against readiness thresholds" },
  { step: "Own", detail: "Pandora can operate any capability we deliver — the acceptance bar" }
];

export const ktNote =
  "Knowledge transfer is a designed workstream, not a hope — flowing both ways and across all three locations off one knowledge base, so Gurgaon, Bucharest and Copenhagen operate identically. It doubles as Gate-0 AI-fluency readiness.";

export interface CapacityDriver {
  at: string;
  label: string;
  detail: string;
}

export const capacityDrivers: CapacityDriver[] = [
  { at: "Jan 2027", label: "Ramp & stabilise", detail: "Onboarding and transition reach a steady baseline" },
  { at: "Apr 2027", label: "AI-augmented delivery", detail: "Our own team's AI tooling lifts throughput per engineer — no estate footprint" },
  { at: "Oct 2027", label: "Dialled AI", detail: "As you turn L1 dials, assisted flows raise platform-team throughput" },
  { at: "Oct 2028", label: "Owned & optimised", detail: "Reusable patterns and a Pandora-owned CoE; capacity high, our footprint narrowing" }
];

export const capacityNote =
  "More delivered, by a leaner and more stable team, an increasing share of it Pandora-owned — the opposite of bringing an army.";

export const teamAsks: string[] = [
  "Pandora on the selection panels for key roles",
  "Access and environments for onboarding",
  "Protected time for enablement clinics",
  "Named Pandora counterparts per track"
];

export const teamClose =
  "One accountable leader, one team across three locations, Pandora in control at every gate, capacity compounding, and ownership transferring — the delivery engine that makes the gentle path credible.";

// ── The Team · dev/ops convergence (answers "why two teams?") ─────────────
export const convergeIntro =
  "Not two teams — one team, sequenced. The transition stabilises the running service (the support wave) before it takes on change (the dev wave); the destination is a single team that builds and runs. What makes that possible is the agentic dial itself: Level 2/3 operations removes the operational cognitive load that forced development and operations apart, so a build-minded engineer can own what they run without being a full-time ops specialist.";

export interface ConvergeMechanism {
  title: string;
  detail: string;
}

export const convergeMechanisms: ConvergeMechanism[] = [
  { title: "A layered core, not uniform heroes", detail: "An experienced SRE/DevOps backbone holds 24×7 and the hard incidents; development engineers take on-call for what they build, with agentic ops carrying the toil." },
  { title: "Rotation & pairing", detail: "Engineers rotate between development and operations, building the build-and-run mindset over the journey rather than hiring for it fully formed." },
  { title: "Follow-the-sun — 24×7 by design", detail: "Copenhagen, Bucharest and Gurgaon cover the clock, so no individual carries an unsustainable pager — and dialled agentic ops cuts the night wake-ups further." },
  { title: "Select for mindset, enable the rest", detail: "We screen for ownership and curiosity, then close skills through Gate-0 enablement — the same clinics that build capability build the mindset." }
];

export const convergeClincher =
  "So the two-wave transition is the on-ramp to the one team the agentic capability makes possible — dialling up agentic ops is what collapses development and operations into a single agent-supervising team, without burning out the rare full-stack engineer.";
