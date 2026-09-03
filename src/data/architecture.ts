import type { NavChapter, NavSection } from "./journey";

export const architectureNavChapters: NavChapter[] = [
  {
    id: "arch-map",
    label: "Architecture",
    sections: [
      { id: "architecture-overall", label: "Overall architecture", num: "A0" },
      { id: "architecture-infra", label: "Infrastructure & network", num: "A1" },
      { id: "architecture-graph", label: "Access graph model", num: "A2" },
      { id: "architecture-security", label: "Security model", num: "A3" }
    ]
  },
  {
    id: "arch-components",
    label: "Component Details",
    sections: [
      { id: "architecture-core", label: "Pandav core", num: "A4" },
      { id: "architecture-teams", label: "Teams governance bot", num: "A5" },
      { id: "architecture-sdlc", label: "Agentic SDLC framework", num: "A6" },
      { id: "architecture-ops", label: "Ops agents", num: "A7" }
    ]
  }
];

export const architectureNavSections: NavSection[] = architectureNavChapters.flatMap((chapter) => chapter.sections);

export const architectureHero = {
  kicker: "Architecture appendix",
  headline: "Pandav architecture: governed work surfaces on a graph-backed core",
  lede:
    "This page separates the architecture story from the maturity journey. It shows the overall component map, the infrastructure and network footprint, the internal design of each agentic capability, and the security controls that apply across them."
};

export const referenceFacts = [
  "Neo4j holds the live access graph: what should exist across people, teams, systems, resources, roles and grants.",
  "PostgreSQL holds transactional records: what happened across requests, approvals, audit rows, policies and conversation state.",
  "ServiceNow remains the ITSM source of truth: material workflows create or update an RITM before completion.",
  "Any system added through the Admin Portal Graph Editor becomes provisionable through the fabric without a code deployment."
] as const;

export const architectureOverviewCards = [
  {
    title: "Teams governance bot",
    body: "Microsoft Teams and Azure Bot Service provide the single adoption front door for governance, access requests, approvals and status.",
    items: ["Teams client", "Bot Framework SDK", "Adaptive Cards", "M365 admin consent"]
  },
  {
    title: "Agentic SDLC framework",
    body: "Portable skills in Git run through Claude Code, Codex CLI, CI runners and future SaaS agents without changing the delivery IP.",
    items: ["LISA/RALPH skills", "23-phase feature build", "Ticket to PR", "Quality gates"]
  },
  {
    title: "Ops agents",
    body: "Telemetry-led agents consume New Relic, ServiceNow, Open Metadata and platform signals to diagnose known patterns and drive runbooks.",
    items: ["Signals", "RCA", "PagerDuty handoff", "Reversible runbooks"]
  },
  {
    title: "Pandav core backend",
    body: "FastAPI, an LLM request interface, an agent orchestrator and typed tools convert user intent into graph-backed governed action.",
    items: ["Intent mapping", "Policy engine", "Graph service", "Audit writer"]
  },
  {
    title: "Enterprise memory",
    body: "Neo4j, PostgreSQL and ServiceNow keep live access state, transaction history and ITSM evidence aligned for every action.",
    items: ["Access graph", "Audit log", "ServiceNow record", "Grant reconciliation"]
  },
  {
    title: "Action connectors",
    body: "Provisioning adapters reach GitHub, Jira, Confluence, Azure IAM, Databricks, Kubernetes, Salesforce, MuleSoft and runbook tooling.",
    items: ["GitHub App", "Jira and Confluence", "Azure IAM and K8s", "Databricks and MuleSoft"]
  }
] as const;

export const infrastructureZones = [
  {
    zone: "User and collaboration zone",
    body: "Pandora colleagues interact through Microsoft Teams and the Admin Portal rather than a new day-to-day interface.",
    controls: ["Entra ID identity", "Teams bot registration", "M365 admin consent"]
  },
  {
    zone: "Azure application zone",
    body: "Pandav runs as ordinary Azure application hosting: Azure Bot Service plus the Pandav API and bot backend.",
    controls: ["TLS ingress", "managed runtime", "stateless LLM calls"]
  },
  {
    zone: "Data and control zone",
    body: "Neo4j AuraDB, PostgreSQL, Key Vault and Service Bus hold graph state, transaction state, secrets and retry queues.",
    controls: ["least privilege", "Key Vault secrets", "insert-only audit"]
  },
  {
    zone: "Enterprise API zone",
    body: "Approved outbound connectors integrate with ServiceNow, GitHub, Jira, Confluence, observability, IAM and runbook systems.",
    controls: ["allowlisted APIs", "idempotent tools", "ServiceNow evidence"]
  }
] as const;

export const accessGraphCards = [
  {
    title: "Graph-native authorization",
    body: "Organisation, BusinessUnit, Team, Project, System, Resource, Role, ApprovalPolicy and AccessGrant nodes model who may access what and why."
  },
  {
    title: "Policy is attached to the graph",
    body: "Resource and system relationships resolve approval policy, compliance tier, required ServiceNow change and approver route at request time."
  },
  {
    title: "Evidence is part of the model",
    body: "Every AccessGrant is linked to a ServiceNowRecord, approver and target resource so out-of-band access can be detected."
  },
  {
    title: "Operational questions become queries",
    body: "Blast radius, expiring grants, offboarding impact and active access reviews are graph traversals rather than manual evidence gathering."
  }
] as const;

