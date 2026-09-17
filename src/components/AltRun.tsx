import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Database,
  Download,
  FileWarning,
  Gauge,
  GitBranch,
  ListChecks,
  Network,
  Power,
  RotateCcw,
  SearchCheck,
  ShieldCheck,
  TimerReset,
  Workflow,
  X
} from "lucide-react";
import { Fragment, useState, type CSSProperties } from "react";
import {
  asIsLanes,
  dayOneFacts,
  dialReview,
  governanceLayers,
  transitionCoverageClose,
  transitionCoverageIntro,
  transitionCoverageProofPoints,
  transitionPlan,
  transitionReadinessBuckets
} from "../data/alternative";
import { PullQuote, Reveal, Section } from "./primitives";

const coverageStages = [
  { id: "inventory", window: "Weeks 0-2", label: "Inventory", short: "Access + map", hue: "--tech", Icon: SearchCheck },
  { id: "probe", window: "Weeks 1-6", label: "Probe", short: "Runtime proof", hue: "--ops", Icon: Gauge },
  { id: "support", window: "By day 60", label: "Support gate", short: "L1/L2 ready", hue: "--proof", Icon: ShieldCheck },
  { id: "dev", window: "Days 60-120", label: "Dev gate", short: "Fix route", hue: "--gov", Icon: GitBranch },
  { id: "close", window: "Months 4-6", label: "Close gaps", short: "Burn down", hue: "--accent", Icon: CheckCircle2 }
] as const;

type CoverageStageId = (typeof coverageStages)[number]["id"];
type CoverageDecision = "Transition now" | "Transition with controls" | "Hold / defer" | "Retire / migrate";
type DecisionTone = "now" | "control" | "hold" | "migrate";

interface CoverageStep {
  id: CoverageStageId;
  action: string;
  evidence: string;
  confidence: string;
}

interface CoverageCase {
  id: string;
  area: string;
  title: string;
  ask: string;
  Icon: typeof Network;
  decision: CoverageDecision;
  decisionTone: DecisionTone;
  handoverPercent: number;
  coveredPercent: number;
  gap: string;
  owner: string;
  control: string;
  missing: string[];
  evidence: string[];
  steps: CoverageStep[];
}

const transitionCases: CoverageCase[] = [
  {
    id: "kafka",
    area: "Kafka / Integration",
    title: "Order events connector has no replay rule",
    ask: "Can we take over a critical event flow if the outgoing vendor cannot explain every topic, owner or connector dependency?",
    Icon: Network,
    decision: "Transition with controls",
    decisionTone: "control",
    handoverPercent: 42,
    coveredPercent: 86,
    gap: "Topic owner missing, replay authority unclear, connector dependency undocumented.",
    owner: "Sapient L2/L3 with Pandora Integration owner",
    control: "Replay rehearsal, schema contract capture, connector restart path and two-week hypercare.",
    missing: ["topic owner", "replay rule", "connector dependency"],
    evidence: ["Schema Registry", "consumer lag", "connector config", "producer repos"],
    steps: [
      {
        id: "inventory",
        action: "Scan topics, schemas, connectors, producers and consumers.",
        evidence: "We build the owner, SLA, schema and dependency record from Confluent and repo evidence.",
        confidence: "The unknown is bounded before support takeover starts."
      },
      {
        id: "probe",
        action: "Replay the failure path and validate restart boundaries.",
        evidence: "Lag history, offsets, connector config and schema versions prove what can be restored safely.",
        confidence: "Weak vendor KT is replaced by a tested operating path."
      },
      {
        id: "support",
        action: "Move to L1/L2 support with named controls.",
        evidence: "Runbook, alert route, replay approval and escalation path are signed off.",
        confidence: "The flow can transition, but not blindly."
      },
      {
        id: "dev",
        action: "Convert the residual risk into L3/dev backlog.",
        evidence: "Schema-contract gaps and replay automation are raised as engineering work.",
        confidence: "The gap becomes a visible fix path, not a hidden support debt."
      },
      {
        id: "close",
        action: "Burn down the control or keep it visible in governance.",
        evidence: "Replay drill passed, owner confirmed and connector dashboard live.",
        confidence: "The component exits transition only when the evidence says it should."
      }
    ]
  },
  {
    id: "data",
    area: "Data engineering",
    title: "Databricks availability pipeline has no lineage",
    ask: "What if a business-critical data pipeline arrives with no trustworthy recovery guide or downstream ownership map?",
    Icon: Database,
    decision: "Hold / defer",
    decisionTone: "hold",
    handoverPercent: 30,
    coveredPercent: 68,
    gap: "Backfill steps absent, data owner unclear, downstream table impact not documented.",
    owner: "Pandora data owner plus Sapient Data L2/L3",
    control: "Do not count it as fully transitioned until lineage, backfill and DQ evidence pass.",
    missing: ["lineage", "backfill steps", "DQ rationale"],
    evidence: ["Databricks jobs", "Delta history", "OpenMetadata", "failed-run tickets"],
    steps: [
      {
        id: "inventory",
        action: "Map jobs, schedules, tables and consumer reports.",
        evidence: "Databricks job history, Delta logs and metadata catalogues show the real dependency chain.",
        confidence: "Criticality is discovered even if no runbook exists."
      },
      {
        id: "probe",
        action: "Run a controlled backfill rehearsal.",
        evidence: "A replay candidate, quarantine path and data freshness check are tested before takeover.",
        confidence: "The missing runbook is reconstructed from runtime proof."
      },
      {
        id: "support",
        action: "Hold full transition until the recovery path passes.",
        evidence: "The service remains in transition governance with a named blocker and date.",
        confidence: "Pandora sees that not everything is forced into BAU."
      },
      {
        id: "dev",
        action: "Use development capacity to harden the data product path.",
        evidence: "Ownership, medallion rules and data-quality checks become backlog items.",
        confidence: "The gap is closed through engineering, not more meetings."
      },
      {
        id: "close",
        action: "Exit when the pipeline can be operated and rebuilt.",
        evidence: "Lineage confirmed, backfill drill passed, data owner signed off.",
        confidence: "The component moves only when the customer risk is controlled."
      }
    ]
  },
  {
    id: "devops",
    area: "DevOps",
    title: "GitHub release pipeline hides runner and secret dependencies",
    ask: "Can the release path move from vendor to self without a release freeze or unknown break-glass route?",
    Icon: Workflow,
    decision: "Transition now",
    decisionTone: "now",
    handoverPercent: 78,
    coveredPercent: 94,
    gap: "Runner dependency and secret rotation notes were incomplete, but release history is strong.",
    owner: "Sapient DevOps L2/L3 with Pandora platform lead",
    control: "Dry-run release, runner baseline, secret test and rollback rehearsal before cutover.",
    missing: ["runner baseline", "secret rotation", "rollback note"],
    evidence: ["GitHub runs", "runner config", "Key Vault", "repo permissions"],
    steps: [
      {
        id: "inventory",
        action: "Map repos, workflows, environments, runners and secrets.",
        evidence: "Workflow history and permissions show the release path and its hidden dependencies.",
        confidence: "The release chain is visible before the first supported deployment."
      },
      {
        id: "probe",
        action: "Execute a non-prod dry-run and rollback rehearsal.",
        evidence: "Runner availability, secret access and rollback timing are proven in practice.",
        confidence: "Documentation gaps are closed by a working release rehearsal."
      },
      {
        id: "support",
        action: "Accept into support with standard release controls.",
        evidence: "L1/L2 alert route and L3 fix route are ready for failed builds.",
        confidence: "This can transition now because evidence beats the missing notes."
      },
      {
        id: "dev",
        action: "Feed recurring release risk into platform engineering.",
        evidence: "Reusable workflow, policy gate and runner-hardening items are raised.",
        confidence: "The transition improves the pipeline instead of preserving fragile practice."
      },
      {
        id: "close",
        action: "Close after first supported release cycle.",
        evidence: "Release passed, rollback tested and ownership confirmed.",
        confidence: "The platform path is self-run with measured evidence."
      }
    ]
  },
  {
    id: "legacy",
    area: "Legacy integration",
    title: "Hidden EDW/BizTalk feed should not become long-term BAU",
    ask: "How do we avoid inheriting undocumented legacy integration risk just because it exists today?",
    Icon: FileWarning,
    decision: "Retire / migrate",
    decisionTone: "migrate",
    handoverPercent: 25,
    coveredPercent: 72,
    gap: "Hidden script, unclear retry policy and no reliable owner for the legacy feed.",
    owner: "Pandora architecture with Sapient Integration and Data leads",
    control: "Run with temporary guardrails while the flow moves into the strangler/migration path.",
    missing: ["script owner", "retry policy", "target migration"],
    evidence: ["scheduler history", "file drops", "incident records", "target API map"],
    steps: [
      {
        id: "inventory",
        action: "Trace schedules, file movement, downstream tables and business use.",
        evidence: "Scheduler logs, storage paths and tickets reveal the live dependency chain.",
        confidence: "The hidden feed becomes a known transition object."
      },
      {
        id: "probe",
        action: "Test restart, duplicate handling and failure visibility.",
        evidence: "A controlled run shows where the legacy path can and cannot be operated safely.",
        confidence: "The residual risk is measured, not assumed."
      },
      {
        id: "support",
        action: "Keep only a temporary support wrapper.",
        evidence: "Monitoring, escalation and a manual recovery path are active.",
        confidence: "Support covers the business while avoiding permanent ownership of weak legacy."
      },
      {
        id: "dev",
        action: "Move the feed into the migration factory.",
        evidence: "Replacement design, API target and cutover backlog are confirmed.",
        confidence: "The right transition decision is migration, not endless run."
      },
      {
        id: "close",
        action: "Retire, replace or keep visible until replacement lands.",
        evidence: "The risk remains in governance until the migration path is accepted.",
        confidence: "Pandora is protected from inherited undocumented debt."
      }
    ]
  }
];

