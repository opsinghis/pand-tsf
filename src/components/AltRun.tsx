import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Database,
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
  Workflow
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
  decisionTone: "now" | "control" | "hold" | "migrate";
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
