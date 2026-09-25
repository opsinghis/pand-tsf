import { BadgeCheck, CalendarDays, Check, ChevronLeft, ChevronRight, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Fragment, useState, type CSSProperties } from "react";
import {
  capacityDrivers,
  convergeClincher,
  convergeIntro,
  convergeMechanisms,
  capacityNote,
  controlBands,
  controlNote,
  ktLoop,
  ktNote,
  skillBacklogNote,
  skillBridge,
  skillRows,
  skillTierHeaders,
  skillsNote,
  teamAsks,
  teamClose,
  teamIntro,
  teamLeaderNote,
  teamLocations,
  teamTracks
} from "../data/alternative";
import { PullQuote, Reveal, Section } from "./primitives";

const opsCaseStages = [
  { id: "signal", label: "Signal", short: "Case starts", hue: "--muted" },
  { id: "l1", label: "First response", short: "Assess & capture", hue: "--tech" },
  { id: "l2", label: "Restore", short: "Diagnose & recover", hue: "--ops" },
  { id: "l3", label: "Engineer fix", short: "Change code / config", hue: "--gov" },
  { id: "improve", label: "Improve & Evolve", short: "Convert toil", hue: "--accent" },
  { id: "dev", label: "Planned build", short: "Build durable capability", hue: "--proof" }
] as const;

type OpsCaseStageId = (typeof opsCaseStages)[number]["id"];

interface OpsCaseStageCopy {
  id: OpsCaseStageId;
  trigger: string;
  action: string;
  output: string;
}

interface OpsCaseExample {
  id: string;
  skill: string;
  caseTitle: string;
  signal: string;
  stages: OpsCaseStageCopy[];
}