export const pandavCoreModules = [
  {
    title: "API boundary",
    body: "Pandav API receives Teams messages, approval invokes, SDLC workflow events and operations signals with trace context."
  },
  {
    title: "LLM request interface",
    body: "The LLM classifies natural language, extracts entities and maps the request to an approved intent and graph query pattern."
  },
  {
    title: "Agent orchestrator",
    body: "The orchestrator uses Claude with tool use to call traverse_graph first, then policy, ServiceNow, provisioning and audit tools."
  },
  {
    title: "Graph service",
    body: "Neo4j traversal resolves person, team, project, system, resource, role, approval policy, approver and blast radius."
  },
  {
    title: "Policy and approval engines",
    body: "Risk tier, compliance tier, environment and reversibility decide whether the flow answers, drafts, approves, executes or blocks."
  },
  {
    title: "Audit and state services",
    body: "PostgreSQL keeps the request and immutable audit trail while Neo4j writes AccessGrant and ServiceNowRecord relationships."
  }
] as const;

export const pandavCoreSequence = [
  "Resolve identity with Microsoft Graph and bind the request to the canonical Entra user rather than self-reported identity.",
  "Traverse the Neo4j access graph before any action so ownership, policy and approver context are known.",
  "Create the ServiceNow record before provisioning when the workflow is material, production or policy-controlled.",
  "Execute only typed idempotent tools, then write the AccessGrant node, ServiceNow edge and insert-only audit row."
] as const;

export const teamsGovernanceSteps = [
  {
    title: "User asks in Teams",
    body: "The colleague asks for access or policy help in Microsoft Teams; the bot extracts aadObjectId from the validated activity token."
  },
  {
    title: "Core resolves context",
    body: "Pandav uses Microsoft Graph and Neo4j to resolve the requester, manager chain, team, project, resource and applicable policy."
  },
  {
    title: "Approval card routes",
    body: "The approval engine sends an Adaptive Card to the resolved approver and validates action against the graph edge, not just a stored user id."
  },
  {
    title: "Ticket and grant close",
    body: "ServiceNow is created or updated, the target system is provisioned, the graph grant is written and Teams receives the final status."
  }
] as const;

export const sdlcFrameworkRows = [
  {
    title: "Skills are files in Git",
    body: "The Agentic SDLC framework is a portable skill library and methodology, not a hosted platform that Pandora has to operate."
  },
  {
    title: "Harnesses are swappable",
    body: "Claude Code, Codex CLI, existing CI runners and future SaaS agents can use the same skills without rewriting the workflow."
  },
  {
    title: "Delivery systems stay central",
    body: "Jira, Confluence, GitHub and CI/CD remain the source of delivery truth for tickets, decisions, code, tests, PRs and evidence."
  },
  {
    title: "Governance travels with the work",
    body: "Model usage, prompt versions, quality gates, risk tiers and cost-per-task signals become part of the same evidence model."
  }
] as const;

export const sdlcFlow = [
  "Ticket and context are pulled from Jira, Confluence, GitHub and architectural documentation.",
  "Claude Code or Codex CLI applies the versioned skill to draft specs, tests, code, IaC and PR notes.",
  "Quality gates, review rules, evaluation checks and human approval decide whether the work can progress.",
  "Delivery evidence flows back to GitHub, Jira and the agent registry so reuse and cost can be measured."
] as const;

export const opsAgentRows = [
  {
    title: "Signal intake",
    body: "New Relic, ServiceNow, Open Metadata, cost signals, patch signals and CI/CD signals feed the operations agent loop."
  },
  {
    title: "Correlation and diagnosis",
    body: "Sentinel and signal-intelligence agents correlate incidents, lag, drift, ownership and known-error patterns before recommending action."
  },
  {
    title: "Graph and policy check",
    body: "The core resolves service owner, blast radius, environment, risk tier and approval policy before runbook execution."
  },
  {
    title: "Controlled runbook execution",
    body: "Only approved reversible runbooks execute through existing automation or CI runners, with PagerDuty and human gates for high risk."
  }
] as const;

export const opsFlow = [
  "Telemetry produces an alert, incident, drift, cost or control signal that can be handled by a known operational pattern.",
  "Ops agents enrich the signal with service metadata, ownership, historical incidents, runbooks and current platform context.",
  "Policy decides whether the agent may draft an RCA, ask a human for approval, trigger a runbook or block the request.",
  "Outcome evidence is written back to ServiceNow, audit state and governance scorecards so operations maturity is measurable."
] as const;

export const securityControls = [
  {
    layer: "Identity",
    control: "Entra ID is canonical for people and groups; Teams activities carry validated identity and Microsoft Graph resolves manager and membership context."
  },
  {
    layer: "Authorization",
    control: "Neo4j relationships and ApprovalPolicy nodes decide ownership, allowed roles, approver routing, compliance escalation and blast radius."
  },
  {
    layer: "LLM boundary",
    control: "The LLM maps language to intent but cannot execute enterprise actions directly; execution only happens through typed governed tools."
  },
  {
    layer: "Action gating",
    control: "Risk tier, environment, reversibility and data sensitivity determine whether the fabric answers, drafts, requests approval, executes or blocks."
  },
  {
    layer: "Secrets and connectors",
    control: "Azure Key Vault holds secrets, connectors use least-privilege credentials and outbound enterprise API calls are explicit and auditable."
  },
  {
    layer: "Evidence",
    control: "ServiceNow records, AccessGrant graph edges and PostgreSQL insert-only audit rows make every material action traceable after the fact."
  }
] as const;

export const securityByComponent = [
  ["Teams governance bot", "Validated Teams identity, Adaptive Card approvals, graph-validated approver rights and ServiceNow-first workflow evidence."],
  ["Agentic SDLC framework", "Versioned skills, approved harnesses, human PR review, quality gates, model usage controls and delivery evidence in GitHub/Jira."],
  ["Ops agents", "Read-only signal connectors by default, graph policy before action, human gate for production risk and reversible runbook execution."],
  ["Pandav core", "Central policy engine, typed tool dispatcher, Key Vault secrets, idempotent tools, graph writes and insert-only audit state."]
] as const;