const maturityLevels = [
  { level: 0, label: "M0", title: "Unknown", short: "vendor-dependent", hue: "--accent", x: 50, y: 7 },
  { level: 1, label: "M1", title: "Discovered", short: "inventory + gaps", hue: "--ops", x: 86, y: 27 },
  { level: 2, label: "M2", title: "Run-ready", short: "L1/L2 can run", hue: "--tech", x: 86, y: 70 },
  { level: 3, label: "M3", title: "Controlled", short: "run with controls", hue: "--gov", x: 50, y: 91 },
  { level: 4, label: "M4", title: "Proactive", short: "SLO + prevention", hue: "--proof", x: 14, y: 70 },
  { level: 5, label: "M5", title: "Pandav ready", short: "safe automation", hue: "--accent", x: 14, y: 27 }
] as const;

const maturityHorizons = [
  { id: "now", label: "Now", title: "Baseline", detail: "current evidence baseline" },
  { id: "d60", label: "Day 60", title: "Run transition", detail: "support takeover gate" },
  { id: "d120", label: "Day 120", title: "Dev transition", detail: "fix route proven" },
  { id: "m6", label: "3-6 mo", title: "Mature run", detail: "gap burn-down" },
  { id: "m12", label: "12+ mo", title: "Pandav path", detail: "candidate patterns" }
] as const;

const readinessDimensions = [
  { id: "performance", label: "Performance", abbr: "Perf", short: "runtime health" },
  { id: "connectivity", label: "Connectivity", abbr: "Conn", short: "dependencies" },
  { id: "security", label: "Security", abbr: "Sec", short: "access + secrets" },
  { id: "change", label: "Pipeline", abbr: "Pipe", short: "change + rollback" },
  { id: "observability", label: "Observability", abbr: "Obs", short: "metrics/logs/traces" },
  { id: "reliability", label: "Reliability", abbr: "Rel", short: "restore + DR" },
  { id: "ownership", label: "Ownership", abbr: "Own", short: "service owner" },
  { id: "proactive", label: "Proactive triage", abbr: "Triage", short: "alerts + RCA" }
] as const;

type ReadinessDimensionId = (typeof readinessDimensions)[number]["id"];
type DimensionScores = Record<ReadinessDimensionId, number>;

interface ServicePlatform {
  id: string;
  domain: string;
  technology: string;
  workloads: string;
  Icon: typeof Network;
  track: [number, number, number, number, number];
  decision: CoverageDecision;
  decisionTone: DecisionTone;
  liveWith: string;
  mustClose: string;
  pandav: string;
  dimensions: DimensionScores;
}

