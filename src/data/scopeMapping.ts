export type ScopeCapability = "Team + Fabric" | "SDLC skills" | "Agentic Ops";
export type ScopeStatusKind = "deep" | "built" | "outcome";

export interface ScopeSummary {
  label: string;
  value: string;
  body: string;
}

export interface ScopeHorizon {
  when: string;
  title: string;
  body: string;
}

export interface ScopeRow {
  ask: string;
  status: string;
  kind: ScopeStatusKind;
  caps: ScopeCapability[];
  horizon: string;
  solution: string;
  path: string;
}

export interface ScopeDomain {
  name: string;
  claim: string;
  rows: ScopeRow[];
}

export const scopeSummary: ScopeSummary[] = [
  {
    label: "Customer scope",
    value: "30 requirements",
    body: "13 DevOps objectives and 17 Data & Integration objectives from scope-mapping.pptx are carried into the fabric backlog."
  },
  {
    label: "Coverage model",
    value: "3 work loops",
    body: "Each ask maps to Teams + Fabric, Agentic SDLC skills, Agentic Ops, or a deliberate combination of the three."
  },
  {
    label: "Transformation posture",
    value: "Take over -> transform",
    body: "We start by stabilising current scope, then progressively codify, automate and modernise it through dated maturity gates."
  }
];

export const scopeHorizons: ScopeHorizon[] = [
  {
    when: "3 months",
    title: "Take over as-is and instrument",
    body: "Stand up the graph-backed control model, take the named work into backlog, connect Teams intake, ServiceNow evidence and first PAKS/GitHub/Data governance recipes."
  },
  {
    when: "6 months",
    title: "Codify repeatable work",
    body: "Turn high-volume patterns into reusable recipes and SDLC skills: GitHub migration, PagerDuty migration, Kong/Nexus templates, Databricks workspaces and onboarding."
  },
  {
    when: "1 year",
    title: "Delegate low-risk loops",
    body: "Move proven provisioning, observability triage, DORA/NPS measurement, data quality and real-time pipeline support into gated agentic execution."
  },
  {
    when: "2 years",
    title: "Transform and retire legacy",
    body: "Complete larger estate shifts such as BizTalk decommissioning, Synapse exit and continuous improvement as Pandora-owned fabric operations."
  }
];

export const scopeBridgeSteps = [
  "Take over current scope",
  "Attach to fabric capability",
  "Prove gate by horizon",
  "Transform without big-bang"
] as const;

