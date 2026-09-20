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
export type CoverageDecision = "Transition now" | "Transition with Risk Mitigation" | "Hold / defer" | "Retire / migrate";
export type DecisionTone = "now" | "control" | "hold" | "migrate";

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
    decision: "Transition with Risk Mitigation",
    decisionTone: "control",
    handoverPercent: 42,
    coveredPercent: 86,
    gap: "Topic owner missing, replay authority unclear, connector dependency undocumented.",
    owner: "Sapient L2/L3 with Pandora Integration owner",
    control: "Replay rehearsal, schema contract capture, connector restart path, named L2/L3 owner and two-week hypercare.",
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
        action: "Move to L1/L2 support with named risk mitigations.",
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
        action: "Burn down the residual risk or keep it visible in governance.",
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
        action: "Run a governed backfill rehearsal.",
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
        confidence: "The component moves only when the customer risk is mitigated."
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
        action: "Accept into support with standard release safeguards.",
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
        evidence: "A governed run shows where the legacy path can and cannot be operated safely.",
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
  { level: 3, label: "M3", title: "Risk-mitigated", short: "run with safeguards", hue: "--gov", x: 50, y: 91 },
  { level: 4, label: "M4", title: "Proactive", short: "SLO + prevention", hue: "--proof", x: 14, y: 70 },
  { level: 5, label: "M5", title: "Pandav ready", short: "safe automation", hue: "--accent", x: 14, y: 27 }
] as const;

const maturityDefinitions = [
  {
    label: "M0",
    title: "Unknown",
    meaning: "The item is in scope, but support cannot yet accept accountability because evidence is missing or unverified.",
    evidence: "Missing or untested owner, access, runbook, alert route, dependency map, restore path, rollback path or production behaviour baseline.",
    example: "A BizTalk flow exists, but retry rules, consumer impact, failure logs and replay ownership are not confirmed."
  },
  {
    label: "M1",
    title: "Discovered",
    meaning: "The item is inventoried and the gaps are visible. The team knows what must be closed before normal support.",
    evidence: "Inventory entry, likely owners, known dependencies, known monitoring source and dated gap plan.",
    example: "Kafka topics and connectors are listed, but schema owner and replay procedure are still being verified."
  },
  {
    label: "M2",
    title: "Run-ready",
    meaning: "Ops L1/L2 can monitor, triage and run known recovery actions with named escalation.",
    evidence: "Alert route, ServiceNow or PagerDuty mapping, tested access, basic runbook, escalation owner and support handoff.",
    example: "A Databricks job failure creates a ticket; L2 can rerun it; L3/Data SME is named for unresolved failures."
  },
  {
    label: "M3",
    title: "Risk-mitigated",
    meaning: "The service is governed, measurable and repeatable, not just technically runnable.",
    evidence: "SLA mapping, dashboard owner, change route, rollback evidence, runbook quality, RCA route and weekly service review.",
    example: "GitHub runner failures have alerting, owner, secret rotation path, rollback route and release evidence."
  },
  {
    label: "M4",
    title: "Proactive",
    meaning: "The team can spot and reduce risk before repeated incidents hit the business.",
    evidence: "SLOs, thresholds, trend analysis, problem backlog, RCA patterns, capacity signals and prevention actions.",
    example: "Kafka consumer lag trend triggers a prevention ticket before an outage and feeds connector tuning."
  },
  {
    label: "M5",
    title: "Pandav ready",
    meaning: "The pattern is safe enough for governed automation or agent-assisted operations with human gates.",
    evidence: "Approved action policy, audit trail, rollback, automation guardrails, outcome reporting and gate ownership.",
    example: "New Relic detects a known Kubernetes failure, drafts RCA and proposes approved remediation for human approval."
  }
] as const;

interface MaturityInputDimension {
  id: string;
  label: string;
  abbr: string;
  pillar: string;
  question: string;
  start: number;
  states: readonly [string, string, string, string, string, string];
}