const servicePlatforms: ServicePlatform[] = [
  {
    id: "paks",
    domain: "DevOps / Cloud",
    technology: "PAKS / AKS / Kubernetes",
    workloads: "APIs, microservices, platform services, shared namespaces",
    Icon: Network,
    track: [2, 3, 4, 4, 5],
    decision: "Transition now",
    decisionTone: "now",
    liveWith: "Partial dependency map while service graph is completed.",
    mustClose: "Cert/ingress alerts, rollback runbooks, platform owner mapping.",
    pandav: "Namespace self-service, pod failure triage, capacity prediction.",
    dimensions: { performance: 3, connectivity: 2, security: 3, change: 3, observability: 3, reliability: 2, ownership: 3, proactive: 2 }
  },
  {
    id: "iac",
    domain: "DevOps / Cloud",
    technology: "Terraform / GitOps / IaC",
    workloads: "Cloud config, namespace recipes, policy and environment setup",
    Icon: GitBranch,
    track: [2, 3, 3, 4, 5],
    decision: "Transition now",
    decisionTone: "now",
    liveWith: "Older modules can run if drift is visible and owner is known.",
    mustClose: "State ownership, drift alerts, module versioning and rollback evidence.",
    pandav: "Policy-checked change drafts and controlled self-service recipes.",
    dimensions: { performance: 2, connectivity: 3, security: 3, change: 3, observability: 2, reliability: 2, ownership: 3, proactive: 2 }
  },
  {
    id: "github",
    domain: "DevOps / SDLC",
    technology: "Azure DevOps -> GitHub",
    workloads: "Repos, pipelines, migration waves, release workflows",
    Icon: GitBranch,
    track: [2, 3, 4, 4, 5],
    decision: "Transition now",
    decisionTone: "now",
    liveWith: "Some pipeline conversion notes can mature during migration waves.",
    mustClose: "Repo ownership, rollback path, branch protection and release evidence.",
    pandav: "Migration factory, policy-as-code recommendations, pipeline auto-triage.",
    dimensions: { performance: 3, connectivity: 3, security: 3, change: 3, observability: 3, reliability: 3, ownership: 3, proactive: 2 }
  },
  {
    id: "runners",
    domain: "DevOps / SDLC",
    technology: "GitHub Actions / runners",
    workloads: "CI/CD, deployment pipelines, policy gates, automated tests",
    Icon: Workflow,
    track: [2, 3, 4, 4, 5],
    decision: "Transition with controls",
    decisionTone: "control",
    liveWith: "Runner dependency gaps if dry-run release and fallback runner are proven.",
    mustClose: "Secret rotation, runner baseline, failed-release alert and hotfix route.",
    pandav: "Failed-build triage, flaky pipeline detection, policy gate repair.",
    dimensions: { performance: 3, connectivity: 2, security: 2, change: 3, observability: 2, reliability: 2, ownership: 3, proactive: 2 }
  },
  {
    id: "portal",
    domain: "Developer Experience",
    technology: "Helios / Backstage -> Port.io",
    workloads: "Service catalog, scorecards, golden paths, self-service actions",
    Icon: ListChecks,
    track: [1, 2, 3, 4, 5],
    decision: "Transition with controls",
    decisionTone: "control",
    liveWith: "Catalogue gaps if critical services have temporary owner records.",
    mustClose: "Scorecard definitions, ownership graph, golden-path runbooks.",
    pandav: "Service health scorecards and graph-backed onboarding actions.",
    dimensions: { performance: 2, connectivity: 2, security: 2, change: 2, observability: 2, reliability: 2, ownership: 2, proactive: 1 }
  },
  {
    id: "itsm",
    domain: "ITSM / Work Mgmt",
    technology: "ServiceNow / Jira / Confluence",
    workloads: "Incidents, requests, changes, approvals, runbooks, KT evidence",
    Icon: ListChecks,
    track: [3, 3, 4, 4, 5],
    decision: "Transition now",
    decisionTone: "now",
    liveWith: "Some CMDB links can be enriched while tickets already route correctly.",
    mustClose: "SLA taxonomy, service ownership, runbook links and approval routes.",
    pandav: "Evidence pack drafting, recurring-ticket mining, backlog creation.",
    dimensions: { performance: 3, connectivity: 3, security: 3, change: 3, observability: 3, reliability: 3, ownership: 3, proactive: 3 }
  },
  {
    id: "pagerduty",
    domain: "Incident Mgmt",
    technology: "OpsGenie -> PagerDuty",
    workloads: "On-call schedules, escalation policies, major incident workflow",
    Icon: AlertTriangle,
    track: [2, 3, 3, 4, 4],
    decision: "Transition now",
    decisionTone: "now",
    liveWith: "Alert noise while routing, escalation and ownership are tested.",
    mustClose: "P1/P2 drill, on-call quality review, escalation policy mapping.",
    pandav: "Incident summaries, escalation quality checks, response pattern analytics.",
    dimensions: { performance: 3, connectivity: 3, security: 3, change: 2, observability: 3, reliability: 3, ownership: 3, proactive: 2 }
  },
  {
    id: "newrelic",
    domain: "Observability",
    technology: "New Relic",
    workloads: "Metrics, logs, traces, synthetics, SLO dashboards, business flows",
    Icon: Gauge,
    track: [2, 3, 4, 4, 5],
    decision: "Transition with controls",
    decisionTone: "control",
    liveWith: "Dashboard gaps if P1/P2 alert route and service owner are known.",
    mustClose: "SLO burn alerts, alert rationale, dashboard owner and blind-spot backlog.",
    pandav: "Auto-RCA drafts, alert noise reduction, proactive issue detection.",
    dimensions: { performance: 3, connectivity: 2, security: 3, change: 2, observability: 3, reliability: 3, ownership: 2, proactive: 2 }
  },
  {
    id: "databricks",
    domain: "Data Platform",
    technology: "Databricks / Olympus",
    workloads: "Jobs, notebooks, Delta pipelines, data products, workspace provisioning",
    Icon: Database,
    track: [1, 2, 3, 4, 5],
    decision: "Transition with controls",
    decisionTone: "control",
    liveWith: "Non-critical lineage gaps if freshness and recovery are monitored.",
    mustClose: "Critical job owner, backfill runbook, freshness alert and DQ path.",
    pandav: "Self-healing reruns, DQ triage, data-product workspace provisioning.",
    dimensions: { performance: 2, connectivity: 2, security: 2, change: 2, observability: 2, reliability: 2, ownership: 2, proactive: 1 }
  },
  {
    id: "storage",
    domain: "Data Storage",
    technology: "Delta / ADLS Gen2",
    workloads: "Bronze/Silver/Gold tables, curated storage, open table formats",
    Icon: Database,
    track: [2, 2, 3, 4, 4],
    decision: "Transition now",
    decisionTone: "now",
    liveWith: "Some downstream consumer mapping can mature with catalogue work.",
    mustClose: "Access policy, retention, reconciliation and recovery validation.",
    pandav: "Freshness RCA, lifecycle transparency, data-loss reconciliation.",
    dimensions: { performance: 3, connectivity: 2, security: 3, change: 2, observability: 2, reliability: 3, ownership: 2, proactive: 2 }
  },
  {
    id: "catalog",
    domain: "Data Governance",
    technology: "Unity Catalog / OpenMetadata",
    workloads: "Access control, lineage, metadata, stewardship, ownership",
    Icon: ListChecks,
    track: [1, 2, 3, 4, 5],
    decision: "Transition with controls",
    decisionTone: "control",
    liveWith: "Metadata incompleteness if critical owners are named.",
    mustClose: "Missing owner alerts, lineage coverage and stewardship workflow.",
    pandav: "Metadata enrichment, impact analysis, trust score automation.",
    dimensions: { performance: 2, connectivity: 2, security: 3, change: 2, observability: 2, reliability: 2, ownership: 2, proactive: 1 }
  },
  {
    id: "kafka",
    domain: "Event / Integration",
    technology: "Kafka / Confluent / Nexus",
    workloads: "Topics, schemas, connectors, producers, consumers, event streams",
    Icon: Network,
    track: [1, 2, 3, 4, 5],
    decision: "Transition with controls",
    decisionTone: "control",
    liveWith: "Topic-owner gaps if lag, restart and escalation are active.",
    mustClose: "Replay rule, schema compatibility alert, consumer impact map.",
    pandav: "Schema drift detection, connector self-healing, replay recommendations.",
    dimensions: { performance: 2, connectivity: 2, security: 2, change: 2, observability: 2, reliability: 2, ownership: 1, proactive: 1 }
  },
  {
    id: "kong",
    domain: "API Platform",
    technology: "Kong / Pong API platform",
    workloads: "API gateway, API catalogue, policies, developer portal",
    Icon: Network,
    track: [1, 2, 3, 4, 4],
    decision: "Transition with controls",
    decisionTone: "control",
    liveWith: "Incomplete consumer map if gateway metrics and auth route are known.",
    mustClose: "API SLOs, contract versioning, auth failure visibility.",
    pandav: "Contract drift detection and consumer impact analysis.",
    dimensions: { performance: 2, connectivity: 2, security: 2, change: 2, observability: 2, reliability: 2, ownership: 2, proactive: 1 }
  },
  {
    id: "powerbi",
    domain: "Analytics",
    technology: "Power BI",
    workloads: "Dashboards, semantic models, business reporting, refresh jobs",
    Icon: Gauge,
    track: [2, 2, 3, 4, 4],
    decision: "Transition now",
    decisionTone: "now",
    liveWith: "Upstream lineage gaps if refresh alerting and report owner exist.",
    mustClose: "Stale-dashboard alert, source dependency map, refresh RCA route.",
    pandav: "Dashboard freshness RCA and business impact analysis.",
    dimensions: { performance: 3, connectivity: 2, security: 3, change: 2, observability: 3, reliability: 2, ownership: 3, proactive: 2 }
  },
  {
    id: "biztalk",
    domain: "Legacy Integration",
    technology: "BizTalk",
    workloads: "Legacy orchestrations, adapters, file/API integrations",
    Icon: FileWarning,
    track: [0, 1, 2, 2, 2],
    decision: "Retire / migrate",
    decisionTone: "migrate",
    liveWith: "Temporary support wrapper only while migration path is active.",
    mustClose: "Hidden scripts, retry rules, owner, action plan and budget.",
    pandav: "Not a long-term agentic candidate; move through strangler migration.",
    dimensions: { performance: 1, connectivity: 1, security: 1, change: 1, observability: 1, reliability: 1, ownership: 1, proactive: 0 }
  },
  {
    id: "synapse",
    domain: "Legacy Data",
    technology: "Synapse / EDW",
    workloads: "Legacy warehouse, stored procedures, pipelines, data marts",
    Icon: Database,
    track: [0, 1, 2, 2, 2],
    decision: "Retire / migrate",
    decisionTone: "migrate",
    liveWith: "Controlled support only for known jobs and consumers.",
    mustClose: "Validation rules, lineage, cost baseline and cutover evidence.",
    pandav: "Migration factory to Databricks/Delta; retire the legacy path.",
    dimensions: { performance: 1, connectivity: 1, security: 1, change: 1, observability: 1, reliability: 1, ownership: 1, proactive: 0 }
  },
  {
    id: "ai-ready",
    domain: "AI-ready platform",
    technology: "LLM gateway / graph / approved recipes",
    workloads: "Future Teams front door, governed automation, agentic workflows",
    Icon: ShieldCheck,
    track: [1, 1, 2, 3, 5],
    decision: "Hold / defer",
    decisionTone: "hold",
    liveWith: "Prepared infrastructure can exist without running agents in the estate.",
    mustClose: "Policy, logging, cost controls, audit sink, rollback and gate ownership.",
    pandav: "The controlled path for assisted and agentic operations after gates pass.",
    dimensions: { performance: 1, connectivity: 2, security: 2, change: 1, observability: 1, reliability: 1, ownership: 2, proactive: 1 }
  }
];

