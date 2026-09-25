import {
  Activity,
  ArrowRight,
  Bot,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  Gauge,
  GitBranch,
  Headphones,
  Layers3,
  Network,
  RotateCw,
  ShieldCheck,
  Users,
  Zap,
  type LucideIcon
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { brand } from "../data/alternative";

type BoothTone = "data" | "integration" | "devops" | "ops" | "proof";
type BoothVisual =
  | "cover"
  | "data"
  | "integration"
  | "nexus"
  | "ai"
  | "adoption"
  | "oncall"
  | "incident"
  | "paks"
  | "portal"
  | "embedding"
  | "shiftleft";

interface BoothPage {
  id: string;
  scope: string;
  group: string;
  title: string;
  headline: string;
  purpose: string;
  show: string[];
  proof: string[];
  tone: BoothTone;
  visual: BoothVisual;
}

const boothPages: BoothPage[] = [
  {
    id: "booth-overview",
    scope: "Booth brief",
    group: "Walkthrough",
    title: "Booth Overview",
    headline: "Show operations, not just describe them.",
    purpose:
      "A guided walkthrough for Data, Integration and DevOps booths. Each stop links the RFP scope to the operating model, live examples, support ownership and improvement path.",
    show: ["Data + Integration service model", "DevOps / PAKS operations", "24x7 and incident flow", "AI, adoption and shift-left"],
    proof: ["One story across booths", "Generic page numbering", "RFP references kept as scope tags"],
    tone: "proof",
    visual: "cover"
  },
  {
    id: "data-operating-model",
    scope: "B.3.1",
    group: "Data + Integration",
    title: "Data Operating Model",
    headline: "Data platform support runs through service areas, evidence and improvement loops.",
    purpose:
      "Explain how Databricks, Power BI, Unity Catalog, DQ, lineage, cost and reliability are operated as a managed service area.",
    show: ["Engineer-owned first response, restore and fix", "Pipeline freshness, DQ and backfill response", "Runbook, RCA and automation backlog", "Cost and reliability governance"],
    proof: ["Failed pipeline example", "Stale dashboard example", "Unity permission example"],
    tone: "data",
    visual: "data"
  },
  {
    id: "integration-operating-model",
    scope: "B.3.2",
    group: "Data + Integration",
    title: "Integration Operating Model",
    headline: "Kafka, Kong and APIs need event reliability plus clear resolver ownership.",
    purpose:
      "Show how topics, schemas, connectors, consumers, gateways and APIs are monitored, triaged, restored and improved.",
    show: ["Kafka lag and connector failure handling", "Kong/API degradation path", "Schema governance and consumer impact", "Event quality and replay controls"],
    proof: ["Connector lag walkthrough", "Kong 5xx spike", "Schema mismatch case"],
    tone: "integration",
    visual: "integration"
  },
  {
    id: "nexus-operating-cases",
    scope: "B.3.3",
    group: "Nexus",
    title: "Nexus Operating Cases",
    headline: "Nexus has two operating modes: build-and-handback or managed operation.",
    purpose:
      "Separate facade build-and-handback cases from managed-operation cases so Pandora can see where accountability sits after delivery.",
    show: ["Facade build path", "Managed-operation path", "Decision criteria", "Evidence and handback artefacts"],
    proof: ["Ownership decision tree", "Run vs project distinction", "Handback checklist"],
    tone: "integration",
    visual: "nexus"
  },
  {
    id: "ai-load-reduction",
    scope: "B.3.4",
    group: "AI + Operations",
    title: "AI Load Reduction",
    headline: "AI starts by reducing operational load, not by taking control.",
    purpose:
      "Demonstrate how automation, triage assist, runbook recommendation and diversity reduction reduce toil before any agentic execution is dialled up.",
    show: ["Alert summarisation", "Log / metric / trace correlation", "Runbook recommendation", "Automation backlog generation"],
    proof: ["Noise-to-signal funnel", "Duplicate incident clustering", "RCA draft example"],
    tone: "ops",
    visual: "ai"
  },
  {
    id: "adoption-engagement",
    scope: "B.3.5",
    group: "Adoption",
    title: "Team Engagement",
    headline: "Adoption improves when teams are engaged directly, not only given tools.",
    purpose:
      "Show office hours, onboarding, champions, enablement, DevEx measurement and feedback loops that increase adoption.",
    show: ["Team onboarding", "Office hours and champions", "Golden-path enablement", "Usage and friction metrics"],
    proof: ["Adoption flywheel", "Team feedback loop", "DevEx tracking"],
    tone: "proof",
    visual: "adoption"
  },
  {
    id: "oncall-support-model",
    scope: "B.3.6",
    group: "24x7",
    title: "On-Call Support Model",
    headline: "The delivery engineers also cover nights and weekends by domain rota.",
    purpose:
      "Explain how the same DevOps, Data and Integration engineers take primary and secondary on-call after hours and on weekends. Legacy BizTalk issues follow an agreed vendor/SME escalation route rather than a staffed BizTalk engineer rota.",
    show: ["Primary / secondary engineers by domain", "Incident command layer", "Legacy BizTalk escalation", "SME and vendor pull-in"],
    proof: ["Two-week rota pattern", "Sev1 / Sev2 escalation", "Runbook readiness"],
    tone: "ops",
    visual: "oncall"
  },
  {
    id: "incident-reliability",
    scope: "B.3.7",
    group: "Reliability",
    title: "Incident + Reliability",
    headline: "Incident management is measured through MTTD, MTTA, MTTR and user confidence.",
    purpose:
      "Connect incident flow to detection, acknowledgement, restoration, RCA, customer satisfaction and the 99.99% uptime ambition.",
    show: ["Detect, acknowledge, triage, restore", "MTTA / MTTD / MTTR dashboard", "CSAT and follow-up", "99.99% target discussion"],
    proof: ["Incident timeline", "KPI overlay", "Post-incident prevention loop"],
    tone: "ops",
    visual: "incident"
  },
  {
    id: "paks-operations",
    scope: "C.3.1",
    group: "DevOps",
    title: "PAKS Operations",
    headline: "PAKS is a managed AKS platform with operations, lifecycle and security discipline.",
    purpose:
      "Show how AKS clusters, ingress, networking, secrets, certificates, autoscaling, upgrades, namespaces, cost, DR and incidents are operated.",
    show: ["Cluster monitoring and lifecycle", "Namespace-as-a-service", "Capacity and cost management", "Security posture with Security team"],
    proof: ["AKS operations cockpit", "Patch and upgrade route", "Backup / restore / DR controls"],
    tone: "devops",
    visual: "paks"
  },
  {
    id: "developer-portal-tooling",
    scope: "C.3.2",
    group: "DevOps",
    title: "Developer Portal + Tooling",
    headline: "The portal, golden paths and AI dev tools become the delivery front door.",
    purpose:
      "Cover Backstage to Port.io, GitHub, Actions, Jira, Confluence, Terraform, New Relic, PagerDuty, AI tooling, test tooling and migrations.",
    show: ["Catalogue and scorecard accuracy", "Golden-path templates", "ADO to GitHub and OpsGenie to PagerDuty", "Claude, Copilot and Open Code administration"],
    proof: ["Golden-path factory", "Tooling health", "DevEx adoption metrics"],
    tone: "devops",
    visual: "portal"
  },
  {
    id: "embedded-team-model",
    scope: "C.3.3",
    group: "DevOps",
    title: "Embedded Team Model",
    headline: "One team embeds with Pandora platform engineering instead of operating at a distance.",
    purpose:
      "Explain how Pandora owners, PS engineers, shared backlog, ceremonies, decision gates and evidence loops operate together.",
    show: ["Pandora owns standards and gates", "PS embeds capacity into shared backlog", "One engineering lead", "Transparent escalation"],
    proof: ["Shared backlog model", "Decision rights", "Evidence gate rhythm"],
    tone: "proof",
    visual: "embedding"
  },
  {
    id: "shift-left-model",
    scope: "C.3.4",
    group: "DevOps",
    title: "Shift-Left Model",
    headline: "Self-service and golden paths reduce ticket load without weakening control.",
    purpose:
      "Show how requests move from ticket queues to self-service templates, policy checks, approvals and evidence capture.",
    show: ["Self-service over tickets", "Golden paths and templates", "Policy-as-code checks", "Human approval where risk needs it"],
    proof: ["Before / after flow", "Ticket deflection", "Evidence captured by default"],
    tone: "devops",
    visual: "shiftleft"
  }
];

function pageNo(index: number) {
  return String(index + 1).padStart(2, "0");
}

function BoothNav() {
  return (
    <nav className="booth-nav" aria-label="Booth pages">
      <a className="booth-brand" href="#booth-overview">
        <strong>{brand}</strong>
        <span>Booth walkthrough</span>
      </a>
      <div>
        {boothPages.map((page, index) => (
          <a href={`#${page.id}`} key={page.id}>
            <em>{pageNo(index)}</em>
            <span>{page.title}</span>
          </a>
        ))}
      </div>
      <a className="booth-main-link" href="/presentation#booth-walkthrough">
        Main deck
        <ExternalLink size={13} aria-hidden="true" />
      </a>
    </nav>
  );
}

function BoothSlide({ page, index, children }: { page: BoothPage; index: number; children: ReactNode }) {
  const label = pageNo(index);
  return (
    <section className={`booth-slide tone-${page.tone}`} id={page.id} aria-label={`${label} ${page.title}`}>
      <div className="booth-slide-inner">
        <div className="booth-copy">
          <span className="booth-page">{label}</span>
          <small>{page.group} <b>{page.scope}</b></small>
          <h2>{page.headline}</h2>
          <p>{page.purpose}</p>
          <div className="booth-chip-row" aria-label="What to show">
            {page.show.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="booth-proof-list">
            <strong>Proof to prepare</strong>
            {page.proof.map((item) => (
              <span key={item}>
                <CheckCircle2 size={14} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="booth-visual">{children}</div>
      </div>
    </section>
  );
}

function IconCard({ icon: Icon, title, detail }: { icon: LucideIcon; title: string; detail: string }) {
  return (
    <div className="booth-icon-card">
      <Icon size={22} aria-hidden="true" />
      <strong>{title}</strong>
      <span>{detail}</span>
    </div>
  );
}

function CoverVisual() {
  const tracks: Array<[string, string, LucideIcon]> = [
    ["Data", "Service area, reliability, DQ, lineage, cost and adoption.", Database],
    ["Integration", "Kafka, Kong, Nexus, APIs, schemas and event operations.", Network],
    ["DevOps", "PAKS, developer portal, golden paths and shift-left.", Cloud],
    ["Operations", "24x7 rota, incident metrics, AI load reduction and support model.", Headphones]
  ];
  return (
    <div className="booth-cover-grid">
      {tracks.map(([title, detail, Icon]) => (
        <IconCard icon={Icon} title={title} detail={detail} key={title} />
      ))}
      <div className="booth-cover-note">
        <strong>Format</strong>
        <span>Generic page numbering for navigation. RFP scope references stay as supporting tags.</span>
      </div>
    </div>
  );
}

function ServiceModelVisual({ kind }: { kind: "data" | "integration" }) {
  const isData = kind === "data";
  const steps = isData
    ? ["Alert or user signal", "L1 evidence capture", "L2 restore / rerun", "L3 fix / backfill", "Improve automation"]
    : ["Lag / API signal", "L1 classify impact", "L2 restore flow", "L3 schema / code fix", "Improve contract"];
  const cards: Array<[string, string, LucideIcon]> = isData
    ? [
        ["Reliability", "Freshness, failed jobs, backfill, DQ and dashboard impact.", Activity],
        ["Governance", "Unity Catalog, lineage, access, policy and evidence.", ShieldCheck],
        ["Cost", "Cluster usage, right-sizing and consumption reporting.", Gauge]
      ]
    : [
        ["Event flow", "Topics, consumers, schemas, connectors and replay safety.", Network],
        ["API flow", "Gateway health, routes, latency, 5xx and policy checks.", Zap],
        ["Contracts", "Schema evolution, consumer impact and compatibility.", ClipboardCheck]
      ];
  return (
    <div className="booth-service-model">
      <div className="booth-flow-row">
        {steps.map((step, index) => (
          <div key={step}>
            <em>{index + 1}</em>
            <span>{step}</span>
          </div>
        ))}
      </div>
      <div className="booth-card-grid three">
        {cards.map(([title, detail, Icon]) => (
          <IconCard icon={Icon} title={title} detail={detail} key={title} />
        ))}
      </div>
    </div>
  );
}

function NexusVisual() {
  return (
    <div className="booth-split">
      <section>
        <span>Path 1</span>
        <strong>Facade build-and-handback</strong>
        <p>Build the facade or migration asset, package evidence, train owners and hand back with support artefacts.</p>
        <small>Project accountability</small>
      </section>
      <section>
        <span>Path 2</span>
        <strong>Managed operation</strong>
        <p>PS remains accountable for monitoring, incident response, RCA, backlog and improvement of the service.</p>
        <small>Run accountability</small>
      </section>
      <div className="booth-decision-line">
        <span>Decision gate</span>
        <b>Is there ongoing production accountability?</b>
      </div>
    </div>
  );
}

function AiVisual() {
  const funnel = ["Alert noise", "Classify", "Correlate", "Recommend", "Automate", "Reduce recurrence"];
  return (
    <div className="booth-ai-funnel">
      {funnel.map((item, index) => (
        <div style={{ "--w": `${100 - index * 9}%` } as CSSProperties & Record<"--w", string>} key={item}>
          <Bot size={17} aria-hidden="true" />
          <span>{item}</span>
        </div>
      ))}
      <p>Human approval remains where execution risk exists. AI earns trust by removing toil and improving signal quality first.</p>
    </div>
  );
}

function AdoptionVisual() {
  const loop = ["Engage teams", "Onboard", "Enable", "Measure", "Improve", "Scale"];
  return (
    <div className="booth-loop">
      {loop.map((item, index) => (
        <div key={item}>
          <em>{index + 1}</em>
          <strong>{item}</strong>
        </div>
      ))}
      <p>Adoption is a managed motion: direct engagement, champions, office hours and DevEx telemetry.</p>
    </div>
  );
}

function OnCallVisual() {
  const rows = [
    ["Primary", "Domain engineer handles first response"],
    ["Secondary", "Backup from same domain"],
    ["Incident command", "Engineering lead / delivery lead coordinates"],
    ["SME pull-in", "BizTalk, Kubernetes, security, vendor or Sapient SME"]
  ];
  return (
    <div className="booth-rota">
      {["DevOps / Kubernetes", "Data", "Integration", "Legacy BizTalk"].map((domain) => (
        <section key={domain}>
          <strong>{domain}</strong>
          {rows.map(([label, detail]) => (
            <span key={label}>
              <b>{label}</b>
              <small>{detail}</small>
            </span>
          ))}
        </section>
      ))}
    </div>
  );
}

function IncidentVisual() {
  const steps = ["Detect", "Acknowledge", "Triage", "Mitigate", "Restore", "RCA", "Prevent"];
  const metrics = ["MTTD", "MTTA", "MTTR", "CSAT", "99.99% target"];
  return (
    <div className="booth-incident">
      <div className="booth-timeline">
        {steps.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
      <div className="booth-metric-row">
        {metrics.map((metric) => (
          <strong key={metric}>{metric}</strong>
        ))}
      </div>
    </div>
  );
}

function PaksVisual() {
  const cockpit: Array<[string, string, LucideIcon]> = [
    ["Cluster health", "AKS, node pools, add-ons, ingress and autoscaling.", Cloud],
    ["Namespace service", "Onboarding, quota, isolation and provisioning.", Boxes],
    ["Security posture", "RBAC, network policy, image and supply chain hygiene.", ShieldCheck],
    ["Recovery", "Backup, restore and disaster recovery for managed state.", RotateCw]
  ];
  return (
    <div className="booth-card-grid two">
      {cockpit.map(([title, detail, Icon]) => (
        <IconCard icon={Icon} title={title} detail={detail} key={title} />
      ))}
    </div>
  );
}

function PortalVisual() {
  const path = ["Portal", "Template", "Repo", "Pipeline", "Observe", "Support"];
  return (
    <div className="booth-golden-path">
      {path.map((step, index) => (
        <div key={step}>
          <Code2 size={18} aria-hidden="true" />
          <span>{step}</span>
          {index < path.length - 1 ? <ArrowRight size={15} aria-hidden="true" /> : null}
        </div>
      ))}
      <p>Backstage to Port.io, GitHub Actions, Jira, Terraform, New Relic, PagerDuty and AI dev tooling become one supported golden path.</p>
    </div>
  );
}

function EmbeddingVisual() {
  return (
    <div className="booth-embed">
      <section>
        <Users size={24} aria-hidden="true" />
        <strong>Pandora platform owners</strong>
        <span>Standards, priorities, gates and acceptance.</span>
      </section>
      <section>
        <Layers3 size={24} aria-hidden="true" />
        <strong>PS embedded engineers</strong>
        <span>Run, improve, automate and provide capability depth.</span>
      </section>
      <section>
        <ClipboardCheck size={24} aria-hidden="true" />
        <strong>Shared backlog</strong>
        <span>One cadence, one evidence trail, visible escalation.</span>
      </section>
    </div>
  );
}

function ShiftLeftVisual() {
  return (
    <div className="booth-before-after">
      <section>
        <span>Before</span>
        <strong>Ticket queue</strong>
        <p>Manual fulfilment, variable patterns, slower feedback and limited evidence.</p>
      </section>
      <ArrowRight size={28} aria-hidden="true" />
      <section>
        <span>After</span>
        <strong>Self-service golden path</strong>
        <p>Template, policy check, human approval where needed and evidence captured by default.</p>
      </section>
    </div>
  );
}

function BoothVisualFor({ kind }: { kind: BoothVisual }) {
  if (kind === "cover") return <CoverVisual />;
  if (kind === "data") return <ServiceModelVisual kind="data" />;
  if (kind === "integration") return <ServiceModelVisual kind="integration" />;
  if (kind === "nexus") return <NexusVisual />;
  if (kind === "ai") return <AiVisual />;
  if (kind === "adoption") return <AdoptionVisual />;
  if (kind === "oncall") return <OnCallVisual />;
  if (kind === "incident") return <IncidentVisual />;
  if (kind === "paks") return <PaksVisual />;
  if (kind === "portal") return <PortalVisual />;
  if (kind === "embedding") return <EmbeddingVisual />;
  return <ShiftLeftVisual />;
}

export function BoothVisitSite() {
  return (
    <div className="booth-site">
      <BoothNav />
      {boothPages.map((page, index) => (
        <BoothSlide page={page} index={index} key={page.id}>
          <BoothVisualFor kind={page.visual} />
        </BoothSlide>
      ))}
    </div>
  );
}