const maturityInputDimensions: MaturityInputDimension[] = [
  {
    id: "scope",
    label: "Scope & inventory",
    abbr: "Scope",
    pillar: "Discovery",
    question: "Do we know what exists, where it runs and why it matters?",
    start: 1,
    states: [
      "Asset exists by name only; apps, jobs, topics, APIs or environments are not verified.",
      "Inventory exists with known gaps and criticality assumptions.",
      "Critical assets, environments and service records are mapped for support.",
      "Inventory is maintained with owners, tiers and support routing.",
      "Inventory is linked to health, incidents, changes and dependency trends.",
      "Inventory is graph-backed and usable by governed automation."
    ]
  },
  {
    id: "ownership",
    label: "Ownership & RACI",
    abbr: "Own",
    pillar: "People",
    question: "Is there a named service, technical and decision owner?",
    start: 0,
    states: [
      "No confirmed owner or escalation path; support would depend on tribal knowledge.",
      "Likely owner is identified, but RACI and escalation are not confirmed.",
      "L1/L2/L3 escalation owner is known and reachable.",
      "RACI is stable across service, change, incident and vendor decisions.",
      "Ownership quality is reviewed through service governance and recurring gaps are removed.",
      "Ownership graph is reliable enough for automated routing and assisted decisions."
    ]
  },
  {
    id: "access",
    label: "Access & permissions",
    abbr: "Access",
    pillar: "Governance",
    question: "Can support access the right systems safely when an incident happens?",
    start: 1,
    states: [
      "Access, break-glass or approval route is unknown or untested.",
      "Access requirement is listed, but not fully granted or rehearsed.",
      "Support access is tested for monitoring, triage and standard restore.",
      "Privileged access, approval, audit and break-glass paths are governed.",
      "Access gaps are proactively detected and reviewed before support impact.",
      "Access checks are policy-driven with auditable automated guardrails."
    ]
  },
  {
    id: "observability",
    label: "Observability & alerting",
    abbr: "Obs",
    pillar: "Tooling",
    question: "Are signals visible, routed and actionable by support?",
    start: 1,
    states: [
      "No verified signal, dashboard or alert route for support.",
      "Telemetry hook exists, but it is not reliably monitored or routed.",
      "Alert reaches PagerDuty, ServiceNow, Jira, Teams or email with owner and severity.",
      "Dashboard, alert rationale, runbook link and SLA route are stable.",
      "SLOs, trends, noise reduction and prevention alerts are active.",
      "Known alert patterns can trigger governed automation recommendations."
    ]
  },
  {
    id: "incident",
    label: "Incident & SLA process",
    abbr: "SLA",
    pillar: "Run",
    question: "Does an issue enter support with severity, clock, comms and escalation?",
    start: 1,
    states: [
      "No proven ticket path, SLA mapping or incident communication route.",
      "Process is described but not tested for this service.",
      "L1 can classify, ticket, route and start the SLA clock.",
      "P1-P4 workflow, comms, escalation and evidence capture are repeatable.",
      "Incident trends drive problem records and service review action.",
      "Incident evidence can be summarized and routed by an approved assistant."
    ]
  },
  {
    id: "runbooks",
    label: "Runbooks & known errors",
    abbr: "Runbk",
    pillar: "Run",
    question: "Can L1/L2 follow known actions without waiting for one expert?",
    start: 0,
    states: [
      "No usable runbook or known-error record.",
      "Draft notes exist, but steps, inputs, outputs or risks are incomplete.",
      "Known recovery actions are documented and usable by L1/L2.",
      "Runbooks are versioned, linked to alerts and validated through reverse shadow.",
      "Runbook gaps are mined from incidents and improved every cycle.",
      "Runbook steps are structured enough for governed automation."
    ]
  },
  {
    id: "recovery",
    label: "Recovery, replay & rollback",
    abbr: "Recover",
    pillar: "Reliability",
    question: "Can we restore service, replay data or roll back safely?",
    start: 0,
    states: [
      "Restore, replay, backfill or rollback route is unknown.",
      "Recovery route is known in theory but not evidenced.",
      "Basic restore or rerun path is tested with named escalation.",
      "Rollback, replay and recovery are rehearsed and documented.",
      "Recovery risk is measured through drills, trend data and error budgets.",
      "Approved recovery patterns can be suggested with audit and rollback guardrails."
    ]
  },
  {
    id: "dependencies",
    label: "Dependency & connectivity",
    abbr: "Dep",
    pillar: "Discovery",
    question: "Do we understand upstream, downstream and network dependencies?",
    start: 1,
    states: [
      "Consumers, producers, network paths or external dependencies are unknown.",
      "Partial dependency map exists with named unknowns.",
      "Critical dependencies and escalation contacts are known for support.",
      "Dependency map is maintained and tied to incidents, changes and releases.",
      "Connectivity trends and downstream impact are proactively monitored.",
      "Dependency graph can support impact analysis and automated routing."
    ]
  },
  {
    id: "change",
    label: "Change & release governance",
    abbr: "Change",
    pillar: "Governance",
    question: "Are deployment, approval and rollback paths understood?",
    start: 1,
    states: [
      "Change path, pipeline owner or rollback route is unknown.",
      "Pipeline exists, but approvals, evidence or fallback are unclear.",
      "Support knows release calendar, pipeline route and rollback escalation.",
      "Change approvals, test evidence, rollback and release ownership are governed.",
      "Failed-change trends feed release hardening and policy improvements.",
      "Policy-as-code and assisted change checks can be safely introduced."
    ]
  },
  {
    id: "security",
    label: "Security & compliance",
    abbr: "Sec",
    pillar: "Governance",
    question: "Are secrets, certificates, data access and audit obligations known?",
    start: 1,
    states: [
      "Security ownership, secrets, certs, RBAC or audit route is not verified.",
      "Security safeguards are identified with visible gaps.",
      "Support can identify security-related failures and escalate safely.",
      "Secrets, certs, RBAC, audit and policy guardrails are governed.",
      "Expiry, drift, access and compliance risks are proactively surfaced.",
      "Security checks are policy-driven with auditable automation gates."
    ]
  },
  {
    id: "performance",
    label: "Performance & capacity",
    abbr: "Perf",
    pillar: "Reliability",
    question: "Do we know normal behaviour, thresholds and capacity risks?",
    start: 1,
    states: [
      "No baseline for latency, job duration, throughput, capacity or lag.",
      "Baseline is being collected, but thresholds are not trusted.",
      "Normal behaviour and basic thresholds are known for support triage.",
      "Capacity and performance dashboards are owned and reviewed.",
      "Trends predict risk and trigger prevention work.",
      "Capacity and performance patterns can drive assisted remediation plans."
    ]
  },
  {
    id: "contracts",
    label: "Data & contract quality",
    abbr: "DQ",
    pillar: "Quality",
    question: "Are schemas, lineage, DQ checks, API contracts and acceptance rules known?",
    start: 0,
    states: [
      "Schema, lineage, data quality or API contract is unknown.",
      "Contracts are discovered but incomplete or not validated.",
      "Critical contracts and DQ checks are known for support triage.",
      "Contract tests, lineage and DQ ownership are governed.",
      "Drift, freshness and contract trends feed prevention backlog.",
      "Contract impact analysis can support safe assisted change."
    ]
  },
  {
    id: "knowledge",
    label: "Knowledge transfer resilience",
    abbr: "KT",
    pillar: "People",
    question: "Is knowledge held by the team rather than one person or vendor?",
    start: 0,
    states: [
      "Knowledge is vendor-held, undocumented or person-dependent.",
      "KT sessions or notes exist, but playback and reverse shadow are incomplete.",
      "Backup coverage and reverse-shadow evidence exist for support.",
      "Knowledge is captured in runbooks, recordings, SMEs and onboarding paths.",
      "Knowledge gaps are measured and refreshed through service reviews.",
      "Knowledge base is structured for assisted search and guided execution."
    ]
  },
  {
    id: "rca",
    label: "Problem management & RCA",
    abbr: "RCA",
    pillar: "Improve",
    question: "Do repeated incidents turn into permanent fixes?",
    start: 0,
    states: [
      "No RCA history, known-error trend or problem backlog.",
      "Some RCA notes exist, but recurrence is not tracked.",
      "Major incidents create RCA and known-error actions.",
      "Recurring incidents are governed through problem management.",
      "Trend mining feeds Improve & Evolve backlog and prevention actions.",
      "RCA drafting and pattern detection can be assisted with guardrails."
    ]
  },
  {
    id: "automation",
    label: "Automation & agentic readiness",
    abbr: "Auto",
    pillar: "Automate",
    question: "Is the pattern safe enough for automation or assisted operations?",
    start: 0,
    states: [
      "No safe automation candidate; action path or rollback is unclear.",
      "Candidate pattern is identified, but safeguards are missing.",
      "Manual runbook exists and can be repeated safely by support.",
      "Automation candidate has owner, approval path, audit and rollback.",
      "Automation can be tested against SLOs, policy and incident outcomes.",
      "Pattern is ready for Pandav/agentic workflow with human gate."
    ]
  }
];