const opsCaseExamples: OpsCaseExample[] = [
  {
    id: "data",
    skill: "Data engineering",
    caseTitle: "Databricks pipeline fails after source schema drift",
    signal: "The nightly Bronze-to-Silver job fails and the downstream gold table is stale for business reporting.",
    stages: [
      {
        id: "signal",
        trigger: "A failed-run alert, freshness breach or business ticket appears.",
        action: "Monitoring captures the failing job, table, source feed and visible business impact.",
        output: "A production case with enough evidence for the domain engineer to act."
      },
      {
        id: "l1",
        trigger: "The alert is confirmed as a real production issue.",
        action: "The on-call data engineer validates the run ID, attaches logs, checks dashboards and assesses impact.",
        output: "A correctly classified incident with impact, owner, timestamp and initial evidence."
      },
      {
        id: "l2",
        trigger: "The case needs operational restore steps.",
        action: "The same engineer reruns the job, quarantines the bad batch, checks lineage and restores the flow if the runbook covers it.",
        output: "Service restored, or a precise schema / job defect isolated with triage notes."
      },
      {
        id: "l3",
        trigger: "Runbook restore is not enough because the defect is in Spark, Delta logic or job configuration.",
        action: "The data engineer patches the job, adds validation, performs a safe backfill and updates the runbook.",
        output: "A production fix PR, backfill evidence and a prevention note."
      },
      {
        id: "improve",
        trigger: "The same schema-drift pattern has appeared more than once or creates avoidable toil.",
        action: "The case is converted into an Improve & Evolve backlog item for auto-DQ checks or self-healing reruns.",
        output: "A prioritised improvement candidate backed by incident evidence."
      },
      {
        id: "dev",
        trigger: "Pandora prioritises the improvement as reusable capability.",
        action: "The same data team builds ingestion templates, data-quality framework changes or medallion design patterns.",
        output: "A durable platform capability reused by future data products."
      }
    ]
  },
  {
    id: "kafka",
    skill: "Kafka / Confluent",
    caseTitle: "Connector lag spikes after an incompatible schema change",
    signal: "A customer-order connector falls behind after a schema change and downstream consumers miss their SLA.",
    stages: [
      {
        id: "signal",
        trigger: "Lag, schema registry or connector-failure monitoring fires.",
        action: "Monitoring captures topic, partition, consumer group, schema version and affected connector.",
        output: "A Kafka case with the failing integration and impact visible."
      },
      {
        id: "l1",
        trigger: "The alert needs operational ownership.",
        action: "The on-call integration engineer confirms lag growth, checks known errors and captures topic and connector evidence.",
        output: "An owned incident with the right Kafka context attached."
      },
      {
        id: "l2",
        trigger: "The connector may be restorable through standard operations.",
        action: "The same engineer restarts the connector, validates offsets, rebalances consumers and replays messages where safe.",
        output: "Flow restored, or a connector / schema / consumer defect isolated."
      },
      {
        id: "l3",
        trigger: "The issue is caused by connector code, schema compatibility or consumer handling.",
        action: "The integration engineer patches connector configuration or code, fixes compatibility handling and validates replay.",
        output: "A production fix PR and recovered event flow."
      },
      {
        id: "improve",
        trigger: "Schema drift or connector recovery keeps recurring.",
        action: "The pattern is moved to Improve & Evolve for self-healing connector checks or schema-drift detection.",
        output: "A backlog item for automation with clear incident history."
      },
      {
        id: "dev",
        trigger: "The repeated issue needs a broader engineering pattern.",
        action: "The same integration team creates event-contract standards, producer / consumer patterns or reusable connector templates.",
        output: "A reusable integration capability that reduces future incidents."
      }
    ]
  },
  {
    id: "devops",
    skill: "DevOps / CI-CD",
    caseTitle: "Release pipeline fails after runner or secret change",
    signal: "A GitHub Actions release blocks deployment after a runner image update or secret rotation.",
    stages: [
      {
        id: "signal",
        trigger: "A failed workflow, deployment gate or release-health check appears.",
        action: "Monitoring captures repository, workflow, job, runner, environment and failed step.",
        output: "A release-blocking case with the failed pipeline path identified."
      },
      {
        id: "l1",
        trigger: "The build failure needs classification and routing.",
        action: "The on-call DevOps engineer checks known-error patterns, confirms urgency and notifies the release owner.",
        output: "An owned release incident with known context and affected release window."
      },
      {
        id: "l2",
        trigger: "The pipeline may be restorable through operational recovery.",
        action: "The same engineer repairs runner, cache, secret or environment configuration and retries the pipeline.",
        output: "Release unblocked, or a workflow / policy defect isolated."
      },
      {
        id: "l3",
        trigger: "The failed release is caused by workflow logic, shared action or policy-gate code.",
        action: "The DevOps engineer patches the workflow, action or gate logic and proves the release path.",
        output: "A fix PR, passing pipeline and updated release runbook."
      },
      {
        id: "improve",
        trigger: "The same pipeline failure pattern appears across teams.",
        action: "The pattern is moved to Improve & Evolve for flaky-pipeline auto-remediation or policy-as-code uplift.",
        output: "A prioritised improvement with affected repos and failure frequency."
      },
      {
        id: "dev",
        trigger: "The improvement becomes part of the platform roadmap.",
        action: "The same DevOps team builds golden GitHub pipelines, shared actions, migration factory assets or standard policy gates.",
        output: "A reusable delivery platform capability for future releases."
      }
    ]
  },
  {
    id: "cloud",
    skill: "Cloud / Kubernetes / Terraform",
    caseTitle: "PAKS service instability after config or certificate rotation",
    signal: "A service enters CrashLoopBackOff or fails readiness checks after a configuration or certificate change.",
    stages: [
      {
        id: "signal",
        trigger: "Pod, node, quota, certificate or readiness monitoring fires.",
        action: "Monitoring captures namespace, deployment, recent change, affected route and current error state.",
        output: "A platform case with the failing service and blast radius visible."
      },
      {
        id: "l1",
        trigger: "The service issue needs first-line routing and impact classification.",
        action: "The on-call platform engineer confirms alert validity, checks dashboards and assesses the affected service.",
        output: "A classified incident with pod state, timestamps and impacted application."
      },
      {
        id: "l2",
        trigger: "The service may be restorable through standard platform operations.",
        action: "The same engineer rolls back, scales, restores config, checks secrets and validates access or quota.",
        output: "Service restored, or a Helm / Terraform / platform defect identified."
      },
      {
        id: "l3",
        trigger: "The root cause is in IaC, Helm chart, certificate handling, quota or platform configuration.",
        action: "The platform engineer patches Terraform, Helm or platform config and validates the deployment path.",
        output: "A production fix PR, restored service and updated platform runbook."
      },
      {
        id: "improve",
        trigger: "The incident shows repeatable drift, scaling or certificate toil.",
        action: "The pattern becomes an Improve & Evolve item for self-heal, autoscale or drift-correction recipes.",
        output: "A backlog candidate with operational evidence and expected toil reduction."
      },
      {
        id: "dev",
        trigger: "The improvement is approved as a platform capability.",
        action: "The same platform team builds PAKS self-service patterns, golden IaC modules or platform engineering workflows.",
        output: "A standard capability consumed by future services and teams."
      }
    ]
  },
  {
    id: "sre",
    skill: "SRE / Observability",
    caseTitle: "Alert storm with unclear root cause",
    signal: "Latency alerts fire across services, but the first dashboards do not explain the cause.",
    stages: [
      {
        id: "signal",
        trigger: "PagerDuty, New Relic or SLO monitoring fires multiple related alerts.",
        action: "Monitoring captures alert set, service map, SLO impact and the first time window.",
        output: "An observability case with severity and affected services visible."
      },
      {
        id: "l1",
        trigger: "The alert storm needs severity confirmation and routing.",
        action: "The on-call engineer confirms severity, checks the service dashboard and brings in the domain peer if needed.",
        output: "A correctly prioritised incident with the alert evidence attached."
      },
      {
        id: "l2",
        trigger: "The case needs correlation and runbook-guided restoration.",
        action: "The same engineer correlates logs, metrics and traces, drafts RCA notes and follows restore runbooks.",
        output: "Service stabilised, or an instrumentation / SLO / reliability defect isolated."
      },
      {
        id: "l3",
        trigger: "The issue is caused by missing telemetry, incorrect alert logic or reliability defect.",
        action: "The domain engineer fixes instrumentation, alert rules, SLO configuration or reliability code.",
        output: "A fix PR, improved signal and updated RCA / runbook."
      },
      {
        id: "improve",
        trigger: "The noise or RCA gap is systemic.",
        action: "The pattern enters Improve & Evolve for alert-noise reduction, auto-RCA or SLO guard candidates.",
        output: "A measurable improvement candidate with before / after signal quality."
      },
      {
        id: "dev",
        trigger: "The fix needs to become standard for new services.",
        action: "The same engineering team builds observability-by-design standards, dashboards and resilience patterns.",
        output: "A reusable reliability standard embedded into future delivery."
      }
    ]
  },
  {
    id: "qe",
    skill: "QE / SDET",
    caseTitle: "Regression gate fails before release",
    signal: "A release candidate fails smoke or regression checks because a contract, data setup or environment changed.",
    stages: [
      {
        id: "signal",
        trigger: "A quality gate, smoke suite or release-health check fails.",
        action: "Monitoring captures release, test suite, failing scenario, environment and latest commit range.",
        output: "A release-quality case with the failing path visible."
      },
      {
        id: "l1",
        trigger: "The failed gate needs validation and release-risk routing.",
        action: "The on-call engineer confirms the failure is current, attaches test evidence and alerts the release owner.",
        output: "An owned release-risk incident with the failing test context."
      },
      {
        id: "l2",
        trigger: "The failure needs triage across test data, environment and API contract.",
        action: "The same engineer isolates whether the cause is data, environment, dependency, contract or product regression, with QE support when needed.",
        output: "Release restored if operational, or a precise quality-engineering defect isolated."
      },
      {
        id: "l3",
        trigger: "The defect is in test harness, contract validation, quality gate logic or automation.",
        action: "The engineering team patches the harness, gate or automation and validates the release signal.",
        output: "A test / gate fix PR and a reliable pass-fail signal."
      },
      {
        id: "improve",
        trigger: "The same release-quality failure keeps consuming triage time.",
        action: "The pattern moves to Improve & Evolve for failure auto-triage, risk-based selection or self-maintaining tests.",
        output: "A backlog candidate tied to release delay and triage effort."
      },
      {
        id: "dev",
        trigger: "The quality improvement becomes a delivery-system capability.",
        action: "The same engineering team builds contract-test frameworks, CI quality gates and automation standards.",
        output: "A reusable quality capability that raises release confidence."
      }
    ]
  }
];

const opsCaseHandoffs = [
  { label: "Signal → first response", detail: "The domain primary acknowledges the alert, confirms impact and captures evidence." },
  { label: "First response → restore", detail: "The same engineer follows the runbook, with the domain secondary available for help." },
  { label: "Restore → engineering fix", detail: "A defect in code, config, IaC, schema, telemetry or tests needs a controlled change." },
  { label: "Fix → Improve & Evolve", detail: "Recurring toil or a repeated defect becomes a candidate in the shared backlog." },
  { label: "Improve & Evolve → planned build", detail: "Pandora prioritises the change; the same engineering team delivers it alongside its run obligations." }
];

type TeamCapacityBucket = "run" | "evolve" | "burst";
type RosterMode = "business" | "after" | "weekend";

interface TeamCapacityRole {
  id: string;
  workstream: "Leadership" | "DevOps" | "Data" | "Integration" | "Legacy" | "Optional";
  role: string;
  defaultFte: number;
  run: number;
  evolve: number;
  burst: number;
  onCall: boolean;
  note: string;
}

const teamBucketMeta: Array<{ id: TeamCapacityBucket; label: string; short: string; tone: string }> = [
  { id: "run", label: "Base support + 24x7 on-call", short: "Run", tone: "tech" },
  { id: "evolve", label: "Improve & Evolve", short: "Evolve", tone: "accent" },
  { id: "burst", label: "On-demand / burst capacity", short: "Burst", tone: "proof" }
];