export function DayOneSection() {
  return (
    <Section id="dayone" num="07" title="Day one: run as-is — the RFP delivered as written">
      <p className="sec-sub">
        Transition on the RFP's own mandated plan, re-anchored to the 30 October 2026 award. Your tools, your SLAs, your
        RACI boundary — unchanged. Nothing below requires anything agentic.
      </p>
      <div className="timeline">
        <div className="tl-award">
          <CalendarCheck2 size={14} aria-hidden="true" />
          Contract award · 30 Oct 2026 — mobilisation begins
        </div>
        <div className="tl-track">
          {transitionPlan.map((row, index) => {
            const hue = ["--tech", "--proof", "--ops", "--proof"][index];
            const kind = index % 2 === 0 ? "Ramp-up" : "Autonomous";
            return (
              <div className="tl-stop" key={row.phase} style={{ "--dot": `var(${hue})` } as CSSProperties}>
                <div className="tl-marker">
                  <span className="tl-dot" />
                  {index < transitionPlan.length - 1 && <span className="tl-connector" />}
                </div>
                <span className="tl-window">{row.window}</span>
                <div className="tl-card">
                  <span className={`tl-kind ${kind === "Autonomous" ? "live" : ""}`}>{kind}</span>
                  <strong>{row.phase}</strong>
                  <p>{row.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="tl-foot">Bi-weekly readiness assessments throughout · 50+ parameter cutover, agreed jointly on evidence</p>
      </div>
      <div className="infra-stack dayone-facts">
        {dayOneFacts.map((fact) => (
          <div className="infra-row" key={fact.label}>
            <strong>{fact.label}</strong>
            <span>{fact.value}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function maturityLabel(level: number) {
  return maturityLevels.find((item) => item.level === level)?.label ?? `M${level}`;
}

function scoreTone(score: number) {
  if (score >= 4) return "good";
  if (score >= 2) return "partial";
  return "gap";
}

type PlatformDimensionMarks = Record<string, DimensionScores>;

function dimensionScoresFromHorizon(platform: ServicePlatform, horizonIndex: number) {
  return Object.fromEntries(
    readinessDimensions.map((dimension) => {
      const baseline = platform.dimensions[dimension.id];
      const horizonCeiling = platform.track[horizonIndex] ?? platform.track[0];
      const stagedUplift = Math.max(0, horizonIndex);
      const score = Math.min(5, Math.max(baseline, Math.min(horizonCeiling, baseline + stagedUplift)));
      return [dimension.id, Math.round(score)];
    })
  ) as DimensionScores;
}

function dimensionMarksFromHorizon(horizonIndex: number) {
  return Object.fromEntries(
    servicePlatforms.map((platform) => [platform.id, dimensionScoresFromHorizon(platform, horizonIndex)])
  ) as PlatformDimensionMarks;
}

function radarPoint(index: number, total: number, value: number, outerRadius = 42) {
  const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
  const radius = (Math.max(0, Math.min(5, value)) / 5) * outerRadius;
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius
  };
}

function platformRadarValues(scores: DimensionScores) {
  return readinessDimensions.map((dimension) => scores[dimension.id]);
}

function platformMaturityFromScores(scores: DimensionScores) {
  const values = platformRadarValues(scores);
  const average = averageScore(values);
  const weakestScore = Math.min(...values);
  const weakestDimension = readinessDimensions.find((dimension) => scores[dimension.id] === weakestScore) ?? readinessDimensions[0];
  const level = Math.max(0, Math.min(5, Math.floor(Math.min(average, weakestScore + 1))));
  return { average, level, values, weakestDimension, weakestScore };
}

function aggregateRadarValues(dimensionMarks: PlatformDimensionMarks) {
  return readinessDimensions.map((dimension) => {
    const total = servicePlatforms.reduce((sum, platform) => {
      const scores = dimensionMarks[platform.id] ?? dimensionScoresFromHorizon(platform, 1);
      return sum + scores[dimension.id];
    }, 0);
    return total / servicePlatforms.length;
  });
}

function averageScore(values: number[]) {
  return values.reduce((sum, score) => sum + score, 0) / values.length;
}

function escapeHtml(value: string | number) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[character] ?? character;
  });
}

const exportPalette = {
  paper: "#f7f8fa",
  card: "#ffffff",
  ink: "#16181d",
  muted: "#626a73",
  line: "#d9dee6",
  tech: "#315f92",
  proof: "#2f7d51",
  ops: "#a86d1e"
};

function buildRadarSvgMarkup(title: string, values: number[], centerLabel: string, centerSub: string) {
  const points = values.map((value, index) => radarPoint(index, readinessDimensions.length, value));
  const polygon = points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
  const closingPoint = points[0] ? `${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}` : "";
  const rings = [1, 2, 3, 4, 5]
    .map(
      (ring) =>
        `<circle cx="50" cy="50" r="${((ring / 5) * 42).toFixed(2)}" fill="none" stroke="${exportPalette.line}" stroke-width="0.55" />`
    )
    .join("");
  const axes = readinessDimensions
    .map((dimension, index) => {
      const outer = radarPoint(index, readinessDimensions.length, 5);
      const label = radarPoint(index, readinessDimensions.length, 5.85);
      const anchor = label.x < 42 ? "end" : label.x > 58 ? "start" : "middle";
      const baseline = label.y < 44 ? "text-after-edge" : label.y > 56 ? "text-before-edge" : "middle";
      return `
        <line x1="50" y1="50" x2="${outer.x.toFixed(2)}" y2="${outer.y.toFixed(2)}" stroke="${exportPalette.muted}" stroke-width="0.45" opacity="0.45" />
        <text x="${label.x.toFixed(2)}" y="${label.y.toFixed(2)}" text-anchor="${anchor}" dominant-baseline="${baseline}" fill="${exportPalette.muted}" font-family="Arial, sans-serif" font-size="3.4" font-weight="700">${escapeHtml(dimension.label)}</text>
      `;
    })
    .join("");

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="360" viewBox="-9 -9 118 118">
      <rect x="-9" y="-9" width="118" height="118" rx="4" fill="${exportPalette.paper}" />
      <text x="50" y="-2.5" text-anchor="middle" fill="${exportPalette.ink}" font-family="Arial, sans-serif" font-size="4.3" font-weight="700">${escapeHtml(title)}</text>
      ${rings}
      ${axes}
      <polygon points="${polygon}" fill="${exportPalette.tech}" opacity="0.22" />
      <polyline points="${polygon} ${closingPoint}" fill="none" stroke="${exportPalette.tech}" stroke-linejoin="round" stroke-width="1.65" />
      ${points
        .map(
          (point) =>
            `<circle cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="1.75" fill="${exportPalette.card}" stroke="${exportPalette.tech}" stroke-width="0.9" />`
        )
        .join("")}
      <text x="50" y="48" text-anchor="middle" fill="${exportPalette.ink}" font-family="Arial, sans-serif" font-size="8" font-weight="800">${escapeHtml(centerLabel)}</text>
      <text x="50" y="54" text-anchor="middle" fill="${exportPalette.muted}" font-family="Arial, sans-serif" font-size="3.5" font-weight="700">${escapeHtml(centerSub)}</text>
    </svg>
  `;
}

function svgDataUri(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function buildMaturityWorkbookHtml(dimensionMarks: PlatformDimensionMarks) {
  const platformSummaries = servicePlatforms.map((platform) =>
    platformMaturityFromScores(dimensionMarks[platform.id] ?? dimensionScoresFromHorizon(platform, 1))
  );
  const aggregateValues = aggregateRadarValues(dimensionMarks);
  const averageMaturity = averageScore(aggregateValues);
  const runReadyCount = platformSummaries.filter((summary) => summary.level >= 2).length;
  const controlledCount = platformSummaries.filter((summary) => summary.level >= 3).length;
  const proactiveCount = platformSummaries.filter((summary) => summary.level >= 4).length;
  const pandavReadyCount = platformSummaries.filter((summary) => summary.level >= 5).length;
  const generatedAt = new Date().toLocaleString();
  const summaryRadar = svgDataUri(
    buildRadarSvgMarkup("Aggregate technology maturity", aggregateValues, `M${averageMaturity.toFixed(1)}`, "live estate")
  );

  const summaryRows = [
    ["Average maturity", `M${averageMaturity.toFixed(1)}`],
    ["Run-ready coverage", `${runReadyCount}/${servicePlatforms.length}`],
    ["Controlled or better", `${controlledCount}/${servicePlatforms.length}`],
    ["Proactive coverage", `${proactiveCount}/${servicePlatforms.length}`],
    ["Pandav candidates", `${pandavReadyCount}/${servicePlatforms.length}`]
  ]
    .map((row) => `<tr><th>${escapeHtml(row[0])}</th><td>${escapeHtml(row[1])}</td></tr>`)
    .join("");

  const trackerRows = servicePlatforms
    .map((platform) => {
      const scores = dimensionMarks[platform.id] ?? dimensionScoresFromHorizon(platform, 1);
      const summary = platformMaturityFromScores(scores);
      const dimensionCells = readinessDimensions
        .map((dimension) => `<td>${escapeHtml(maturityLabel(scores[dimension.id]))}</td>`)
        .join("");
      const trackCells = platform.track
        .map((_, index) => {
          const plannedSummary = platformMaturityFromScores(dimensionScoresFromHorizon(platform, index));
          return `<td>${escapeHtml(maturityLabel(plannedSummary.level))}</td>`;
        })
        .join("");
      return `
        <tr>
          <td>${escapeHtml(platform.domain)}</td>
          <td>${escapeHtml(platform.technology)}</td>
          <td>${escapeHtml(platform.workloads)}</td>
          <td>${escapeHtml(maturityLabel(summary.level))}</td>
          <td>${summary.average.toFixed(1)}</td>
          <td>${escapeHtml(summary.weakestDimension.label)} ${escapeHtml(maturityLabel(summary.weakestScore))}</td>
          <td>${escapeHtml(platform.decision)}</td>
          ${trackCells}
          ${dimensionCells}
          <td>${escapeHtml(platform.liveWith)}</td>
          <td>${escapeHtml(platform.mustClose)}</td>
          <td>${escapeHtml(platform.pandav)}</td>
        </tr>
      `;
    })
    .join("");

  const lineItemSections = servicePlatforms
    .map((platform) => {
      const scores = dimensionMarks[platform.id] ?? dimensionScoresFromHorizon(platform, 1);
      const summary = platformMaturityFromScores(scores);
      const values = summary.values;
      const radarUri = svgDataUri(
        buildRadarSvgMarkup(platform.technology, values, `M${summary.average.toFixed(1)}`, maturityLabel(summary.level))
      );
      const dimensionRows = readinessDimensions
        .map((dimension, index) => {
          const value = values[index] ?? 0;
          return `<tr><th>${escapeHtml(dimension.label)}</th><td>${escapeHtml(maturityLabel(value))}</td><td>${escapeHtml(dimension.short)}</td></tr>`;
        })
        .join("");
      return `
        <h3>${escapeHtml(platform.technology)}</h3>
        <table class="line-layout">
          <tr>
            <td class="radar-image"><img src="${radarUri}" width="300" height="300" alt="${escapeHtml(platform.technology)} radar" /></td>
            <td>
              <table>
                <tr><th>Domain</th><td>${escapeHtml(platform.domain)}</td></tr>
                <tr><th>Calculated mark</th><td>${escapeHtml(maturityLabel(summary.level))}</td></tr>
                <tr><th>Radar average</th><td>${summary.average.toFixed(1)}</td></tr>
                <tr><th>Weakest area</th><td>${escapeHtml(summary.weakestDimension.label)} ${escapeHtml(maturityLabel(summary.weakestScore))}</td></tr>
                <tr><th>Decision</th><td>${escapeHtml(platform.decision)}</td></tr>
                <tr><th>Must close</th><td>${escapeHtml(platform.mustClose)}</td></tr>
                <tr><th>Pandav path</th><td>${escapeHtml(platform.pandav)}</td></tr>
              </table>
              <table>
                <tr><th>Dimension</th><th>Measured maturity</th><th>Meaning</th></tr>
                ${dimensionRows}
              </table>
            </td>
          </tr>
        </table>
      `;
    })
    .join("");

  return `
    <!doctype html>
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="utf-8" />
        <style>
          body { color: ${exportPalette.ink}; font-family: Arial, sans-serif; }
          h1 { font-size: 22px; margin: 0 0 4px; }
          h2 { border-top: 2px solid ${exportPalette.tech}; font-size: 17px; margin: 24px 0 10px; padding-top: 10px; }
          h3 { color: ${exportPalette.tech}; font-size: 14px; margin: 20px 0 8px; }
          p { color: ${exportPalette.muted}; font-size: 11px; margin: 0 0 12px; }
          table { border-collapse: collapse; margin-bottom: 12px; width: 100%; }
          th { background: ${exportPalette.paper}; color: ${exportPalette.ink}; font-weight: 700; }
          th, td { border: 1px solid ${exportPalette.line}; font-size: 11px; padding: 6px 8px; text-align: left; vertical-align: top; }
          .summary-layout td { border: 0; vertical-align: top; }
          .summary-card { width: 35%; }
          .radar-image { width: 320px; }
          .line-layout { page-break-inside: avoid; }
          .line-layout > tbody > tr > td { border: 1px solid ${exportPalette.line}; }
        </style>
      </head>
      <body>
        <h1>Pandora transition maturity tracker</h1>
        <p>Generated from the representative live tracker: ${escapeHtml(generatedAt)}</p>

        <h2>Estate maturity radar</h2>
        <table class="summary-layout">
          <tr>
            <td class="radar-image"><img src="${summaryRadar}" width="330" height="330" alt="Aggregate maturity radar" /></td>
            <td class="summary-card">
              <table>${summaryRows}</table>
            </td>
          </tr>
        </table>

        <h2>Technology maturity table</h2>
        <table>
          <tr>
            <th>Domain</th>
            <th>Technology</th>
            <th>Apps / workloads</th>
            <th>Calculated mark</th>
            <th>Radar average</th>
            <th>Weakest area</th>
            <th>Decision</th>
            ${maturityHorizons.map((horizon) => `<th>${escapeHtml(horizon.label)}</th>`).join("")}
            ${readinessDimensions.map((dimension) => `<th>${escapeHtml(dimension.label)}</th>`).join("")}
            <th>Can live with temporarily</th>
            <th>Must close to mature</th>
            <th>Long-term Pandav path</th>
          </tr>
          ${trackerRows}
        </table>

        <h2>Line item radar catalogue</h2>
        ${lineItemSections}
      </body>
    </html>
  `;
}

function downloadMaturityWorkbook(dimensionMarks: PlatformDimensionMarks) {
  if (typeof document === "undefined") return;
  const workbookHtml = buildMaturityWorkbookHtml(dimensionMarks);
  const blob = new Blob([workbookHtml], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pandora-transition-maturity-${new Date().toISOString().slice(0, 10)}.xls`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function MaturityRadarSvg({
  values,
  average,
  ariaLabel,
  centerLabel = "live estate",
  className = "radar-svg"
}: {
  values: number[];
  average: number;
  ariaLabel: string;
  centerLabel?: string;
  className?: string;
}) {
  const radarPoints = values.map((value, index) => radarPoint(index, readinessDimensions.length, value));
  const radarPolygon = radarPoints.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
  const closingPoint = radarPoints[0] ? `${radarPoints[0].x.toFixed(2)},${radarPoints[0].y.toFixed(2)}` : "";

  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label={ariaLabel}>
      {[1, 2, 3, 4, 5].map((ring) => (
        <circle
          className="radar-ring"
          cx="50"
          cy="50"
          r={(ring / 5) * 42}
          key={ring}
        />
      ))}
      {readinessDimensions.map((dimension, index) => {
        const outer = radarPoint(index, readinessDimensions.length, 5);
        const label = radarPoint(index, readinessDimensions.length, 5.75);
        return (
          <Fragment key={dimension.id}>
            <line className="radar-axis" x1="50" y1="50" x2={outer.x} y2={outer.y} />
            <text
              className="radar-axis-label"
              x={label.x}
              y={label.y}
              textAnchor={label.x < 42 ? "end" : label.x > 58 ? "start" : "middle"}
              dominantBaseline={label.y < 44 ? "text-after-edge" : label.y > 56 ? "text-before-edge" : "middle"}
            >
              {dimension.label}
            </text>
          </Fragment>
        );
      })}
      <polygon className="radar-area" points={radarPolygon} />
      <polyline className="radar-line" points={`${radarPolygon} ${closingPoint}`} />
      {radarPoints.map((point, index) => (
        <circle className="radar-dot" cx={point.x} cy={point.y} r="1.8" key={readinessDimensions[index].id} />
      ))}
      <text className="radar-core-label" x="50" y="48" textAnchor="middle">
        M{average.toFixed(1)}
      </text>
      <text className="radar-core-sub" x="50" y="54" textAnchor="middle">
        {centerLabel}
      </text>
    </svg>
  );
}

function RepresentativeMaturityRadar({
  activePlatformId,
  setActivePlatformId
}: {
  activePlatformId: string;
  setActivePlatformId: (platformId: string) => void;
}) {
  const [dimensionMarks, setDimensionMarks] = useState<PlatformDimensionMarks>(() => dimensionMarksFromHorizon(1));
  const [lineItemPlatformId, setLineItemPlatformId] = useState<string | null>(null);
  const platformSummaries = servicePlatforms.map((platform) => {
    const scores = dimensionMarks[platform.id] ?? dimensionScoresFromHorizon(platform, 1);
    return { platform, scores, ...platformMaturityFromScores(scores) };
  });
  const radarValues = aggregateRadarValues(dimensionMarks);
  const averageMaturity = averageScore(radarValues);
  const runReadyCount = platformSummaries.filter((summary) => summary.level >= 2).length;
  const controlledCount = platformSummaries.filter((summary) => summary.level >= 3).length;
  const proactiveCount = platformSummaries.filter((summary) => summary.level >= 4).length;
  const pandavReadyCount = platformSummaries.filter((summary) => summary.level >= 5).length;
  const distribution = maturityLevels.map((level) => {
    const count = platformSummaries.filter((summary) => summary.level === level.level).length;
    return {
      ...level,
      count,
      percent: (count / servicePlatforms.length) * 100
    };
  });
  const lineItemPlatform = lineItemPlatformId ? servicePlatforms.find((platform) => platform.id === lineItemPlatformId) : null;
  const lineItemScores = lineItemPlatform ? dimensionMarks[lineItemPlatform.id] ?? dimensionScoresFromHorizon(lineItemPlatform, 1) : null;
  const lineItemSummary = lineItemScores ? platformMaturityFromScores(lineItemScores) : null;
  const lineItemValues = lineItemSummary?.values ?? [];
  const lineItemAverage = lineItemSummary?.average ?? 0;
  const lineItemLevel = lineItemSummary?.level ?? 0;

  const setDimensionLevel = (platform: ServicePlatform, dimensionId: ReadinessDimensionId, level: number) => {
    setDimensionMarks((marks) => {
      const currentScores = marks[platform.id] ?? dimensionScoresFromHorizon(platform, 1);
      return {
        ...marks,
        [platform.id]: {
          ...currentScores,
          [dimensionId]: level
        }
      };
    });
    setActivePlatformId(platform.id);
  };

  const advanceDimensionLevel = (platform: ServicePlatform, dimensionId: ReadinessDimensionId) => {
    const currentScores = dimensionMarks[platform.id] ?? dimensionScoresFromHorizon(platform, 1);
    setDimensionLevel(platform, dimensionId, (currentScores[dimensionId] + 1) % 6);
  };

  const openPlatformRadar = (platformId: string) => {
    setActivePlatformId(platformId);
    setLineItemPlatformId(platformId);
  };

  return (
    <div className="representative-radar">
      <div className="representative-radar-head">
        <div>
          <span className="coverage-kicker">Representative live tracker</span>
          <h4>Dimension-led maturity tracker across the technology scope</h4>
          <p>
            Each technology is measured by the capabilities needed to run it: tooling, reporting, alert quality,
            ownership and triage across performance, connectivity, security, pipeline, observability and reliability.
          </p>
        </div>
        <div className="radar-presets" aria-label="Representative tracker presets">
          <button type="button" onClick={() => setDimensionMarks(dimensionMarksFromHorizon(0))}>Now</button>
          <button type="button" onClick={() => setDimensionMarks(dimensionMarksFromHorizon(1))}>Day 60</button>
          <button type="button" onClick={() => setDimensionMarks(dimensionMarksFromHorizon(4))}>12+ mo target</button>
          <button type="button" className="export" onClick={() => downloadMaturityWorkbook(dimensionMarks)}>
            <Download size={13} aria-hidden="true" />
            Export Excel
          </button>
        </div>
      </div>

      <div className="radar-summary" aria-label="Representative tracker summary">
        <div className="radar-summary-card">
          <span>Average maturity</span>
          <strong>M{averageMaturity.toFixed(1)}</strong>
          <small>{controlledCount} controlled or better</small>
        </div>
        <div className="radar-summary-card">
          <span>Run-ready coverage</span>
          <strong>{runReadyCount}/{servicePlatforms.length}</strong>
          <small>calculated M2+ across capability evidence</small>
        </div>
        <div className="radar-summary-card">
          <span>Proactive coverage</span>
          <strong>{proactiveCount}/{servicePlatforms.length}</strong>
          <small>calculated M4+ SLO, prevention and RCA maturity</small>
        </div>
        <div className="radar-summary-card">
          <span>Pandav candidates</span>
          <strong>{pandavReadyCount}</strong>
          <small>calculated M5 patterns ready for controlled automation</small>
        </div>
      </div>

      <div className="radar-workbench">
        <div className="radar-chart-card">
          <div className="radar-chart-head">
            <span className="coverage-kicker">Maturity radar</span>
            <strong>{servicePlatforms.length} scoped technology groups</strong>
          </div>
          <MaturityRadarSvg
            values={radarValues}
            average={averageMaturity}
            ariaLabel="Dynamic maturity radar chart across all scoped technologies"
          />

          <div className="radar-distribution" aria-label="Maturity distribution">
            {distribution.map((level) => (
              <div className="radar-distribution-row" key={level.label}>
                <span>{level.label}</span>
                <i>
                  <b style={{ width: `${Math.max(level.percent, level.count > 0 ? 8 : 0)}%` }} />
                </i>
                <strong>{level.count}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="radar-mark-table" role="table" aria-label="Live dimension maturity tracker by technology">
          <div className="radar-mark-head" role="row">
            <span role="columnheader">Technology scope</span>
            <span role="columnheader">Calc</span>
            {readinessDimensions.map((dimension) => (
              <span role="columnheader" key={dimension.id}>{dimension.abbr}</span>
            ))}
            <span role="columnheader">Radar</span>
          </div>
          {platformSummaries.map(({ platform, scores, level, weakestDimension, weakestScore }) => {
            const Icon = platform.Icon;
            return (
              <div className={`radar-mark-row ${platform.id === activePlatformId ? "active" : ""}`} role="row" key={platform.id}>
                <div className="radar-platform-cell" role="cell">
                  <button
                    type="button"
                    className="radar-platform-select"
                    onClick={() => setActivePlatformId(platform.id)}
                  >
                    <Icon size={15} aria-hidden="true" />
                    <span>
                      <strong>{platform.technology}</strong>
                      <small>{platform.domain}</small>
                    </span>
                  </button>
                </div>
                <span className={`calculated-score ${scoreTone(level)}`} role="cell">
                  <strong>{maturityLabel(level)}</strong>
                  <small>{weakestDimension.abbr} {maturityLabel(weakestScore)}</small>
                </span>
                {readinessDimensions.map((dimension) => (
                  <span className="radar-score-cell" role="cell" key={`${platform.id}-${dimension.id}`}>
                    <button
                      type="button"
                      className={`dimension-score-button ${scoreTone(scores[dimension.id])}`}
                      onClick={() => advanceDimensionLevel(platform, dimension.id)}
                      aria-label={`${platform.technology} ${dimension.label} ${maturityLabel(scores[dimension.id])}`}
                      title={`${dimension.label}: ${maturityLabel(scores[dimension.id])}`}
                    >
                      {maturityLabel(scores[dimension.id])}
                    </button>
                  </span>
                ))}
                <span className="radar-action-cell" role="cell">
                  <button
                    type="button"
                    className="radar-line-open"
                    onClick={() => openPlatformRadar(platform.id)}
                    aria-label={`Open ${platform.technology} line item radar`}
                    title="Line item radar"
                  >
                    <Gauge size={14} aria-hidden="true" />
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {lineItemPlatform && lineItemSummary && lineItemScores && (
        <div
          className="line-radar-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLineItemPlatformId(null);
          }}
        >
          <div className="line-radar-modal" role="dialog" aria-modal="true" aria-labelledby="line-radar-title">
            <div className="line-radar-top">
              <div className="line-radar-title">
                <span className="coverage-kicker">{lineItemPlatform.domain}</span>
                <h4 id="line-radar-title">{lineItemPlatform.technology}</h4>
                <p>{lineItemPlatform.workloads}</p>
              </div>
              <div className="line-radar-actions">
                <button type="button" className="line-radar-export" onClick={() => downloadMaturityWorkbook(dimensionMarks)}>
                  <Download size={14} aria-hidden="true" />
                  Export workbook
                </button>
                <button
                  type="button"
                  className="line-radar-close"
                  onClick={() => setLineItemPlatformId(null)}
                  aria-label="Close line item radar"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="line-radar-body">
              <div className="line-radar-visual">
                <MaturityRadarSvg
                  values={lineItemValues}
                  average={lineItemAverage}
                  ariaLabel={`${lineItemPlatform.technology} line item maturity radar`}
                  centerLabel={maturityLabel(lineItemLevel)}
                  className="line-radar-svg"
                />
                <div className="line-radar-metrics">
                  <div>
                    <span>Calculated mark</span>
                    <strong>{maturityLabel(lineItemLevel)}</strong>
                  </div>
                  <div>
                    <span>Radar average</span>
                    <strong>M{lineItemAverage.toFixed(1)}</strong>
                  </div>
                  <div>
                    <span>Decision</span>
                    <strong>{lineItemPlatform.decision}</strong>
                  </div>
                </div>
              </div>

              <div className="line-radar-content">
                <div className="line-radar-dimension-editor">
                  <div className="line-radar-editor-head">
                    <span>Capability maturity by support dimension</span>
                    <strong>Weakest: {lineItemSummary.weakestDimension.label} {maturityLabel(lineItemSummary.weakestScore)}</strong>
                  </div>
                  {readinessDimensions.map((dimension) => (
                    <div className="line-radar-dimension-row" key={dimension.id}>
                      <span className="line-radar-dimension-copy">
                        <strong>{dimension.label}</strong>
                        <small>{dimension.short}</small>
                      </span>
                      <div className="line-radar-dimension-levels">
                        {maturityLevels.map((level) => (
                          <button
                            type="button"
                            className={lineItemScores[dimension.id] === level.level ? "active" : ""}
                            key={`${dimension.id}-${level.label}`}
                            onClick={() => setDimensionLevel(lineItemPlatform, dimension.id, level.level)}
                            aria-pressed={lineItemScores[dimension.id] === level.level}
                          >
                            {level.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="line-radar-dimension-grid">
                  {readinessDimensions.map((dimension, index) => {
                    const score = lineItemValues[index] ?? 0;
                    return (
                      <div className={`line-dimension ${scoreTone(score)}`} key={dimension.id}>
                        <span>{dimension.label}</span>
                        <strong>{maturityLabel(score)}</strong>
                        <small>{dimension.short}</small>
                      </div>
                    );
                  })}
                </div>

                <div className="line-radar-path" aria-label={`${lineItemPlatform.technology} planned maturity path`}>
                  {maturityHorizons.map((horizon, index) => {
                    const plannedSummary = platformMaturityFromScores(dimensionScoresFromHorizon(lineItemPlatform, index));
                    const trackLevel = plannedSummary.level;
                    const state = trackLevel <= lineItemLevel ? "reached" : "target";
                    return (
                      <div className={`line-radar-step ${state}`} key={horizon.id}>
                        <span>{horizon.label}</span>
                        <strong>{maturityLabel(trackLevel)}</strong>
                        <small>{horizon.title}</small>
                      </div>
                    );
                  })}
                </div>

                <div className="line-radar-notes">
                  <div>
                    <strong>Can live with temporarily</strong>
                    <p>{lineItemPlatform.liveWith}</p>
                  </div>
                  <div>
                    <strong>Must close to mature</strong>
                    <p>{lineItemPlatform.mustClose}</p>
                  </div>
                  <div>
                    <strong>Long-term Pandav path</strong>
                    <p>{lineItemPlatform.pandav}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceMaturityTracker() {
  const [activePlatformId, setActivePlatformId] = useState("kafka");
  const [activeHorizon, setActiveHorizon] = useState(1);
  const activePlatform = servicePlatforms.find((item) => item.id === activePlatformId) ?? servicePlatforms[0];
  const activeSummary = platformMaturityFromScores(dimensionScoresFromHorizon(activePlatform, activeHorizon));
  const activeLevel = activeSummary.level;
  const targetLevel = platformMaturityFromScores(dimensionScoresFromHorizon(activePlatform, activePlatform.track.length - 1)).level;
  const activeHorizonMeta = maturityHorizons[activeHorizon] ?? maturityHorizons[0];
  const ActiveIcon = activePlatform.Icon;

  return (
    <Reveal className="maturity-tracker">
      <div className="maturity-tracker-head">
        <div>
          <span className="coverage-kicker">Run maturity uplift tracker</span>
          <h3>Transition is the baseline; maturity is the plan we track</h3>
          <p>
            Each scoped platform is assessed across run dimensions, assigned a transition decision, then moved from today&apos;s
            evidence level toward proactive service and Pandav readiness.
          </p>
        </div>
        <div className="maturity-horizons" role="tablist" aria-label="Maturity tracking horizon">
          {maturityHorizons.map((horizon, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={index === activeHorizon}
              key={horizon.id}
              onClick={() => setActiveHorizon(index)}
            >
              <strong>{horizon.label}</strong>
              <span>{horizon.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="maturity-showcase">
        <div className="maturity-cycle-card">
          <div className="maturity-cycle-title">
            <span className="coverage-kicker">{activeHorizonMeta.detail}</span>
            <h4>{activePlatform.technology}</h4>
          </div>
          <div
            className="maturity-cycle-graph"
            role="img"
            aria-label={`${activePlatform.technology} is tracked at ${maturityLabel(activeLevel)} for ${activeHorizonMeta.label}, targeting ${maturityLabel(targetLevel)}`}
          >
            <div className="maturity-cycle-center">
              <ActiveIcon size={24} aria-hidden="true" />
              <strong>{maturityLabel(activeLevel)}</strong>
              <span>{activeHorizonMeta.label}</span>
              <small>target {maturityLabel(targetLevel)}</small>
            </div>
            {maturityLevels.map((level) => {
              const state = level.level === activeLevel ? "active" : level.level <= activeLevel ? "passed" : level.level === targetLevel ? "target" : "";
              return (
                <span
                  className={`maturity-cycle-node ${state}`}
                  style={{ "--node-x": `${level.x}%`, "--node-y": `${level.y}%`, "--node-hue": `var(${level.hue})` } as CSSProperties}
                  key={level.label}
                >
                  <strong>{level.label}</strong>
                  <small>{level.title}</small>
                </span>
              );
            })}
          </div>
        </div>

        <div className="maturity-detail-card">
          <div className="maturity-detail-head">
            <span className="maturity-detail-icon" aria-hidden="true">
              <ActiveIcon size={20} />
            </span>
            <div>
              <span className="coverage-kicker">{activePlatform.domain}</span>
              <h4>{activePlatform.technology}</h4>
              <p>{activePlatform.workloads}</p>
            </div>
            <span className={`coverage-decision-badge ${activePlatform.decisionTone}`}>{activePlatform.decision}</span>
          </div>

          <div className="readiness-heatmap" aria-label={`${activePlatform.technology} readiness dimensions`}>
            {readinessDimensions.map((dimension) => {
              const score = activeSummary.values[readinessDimensions.findIndex((item) => item.id === dimension.id)] ?? activeSummary.level;
              return (
                <div className={`readiness-cell ${scoreTone(score)}`} key={dimension.id}>
                  <span>{dimension.label}</span>
                  <strong>{maturityLabel(score)}</strong>
                  <small>{dimension.short}</small>
                  <i style={{ width: `${Math.max(8, score * 20)}%` }} />
                </div>
              );
            })}
          </div>

          <div className="maturity-gap-plan">
            <div>
              <strong>Can live with temporarily</strong>
              <p>{activePlatform.liveWith}</p>
            </div>
            <div>
              <strong>Must close to mature</strong>
              <p>{activePlatform.mustClose}</p>
            </div>
            <div>
              <strong>Long-term Pandav path</strong>
              <p>{activePlatform.pandav}</p>
            </div>
          </div>
        </div>
      </div>

      <RepresentativeMaturityRadar activePlatformId={activePlatformId} setActivePlatformId={setActivePlatformId} />

      <div className="maturity-platform-table" role="table" aria-label="Technology platform maturity tracker">
        <div className="maturity-table-head" role="row">
          <span role="columnheader">Technology in scope</span>
          <span role="columnheader">Possible apps / workloads</span>
          {maturityHorizons.map((horizon) => (
            <span role="columnheader" key={horizon.id}>{horizon.label}</span>
          ))}
          <span role="columnheader">Decision</span>
        </div>
        {servicePlatforms.map((platform) => {
          const Icon = platform.Icon;
          return (
            <button
              type="button"
              className={`maturity-table-row ${platform.id === activePlatform.id ? "active" : ""}`}
              role="row"
              key={platform.id}
              onClick={() => setActivePlatformId(platform.id)}
            >
              <span className="maturity-platform-name" role="cell">
                <Icon size={16} aria-hidden="true" />
                <span>
                  <strong>{platform.technology}</strong>
                  <small>{platform.domain}</small>
                </span>
              </span>
              <span className="maturity-workloads" role="cell">{platform.workloads}</span>
              {platform.track.map((_, index) => {
                const level = platformMaturityFromScores(dimensionScoresFromHorizon(platform, index)).level;
                return (
                  <span
                    className={`maturity-mini-level ${index === activeHorizon ? "selected" : ""} ${level >= 4 ? "good" : level >= 2 ? "partial" : "gap"}`}
                    role="cell"
                    key={`${platform.id}-${maturityHorizons[index].id}`}
                  >
                    {maturityLabel(level)}
                  </span>
                );
              })}
              <span className={`maturity-row-decision ${platform.decisionTone}`} role="cell">{platform.decision}</span>
            </button>
          );
        })}
      </div>
    </Reveal>
  );
}

export function TransitionCoverageSection() {
  const [activeCaseId, setActiveCaseId] = useState(transitionCases[0].id);
  const [activeStage, setActiveStage] = useState(0);
  const activeCase = transitionCases.find((item) => item.id === activeCaseId) ?? transitionCases[0];
  const activeStep = activeCase.steps[activeStage] ?? activeCase.steps[0];
  const activeStageMeta = coverageStages[activeStage] ?? coverageStages[0];
  const ActiveIcon = activeCase.Icon;
  const progress = `${(activeStage / (coverageStages.length - 1)) * 100}%`;

  return (
    <Section id="transition-coverage" num="08" title="Transition coverage — protected even if vendor handover is incomplete">
      <Reveal className="transition-brief">
        <div className="transition-brief-copy">
          <span className="coverage-kicker">Customer ask</span>
          <h3>Move from current vendor to self — without betting on perfect handover</h3>
          <p>{transitionCoverageIntro}</p>
        </div>
        <div className="coverage-proof-grid">
          {transitionCoverageProofPoints.map((point) => (
            <div className="coverage-proof" key={point.value}>
              <strong>{point.value}</strong>
              <span>{point.label}</span>
              <p>{point.detail}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <ServiceMaturityTracker />

      <Reveal className="coverage-cockpit">
        <div className="coverage-cases" role="tablist" aria-label="Transition risk examples">
          {transitionCases.map((item) => {
            const Icon = item.Icon;
            const active = item.id === activeCase.id;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={active}
                className={`coverage-case-tab ${item.decisionTone}`}
                key={item.id}
                onClick={() => {
                  setActiveCaseId(item.id);
                  setActiveStage(0);
                }}
              >
                <Icon size={17} aria-hidden="true" />
                <span>
                  <strong>{item.area}</strong>
                  <small>{item.title}</small>
                </span>
                <em>{item.decision}</em>
              </button>
            );
          })}
        </div>

        <div className="coverage-workbench">
          <div className="coverage-main-panel">
            <div className="coverage-current-head">
              <span className="coverage-domain-icon" aria-hidden="true">
                <ActiveIcon size={21} />
              </span>
              <div>
                <span className="coverage-kicker">{activeCase.area}</span>
                <h3>{activeCase.title}</h3>
                <p>{activeCase.ask}</p>
              </div>
              <span className={`coverage-decision-badge ${activeCase.decisionTone}`}>{activeCase.decision}</span>
            </div>

            <div
              className="coverage-evidence-flow"
              aria-label={`${activeCase.area} handover evidence path: vendor pack to live estate evidence to gap register to decision`}
            >
              <div className="coverage-flow-node vendor">
                <FileWarning size={16} aria-hidden="true" />
                <span>Vendor handover</span>
                <strong>{activeCase.handoverPercent}% usable</strong>
                <small>{activeCase.gap}</small>
              </div>
              <ArrowRight className="coverage-arrow" size={17} aria-hidden="true" />
              <div className="coverage-flow-node live">
                <SearchCheck size={16} aria-hidden="true" />
                <span>Live estate evidence</span>
                <strong>{activeCase.coveredPercent}% covered</strong>
                <small>Repos, logs, metrics, tickets, lineage and runtime state.</small>
              </div>
              <ArrowRight className="coverage-arrow" size={17} aria-hidden="true" />
              <div className="coverage-flow-node register">
                <ListChecks size={16} aria-hidden="true" />
                <span>Gap register</span>
                <strong>Owner + date</strong>
                <small>{activeCase.owner}</small>
              </div>
              <ArrowRight className="coverage-arrow" size={17} aria-hidden="true" />
              <div className={`coverage-flow-node decision ${activeCase.decisionTone}`}>
                <BadgeCheck size={16} aria-hidden="true" />
                <span>Gate decision</span>
                <strong>{activeCase.decision}</strong>
                <small>{activeCase.control}</small>
              </div>
            </div>

            <div className="coverage-walk-head">
              <div>
                <span className="coverage-kicker">Walk the transition boundary</span>
                <h3>{activeStageMeta.window}</h3>
              </div>
              <div className="coverage-walk-buttons" aria-label="Move through transition stages">
                <button type="button" onClick={() => setActiveStage(0)} disabled={activeStage === 0}>
                  <RotateCcw size={14} aria-hidden="true" /> Reset
                </button>
                <button type="button" onClick={() => setActiveStage((stage) => Math.max(0, stage - 1))} disabled={activeStage === 0}>
                  <ChevronLeft size={14} aria-hidden="true" /> Back
                </button>
                <button
                  type="button"
                  className="primary"
                  onClick={() => setActiveStage((stage) => Math.min(coverageStages.length - 1, stage + 1))}
                  disabled={activeStage === coverageStages.length - 1}
                >
                  Next gate <ChevronRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="coverage-stage-rail" style={{ "--progress": progress } as CSSProperties}>
              <span className="coverage-stage-line" aria-hidden="true">
                <i />
              </span>
              {coverageStages.map((stage, index) => {
                const StageIcon = stage.Icon;
                const state = index === activeStage ? "active" : index < activeStage ? "passed" : "todo";
                return (
                  <button
                    type="button"
                    className={`coverage-stage ${state}`}
                    style={{ "--stage-hue": `var(${stage.hue})` } as CSSProperties}
                    aria-current={index === activeStage}
                    key={stage.id}
                    onClick={() => setActiveStage(index)}
                  >
                    <span className="coverage-stage-dot">
                      <StageIcon size={14} aria-hidden="true" />
                    </span>
                    <strong>{stage.label}</strong>
                    <small>{stage.short}</small>
                  </button>
                );
              })}
            </div>

            <div className="coverage-step-card" style={{ "--stage-hue": `var(${activeStageMeta.hue})` } as CSSProperties}>
              <div>
                <span className="coverage-step-window">
                  <TimerReset size={14} aria-hidden="true" />
                  {activeStageMeta.window}
                </span>
                <h4>{activeStep.action}</h4>
                <p>{activeStep.evidence}</p>
              </div>
              <div className="coverage-step-confidence">
                <ShieldCheck size={16} aria-hidden="true" />
                <span>{activeStep.confidence}</span>
              </div>
            </div>
          </div>

          <aside className="coverage-side-panel">
            <div className="coverage-score" style={{ "--before": `${activeCase.handoverPercent}%`, "--after": `${activeCase.coveredPercent}%` } as CSSProperties}>
              <div className="coverage-score-head">
                <AlertTriangle size={16} aria-hidden="true" />
                <strong>Handover risk coverage</strong>
              </div>
              <div className="coverage-score-row before">
                <span>Incoming vendor pack</span>
                <b>{activeCase.handoverPercent}%</b>
                <i />
              </div>
              <div className="coverage-score-row after">
                <span>After estate discovery</span>
                <b>{activeCase.coveredPercent}%</b>
                <i />
              </div>
            </div>

            <div className="coverage-side-block">
              <span className="coverage-kicker">Not handed over</span>
              <div className="coverage-chip-list">
                {activeCase.missing.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="coverage-side-block">
              <span className="coverage-kicker">Independent evidence</span>
              <div className="coverage-chip-list evidence">
                {activeCase.evidence.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="coverage-control-box">
              <ShieldCheck size={18} aria-hidden="true" />
              <div>
                <strong>Control before takeover</strong>
                <p>{activeCase.control}</p>
              </div>
            </div>
          </aside>
        </div>
      </Reveal>

      <div className="coverage-decision-map" aria-label="Allowed transition decisions">
        {transitionReadinessBuckets.map((bucket) => (
          <Reveal className={`coverage-decision-card ${bucket.bucket === activeCase.decision ? "active" : ""}`} key={bucket.bucket}>
            <strong>{bucket.bucket}</strong>
            <p>{bucket.meaning}</p>
            <span>{bucket.decision}</span>
          </Reveal>
        ))}
      </div>

      <div className="transition-close-note">
        <CheckCircle2 size={18} aria-hidden="true" />
        <span>{transitionCoverageClose}</span>
      </div>
    </Section>
  );
}

export function AsIsLanesSection() {
  return (
    <Section id="lanes-asis" num="09" title="People · Technology · Operations — as-is first">
      <p className="sec-sub">
        The three delivery dimensions, each starting conventional and earning its way forward. The pattern is the same in
        all three: the valuable, unglamorous 80% first; the agentic step only ever by invitation.
      </p>
      <div className="asis-grid">
        {asIsLanes.map((lane) => (
          <Reveal className="asis-card" key={lane.id}>
            <h3>{lane.title}</h3>
            <ul>
              {lane.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="already">{lane.message}</div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function GovernanceSection() {
  return (
    <Section id="governance" num="10" title="Governance: two layers, one principle">
      <p className="sec-sub">
        Controls arrive before autonomy — always. Service governance runs from day one on the RFP's own cadence; agentic
        governance is prepared during Lane-1 quarters and switches on only when something agentic first touches the estate.
      </p>
      <div className="gov-planes">
        {governanceLayers.map((layer) => {
          const lit = layer.id === "service";
          return (
            <Fragment key={layer.id}>
              <Reveal className={`gov-plane ${lit ? "lit" : "dormant"}`}>
                <div className="gov-plane-head">
                  <span className={`gov-power ${lit ? "on" : "off"}`} aria-hidden="true">
                    <Power size={15} />
                  </span>
                  <div className="gov-plane-title">
                    <h3>{layer.name}</h3>
                    <span>{layer.sub}</span>
                  </div>
                  <span className={`chip ${lit ? "live" : "gap"}`}>{layer.state}</span>
                </div>
                <ul>
                  {layer.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
              {lit && (
                <div className="gov-switch">
                  <span className="gov-toggle" aria-hidden="true">
                    <span className="gov-toggle-knob" />
                  </span>
                  <span className="gov-switch-label">
                    Off by design. The switch flips at your first dial-up (Gate 1) — never before, and one scope item at a time.
                  </span>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
      <PullQuote quote={dialReview} source="The quarterly dial review — where the two layers meet" />
    </Section>
  );
}