const maturityQualificationPresets = [
  { label: "M0 handover risk", level: null },
  { label: "M2 run-ready", level: 2 },
  { label: "M3 risk-mitigated", level: 3 },
  { label: "M4 proactive", level: 4 },
  { label: "M5 candidate", level: 5 }
] as const;

function defaultMaturityInputScores() {
  return Object.fromEntries(maturityInputDimensions.map((dimension) => [dimension.id, dimension.start])) as Record<string, number>;
}

function maturityInputScoresForLevel(level: number | null) {
  if (level === null) return defaultMaturityInputScores();
  return Object.fromEntries(maturityInputDimensions.map((dimension) => [dimension.id, level])) as Record<string, number>;
}

function maturityFromInputScores(scores: Record<string, number>) {
  const values = maturityInputDimensions.map((dimension) => scores[dimension.id] ?? dimension.start);
  const average = averageScore(values);
  const weakestScore = Math.min(...values);
  const level = Math.max(0, Math.min(5, Math.floor(Math.min(average, weakestScore + 1))));
  const weakestInputs = maturityInputDimensions.filter((dimension) => (scores[dimension.id] ?? dimension.start) === weakestScore);
  return {
    level,
    average,
    weakestScore,
    weakestInputs,
    runReadyCount: values.filter((value) => value >= 2).length,
    controlledCount: values.filter((value) => value >= 3).length,
    proactiveCount: values.filter((value) => value >= 4).length,
    automationReadyCount: values.filter((value) => value >= 5).length
  };
}