export const scopeDomains: ScopeDomain[] = [
  {
    name: "DevOps scope",
    claim: "Every DevOps objective lands on a named fabric capability, not a separate side programme.",
    rows: [
      {
        ask: "PAKS Kubernetes self-service namespace / auto provisioning",
        status: "Deep dive",
        kind: "deep",
        caps: ["Team + Fabric", "SDLC skills", "Agentic Ops"],
        horizon: "3 months",
        solution: "PAKS, Teams agent, graph policy, Terraform/GitOps recipes",
        path: "Take over the provisioning request path, codify namespace recipes, then delegate low-risk self-service."
      },
      {
        ask: "Operating model for PAKS and portal",
        status: "Fabric built-in",
        kind: "built",
        caps: ["Team + Fabric", "Agentic Ops"],
        horizon: "3 months",
        solution: "Platform operating model, ServiceNow, SLOs, on-call workflows",
        path: "Run the operating cadence from day one, then transfer ownership into the Pandora platform model."
      },
      {
        ask: "ADO to GitHub foundation",
        status: "Deep dive",
        kind: "deep",
        caps: ["SDLC skills"],
        horizon: "3 months",
        solution: "GitHub migration factory, repo/pipeline conversion skills",
        path: "Start with migration foundations, then industrialise conversion patterns through versioned skills."
      },
      {
        ask: "End-to-end observability",
        status: "Fabric built-in",
        kind: "built",
        caps: ["Agentic Ops"],
        horizon: "3 months",
        solution: "New Relic, SLO dashboards, alert triage, runbook automation",
        path: "Connect current telemetry first, then move known triage patterns into governed ops agents."
      },
      {
        ask: "DevEx and onboarding through single IDP",
        status: "Fabric built-in",
        kind: "built",
        caps: ["Team + Fabric", "SDLC skills"],
        horizon: "3 months",
        solution: "Developer portal, Teams front door, graph-backed access",
        path: "Make Teams and identity the entry point before expanding developer golden paths."
      },
      {
        ask: "Helios developer portal upgrade / Port.io migration",
        status: "Deep dive",
        kind: "deep",
        caps: ["Team + Fabric", "SDLC skills"],
        horizon: "6 months",
        solution: "Port.io, catalog migration, scorecards, ownership graph",
        path: "Migrate catalog foundations, then expose ownership and scorecards through the graph-backed portal."
      },
      {
        ask: "Tool selection decisions",
        status: "Deep dive",
        kind: "deep",
        caps: ["Team + Fabric"],
        horizon: "3 months",
        solution: "Governance board, graph evidence, decision records",
        path: "Convert tool choices into transparent decision records and policy evidence, not one-off debates."
      },
      {
        ask: "OpsGenie to PagerDuty migration",
        status: "Deep dive",
        kind: "deep",
        caps: ["SDLC skills", "Agentic Ops"],
        horizon: "6 months",
        solution: "PagerDuty migration factory, on-call policy, incident workflows",
        path: "Use migration skills for setup and runbooks, then connect escalation policy into ops governance."
      },
      {
        ask: "DORA and developer NPS improvement",
        status: "Transformation outcome",
        kind: "outcome",
        caps: ["Team + Fabric", "SDLC skills", "Agentic Ops"],
        horizon: "1 year",
        solution: "DORA dashboards, agentic SDLC, DevEx measurement loop",
        path: "Measure from day one, then improve through SDLC automation, onboarding and operations feedback loops."
      },
      {
        ask: "Transition and continuous improvement",
        status: "Deep dive",
        kind: "deep",
        caps: ["Team + Fabric", "SDLC skills", "Agentic Ops"],
        horizon: "2 years",
        solution: "Agentic Fabric backlog, ServiceNow evidence, improvement cadence",
        path: "Move from transition backlog to Pandora-owned continuous improvement governed by evidence gates."
      },
      {
        ask: "K8s / DevTools provisioning and support",
        status: "Deep dive",
        kind: "deep",
        caps: ["Team + Fabric", "SDLC skills", "Agentic Ops"],
        horizon: "6 months",
        solution: "PAKS, GitHub Actions, runners, secrets, certs, IaC recipes",
        path: "Codify repeatable support requests before allowing approved recipes to execute through controlled tools."
      },
      {
        ask: "Cost transparency for DevOps estate",
        status: "Fabric built-in",
        kind: "built",
        caps: ["Team + Fabric", "Agentic Ops"],
        horizon: "6 months",
        solution: "FinOps dashboards, ownership graph, budget alerts",
        path: "Attach cost to owners and systems in the graph, then add budget alerts and showback rhythms."
      },
      {
        ask: "Security, AI platform and code quality decisions",
        status: "Deep dive",
        kind: "deep",
        caps: ["Team + Fabric", "SDLC skills"],
        horizon: "3 months",
        solution: "Governance workflow, GitHub Advanced Security, policy gates",
        path: "Bake security and quality decisions into SDLC gates instead of reviewing them after delivery."
      }
    ]
  },
  {
    name: "Data & Integration scope",
    claim: "Data and integration requirements become reusable recipes, governed data products and migration factories.",
    rows: [
      {
        ask: "Data-product workspace in under 30 minutes",
        status: "Deep dive",
        kind: "deep",
        caps: ["Team + Fabric", "SDLC skills"],
        horizon: "1 year",
        solution: "Teams agent, graph policy, ServiceNow, Databricks/Olympus recipes",
        path: "Pilot controlled workspace requests, then prove the under-30-minute target at scale."
      },
      {
        ask: "Nexus to Unity Catalog flow",
        status: "Deep dive",
        kind: "deep",
        caps: ["Team + Fabric", "SDLC skills"],
        horizon: "6 months",
        solution: "Nexus, Kafka, Delta, Unity Catalog, OpenMetadata",
        path: "Codify the lineage and catalog path before expanding to high-volume data products."
      },
      {
        ask: "Productionize fast",
        status: "Fabric covers",
        kind: "built",
        caps: ["Team + Fabric", "SDLC skills"],
        horizon: "6 months",
        solution: "Agentic SDLC, reusable pipelines, data-product templates",
        path: "Use reusable delivery templates first, then delegate standard productionisation checks."
      },
      {
        ask: "Observe and triage",
        status: "Fabric covers",
        kind: "built",
        caps: ["Agentic Ops"],
        horizon: "6 months",
        solution: "Agentic Ops, New Relic, OpenMetadata lineage, platform telemetry",
        path: "Join telemetry with lineage and ownership so ops agents can triage known data failures."
      },
      {
        ask: "Cost transparency and showback",
        status: "Fabric covers",
        kind: "built",
        caps: ["Team + Fabric", "Agentic Ops"],
        horizon: "6 months",
        solution: "FinOps dashboards, graph ownership, Databricks/Power BI cost tags",
        path: "Tag cost to teams and data products, then introduce showback and anomaly alerts."
      },
      {
        ask: "Single governance layer",
        status: "Fabric covers",
        kind: "built",
        caps: ["Team + Fabric"],
        horizon: "3 months",
        solution: "Graph + Unity Catalog + OpenMetadata + ServiceNow evidence",
        path: "Use the graph as the control spine while preserving specialist systems as sources of truth."
      },
      {
        ask: "Open data format",
        status: "Fabric covers",
        kind: "built",
        caps: ["SDLC skills"],
        horizon: "3 months",
        solution: "Delta, ADLS Gen2, open table patterns",
        path: "Standardise the engineering pattern early so later migration work is not bespoke."
      },
      {
        ask: "Engineering standards for integration",
        status: "Deep dive",
        kind: "deep",
        caps: ["Team + Fabric", "SDLC skills"],
        horizon: "3 months",
        solution: "Agentic SDLC standards, Kong/Nexus templates, governed recipes",
        path: "Turn standards into skills, templates and review gates that teams can actually reuse."
      },
      {
        ask: "Kong API portal and API discoverability",
        status: "Deep dive",
        kind: "deep",
        caps: ["Team + Fabric", "SDLC skills"],
        horizon: "6 months",
        solution: "Kong/Pong, API catalog, graph-backed ownership",
        path: "Connect API catalog and ownership into the graph, then expose discoverability through the portal."
      },
      {
        ask: "AI-ready infrastructure for agents",
        status: "Fabric covers",
        kind: "built",
        caps: ["Team + Fabric", "SDLC skills", "Agentic Ops"],
        horizon: "3 months",
        solution: "Agentic Fabric, graph memory, approved tool recipes",
        path: "Use governed graph memory and tool recipes as the safe substrate before increasing autonomy."
      },
      {
        ask: "Flexible ingestion patterns",
        status: "Fabric covers",
        kind: "built",
        caps: ["Team + Fabric", "SDLC skills"],
        horizon: "6 months",
        solution: "Nexus, Kafka, batch/micro-batch/event ingestion templates",
        path: "Codify ingestion variants as reusable patterns rather than project-by-project exceptions."
      },
      {
        ask: "Real-time and relaxed-latency data mart",
        status: "Deep dive",
        kind: "deep",
        caps: ["SDLC skills", "Agentic Ops"],
        horizon: "1 year",
        solution: "Kafka, Databricks, Delta pipelines, SLO monitoring",
        path: "Build pipeline templates and SLO monitoring before moving support into agentic operations."
      },
      {
        ask: "No data loss / lifecycle transparency",
        status: "Deep dive",
        kind: "deep",
        caps: ["SDLC skills", "Agentic Ops"],
        horizon: "1 year",
        solution: "Kafka DQ, reconciliation checks, lineage, observability",
        path: "Make reconciliation and lineage visible, then automate known exception handling under gates."
      },
      {
        ask: "AI-ready onboarding and availability",
        status: "Fabric covers",
        kind: "built",
        caps: ["Team + Fabric", "Agentic Ops"],
        horizon: "6 months",
        solution: "Teams-based onboarding, graph, SLOs, runbook automation",
        path: "Use Teams onboarding and graph context first, then attach SLO-backed runbooks."
      },
      {
        ask: "Data quality on Kafka",
        status: "Deep dive",
        kind: "deep",
        caps: ["SDLC skills", "Agentic Ops"],
        horizon: "6 months",
        solution: "Kafka schema checks, DQ gates, quarantine patterns",
        path: "Codify DQ gates and quarantine patterns, then connect alerts into the ops loop."
      },
      {
        ask: "Decommission BizTalk",
        status: "Deep dive",
        kind: "deep",
        caps: ["Team + Fabric", "SDLC skills", "Agentic Ops"],
        horizon: "2 years",
        solution: "Migration factory, strangler pattern, ServiceNow audit",
        path: "Treat decommissioning as a phased migration factory, not a big-bang replacement."
      },
      {
        ask: "Synapse exit",
        status: "Deep dive",
        kind: "deep",
        caps: ["Team + Fabric", "SDLC skills", "Agentic Ops"],
        horizon: "2 years",
        solution: "Synapse-to-Databricks migration factory, validation and cutover evidence",
        path: "Move workloads through validated waves with cutover evidence and rollback discipline."
      }
    ]
  }
];