const rosterModes: Array<{ id: RosterMode; label: string; note: string }> = [
  {
    id: "business",
    label: "Business hours",
    note: "The domain engineers deliver backlog work, respond to alerts and improve the platform during office hours."
  },
  {
    id: "after",
    label: "After hours",
    note: "The same delivery engineers take primary and secondary on-call; major incidents pull in the engineering lead."
  },
  {
    id: "weekend",
    label: "Weekend",
    note: "The same engineering rota covers longer weekend windows, with rest and backup planned into capacity."
  }
];

const rosterDomains = [
  {
    id: "devops",
    label: "DevOps",
    abbr: "DEV",
    roleId: "devops-engineers",
    scope: "GitHub, CI/CD, IaC, Kubernetes, platform connectivity and runner health."
  },
  {
    id: "data",
    label: "Data",
    abbr: "DAT",
    roleId: "data-engineers",
    scope: "Databricks, Power BI, pipeline freshness, backfills, DQ and reporting reliability."
  },
  {
    id: "integration",
    label: "Integration",
    abbr: "INT",
    roleId: "integration-engineers",
    scope: "Kafka, Kong, APIs, connectors, schemas, topics and consumer reliability."
  }
];

const rotaDays = [
  { week: "W1", day: "Mon", weekend: false },
  { week: "W1", day: "Tue", weekend: false },
  { week: "W1", day: "Wed", weekend: false },
  { week: "W1", day: "Thu", weekend: false },
  { week: "W1", day: "Fri", weekend: false },
  { week: "W1", day: "Sat", weekend: true },
  { week: "W1", day: "Sun", weekend: true },
  { week: "W2", day: "Mon", weekend: false },
  { week: "W2", day: "Tue", weekend: false },
  { week: "W2", day: "Wed", weekend: false },
  { week: "W2", day: "Thu", weekend: false },
  { week: "W2", day: "Fri", weekend: false },
  { week: "W2", day: "Sat", weekend: true },
  { week: "W2", day: "Sun", weekend: true }
];

const defaultTeamCapacityRoles: TeamCapacityRole[] = [
  {
    id: "overall-lead",
    workstream: "Leadership",
    role: "Overall Engineering Lead",
    defaultFte: 1,
    run: 20,
    evolve: 50,
    burst: 30,
    onCall: false,
    note: "Technical coherence, cross-workstream arbitration and maturity uplift."
  },
  {
    id: "devops-engineers",
    workstream: "DevOps",
    role: "DevOps engineers",
    defaultFte: 8,
    run: 45,
    evolve: 30,
    burst: 25,
    onCall: true,
    note: "GitHub, CI/CD, IaC, Kubernetes, runners and platform on-call."
  },
  {
    id: "data-engineers",
    workstream: "Data",
    role: "Databricks / Power BI engineers",
    defaultFte: 7,
    run: 40,
    evolve: 35,
    burst: 25,
    onCall: true,
    note: "Jobs, pipelines, Power BI, DQ, lineage, backfill and data on-call."
  },
  {
    id: "data-lead",
    workstream: "Data",
    role: "Data project / product / delivery lead",
    defaultFte: 1,
    run: 30,
    evolve: 35,
    burst: 35,
    onCall: false,
    note: "Plan, backlog, delivery governance and customer reporting."
  },
  {
    id: "integration-engineers",
    workstream: "Integration",
    role: "Kafka / Kong engineers",
    defaultFte: 10,
    run: 40,
    evolve: 30,
    burst: 30,
    onCall: true,
    note: "Kafka, Kong, schemas, APIs, connectors and integration on-call."
  },
  {
    id: "integration-qe",
    workstream: "Integration",
    role: "Integration QE",
    defaultFte: 1,
    run: 25,
    evolve: 35,
    burst: 40,
    onCall: false,
    note: "Release validation, regression evidence and automation quality."
  },
  {
    id: "integration-leads",
    workstream: "Integration",
    role: "Project / product / delivery leads",
    defaultFte: 2,
    run: 30,
    evolve: 30,
    burst: 40,
    onCall: false,
    note: "Kafka/Kong delivery planning, dependencies, cutover governance and cadence."
  },
  {
    id: "kafka-bas",
    workstream: "Integration",
    role: "Kafka technical business analysts",
    defaultFte: 3,
    run: 15,
    evolve: 35,
    burst: 50,
    onCall: false,
    note: "Translate business requirements into schemas, topics, APIs and stories."
  },
  {
    id: "biztalk-pm",
    workstream: "Legacy",
    role: "Onsite BizTalk / legacy PM",
    defaultFte: 1,
    run: 25,
    evolve: 25,
    burst: 50,
    onCall: false,
    note: "Denmark vendor interface, dependency tracking and transition evidence."
  },
  {
    id: "extra-run",
    workstream: "Optional",
    role: "Extra incident command reserve",
    defaultFte: 0,
    run: 80,
    evolve: 10,
    burst: 10,
    onCall: false,
    note: "Add if major incident coordination needs a larger leadership reserve beyond domain engineer on-call."
  },
  {
    id: "extra-evolve",
    workstream: "Optional",
    role: "Extra Improve & Evolve engineers",
    defaultFte: 0,
    run: 10,
    evolve: 80,
    burst: 10,
    onCall: false,
    note: "Add if maturity uplift must accelerate without eating run capacity."
  },
  {
    id: "extra-burst",
    workstream: "Optional",
    role: "Extra quarterly burst reserve",
    defaultFte: 0,
    run: 0,
    evolve: 10,
    burst: 90,
    onCall: false,
    note: "Add for planned spikes, migrations, SMEs or abnormal demand."
  }
];