function MaturityQualificationSimulator() {
  const [inputScores, setInputScores] = useState<Record<string, number>>(() => defaultMaturityInputScores());
  const [activeInputId, setActiveInputId] = useState("observability");
  const activeInput = maturityInputDimensions.find((dimension) => dimension.id === activeInputId) ?? maturityInputDimensions[0];
  const activeScore = inputScores[activeInput.id] ?? activeInput.start;
  const summary = maturityFromInputScores(inputScores);
  const blockerText = summary.weakestInputs.slice(0, 3).map((dimension) => dimension.label).join(", ");

  const setInputScore = (inputId: string, level: number) => {
    setInputScores((current) => ({ ...current, [inputId]: level }));
    setActiveInputId(inputId);
  };

  return (
    <div className="maturity-qualification-model">
      <div className="qualification-flow" aria-label="Maturity qualification flow">
        <div>
          <span>1</span>
          <strong>15 evidence inputs</strong>
          <small>tooling, people, process, recovery and governance</small>
        </div>
        <ArrowRight size={16} aria-hidden="true" />
        <div>
          <span>2</span>
          <strong>M0-M5 per input</strong>
          <small>change any scale to reflect verified evidence</small>
        </div>
        <ArrowRight size={16} aria-hidden="true" />
        <div>
          <span>3</span>
          <strong>Area maturity</strong>
          <small>average score, constrained by weakest input</small>
        </div>
        <ArrowRight size={16} aria-hidden="true" />
        <div>
          <span>4</span>
          <strong>Transition decision</strong>
          <small>transition now, mitigate risk, hold or migrate</small>
        </div>
      </div>

      <div className="qualification-console">
        <div className="qualification-score-panel">
          <div className="qualification-score-ring" style={{ "--score": `${summary.level * 20}%` } as CSSProperties}>
            <span>Area mark</span>
            <strong>{maturityLabel(summary.level)}</strong>
            <small>avg M{summary.average.toFixed(1)}</small>
          </div>
          <div className="qualification-score-copy">
            <span className="coverage-kicker">Live maturity calculation</span>
            <h4>Raise individual inputs and watch the scale move</h4>
            <p>
              An area is M0 when one or more critical inputs are unknown. It moves only when evidence improves across enough
              inputs, not because one dashboard or alert exists.
            </p>
            <div className="qualification-metrics">
              <span>{summary.runReadyCount}/15 M2+</span>
              <span>{summary.controlledCount}/15 M3+</span>
              <span>{summary.proactiveCount}/15 M4+</span>
              <span>{summary.automationReadyCount}/15 M5</span>
            </div>
            <small className="qualification-blockers">
              Weakest at {maturityLabel(summary.weakestScore)}: {blockerText}
              {summary.weakestInputs.length > 3 ? ` +${summary.weakestInputs.length - 3} more` : ""}
            </small>
          </div>
          <div className="qualification-presets" aria-label="Maturity simulator presets">
            {maturityQualificationPresets.map((preset) => (
              <button type="button" key={preset.label} onClick={() => setInputScores(maturityInputScoresForLevel(preset.level))}>
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="qualification-board">
          <div className="qualification-input-grid" aria-label="Fifteen maturity inputs">
            {maturityInputDimensions.map((dimension) => {
              const score = inputScores[dimension.id] ?? dimension.start;
              return (
                <div className={`qualification-input-card ${dimension.id === activeInput.id ? "active" : ""}`} key={dimension.id}>
                  <button type="button" className="qualification-input-main" onClick={() => setActiveInputId(dimension.id)}>
                    <span>{dimension.pillar}</span>
                    <strong>{dimension.label}</strong>
                    <em>{maturityLabel(score)}</em>
                    <i><b style={{ width: `${score * 20}%` }} /></i>
                  </button>
                  <div className="qualification-mini-scale" aria-label={`${dimension.label} maturity scale`}>
                    {maturityLevels.map((level) => (
                      <button
                        type="button"
                        className={score === level.level ? "active" : ""}
                        key={`${dimension.id}-${level.label}`}
                        onClick={() => setInputScore(dimension.id, level.level)}
                        aria-label={`${dimension.label} ${level.label}`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="qualification-active-detail">
            <span className="coverage-kicker">{activeInput.pillar}</span>
            <h4>{activeInput.label}</h4>
            <p>{activeInput.question}</p>
            <div className="qualification-active-scale" aria-label={`${activeInput.label} selected maturity`}>
              {maturityLevels.map((level) => (
                <button
                  type="button"
                  className={activeScore === level.level ? "active" : ""}
                  key={`${activeInput.id}-detail-${level.label}`}
                  onClick={() => setInputScore(activeInput.id, level.level)}
                >
                  <strong>{level.label}</strong>
                  <span>{level.title}</span>
                </button>
              ))}
            </div>
            <div className="qualification-state-detail">
              <span>{activeInput.label} qualifies as {maturityLabel(activeScore)} when</span>
              <p>{activeInput.states[activeScore]}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

const supportEvidenceFlow = [
  {
    stage: "Signal source",
    owner: "App/platform",
    evidence: "Metrics, logs, traces, job status, pipeline status, Kafka lag, API errors."
  },
  {
    stage: "Alert rule",
    owner: "Tooling",
    evidence: "Threshold, SLO burn, failed job, failed deployment, security or connectivity event."
  },
  {
    stage: "Route and ticket",
    owner: "Ops L1",
    evidence: "PagerDuty, ServiceNow, Jira, email/SMS only if governed with owner and SLA."
  },
  {
    stage: "Triage and restore",
    owner: "Ops L1/L2",
    evidence: "Impact, severity, runbook step, restart/rerun/backfill, communication and escalation."
  },
  {
    stage: "Engineering fix",
    owner: "Ops L3",
    evidence: "Code, config, IaC, schema, connector, pipeline or platform defect fixed safely."
  },
  {
    stage: "Prevention",
    owner: "Improve & Evolve",
    evidence: "Recurring pattern removed through automation, SLO tuning, self-healing candidate or agentic recipe."
  }
] as const;

export const maturityHorizons = [
  { id: "now", label: "Now", title: "Baseline", detail: "current evidence baseline" },
  { id: "d60", label: "Day 60", title: "Run transition", detail: "support takeover gate" },
  { id: "d120", label: "Day 120", title: "Dev transition", detail: "fix route proven" },
  { id: "m6", label: "3-6 mo", title: "Mature run", detail: "gap burn-down" },
  { id: "m12", label: "12+ mo", title: "Pandav path", detail: "candidate patterns" }
] as const;

export const readinessDimensions = [
  { id: "performance", label: "Performance", abbr: "Perf", short: "runtime health" },
  { id: "connectivity", label: "Connectivity", abbr: "Conn", short: "dependencies" },
  { id: "security", label: "Security", abbr: "Sec", short: "access + secrets" },
  { id: "change", label: "Pipeline", abbr: "Pipe", short: "change + rollback" },
  { id: "observability", label: "Observability", abbr: "Obs", short: "metrics/logs/traces" },
  { id: "reliability", label: "Reliability", abbr: "Rel", short: "restore + DR" },
  { id: "ownership", label: "Ownership", abbr: "Own", short: "service owner" },
  { id: "proactive", label: "Proactive triage", abbr: "Triage", short: "alerts + RCA" }
] as const;

export type ReadinessDimensionId = (typeof readinessDimensions)[number]["id"];
export type DimensionScores = Record<ReadinessDimensionId, number>;

export interface ServicePlatform {
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

export const servicePlatforms: ServicePlatform[] = [
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
    pandav: "Policy-checked change drafts and governed self-service recipes.",
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
    decision: "Transition with Risk Mitigation",
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
    decision: "Transition with Risk Mitigation",
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
    decision: "Transition with Risk Mitigation",
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
    decision: "Transition with Risk Mitigation",
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
    workloads: "Access governance, lineage, metadata, stewardship, ownership",
    Icon: ListChecks,
    track: [1, 2, 3, 4, 5],
    decision: "Transition with Risk Mitigation",
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
    decision: "Transition with Risk Mitigation",
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
    decision: "Transition with Risk Mitigation",
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
    liveWith: "Governed support only for known jobs and consumers.",
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
    mustClose: "Policy, logging, cost guardrails, audit sink, rollback and gate ownership.",
    pandav: "The governed path for assisted and agentic operations after gates pass.",
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

export function maturityLabel(level: number) {
  return maturityLevels.find((item) => item.level === level)?.label ?? `M${level}`;
}

export function scoreTone(score: number) {
  if (score >= 4) return "good";
  if (score >= 2) return "partial";
  return "gap";
}

export type PlatformDimensionMarks = Record<string, DimensionScores>;

export function dimensionScoresFromHorizon(platform: ServicePlatform, horizonIndex: number) {
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

export function dimensionMarksFromHorizon(horizonIndex: number) {
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

export function platformMaturityFromScores(scores: DimensionScores) {
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

export function averageScore(values: number[]) {
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

const inputSheetName = "1. Maturity Input";
const dashboardSheetName = "2. Radar Dashboard";
const inputStartRow = 5;
const dimensionStartColumn = 7;
const calculatedLevelColumn = 19;
const weakestScoreColumn = 20;
const dashboardDimensionStartRow = 12;
const dashboardDistributionStartRow = 23;

type ZipFileEntry = {
  path: string;
  content: string;
};

function columnName(index: number) {
  let column = "";
  let current = index;
  while (current > 0) {
    const remainder = (current - 1) % 26;
    column = String.fromCharCode(65 + remainder) + column;
    current = Math.floor((current - 1) / 26);
  }
  return column;
}

function cellReference(row: number, column: number) {
  return `${columnName(column)}${row}`;
}

function absoluteCellReference(row: number, column: number) {
  return `$${columnName(column)}$${row}`;
}

function sheetCellReference(sheetName: string, row: number, column: number) {
  return `'${sheetName}'!${absoluteCellReference(row, column)}`;
}

function rowScoreExpressions(row: number) {
  return readinessDimensions.map((_, index) => `VALUE(RIGHT(${cellReference(row, dimensionStartColumn + index)},1))`);
}

function averageFormulaForRow(row: number) {
  return `AVERAGE(${rowScoreExpressions(row).join(",")})`;
}

function minimumFormulaForRow(row: number) {
  return `MIN(${rowScoreExpressions(row).join(",")})`;
}

function weakestAreaFormulaForRow(row: number) {
  const weakestScoreCell = cellReference(row, weakestScoreColumn);
  const fallback = `"${readinessDimensions[readinessDimensions.length - 1].label}"`;
  const dimensionChecks = readinessDimensions
    .slice(0, -1)
    .reduceRight((formula, dimension, index) => {
      const scoreExpression = `VALUE(RIGHT(${cellReference(row, dimensionStartColumn + index)},1))`;
      return `IF(${weakestScoreCell}=${scoreExpression},"${dimension.label}",${formula})`;
    }, fallback);
  return `${dimensionChecks}&" M"&${weakestScoreCell}`;
}

function dimensionAverageFormula(column: number) {
  const refs = servicePlatforms.map((_, index) => {
    const row = inputStartRow + index;
    return `VALUE(RIGHT(${sheetCellReference(inputSheetName, row, column)},1))`;
  });
  return `AVERAGE(${refs.join(",")})`;
}

function cellXml(
  row: number,
  column: number,
  value: string | number,
  options: { formula?: string; style?: number; type?: "string" | "number" } = {}
) {
  const reference = cellReference(row, column);
  const style = options.style ? ` s="${options.style}"` : "";
  const formula = options.formula ? `<f>${escapeHtml(options.formula)}</f>` : "";
  if (options.formula) {
    const type = typeof value === "string" ? ` t="str"` : "";
    return `<c r="${reference}"${type}${style}>${formula}<v>${escapeHtml(value)}</v></c>`;
  }
  if (options.type === "number" || typeof value === "number") {
    return `<c r="${reference}"${style}><v>${value}</v></c>`;
  }
  return `<c r="${reference}" t="inlineStr"${style}><is><t>${escapeHtml(value)}</t></is></c>`;
}

function rowXml(row: number, cells: string[]) {
  return `<row r="${row}">${cells.join("")}</row>`;
}

function xlsxStylesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="5">
    <font><sz val="11"/><color rgb="FF16181D"/><name val="Arial"/></font>
    <font><b/><sz val="16"/><color rgb="FF16181D"/><name val="Arial"/></font>
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Arial"/></font>
    <font><sz val="10"/><color rgb="FF626A73"/><name val="Arial"/></font>
    <font><b/><sz val="11"/><color rgb="FF315F92"/><name val="Arial"/></font>
  </fonts>
  <fills count="6">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF315F92"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFEAF1F8"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF6F8FB"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFE9F3EC"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border>
      <left style="thin"><color rgb="FFD9DEE6"/></left>
      <right style="thin"><color rgb="FFD9DEE6"/></right>
      <top style="thin"><color rgb="FFD9DEE6"/></top>
      <bottom style="thin"><color rgb="FFD9DEE6"/></bottom>
      <diagonal/>
    </border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="8">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="2" fillId="2" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="4" fillId="3" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="4" fillId="5" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="4" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment vertical="top" wrapText="1"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
  <dxfs count="0"/>
  <tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleMedium9"/>
</styleSheet>`;
}

function inputSheetXml(dimensionMarks: PlatformDimensionMarks) {
  const headers = [
    "Domain",
    "Technology",
    "Apps / workloads",
    "Calculated mark",
    "Radar average",
    "Weakest area",
    ...readinessDimensions.map((dimension) => dimension.label),
    "Decision",
    "Can live with temporarily",
    "Must close to mature",
    "Long-term Pandav path",
    "Calc level",
    "Weakest score"
  ];
  const dataRows = servicePlatforms.map((platform, index) => {
    const row = inputStartRow + index;
    const scores = dimensionMarks[platform.id] ?? dimensionScoresFromHorizon(platform, 1);
    const summary = platformMaturityFromScores(scores);
    const scoreCells = readinessDimensions.map((dimension, dimensionIndex) =>
      cellXml(row, dimensionStartColumn + dimensionIndex, maturityLabel(scores[dimension.id]), { style: 5 })
    );
    const plannedWeakest = summary.weakestScore;
    const cells = [
      cellXml(row, 1, platform.domain, { style: 4 }),
      cellXml(row, 2, platform.technology, { style: 4 }),
      cellXml(row, 3, platform.workloads, { style: 4 }),
      cellXml(row, 4, maturityLabel(summary.level), { formula: `"M"&${cellReference(row, calculatedLevelColumn)}`, style: 6 }),
      cellXml(row, 5, Number(summary.average.toFixed(1)), { formula: averageFormulaForRow(row), style: 6 }),
      cellXml(row, 6, `${summary.weakestDimension.label} ${maturityLabel(plannedWeakest)}`, {
        formula: weakestAreaFormulaForRow(row),
        style: 6
      }),
      ...scoreCells,
      cellXml(row, 15, platform.decision, { style: 4 }),
      cellXml(row, 16, platform.liveWith, { style: 4 }),
      cellXml(row, 17, platform.mustClose, { style: 4 }),
      cellXml(row, 18, platform.pandav, { style: 4 }),
      cellXml(row, calculatedLevelColumn, summary.level, {
        formula: `FLOOR(MIN(${cellReference(row, 5)},${cellReference(row, weakestScoreColumn)}+1),1)`,
        style: 7
      }),
      cellXml(row, weakestScoreColumn, plannedWeakest, { formula: minimumFormulaForRow(row), style: 7 })
    ];
    return rowXml(row, cells);
  });

  const headerRow = rowXml(4, headers.map((header, index) => cellXml(4, index + 1, header, { style: 3 })));
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetViews>
    <sheetView workbookViewId="0">
      <pane ySplit="4" topLeftCell="A5" activePane="bottomLeft" state="frozen"/>
      <selection pane="bottomLeft"/>
    </sheetView>
  </sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>
    <col min="1" max="1" width="18" customWidth="1"/>
    <col min="2" max="2" width="30" customWidth="1"/>
    <col min="3" max="3" width="42" customWidth="1"/>
    <col min="4" max="6" width="17" customWidth="1"/>
    <col min="7" max="14" width="16" customWidth="1"/>
    <col min="15" max="15" width="24" customWidth="1"/>
    <col min="16" max="18" width="42" customWidth="1"/>
    <col min="19" max="20" width="0" hidden="1" customWidth="1"/>
  </cols>
  <sheetData>
    ${rowXml(1, [cellXml(1, 1, "Pandora transition maturity input", { style: 1 })])}
    ${rowXml(2, [cellXml(2, 1, "Change M0-M5 in the support dimension columns. The dashboard tab recalculates the estate radar and coverage summary.", { style: 2 })])}
    ${headerRow}
    ${dataRows.join("")}
  </sheetData>
  <autoFilter ref="A4:R${inputStartRow + servicePlatforms.length - 1}"/>
  <mergeCells count="2">
    <mergeCell ref="A1:R1"/>
    <mergeCell ref="A2:R2"/>
  </mergeCells>
  <dataValidations count="1">
    <dataValidation type="list" allowBlank="0" showErrorMessage="1" sqref="G${inputStartRow}:N${inputStartRow + servicePlatforms.length - 1}">
      <formula1>"M0,M1,M2,M3,M4,M5"</formula1>
    </dataValidation>
  </dataValidations>
  <pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>
</worksheet>`;
}

function dashboardSheetXml(dimensionMarks: PlatformDimensionMarks) {
  const aggregateValues = aggregateRadarValues(dimensionMarks);
  const averageMaturity = averageScore(aggregateValues);
  const radarEndRow = dashboardDimensionStartRow + readinessDimensions.length - 1;
  const platformSummaries = servicePlatforms.map((platform) =>
    platformMaturityFromScores(dimensionMarks[platform.id] ?? dimensionScoresFromHorizon(platform, 1))
  );
  const endRow = inputStartRow + servicePlatforms.length - 1;
  const calcRange = `'${inputSheetName}'!$${columnName(calculatedLevelColumn)}$${inputStartRow}:$${columnName(calculatedLevelColumn)}$${endRow}`;
  const summaryRows = [
    ["Average maturity score", Number(averageMaturity.toFixed(1)), `AVERAGE(B${dashboardDimensionStartRow}:B${radarEndRow})`],
    ["Run-ready coverage", `${platformSummaries.filter((summary) => summary.level >= 2).length}/${servicePlatforms.length}`, `COUNTIF(${calcRange},">=2")&"/${servicePlatforms.length}"`],
    ["Risk-mitigated or better", `${platformSummaries.filter((summary) => summary.level >= 3).length}/${servicePlatforms.length}`, `COUNTIF(${calcRange},">=3")&"/${servicePlatforms.length}"`],
    ["Proactive coverage", `${platformSummaries.filter((summary) => summary.level >= 4).length}/${servicePlatforms.length}`, `COUNTIF(${calcRange},">=4")&"/${servicePlatforms.length}"`],
    ["Pandav candidates", `${platformSummaries.filter((summary) => summary.level >= 5).length}/${servicePlatforms.length}`, `COUNTIF(${calcRange},">=5")&"/${servicePlatforms.length}"`]
  ];
  const rows = [
    rowXml(1, [cellXml(1, 1, "Pandora transition maturity radar", { style: 1 })]),
    rowXml(2, [cellXml(2, 1, "This tab is formula-linked to the M0-M5 inputs on the first tab.", { style: 2 })]),
    rowXml(4, [cellXml(4, 1, "Metric", { style: 3 }), cellXml(4, 2, "Value", { style: 3 })]),
    ...summaryRows.map((row, index) =>
      rowXml(5 + index, [
        cellXml(5 + index, 1, row[0], { style: 4 }),
        cellXml(5 + index, 2, row[1], { formula: String(row[2]), style: 6 })
      ])
    ),
    rowXml(11, [cellXml(11, 1, "Dimension", { style: 3 }), cellXml(11, 2, "Estate average M-score", { style: 3 })]),
    ...readinessDimensions.map((dimension, index) => {
      const row = dashboardDimensionStartRow + index;
      const column = dimensionStartColumn + index;
      return rowXml(row, [
        cellXml(row, 1, dimension.label, { style: 4 }),
        cellXml(row, 2, Number((aggregateValues[index] ?? 0).toFixed(1)), { formula: dimensionAverageFormula(column), style: 6 })
      ]);
    }),
    rowXml(22, [cellXml(22, 1, "Maturity level", { style: 3 }), cellXml(22, 2, "Technology count", { style: 3 })]),
    ...maturityLevels.map((level, index) => {
      const row = dashboardDistributionStartRow + index;
      const count = platformSummaries.filter((summary) => summary.level === level.level).length;
      return rowXml(row, [
        cellXml(row, 1, level.label, { style: 4 }),
        cellXml(row, 2, count, { formula: `COUNTIF(${calcRange},${level.level})`, style: 6 })
      ]);
    })
  ];

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetViews><sheetView workbookViewId="0"/></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>
    <col min="1" max="1" width="26" customWidth="1"/>
    <col min="2" max="2" width="20" customWidth="1"/>
    <col min="4" max="12" width="13" customWidth="1"/>
  </cols>
  <sheetData>${rows.join("")}</sheetData>
  <mergeCells count="2">
    <mergeCell ref="A1:B1"/>
    <mergeCell ref="A2:B2"/>
  </mergeCells>
  <pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>
  <drawing r:id="rId1"/>
</worksheet>`;
}

function chartXml(values: number[]) {
  const categoryCache = readinessDimensions
    .map((dimension, index) => `<c:pt idx="${index}"><c:v>${escapeHtml(dimension.label)}</c:v></c:pt>`)
    .join("");
  const valueCache = values
    .map((value, index) => `<c:pt idx="${index}"><c:v>${Number(value.toFixed(1))}</c:v></c:pt>`)
    .join("");
  const categoryFormula = `'${dashboardSheetName}'!$A$${dashboardDimensionStartRow}:$A$${dashboardDimensionStartRow + readinessDimensions.length - 1}`;
  const valueFormula = `'${dashboardSheetName}'!$B$${dashboardDimensionStartRow}:$B$${dashboardDimensionStartRow + readinessDimensions.length - 1}`;

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<c:chartSpace xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <c:lang val="en-US"/>
  <c:roundedCorners val="0"/>
  <c:chart>
    <c:title>
      <c:tx><c:rich><a:bodyPr/><a:lstStyle/><a:p><a:r><a:rPr lang="en-US" sz="1200" b="1"/><a:t>Estate maturity radar</a:t></a:r></a:p></c:rich></c:tx>
      <c:layout/>
    </c:title>
    <c:plotArea>
      <c:layout/>
      <c:radarChart>
        <c:radarStyle val="marker"/>
        <c:varyColors val="0"/>
        <c:ser>
          <c:idx val="0"/>
          <c:order val="0"/>
          <c:tx><c:v>Estate average M-score</c:v></c:tx>
          <c:spPr>
            <a:ln w="25400"><a:solidFill><a:srgbClr val="315F92"/></a:solidFill></a:ln>
          </c:spPr>
          <c:marker>
            <c:symbol val="circle"/>
            <c:size val="5"/>
            <c:spPr><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:ln w="12700"><a:solidFill><a:srgbClr val="315F92"/></a:solidFill></a:ln></c:spPr>
          </c:marker>
          <c:cat>
            <c:strRef>
              <c:f>${escapeHtml(categoryFormula)}</c:f>
              <c:strCache><c:ptCount val="${readinessDimensions.length}"/>${categoryCache}</c:strCache>
            </c:strRef>
          </c:cat>
          <c:val>
            <c:numRef>
              <c:f>${escapeHtml(valueFormula)}</c:f>
              <c:numCache><c:formatCode>0.0</c:formatCode><c:ptCount val="${readinessDimensions.length}"/>${valueCache}</c:numCache>
            </c:numRef>
          </c:val>
        </c:ser>
        <c:axId val="74130001"/>
        <c:axId val="74130002"/>
      </c:radarChart>
      <c:catAx>
        <c:axId val="74130001"/>
        <c:scaling><c:orientation val="minMax"/></c:scaling>
        <c:delete val="0"/>
        <c:axPos val="b"/>
        <c:majorTickMark val="none"/>
        <c:minorTickMark val="none"/>
        <c:tickLblPos val="nextTo"/>
        <c:crossAx val="74130002"/>
        <c:crosses val="autoZero"/>
        <c:auto val="1"/>
        <c:lblAlgn val="ctr"/>
        <c:lblOffset val="100"/>
      </c:catAx>
      <c:valAx>
        <c:axId val="74130002"/>
        <c:scaling><c:orientation val="minMax"/><c:max val="5"/><c:min val="0"/></c:scaling>
        <c:delete val="0"/>
        <c:axPos val="l"/>
        <c:majorGridlines/>
        <c:numFmt formatCode="0.0" sourceLinked="0"/>
        <c:majorTickMark val="out"/>
        <c:minorTickMark val="none"/>
        <c:tickLblPos val="nextTo"/>
        <c:crossAx val="74130001"/>
        <c:crosses val="autoZero"/>
        <c:crossBetween val="between"/>
      </c:valAx>
    </c:plotArea>
    <c:legend><c:legendPos val="b"/><c:layout/></c:legend>
    <c:plotVisOnly val="1"/>
    <c:dispBlanksAs val="gap"/>
  </c:chart>
  <c:printSettings><c:headerFooter/><c:pageMargins b="0.75" l="0.7" r="0.7" t="0.75" header="0.3" footer="0.3"/><c:pageSetup/></c:printSettings>
</c:chartSpace>`;
}

function drawingXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
  <xdr:twoCellAnchor>
    <xdr:from><xdr:col>3</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>2</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:from>
    <xdr:to><xdr:col>12</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>23</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:to>
    <xdr:graphicFrame macro="">
      <xdr:nvGraphicFramePr>
        <xdr:cNvPr id="2" name="Estate maturity radar"/>
        <xdr:cNvGraphicFramePr/>
      </xdr:nvGraphicFramePr>
      <xdr:xfrm>
        <a:off x="0" y="0"/>
        <a:ext cx="0" cy="0"/>
      </xdr:xfrm>
      <a:graphic>
        <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/chart">
          <c:chart xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="rId1"/>
        </a:graphicData>
      </a:graphic>
    </xdr:graphicFrame>
    <xdr:clientData/>
  </xdr:twoCellAnchor>
</xdr:wsDr>`;
}

function workbookXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <workbookPr/>
  <sheets>
    <sheet name="${inputSheetName}" sheetId="1" r:id="rId1"/>
    <sheet name="${dashboardSheetName}" sheetId="2" r:id="rId2"/>
  </sheets>
  <calcPr calcId="0" fullCalcOnLoad="1" forceFullCalc="1"/>
</workbook>`;
}

function workbookRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
}

function rootRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
}

function contentTypesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/drawings/drawing1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>
  <Override PartName="/xl/charts/chart1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;
}

function appPropertiesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Pandav alternative site</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>2</vt:i4></vt:variant></vt:vector></HeadingPairs>
  <TitlesOfParts><vt:vector size="2" baseType="lpstr"><vt:lpstr>${inputSheetName}</vt:lpstr><vt:lpstr>${dashboardSheetName}</vt:lpstr></vt:vector></TitlesOfParts>
  <Company>Pandora</Company>
</Properties>`;
}

function corePropertiesXml() {
  const timestamp = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Pandora transition maturity tracker</dc:title>
  <dc:creator>Pandav alternative site</dc:creator>
  <cp:lastModifiedBy>Pandav alternative site</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${timestamp}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${timestamp}</dcterms:modified>
</cp:coreProperties>`;
}

function worksheetDrawingRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing1.xml"/>
</Relationships>`;
}

function drawingRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart" Target="../charts/chart1.xml"/>
</Relationships>`;
}

function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let index = 0; index < 8; index += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function littleEndian(value: number, bytes: number) {
  const result = new Uint8Array(bytes);
  for (let index = 0; index < bytes; index += 1) {
    result[index] = (value >>> (index * 8)) & 0xff;
  }
  return result;
}

function concatBytes(parts: Uint8Array[]) {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    output.set(part, offset);
    offset += part.length;
  }
  return output;
}

function dosDateParts(date = new Date()) {
  const year = Math.max(1980, date.getFullYear());
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { dosTime, dosDate };
}

function xlsxZip(files: ZipFileEntry[]) {
  const encoder = new TextEncoder();
  const { dosTime, dosDate } = dosDateParts();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let localOffset = 0;

  files.forEach((file) => {
    const pathBytes = encoder.encode(file.path);
    const contentBytes = encoder.encode(file.content);
    const crc = crc32(contentBytes);
    const localHeader = concatBytes([
      littleEndian(0x04034b50, 4),
      littleEndian(20, 2),
      littleEndian(0, 2),
      littleEndian(0, 2),
      littleEndian(dosTime, 2),
      littleEndian(dosDate, 2),
      littleEndian(crc, 4),
      littleEndian(contentBytes.length, 4),
      littleEndian(contentBytes.length, 4),
      littleEndian(pathBytes.length, 2),
      littleEndian(0, 2),
      pathBytes
    ]);
    localParts.push(localHeader, contentBytes);

    centralParts.push(
      concatBytes([
        littleEndian(0x02014b50, 4),
        littleEndian(20, 2),
        littleEndian(20, 2),
        littleEndian(0, 2),
        littleEndian(0, 2),
        littleEndian(dosTime, 2),
        littleEndian(dosDate, 2),
        littleEndian(crc, 4),
        littleEndian(contentBytes.length, 4),
        littleEndian(contentBytes.length, 4),
        littleEndian(pathBytes.length, 2),
        littleEndian(0, 2),
        littleEndian(0, 2),
        littleEndian(0, 2),
        littleEndian(0, 2),
        littleEndian(0, 4),
        littleEndian(localOffset, 4),
        pathBytes
      ])
    );

    localOffset += localHeader.length + contentBytes.length;
  });

  const centralDirectory = concatBytes(centralParts);
  const localDirectory = concatBytes(localParts);
  const endOfCentralDirectory = concatBytes([
    littleEndian(0x06054b50, 4),
    littleEndian(0, 2),
    littleEndian(0, 2),
    littleEndian(files.length, 2),
    littleEndian(files.length, 2),
    littleEndian(centralDirectory.length, 4),
    littleEndian(localDirectory.length, 4),
    littleEndian(0, 2)
  ]);

  return concatBytes([localDirectory, centralDirectory, endOfCentralDirectory]);
}

export function buildMaturityWorkbookBlob(dimensionMarks: PlatformDimensionMarks) {
  const aggregateValues = aggregateRadarValues(dimensionMarks);
  const files: ZipFileEntry[] = [
    { path: "[Content_Types].xml", content: contentTypesXml() },
    { path: "_rels/.rels", content: rootRelsXml() },
    { path: "docProps/app.xml", content: appPropertiesXml() },
    { path: "docProps/core.xml", content: corePropertiesXml() },
    { path: "xl/workbook.xml", content: workbookXml() },
    { path: "xl/_rels/workbook.xml.rels", content: workbookRelsXml() },
    { path: "xl/styles.xml", content: xlsxStylesXml() },
    { path: "xl/worksheets/sheet1.xml", content: inputSheetXml(dimensionMarks) },
    { path: "xl/worksheets/sheet2.xml", content: dashboardSheetXml(dimensionMarks) },
    { path: "xl/worksheets/_rels/sheet2.xml.rels", content: worksheetDrawingRelsXml() },
    { path: "xl/drawings/drawing1.xml", content: drawingXml() },
    { path: "xl/drawings/_rels/drawing1.xml.rels", content: drawingRelsXml() },
    { path: "xl/charts/chart1.xml", content: chartXml(aggregateValues) }
  ];
  return new Blob([xlsxZip(files)], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
}

function downloadMaturityWorkbook(dimensionMarks: PlatformDimensionMarks) {
  if (typeof document === "undefined") return;
  const blob = buildMaturityWorkbookBlob(dimensionMarks);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pandora-transition-maturity-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
          <small>{controlledCount} risk-mitigated or better</small>
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
          <small>calculated M5 patterns ready for governed automation</small>
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
  const [showMaturityGuide, setShowMaturityGuide] = useState(false);
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
          <button
            type="button"
            className={`maturity-guide-toggle ${showMaturityGuide ? "active" : ""}`}
            aria-expanded={showMaturityGuide}
            onClick={() => setShowMaturityGuide((current) => !current)}
          >
            <ListChecks size={14} aria-hidden="true" />
            Maturity definitions and tooling evidence
          </button>
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

      {showMaturityGuide && (
        <div className="maturity-guide-panel" id="maturity-guide">
          <div className="maturity-guide-intro">
            <div>
              <span className="coverage-kicker">Hidden guide</span>
              <h4>What M0-M5 means during transition</h4>
              <p>
                A platform maturity score is an evidence mark, not an opinion. A service can have good dashboards but still
                remain low maturity if ownership, replay, rollback, access or escalation is not proven.
              </p>
            </div>
            <div className="maturity-guide-rule">
              <ShieldCheck size={18} aria-hidden="true" />
              <span>Maturity is constrained by the weakest operational dimension.</span>
            </div>
          </div>

          <MaturityQualificationSimulator />

          <div className="maturity-level-strip" aria-label="M0 to M5 level legend">
            {maturityDefinitions.map((level) => (
              <div className="maturity-level-card" key={level.label}>
                <strong>{level.label}</strong>
                <span>{level.title}</span>
                <p>{level.meaning}</p>
              </div>
            ))}
          </div>

          <div className="support-flow-panel support-flow-wide">
            <div className="maturity-guide-subhead">
              <span className="coverage-kicker">Support process placement</span>
              <h4>Where the evidence inputs show up in run</h4>
            </div>
            <div className="support-flow-steps" aria-label="Support process evidence flow">
              {supportEvidenceFlow.map((step, index) => (
                <Fragment key={step.stage}>
                  <div className="support-flow-step">
                    <span>{index + 1}</span>
                    <strong>{step.stage}</strong>
                    <small>{step.owner}</small>
                    <p>{step.evidence}</p>
                  </div>
                  {index < supportEvidenceFlow.length - 1 && <ArrowRight className="support-flow-arrow" size={15} aria-hidden="true" />}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

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
                <strong>Risk mitigation before takeover</strong>
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
        Guardrails arrive before autonomy — always. Service governance runs from day one on the RFP's own cadence; agentic
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