function formatFte(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function formatApproxFte(value: number) {
  return `~${Math.round(value)} FTE`;
}

function formatPercent(value: number, total: number) {
  if (total <= 0) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

function rosterHealth(pool: number, mode: RosterMode) {
  const greenAt = mode === "weekend" ? 8 : mode === "after" ? 6 : 5;
  const amberAt = mode === "weekend" ? 6 : mode === "after" ? 4 : 3;
  const score = Math.min(100, Math.round((pool / greenAt) * 100));
  if (pool >= greenAt) {
    return { label: "Healthy", tone: "green", score, note: "rotation has enough depth for planned cover" };
  }
  if (pool >= amberAt) {
    return { label: "Watch", tone: "amber", score, note: "covered, but sustained demand may reduce delivery capacity" };
  }
  return { label: "Add cover", tone: "red", score, note: "needs added domain capacity or SME reserve before committing higher SLAs" };
}

function rotaSlot(prefix: string, pool: number, dayIndex: number, offset = 0) {
  if (pool < 1) return `${prefix}-SME`;
  const size = Math.max(1, Math.round(pool));
  return `${prefix}-${((dayIndex + offset) % size) + 1}`;
}

function TeamOperatingModel() {
  const [fteByRole, setFteByRole] = useState(() =>
    Object.fromEntries(defaultTeamCapacityRoles.map((role) => [role.id, role.defaultFte])) as Record<string, number>
  );
  const [showControls, setShowControls] = useState(false);
  const [showRota, setShowRota] = useState(false);
  const [rosterMode, setRosterMode] = useState<RosterMode>("after");
  const totalFte = defaultTeamCapacityRoles.reduce((sum, role) => sum + (fteByRole[role.id] ?? 0), 0);
  const steadyFte = defaultTeamCapacityRoles
    .filter((role) => role.workstream !== "Optional")
    .reduce((sum, role) => sum + (fteByRole[role.id] ?? 0), 0);
  const addedFte = Math.max(0, totalFte - steadyFte);
  const onCallFte = defaultTeamCapacityRoles
    .filter((role) => role.onCall)
    .reduce((sum, role) => sum + (fteByRole[role.id] ?? 0), 0);
  const bucketTotals = Object.fromEntries(
    teamBucketMeta.map((bucket) => [
      bucket.id,
      defaultTeamCapacityRoles.reduce((sum, role) => sum + ((fteByRole[role.id] ?? 0) * role[bucket.id]) / 100, 0)
    ])
  ) as Record<TeamCapacityBucket, number>;
  const maxBucket = Math.max(...Object.values(bucketTotals), 1);
  const workstreams = ["DevOps", "Data", "Integration", "Legacy"] as const;
  const selectedRosterMode = rosterModes.find((mode) => mode.id === rosterMode) ?? rosterModes[1];
  const commandFte =
    (fteByRole["overall-lead"] ?? 0) +
    (fteByRole["data-lead"] ?? 0) +
    (fteByRole["integration-leads"] ?? 0) +
    (fteByRole["biztalk-pm"] ?? 0) +
    (fteByRole["extra-run"] ?? 0);

  const updateRole = (id: string, value: number) => {
    setFteByRole((current) => ({ ...current, [id]: Math.max(0, value) }));
  };

  const resetModel = () =>
    setFteByRole(Object.fromEntries(defaultTeamCapacityRoles.map((role) => [role.id, role.defaultFte])) as Record<string, number>);

  return (
    <Reveal className="team-operating-model">
      <div className="team-model-head">
        <div>
          <span className="team-model-kicker">Customer ask operating model</span>
          <h3>{formatFte(steadyFte)} FTE steady team with 24x7 on-call, plus optional capacity adders</h3>
          <p>
            DevOps, Data and Integration engineers build and support their platforms. The same engineers rotate as primary and
            secondary after hours and on weekends; incident effort and recovery time are counted against planned delivery capacity.
          </p>
        </div>
        <button
          type="button"
          className={`team-model-toggle ${showControls ? "active" : ""}`}
          aria-expanded={showControls}
          onClick={() => setShowControls((current) => !current)}
        >
          <SlidersHorizontal size={15} aria-hidden="true" />
          Capacity assumptions
        </button>
      </div>

      <div className="team-model-kpis" aria-label="Team model summary">
        <div>
          <span>Current total</span>
          <strong>{formatFte(totalFte)} FTE</strong>
          <small>{formatFte(steadyFte)} steady + {formatFte(addedFte)} optional</small>
        </div>
        <div>
          <span>Engineers in on-call pools</span>
          <strong>{formatFte(onCallFte)} FTE</strong>
          <small>same DevOps, Data and Integration delivery engineers</small>
        </div>
        <div>
          <span>Leadership layer</span>
          <strong>{formatFte(fteByRole["overall-lead"] ?? 0)} FTE</strong>
          <small>overall engineering oversight</small>
        </div>
      </div>

      <div className="team-model-layout">
        <div className="team-org-board" aria-label="Workstream organization model">
          <div className="team-org-lead">
            <BadgeCheck size={18} aria-hidden="true" />
            <div>
              <span>Overall Engineering Lead</span>
              <strong>{formatFte(fteByRole["overall-lead"] ?? 0)} FTE</strong>
            </div>
          </div>
          <div className="team-workstream-grid">
            {workstreams.map((workstream) => {
              const rows = defaultTeamCapacityRoles.filter((role) => role.workstream === workstream && (fteByRole[role.id] ?? 0) > 0);
              const streamFte = rows.reduce((sum, role) => sum + (fteByRole[role.id] ?? 0), 0);
              const streamOnCall = rows.filter((role) => role.onCall).reduce((sum, role) => sum + (fteByRole[role.id] ?? 0), 0);
              return (
                <div className={`team-workstream ${workstream.toLowerCase()}`} key={workstream}>
                  <span>{workstream}</span>
                  <strong>{formatFte(streamFte)} FTE</strong>
                  <small>{streamOnCall > 0 ? `${formatFte(streamOnCall)} engineers rotate on-call` : "governance / coordination"}</small>
                  <ul>
                    {rows.map((role) => (
                      <li key={role.id}>
                        <b>{formatFte(fteByRole[role.id] ?? 0)}</b>
                        {role.role}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="team-capacity-board" aria-label="Capacity split by bucket">
          {teamBucketMeta.map((bucket) => (
            <div className={`team-capacity-bucket ${bucket.tone}`} key={bucket.id}>
              <div>
                <span>{bucket.label}</span>
                <strong>{formatApproxFte(bucketTotals[bucket.id])} / {formatPercent(bucketTotals[bucket.id], totalFte)}</strong>
              </div>
              <i><b style={{ width: `${Math.max(6, (bucketTotals[bucket.id] / maxBucket) * 100)}%` }} /></i>
            </div>
          ))}
          <p>
            These are allocations of the same engineers' time, not separate support and development teams. On-call, incident
            recovery, planned improvements and burst work cannot consume the same hour twice.
          </p>
        </div>
      </div>

      <div className="team-roster-board" aria-label="24x7 roster model">
        <div className="team-roster-head">
          <div>
            <span className="team-model-kicker">24x7 roster model</span>
            <h4>The delivery engineers also take the night and weekend rota</h4>
            <p>
              There is no separate Ops L1 or night-shift team. Each domain rotates its own engineers through primary and
              secondary on-call, including weekends, with an engineering lead for Sev1 / Sev2 escalation.
            </p>
          </div>
          <div className="team-roster-actions">
            <div className="team-roster-tabs" role="tablist" aria-label="Roster view">
              {rosterModes.map((mode) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode.id === rosterMode}
                  className={mode.id === rosterMode ? "active" : ""}
                  key={mode.id}
                  onClick={() => setRosterMode(mode.id)}
                >
                  {mode.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={`team-rota-toggle ${showRota ? "active" : ""}`}
              aria-expanded={showRota}
              onClick={() => setShowRota((current) => !current)}
            >
              <CalendarDays size={14} aria-hidden="true" />
              Two-week rota
            </button>
          </div>
        </div>

        <div className="team-roster-layers" aria-label="Roster layers">
          <span><b>1</b> Same engineering pod</span>
          <i />
          <span><b>2</b> Domain primary</span>
          <i />
          <span><b>3</b> Secondary backup</span>
          <i />
          <span><b>4</b> Major incident lead</span>
          <i />
          <span><b>5</b> SME / burst pull-in</span>
        </div>

        <div className="team-roster-context">
          <strong>{selectedRosterMode.label}</strong>
          <span>{selectedRosterMode.note}</span>
        </div>

        <div className="team-roster-grid">
          {rosterDomains.map((domain) => {
            const pool = fteByRole[domain.roleId] ?? 0;
            const health = rosterHealth(pool, rosterMode);
            const poolDepth = Math.max(1, Math.round(pool));
            return (
              <div className={`team-roster-domain ${domain.id}`} key={domain.id}>
                <div className="team-roster-domain-head">
                  <span>{domain.label}</span>
                  <strong>{formatFte(pool)} FTE</strong>
                </div>
                <div className={`team-roster-status ${health.tone}`}>
                  <b>{health.label}</b>
                  <i><em style={{ width: `${Math.max(8, health.score)}%` }} /></i>
                </div>
                <dl>
                  <div>
                    <dt>Primary</dt>
                    <dd>{rosterMode === "business" ? "active domain engineers" : `1 delivery engineer; ${poolDepth}-person rota pool`}</dd>
                  </div>
                  <div>
                    <dt>Secondary</dt>
                    <dd>{rosterMode === "business" ? "lead / peer review" : "another delivery engineer in the same domain"}</dd>
                  </div>
                  <div>
                    <dt>Scope</dt>
                    <dd>{domain.scope}</dd>
                  </div>
                </dl>
                <p>{health.note}</p>
              </div>
            );
          })}
        </div>

        <div className="team-roster-escalation">
          <div>
            <span>Major incident layer</span>
            <strong>{formatFte(commandFte)} FTE command / coordination pool</strong>
          </div>
          <p>
            Overall Engineering Lead, workstream delivery leads, legacy PM and optional incident reserve coordinate
            cross-domain events, customer communication, vendor dependency and recovery sequencing.
          </p>
        </div>

        {showRota ? (
          <div className="team-rota-detail">
            <div className="team-rota-detail-head">
              <div>
                <span className="team-model-kicker">Detailed staffing pattern</span>
                <h4>Representative two-week rota, including weekends</h4>
                <p>
                  This is the support model pattern, not a final named calendar. During mobilisation, slot labels are replaced
                  with named people, leave rules and Pandora escalation contacts.
                </p>
              </div>
              <div className="team-rota-key" aria-label="Rota key">
                <span><b>P</b>Primary</span>
                <span><b>S</b>Secondary</span>
                <span><b>IC</b>Incident command</span>
              </div>
            </div>

            <div className="team-rota-table-wrap">
              <div className="team-rota-grid" role="table" aria-label="Two-week support rota">
                <div className="team-rota-corner" role="columnheader">Layer</div>
                {rotaDays.map((day, dayIndex) => (
                  <div className={`team-rota-day ${day.weekend ? "weekend" : ""}`} role="columnheader" key={`${day.week}-${day.day}-${dayIndex}`}>
                    <strong>{day.week}</strong>
                    <span>{day.day}</span>
                  </div>
                ))}

                <div className="team-rota-row-head command" role="rowheader">
                  <strong>Incident command</strong>
                  <small>Sev1 / Sev2 coordination</small>
                </div>
                {rotaDays.map((day, dayIndex) => (
                  <div className={`team-rota-cell command ${day.weekend ? "weekend" : ""}`} role="cell" key={`cmd-${dayIndex}`}>
                    <span><b>IC</b>{rotaSlot("CMD", commandFte, dayIndex)}</span>
                    <span><b>B</b>{rotaSlot("CMD", commandFte, dayIndex, 1)}</span>
                  </div>
                ))}

                {rosterDomains.map((domain) => {
                  const pool = fteByRole[domain.roleId] ?? 0;
                  return (
                    <Fragment key={domain.id}>
                      <div className={`team-rota-row-head ${domain.id}`} role="rowheader" key={`${domain.id}-head`}>
                        <strong>{domain.label}</strong>
                        <small>{formatFte(pool)} FTE domain pool</small>
                      </div>
                      {rotaDays.map((day, dayIndex) => (
                        <div className={`team-rota-cell ${domain.id} ${day.weekend ? "weekend" : ""}`} role="cell" key={`${domain.id}-${dayIndex}`}>
                          <span><b>P</b>{rotaSlot(domain.abbr, pool, dayIndex)}</span>
                          <span><b>S</b>{rotaSlot(domain.abbr, pool, dayIndex, 1)}</span>
                        </div>
                      ))}
                    </Fragment>
                  );
                })}
              </div>
            </div>

            <p className="team-rota-foot">
              Weekend cover uses the same engineering pool and primary / secondary pattern, with longer contact windows.
              Overnight pages need next-day recovery time and a named backup. If incident volume rises, capacity assumptions
              must be adjusted before committing the same engineers to more planned delivery.
            </p>
          </div>
        ) : null}
      </div>

      {showControls ? (
        <div className="team-model-controls">
          <div className="team-model-controls-head">
            <strong>Hidden capacity update screen</strong>
            <button type="button" onClick={resetModel}>Reset to 34 FTE</button>
          </div>
          <div className="team-model-control-grid">
            {defaultTeamCapacityRoles.map((role) => (
              <label className={role.workstream === "Optional" ? "optional" : ""} key={role.id}>
                <span>
                  <strong>{role.role}</strong>
                  <small>{role.workstream} · {role.note}</small>
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={fteByRole[role.id] ?? 0}
                  onChange={(event) => updateRole(role.id, Number(event.currentTarget.value))}
                  aria-label={`${role.role} FTE`}
                />
              </label>
            ))}
          </div>
        </div>
      ) : null}
    </Reveal>
  );
}

// ── 11 · One team, three locations ───────────────────────────────────────
export function TeamShapeSection() {
  return (
    <Section id="team-shape" num="11" title="One team, three locations — not a hand-off">
      <p className="sec-sub">{teamIntro}</p>
      <div className="loc-connector" aria-hidden="true">
        <span>One team · one backlog · one leader · one knowledge base</span>
      </div>
      <div className="loc-grid">
        {teamLocations.map((loc) => (
          <Reveal className="loc-card" key={loc.id}>
            <div className="loc-head">
              <strong>{loc.city}</strong>
              <span className="loc-kind">{loc.kind}</span>
            </div>
            <p className="loc-role">{loc.role}</p>
            <ul className="loc-roles">
              {loc.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            <div className="loc-lane-block">
              <span className="loc-lane-cap">Where its effort goes today</span>
              <div className="loc-lane-key">
                <span className="lll lane1"><i />Lane 1 · Run &amp; Deliver<b>{loc.lane1}%</b></span>
                <span className="lll lane2"><i />Lane 2 · Improve &amp; Evolve<b>{100 - loc.lane1}%</b></span>
              </div>
              <div
                className="loc-lane"
                role="img"
                aria-label={`Effort at ${loc.city} today: ${loc.lane1}% Lane 1 run and deliver, ${100 - loc.lane1}% Lane 2 improve and evolve`}
              >
                <span className="loc-lane1" style={{ width: `${loc.lane1}%` } as CSSProperties} />
                <span className="loc-lane2" style={{ width: `${100 - loc.lane1}%` } as CSSProperties} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="diagram-note loc-note">
        Read the bars the same way in every card: each location is <strong>mostly Lane 1</strong> (run &amp; deliver) today.
        The coral <strong>Lane 2</strong> slice is not a second team — it is the same people doing enablement, and it grows
        only as you turn dials.
      </p>
      <TeamOperatingModel />
    </Section>
  );
}

// ── 12 · One leader, Pandora owns decisions ───────────────────────────────
export function TeamLeaderSection() {
  return (
    <Section id="team-leader" num="12" title="One leader across all tracks — and Pandora on the wheel">
      <p className="sec-sub wide">{teamLeaderNote}</p>
      <OrgDiagram />
      <h3 className="section-inline-title">Who decides, who does — decision rights by design</h3>
      <div className="control-strip">
        {controlBands.map((band) => (
          <div className={`control-seg ${band.owner}`} key={band.area}>
            <span>{band.area}</span>
          </div>
        ))}
      </div>
      <div className="control-legend">
        <span><i className="cl-dot pandora" /> Pandora-owned (accountable)</span>
        <span><i className="cl-dot joint" /> Joint</span>
        <span><i className="cl-dot sapient" /> Sapient-run (responsible)</span>
      </div>
      <div className="already alt-note">{controlNote}</div>
    </Section>
  );
}

function OrgDiagram() {
  const trackX = [180, 520, 860];
  return (
    <Reveal>
      <svg className="process-svg" viewBox="0 0 1040 470" role="img" aria-label="Delivery org: Pandora leadership pairs with one accountable Sapient engineering leader. Each domain has engineers who both build and take on-call, with a subject-matter expert for depth. Pandora keeps direct access to every track lead.">
        <defs>
          <marker id="arrow-org" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <rect x="10" y="10" width="1020" height="450" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />

        <rect x="150" y="28" width="740" height="48" rx="8" fill="#EDF1F6" stroke="#B6C5D5" />
        <text x="520" y="48" textAnchor="middle" className="svg-title" fill="#35597B">Pandora leadership — Delivery Lead + Engineering Manager</text>
        <text x="520" y="66" textAnchor="middle" className="svg-small">retains architecture · standards · roadmap · Lead &amp; Senior Engineers</text>

        {/* Primary accountability line: Pandora pairs 1:1 with the Sapient Engagement Principal */}
        <line x1="520" y1="76" x2="520" y2="106" stroke="#5C6066" strokeWidth="1.8" markerEnd="url(#arrow-org)" />
        <text x="536" y="98" className="svg-small svg-bold" fill="#5C6066">pairs 1:1</text>

        {/* The Principal — same box height, orchestrator not sole-expert */}
        <rect x="258" y="108" width="504" height="74" rx="8" fill="#F7E9E9" stroke="#E4B9BD" />
        <text x="510" y="130" textAnchor="middle" className="svg-title" fill="#C43B44">One Sapient Engagement Principal</text>
        <text x="510" y="149" textAnchor="middle" className="svg-small">Senior engineering leader · single accountable owner of delivery</text>
        <text x="510" y="168" textAnchor="middle" className="svg-small">Orchestrates through the track SMEs — SLAs, throughput, capability transfer</text>

        {/* Draws-on: Sapient senior thought leadership behind the Principal */}
        <line x1="762" y1="146" x2="786" y2="146" stroke="#684E86" strokeWidth="1.7" markerEnd="url(#arrow-org)" />
        <rect x="788" y="110" width="232" height="72" rx="8" fill="#F1EDF6" stroke="#C8B9DA" />
        <text x="904" y="128" textAnchor="middle" className="svg-label" fill="#684E86">THE PRINCIPAL DRAWS ON</text>
        <text x="904" y="146" textAnchor="middle" className="svg-small svg-bold" fill="#684E86">Sapient senior thought</text>
        <text x="904" y="161" textAnchor="middle" className="svg-small svg-bold" fill="#684E86">leadership · global CoE</text>
        <text x="904" y="176" textAnchor="middle" className="svg-small" fill="#5C6066">specialists on call, any track</text>

        {/* Transparent direct-access rail: Pandora → every track lead (dotted, encouraged) */}
        <g stroke="#35597B" strokeWidth="1.6" strokeDasharray="2 4" fill="none">
          <line x1="200" y1="76" x2="200" y2="220" />
          <line x1="180" y1="220" x2="860" y2="220" />
          <line x1="180" y1="220" x2="180" y2="244" markerEnd="url(#arrow-org)" />
          <line x1="520" y1="220" x2="520" y2="244" markerEnd="url(#arrow-org)" />
          <line x1="860" y1="220" x2="860" y2="244" markerEnd="url(#arrow-org)" />
        </g>

        {teamTracks.map((track, i) => (
          <g key={track.id}>
            <line x1="510" y1="182" x2={trackX[i]} y2="244" stroke="#C9CBD0" strokeWidth="1.6" markerEnd="url(#arrow-org)" />
            <rect x={trackX[i] - 150} y="244" width="300" height="152" rx="8" fill="#FFFFFF" stroke="#E5E2DB" />
            <text x={trackX[i]} y="266" textAnchor="middle" className="svg-title">{track.name}</text>
            {/* The subject-matter expert that owns this track's depth */}
            <rect x={trackX[i] - 138} y="276" width="276" height="30" rx="6" fill="#FBF3E3" stroke="#DDBB8C" />
            <text x={trackX[i] - 126} y="295" className="svg-small svg-bold" fill="#A3671F">{track.sme}</text>
            <rect x={trackX[i] - 138} y="314" width="276" height="34" rx="6" fill="#EFF3EA" stroke="#BBD0AF" />
            <text x={trackX[i] - 126} y="328" className="svg-small svg-bold" fill="#55763F">BUILD + IMPROVE</text>
            <text x={trackX[i] - 126} y="341" className="svg-small">{track.dev}</text>
            <rect x={trackX[i] - 138} y="354" width="276" height="34" rx="6" fill="#F8F1E6" stroke="#DDBB8C" />
            <text x={trackX[i] - 126} y="368" className="svg-small svg-bold" fill="#A3671F">RUN + ON-CALL</text>
            <text x={trackX[i] - 126} y="381" className="svg-small">{track.ops}</text>
          </g>
        ))}

        {/* Legend */}
        <g>
          <line x1="150" y1="422" x2="192" y2="422" stroke="#5C6066" strokeWidth="1.8" />
          <text x="200" y="426" className="svg-small" fill="#5C6066">Accountability — one Principal, single owner</text>
          <line x1="560" y1="422" x2="602" y2="422" stroke="#35597B" strokeWidth="1.8" strokeDasharray="2 4" />
          <text x="610" y="426" className="svg-small" fill="#35597B">Direct access — Pandora sees every lead (encouraged)</text>
        </g>
        <text x="520" y="446" textAnchor="middle" className="svg-small svg-bold" fill="#35597B">
          Same engineers build and run, including the night and weekend rota — one team, one backlog
        </text>
      </svg>
    </Reveal>
  );
}

// ── 13 · One engineering team, build and run ──────────────────────────────
export function ConvergenceSection() {
  return (
    <Section id="team-converge" num="13" title="One engineering team builds and runs from day one">
      <p className="sec-sub">{convergeIntro}</p>
      <ConvergenceDiagram />
      <div className="conv-mechs">
        {convergeMechanisms.map((mech, index) => (
          <Reveal className="conv-mech" key={mech.title}>
            <span className="conv-mech-no">{index + 1}</span>
            <div>
              <strong>{mech.title}</strong>
              <p>{mech.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <PullQuote quote={convergeClincher} source="How the shared engineering rota works" />
    </Section>
  );
}

function ConvergenceDiagram() {
  return (
    <Reveal>
      <div className="team-build-run-diagram" role="img" aria-label="The same DevOps, Data and Integration engineers deliver planned work, operate platforms during business hours, and rotate through after-hours and weekend primary and secondary on-call. Incidents feed one improvement backlog.">
        <div className="team-build-run-core">
          <span>From day one</span>
          <strong>One domain engineering team</strong>
          <small>DevOps · Data · Integration</small>
        </div>
        <div className="team-build-run-modes">
          <div>
            <span>Office hours</span>
            <strong>Build + run + improve</strong>
            <small>Backlog delivery and production response</small>
          </div>
          <div>
            <span>Nights + weekends</span>
            <strong>Same engineers on call</strong>
            <small>Primary · secondary · lead escalation</small>
          </div>
        </div>
        <div className="team-build-run-outcome">
          <span>One backlog</span>
          <strong>Restore → fix → prevent</strong>
          <small>Incident evidence informs the next planned change.</small>
        </div>
      </div>
    </Reveal>
  );
}

function SkillCaseShowcase() {
  const lastStage = opsCaseStages.length - 1;
  const [activeCaseId, setActiveCaseId] = useState(opsCaseExamples[0].id);
  const [activeStage, setActiveStage] = useState(0);
  const activeExample = opsCaseExamples.find((example) => example.id === activeCaseId) ?? opsCaseExamples[0];
  const stageMeta = opsCaseStages[activeStage];
  const stageCopy = activeExample.stages[activeStage];
  const progress = `${(activeStage / lastStage) * 100}%`;

  return (
    <Reveal className="skill-case-showcase">
      <div className="skill-case-head">
        <div>
          <span className="skill-case-kicker">Operating case simulator</span>
          <h3>How does the same engineer take a case from alert to lasting fix?</h3>
          <p>
            Choose a platform case, then follow its work from first response to planned build. The domain engineer stays
            accountable, calling a peer or specialist when the incident needs one.
          </p>
        </div>
        <div className="skill-case-controls" aria-label="Move the selected operating case">
          <button type="button" onClick={() => setActiveStage(0)} disabled={activeStage === 0}>
            <RotateCcw size={15} aria-hidden="true" /> Reset
          </button>
          <button type="button" onClick={() => setActiveStage((stage) => Math.max(0, stage - 1))} disabled={activeStage === 0}>
            <ChevronLeft size={15} aria-hidden="true" /> Back
          </button>
          <button type="button" className="primary" onClick={() => setActiveStage((stage) => Math.min(lastStage, stage + 1))} disabled={activeStage === lastStage}>
            Move case <ChevronRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="skill-case-picker" aria-label="Choose example case">
        {opsCaseExamples.map((example) => {
          const active = example.id === activeCaseId;
          return (
            <button
              type="button"
              key={example.id}
              className="skill-case-tab"
              aria-pressed={active}
              onClick={() => {
                setActiveCaseId(example.id);
                setActiveStage(0);
              }}
            >
              <strong>{example.skill}</strong>
              <span>{example.caseTitle}</span>
            </button>
          );
        })}
      </div>

      <div
        className="skill-case-rail"
        style={{ "--progress": progress } as CSSProperties}
        aria-label={`${activeExample.skill}: ${activeExample.caseTitle}`}
      >
        <span className="skill-case-line" aria-hidden="true"><i /></span>
        {opsCaseStages.map((stage, index) => {
          const state = index === activeStage ? "active" : index < activeStage ? "passed" : "todo";
          return (
            <button
              type="button"
              key={stage.id}
              className={`skill-case-step ${stage.id} ${state}`}
              style={{ "--stage-hue": `var(${stage.hue})` } as CSSProperties}
              aria-current={index === activeStage}
              onClick={() => setActiveStage(index)}
            >
              <span className="skill-case-dot">{index + 1}</span>
              <strong>{stage.label}</strong>
              <small>{stage.short}</small>
            </button>
          );
        })}
      </div>

      <div className="skill-case-detail" aria-live="polite">
        <div className="skill-case-active" style={{ "--stage-hue": `var(${stageMeta.hue})` } as CSSProperties}>
          <span className="skill-case-badge">{stageMeta.label}</span>
          <h4>{activeExample.skill}</h4>
          <p className="skill-case-title">{activeExample.caseTitle}</p>
          <p className="skill-case-signal">{activeExample.signal}</p>
          <div className="skill-case-facts">
            <p><strong>Trigger</strong>{stageCopy.trigger}</p>
            <p><strong>Action</strong>{stageCopy.action}</p>
            <p><strong>Output</strong>{stageCopy.output}</p>
          </div>
        </div>

        <div className="skill-case-rules">
          <h4>When the work changes</h4>
          <ol>
            {opsCaseHandoffs.map((rule, index) => {
              const reached = activeStage > index;
              const current = activeStage === index + 1;
              return (
                <li className={`${reached ? "reached" : ""} ${current ? "current" : ""}`} key={rule.label}>
                  <strong>{rule.label}</strong>
                  <span>{rule.detail}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Reveal>
  );
}

// ── 14 · Skills, training and knowledge transfer ─────────────────────────
export function TeamSkillsSection() {
  return (
    <Section id="team-skills" num="14" title="Skills coverage, training and knowledge transfer">
      <p className="sec-sub">{skillsNote}</p>
      <div className="skills-ladder">
        <div className="sl-shared-band">
          <strong>One engineering pool across every column: first response → restore → fix → improve → build. Nights and weekends use the same rota.</strong>
        </div>
        <div className="sl-head">
          <span>Engineering skill</span>
          {skillTierHeaders.map((tier) => (
            <span key={tier.label} className={tier.label === "Improve & Evolve" ? "sl-improve-head" : undefined}>
              <strong>{tier.label}</strong>
              <small>{tier.detail}</small>
            </span>
          ))}
        </div>
        {skillRows.map((row) => (
          <div className="sl-row" key={row.skill}>
            <span className="sl-skill">{row.skill}</span>
            <span data-tier="First response · assess & capture">{row.t1}</span>
            <span data-tier="Restore · diagnose & recover">{row.t2}</span>
            <span className="sl-shared" data-tier="Engineer fix · code / config / IaC">{row.t3}</span>
            <span className="sl-improve" data-tier="Improve & Evolve · Lane 2 backlog">{row.improve}</span>
            <span className="sl-shared" data-tier="Development · planned build">{row.dev}</span>
          </div>
        ))}
      </div>
      <p className="diagram-note sl-backlog-note">{skillBacklogNote}</p>
      <SkillCaseShowcase />
      <Reveal className="l3-bridge">
        <div className="l3-bridge-copy">
          <strong>{skillBridge.title}</strong>
          <p>{skillBridge.detail}</p>
        </div>
        <div className="l3-flow" aria-label={skillBridge.flow.join(" to ")}>
          {skillBridge.flow.map((step, index) => {
            const isSharedPool = ["First response", "Restore", "Engineer fix", "Planned build"].includes(step);
            const isImprove = step === "Improve & Evolve";
            return (
              <div className={`l3-node${isSharedPool ? " shared" : ""}${isImprove ? " improve" : ""}`} key={step}>
                <span>{step}</span>
                {index < skillBridge.flow.length - 1 && (
                  <i aria-hidden="true">→</i>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>
      <h3 className="section-inline-title">Knowledge transfer — a designed loop, so it sticks with Pandora</h3>
      <div className="kt-loop">
        {ktLoop.map((step, index) => (
          <div className={`kt-step ${step.step === "Own" ? "own" : ""}`} key={step.step}>
            <div className="kt-step-head">
              <span className="kt-no">{index + 1}</span>
              <strong>{step.step}</strong>
            </div>
            <p>{step.detail}</p>
            {index < ktLoop.length - 1 && <span className="kt-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <div className="already alt-note">{ktNote}</div>
    </Section>
  );
}

// ── 15 · Capacity that compounds ─────────────────────────────────────────
export function TeamCapacitySection() {
  return (
    <Section id="team-capacity" num="15" title="Capacity that compounds — more from a leaner, stabler team">
      <p className="sec-sub">
        The headline: effective capacity rises each horizon without a matching rise in headcount, and an increasing share
        of it is owned by Pandora. Here is what drives it.
      </p>
      <CapacityChart />
      <div className="cap-drivers">
        {capacityDrivers.map((driver, index) => (
          <Reveal className="cap-driver" key={driver.at}>
            <span className="cap-driver-no">{index + 1}</span>
            <div>
              <div className="cap-driver-head">
                <strong>{driver.label}</strong>
                <span>{driver.at}</span>
              </div>
              <p>{driver.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <PullQuote quote={capacityNote} source="The capacity dividend of the gentle path" />
      <h3 className="section-inline-title">What we need from Pandora (people)</h3>
      <div className="ask-list team-asks">
        {teamAsks.map((ask) => (
          <Reveal className="ask-row" key={ask}>
            <BadgeCheck size={18} />
            <span>{ask}</span>
          </Reveal>
        ))}
      </div>
      <p className="team-close">
        <Check size={16} aria-hidden="true" />
        {teamClose}
      </p>
    </Section>
  );
}

function CapacityChart() {
  const horizonX = [130, 400, 670, 940];
  const dotY = [214, 176, 130, 60];
  const tagColors = ["#8A8F96", "#35597B", "#C43B44", "#2E7D4F"];
  return (
    <Reveal className="curves-panel">
      <div className="figure-label">
        <strong>Effective capacity over the journey</strong>
        <span>illustrative — capacity rises while the team stays lean</span>
      </div>
      <svg viewBox="0 0 1040 356" role="img" aria-label="Capacity chart: effective capacity rises across the four horizons while team size stays flat, and the Pandora-owned share grows. The gap between capacity and team size is the productivity dividend.">
        <defs>
          <marker id="cap-arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
            <path d="M1 1L9 5L1 9Z" fill="#5C6066" />
          </marker>
        </defs>
        <rect x="20" y="16" width="1000" height="250" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />

        {/* Pandora-owned share — rising green area at the base */}
        <path d="M110 250 L110 236 C300 224 500 200 690 176 C820 160 900 150 960 146 L960 250 Z" fill="#2E7D4F" opacity="0.12" />
        <text x="470" y="232" className="svg-small svg-bold" fill="#2E7D4F">Pandora-owned share — grows as capability transfers to you ↑</text>

        {/* Team size — muted, flat/declining */}
        <path d="M130 196 C360 194 620 196 940 204" fill="none" stroke="#8A8F96" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 5" />

        {/* Effective capacity — steel, rising */}
        <path d="M130 214 C300 188 470 150 660 112 C790 86 880 70 940 60" fill="none" stroke="#35597B" strokeWidth="3.5" strokeLinecap="round" />

        {/* the productivity-dividend bracket: the gap between the two lines */}
        <line x1="800" y1="86" x2="800" y2="200" stroke="#5C6066" strokeWidth="1.4" markerStart="url(#cap-arr)" markerEnd="url(#cap-arr)" />
        <rect x="808" y="118" width="150" height="34" rx="6" fill="#FBFAF8" stroke="#D9D5CE" />
        <text x="816" y="132" className="svg-small svg-bold" fill="#5C6066">Productivity dividend</text>
        <text x="816" y="145" className="svg-small" fill="#5C6066">more output, same team</text>

        {/* Legend */}
        <g>
          <rect x="40" y="30" width="360" height="86" rx="8" fill="#FFFFFF" stroke="#E5E2DB" />
          <line x1="56" y1="50" x2="86" y2="50" stroke="#35597B" strokeWidth="3.5" strokeLinecap="round" />
          <text x="96" y="54" className="svg-small svg-bold" fill="#16181D">Effective capacity — what the team can deliver</text>
          <line x1="56" y1="74" x2="86" y2="74" stroke="#8A8F96" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 5" />
          <text x="96" y="78" className="svg-small svg-bold" fill="#16181D">Team size — headcount (flat, then leaner)</text>
          <rect x="56" y="92" width="30" height="12" rx="2" fill="#2E7D4F" opacity="0.16" stroke="#2E7D4F" strokeOpacity="0.5" />
          <text x="96" y="102" className="svg-small svg-bold" fill="#16181D">Pandora-owned share — capability you own</text>
        </g>

        {horizonX.map((x, i) => (
          <g key={capacityDrivers[i].at}>
            <line x1={x} y1="30" x2={x} y2="250" stroke="#E5E2DB" strokeDasharray="3 4" />
            <circle cx={x} cy={dotY[i]} r="4.5" fill="#35597B" stroke="#fff" strokeWidth="1.5" />
            <text x={x} y="286" textAnchor="middle" className="svg-small svg-bold">{capacityDrivers[i].at}</text>
            <text x={x} y="301" textAnchor="middle" className="svg-small">{capacityDrivers[i].label}</text>
            <text x={x} y="318" textAnchor="middle" className="svg-small svg-bold" fill={tagColors[i]}>{capacityDrivers[i].tag}</text>
          </g>
        ))}
        <text x="520" y="344" textAnchor="middle" className="svg-small" fill="#8A8F96">Each horizon adds a new source of capacity on the same — or leaner — team.</text>
      </svg>
    </Reveal>
  );
}
