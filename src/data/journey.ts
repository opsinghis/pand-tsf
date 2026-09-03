export type HorizonId = "h3" | "h6" | "h12" | "h24";
export type LaneId = "technical" | "people" | "operations" | "governance";

export interface Horizon {
  id: HorizonId;
  months: string;
  short: string;
  date: string;
  stage: string;
}

export interface NavSection {
  id: string;
  label: string;
  num: string;
}

export interface NavChapter {
  id: string;
  label: string;
  sections: NavSection[];
}

export interface Pillar {
  title: string;
  body: string;
}

export interface PullQuote {
  quote: string;
  source: string;
}

export interface LaneHorizon {
  tag: string;
  headline: string;
  posture: string;
  board: string;
  milestones: string[];
  already?: string;
}

export interface Lane {
  id: LaneId;
  section: string;
  title: string;
  shortTitle: string;
  intro: string;
  colorVar: string;
  pull?: PullQuote;
  horizons: Record<HorizonId, LaneHorizon>;
}

export const brand = "Pandav · Agentic Fabric Journey";

export const navChapters: NavChapter[] = [
  {
    id: "case",
    label: "The Case",
    sections: [
      { id: "fabric", label: "Fabric components", num: "00" },
      { id: "scope", label: "Customer scope map", num: "01" },
      { id: "spine", label: "The spine", num: "02" },
      { id: "baseline", label: "Where Pandora is today", num: "03" }
    ]
  },
  {
    id: "lanes",
    label: "Four Lanes",
    sections: [
      { id: "technical", label: "Technical adoption", num: "04" },
      { id: "people", label: "People & capability", num: "05" },
      { id: "operations", label: "Operations", num: "06" },
      { id: "governance", label: "Governance", num: "07" }
    ]
  },
  {
    id: "ownership",
    label: "Ownership",
    sections: [
      { id: "tom", label: "Target operating model", num: "08" },
      { id: "sapient", label: "How Sapient leads", num: "09" }
    ]
  },
  {
    id: "proof",
    label: "Proof",
    sections: [
      { id: "gates", label: "Gates & evidence", num: "10" },
      { id: "rfp", label: "RFP outcomes", num: "11" },
      { id: "risks", label: "Objections answered", num: "12" }
    ]
  },
  {
    id: "start",
    label: "Getting Started",
    sections: [
      { id: "pandora", label: "What we need from Pandora", num: "13" },
      { id: "workshops", label: "The first six weeks", num: "14" },
      { id: "ask", label: "The ask", num: "15" }
    ]
  }
];

/** Flat section list in document order, derived from the chapters. */
export const navSections: NavSection[] = navChapters.flatMap((chapter) => chapter.sections);

export const horizons: Horizon[] = [
  { id: "h3", months: "3 months", short: "3 mo", date: "Dec 2026", stage: "Foundation & Assist" },
  { id: "h6", months: "6 months", short: "6 mo", date: "Mar 2027", stage: "First Delegate" },
  { id: "h12", months: "12 months", short: "12 mo", date: "Sep 2027", stage: "Delegate at scale" },
  { id: "h24", months: "24 months", short: "24 mo", date: "Sep 2028", stage: "Governed autonomy" }
];

export const hero = {
  kicker: "Pandora TS&F · Strategic Partner Selection 2027 · Follow-up response",
  headline: "Three everyday work loops. One governed agentic fabric.",
  question:
    "We love the agentic fabric. Show us how you will lead us on this journey — technically, and in people, operations and governance — over 3 months, 6 months, a year, two years.",
  attribution: "The question we heard in the oral presentations",
  lede:
    "Pandav starts with the work Pandora already does every day: Teams-based governance and access control, agentic SDLC support in Claude and Codex, and ops agents that reduce manual monitoring. The roadmap then matures those loops through evidence gates until Pandora owns the fabric."
};

export const pillars: Pillar[] = [
  {
    title: "Teams governance bot",
    body: "A Teams-native front door for access requests, approvals, policy explanation, provisioning and ServiceNow audit in the flow of work."
  },
  {
    title: "Agentic SDLC framework",
    body: "Portable Claude Code and Codex CLI skills that help engineers move from ticket to spec, code, tests, IaC and PRs under quality gates."
  },
  {
    title: "Ops agents",
    body: "Telemetry-led agents that correlate alerts, incidents, drift, cost and controls, then recommend or run approved reversible runbooks."
  }
];

export const fabricCapabilities = [
  {
    label: "Everyday governance",
    title: "Teams-based bot",
    body: "People ask for access, explain policy, approve work and track status inside Microsoft Teams instead of learning a new portal.",
    examples: ["Access request intake", "Approval cards", "ServiceNow audit"]
  },
  {
    label: "Everyday delivery",
    title: "Agentic SDLC framework",
    body: "Claude Code, Codex CLI and future harnesses reuse the same skill library to complete day-to-day engineering tasks safely.",
    examples: ["Ticket to spec", "Code and IaC", "Tests and PRs"]
  },
  {
    label: "Everyday operations",
    title: "Ops agents",
    body: "Agents consume operations signals, diagnose known patterns and execute approved runbooks so teams spend less time manually monitoring.",
    examples: ["Signal correlation", "RCA drafts", "Runbook execution"]
  }
] as const;

export const coreBackendRows = [
  [
    "Graph database",
    "Neo4j holds the live map of people, teams, systems, resources, roles, grants, ownership and approval policies."
  ],
  [
    "LLM interface",
    "The core interprets natural-language requests, selects the right intent and maps it to a controlled graph query before action."
  ],
  [
    "Policy and audit",
    "Risk tier, approver route, ServiceNow record and immutable audit entry are created before provisioning or remediation executes."
  ],
  [
    "Action connectors",
    "Approved APIs reach GitHub, Jira, Confluence, Azure IAM, Databricks, Kubernetes, Salesforce, MuleSoft and runbook tooling."
  ]
] as const;

export const architectureRows = [
  {
    label: "Work surfaces",
    items: [
      ["Teams bot", "access, approvals and policy"],
      ["SDLC skills", "Claude and Codex task support"],
      ["Ops agents", "signals, RCA and runbooks"]
    ]
  },
  {
    label: "Core backend",
    items: [
      ["LLM interface", "intent to graph query"],
      ["Policy engine", "risk tier and approver route"],
      ["Audit service", "request, action and outcome"]
    ]
  },
  {
    label: "Systems of record",
    items: [
      ["Neo4j graph", "live access and ownership map"],
      ["PostgreSQL", "transactions and audit records"],
      ["ServiceNow", "ITSM source of truth"]
    ]
  },
  {
    label: "Action layer",
    items: [
      ["GitHub / Jira", "delivery work and evidence"],
      ["Azure / K8s", "provisioning and platform change"],
      ["Runbooks", "approved operational actions"]
    ]
  }
] as const;

export const infrastructureRows = [
  ["M365 / Teams", "existing collaboration surface; Azure Bot Service registration and admin consent, not a new channel platform"],
  ["Azure runtime", "standard container or App Service for the Pandav API and bot backend, not a separate hosted agent platform"],
  ["LLM gateway", "stateless model calls with policy, logging, data handling and token/cost controls"],
  ["Graph and records", "Neo4j AuraDB for live access graph, PostgreSQL for transactional state and audit, ServiceNow for ITSM truth"],
  ["Enterprise APIs", "GitHub, Jira, Confluence, Azure IAM, Databricks, Kubernetes, Salesforce, MuleSoft and runbooks through approved connectors"],
  ["Operations signals", "New Relic, ServiceNow, Open Metadata, cost signals and CI/CD runners feed diagnostics and controlled runbook execution"]
] as const;

export const solutionFlow = [
  {
    step: "01",
    title: "Request enters a work surface",
    body: "The trigger can be a Teams message, an SDLC workflow in Claude or Codex, or an operations signal from monitoring."
  },
  {
    step: "02",
    title: "LLM maps language to intent",
    body: "The core classifies the request, extracts entities and chooses the approved graph query pattern for that intent."
  },
  {
    step: "03",
    title: "Graph resolves context",
    body: "Neo4j returns the person, team, system, resource, role, owner, blast radius and matching approval policy."
  },
  {
    step: "04",
    title: "Policy gates the action",
    body: "Risk tier, environment, reversibility and data sensitivity decide whether the system answers, drafts, asks approval or blocks."
  },
  {
    step: "05",
    title: "Action executes with evidence",
    body: "Approved connectors create the ServiceNow record, provision GitHub or platform access, trigger a runbook and write audit evidence."
  }
] as const;

export const pandoraLandscapeRows = [
  [
    "Microsoft Teams and M365",
    "Adoption front door",
    "Pandav meets colleagues in the collaboration surface Pandora already uses, including approval cards and status updates."
  ],
  [
    "Entra ID and Microsoft Graph",
    "Identity context",
    "The core resolves the user, manager, group membership and ownership context before making a policy decision."
  ],
  [
    "Neo4j and PostgreSQL",
    "Operating memory",
    "Neo4j represents the live access graph; PostgreSQL stores requests, audit records, policies and conversation state."
  ],
  [
    "ServiceNow ITSM",
    "Control and audit",
    "Every material workflow creates or updates the ServiceNow record before provisioning or operational execution completes."
  ],
  [
    "GitHub, Jira and Confluence",
    "Delivery system",
    "The SDLC framework turns tickets, documentation and repositories into traceable specs, tests, pull requests and delivery evidence."
  ],
  [
    "New Relic and Open Metadata",
    "Ops signal layer",
    "Operations agents consume observability, incident, metadata, cost and drift signals rather than relying on manual monitoring."
  ],
  [
    "Azure IAM, Kubernetes, Databricks and integration platforms",
    "Provisioning targets",
    "Approved connectors make platform access and routine operational changes under graph policy, approval gates and rollback rules."
  ],
  [
    "Pandav Admin Portal",
    "Governance console",
    "Platform owners maintain systems, resources, roles, templates, policies, audit views and graph changes without a code deployment."
  ]
] as const;

export const maturityLadder = [
  {
    level: "0",
    state: "Experiment",
    description: "Isolated prototypes and tool trials",
    requirement: "Use cases logged; risks and owners visible"
  },
  {
    level: "1",
    state: "Assist — you are here",
    description: "Humans ask; agents recommend or draft",
    requirement: "Audit trail, prompt standards and human review in place",
    current: true
  },
  {
    level: "2",
    state: "Delegate",
    description: "Agents own bounded loops; humans approve material actions",
    requirement: "Risk tiers, rollback paths, incident model and SLOs proven"
  },
  {
    level: "3",
    state: "Scale",
    description: "Reusable patterns run across domains",
    requirement: "Agent registry, reusable connectors, cost benchmarks and support model live"
  },
  {
    level: "4",
    state: "Governed autonomy",
    description: "Low-risk actions run autonomously; high-risk work remains gated",
    requirement: "Policy-as-code, continuous evals, portfolio governance and assurance mature"
  }
];

export const proofCards = [
  {
    chip: "Live today",
    stat: "23-phase",
    body: "Feature-build pipeline in production delivery use across engineering teams — the agentic SDLC is working delivery IP, not a concept."
  },
  {
    chip: "Live today",
    stat: "No agent platform",
    body: "Hosting for the Teams fabric is standard Azure web-app/container hosting. Pandav is deterministic orchestration plus a human gate."
  },
  {
    chip: "Measured",
    stat: "$19,670",
    body: "Indicative saving from one controlled Devin experiment: 28 story points in 6 days for 910 ACUs against standard developer effort."
  },
  {
    chip: "In estate",
    stat: "Signals ready",
    body: "New Relic, ServiceNow and Open Metadata already emit what Agentic Ops consumes. Skills travel to the harness; the harness never travels to Pandora."
  }
];

export type AgentOwner = "vendor" | "shared" | "enterprise";
export type AgentAdoption = "live" | "pilot" | "none";

export interface AgentTypeCell {
  name: string;
  example: string;
  owner: AgentOwner;
  adoption: AgentAdoption;
  row: number;
  col: number;
}

export const landscapeRows = [
  { label: "Human-in-the-loop", detail: "Person prompts each turn" },
  { label: "Human-initiated", detail: "Agent owns the execution loop" },
  { label: "Autonomous", detail: "Event-triggered; human reviews outcomes" }
] as const;

export const landscapeCols = ["Chat & Voice", "Codebase & IDE", "APIs & backend", "GUI, SaaS, physical"] as const;

/** The Pandora agentic application landscape today (follow-up deck slide 5):
 *  eleven types mapped by who owns the loop (rows) and where the agent acts
 *  (columns), coloured by guardrail & infrastructure owner, with adoption status. */
export const agentLandscape: AgentTypeCell[] = [
  { name: "Web chat", example: "Claude, ChatGPT interfaces", owner: "vendor", adoption: "live", row: 0, col: 0 },
  { name: "AI chatbot agents", example: "CCC, real-time telephony", owner: "shared", adoption: "live", row: 0, col: 0 },
  { name: "API agents", example: "In-app inline decisions", owner: "enterprise", adoption: "pilot", row: 0, col: 2 },
  { name: "Skill workflows + CLI", example: "Prompt libraries, LISA/RALPH", owner: "shared", adoption: "live", row: 1, col: 1 },
  { name: "IDE harness agents", example: "Claude Code, Codex CLI", owner: "shared", adoption: "live", row: 1, col: 1 },
  { name: "Custom framework agents", example: "LangGraph, CrewAI, LangChain", owner: "enterprise", adoption: "none", row: 1, col: 2 },
  { name: "Computer / browser use", example: "Operates GUIs like a human", owner: "enterprise", adoption: "none", row: 1, col: 3 },
  { name: "SaaS copilots", example: "ServiceNow, Atlassian Rovo", owner: "vendor", adoption: "pilot", row: 1, col: 3 },
  { name: "Ambient agents", example: "Overnight Jira dispatch", owner: "enterprise", adoption: "pilot", row: 2, col: 2 },
  { name: "Agent mesh", example: "MCP + A2A, governed registry", owner: "enterprise", adoption: "none", row: 2, col: 2 },
  { name: "Embodied agents", example: "Robotics, POS edge", owner: "enterprise", adoption: "none", row: 2, col: 3 }
];

export const landscapeNote =
  "The fabric starts where Pandora already is: the Live and Pilot cells. Phase 2 activates the SaaS copilots and event-triggered pipelines; Phase 3 delivers the governed agent mesh. The empty cells are deliberate — not every type earns a place on the roadmap.";

export interface ReadinessItem {
  title: string;
  detail: string;
}

export interface CapabilityReadiness {
  id: string;
  loop: string;
  title: string;
  reframe: string;
  proof: string;
  already: ReadinessItem[];
  netNew: ReadinessItem[];
  netNewNote?: string;
  bottomLine: string;
}

/** Per-capability readiness mapping (follow-up deck slides 6-8): what each
 *  loop needs, what is already in Pandora's estate, and what is net-new. */
export const capabilityReadiness: CapabilityReadiness[] = [
  {
    id: "teams-fabric",
    loop: "Loop 1 · Teams front door",
    title: "The Teams fabric — the infrastructure it needs is already available",
    reframe:
      "An LLM-fronted approval workflow, not a hosted agent: one LLM touchpoint, one human gate, zero agent runtime.",
    proof: "Running today as Pandav",
    already: [
      {
        title: "M365 / Teams",
        detail: "the existing collaboration surface — a bot registration and admin consent, not a new channel platform"
      },
      {
        title: "ServiceNow",
        detail: "requests, approvals and the audit trail ride the existing ticketing backbone"
      },
      {
        title: "Existing LLM access",
        detail: "one gateway-routed model touchpoint — no new model estate to stand up"
      },
      {
        title: "Standard Azure hosting",
        detail: "the only thing to host is a regular container Pandora runs every day"
      }
    ],
    netNew: [],
    netNewNote:
      "No agent hosting platform required. The loop is deterministic orchestration plus a human approval gate — a standard container, not an agent runtime.",
    bottomLine:
      "Zero agent runtime to host: the fabric's front door is an approval workflow on infrastructure Pandora already operates."
  },
  {
    id: "agentic-sdlc",
    loop: "Loop 2 · Agentic SDLC",
    title: "Agentic SDLC — already running at Pandora",
    reframe:
      "The asset is a portable skill library, not a platform: versioned files that execute unchanged on whatever harness runs them — developer IDE today, SaaS agents like Devin tomorrow.",
    proof: "In daily delivery use",
    already: [
      {
        title: "Skills are files in Git",
        detail: "markdown and configuration versioned alongside the codebase — no servers, no databases, no deployment"
      },
      {
        title: "Harnesses run where they already run",
        detail: "Claude Code and Codex CLI execute on developer machines Pandora already provisions — in daily use today"
      },
      {
        title: "Delivery proof in production",
        detail: "23-phase feature-build pipeline in daily use across engineering teams, with cost-per-task benchmarking in place"
      }
    ],
    netNew: [],
    netNewNote:
      "SaaS agents carry their own runtime: Devin-class tools are fully vendor-hosted — adopting them is consumption, not hosting, and the same skill library transfers.",
    bottomLine:
      "Not a future platform decision — working delivery IP in production use. Skills travel to the harness; the harness never travels to Pandora."
  },
  {
    id: "agentic-ops",
    loop: "Loop 3 · Agentic Ops",
    title: "Agentic Ops — the signals and controls it needs are already in the estate",
    reframe:
      "An operations loop led by telemetry and grounded in runbooks, not an autonomous robot: existing signals feed the agents, a human gate takes over wherever risk appears, and execution is limited to approved, reversible runbooks.",
    proof: "Signals already emitted",
    already: [
      {
        title: "Telemetry and tickets",
        detail: "New Relic, ServiceNow and observability tooling already emit the signals the loop consumes"
      },
      {
        title: "Automation and CI runners",
        detail: "the execution muscle already exists — the loop reuses it rather than replacing it"
      },
      {
        title: "Existing LLM",
        detail: "the same gateway-routed model access as the rest of the fabric"
      }
    ],
    netNew: [
      {
        title: "Standard containers on Azure",
        detail: "services that read and analyse signals and orchestrate runbooks on ordinary hosting — no agent runtime, no orchestration platform"
      },
      {
        title: "Read-only telemetry connectors",
        detail: "API hooks into New Relic, ServiceNow and observability tooling to consume signals Pandora already produces"
      },
      {
        title: "Runbook execution hooks",
        detail: "reuse existing automation and CI runners behind an explicit human approval gate — reversible by design"
      }
    ],
    bottomLine:
      "A readiness assessment run jointly with Pandora confirms go/no-go before Run agents are finalized and deployed across operations."
  }
];

export const honestGaps = [
  "Estate-wide MCP connectors beyond the pilot domain",
  "Agent observability as a first-class platform capability",
  "Policy-as-code — today's guardrails are procedural, not encoded",
  "A Pandora-owned CoE and federated champion model",
  "Enablement beyond early adopters — the RFP names Kubernetes, Kafka and DevOps skills gaps"
];

export const lanes: Lane[] = [
  {
    id: "technical",
    section: "04",
    title: "Technical adoption & maturity",
    shortTitle: "Technical",
    colorVar: "--tech",
    intro:
      "The technology arrives in the order that keeps risk low: shared foundations first, then agent-owned loops behind gates, then the registry and mesh that make autonomy governable.",
    horizons: {
      h3: {
        tag: "Foundation",
        headline: "Foundation & first controlled domain",
        posture: "Assist · human-in-the-loop",
        board: "Pandav live in one controlled domain; skills in Git; telemetry connected",
        milestones: [
          "LLM gateway stood up as the shared foundation — one governed route to models for every capability",
          "Skills library versioned in Git alongside the codebase; IDE harnesses in daily use",
          "**Pandav Teams front-door live in one controlled domain** — access provisioning, policy decision, approval and ServiceNow audit",
          "Read-only telemetry connectors into New Relic and ServiceNow, consuming signals Pandora already emits",
          "Cost-per-task benchmarking running from day one",
          "Migration foundations begun: Azure DevOps to GitHub as the base for a modern development workflow"
        ],
        already:
          "**Already true today:** skills-as-files in Git, IDE harnesses in daily delivery use, Pandav proven on a standard container."
      },
      h6: {
        tag: "Extend",
        headline: "Beyond the IDE — first agent-owned loops",
        posture: "Assist at scale → first Delegate",
        board: "Agentic SDLC on CI; MCP connectors; first Delegate pilots",
        milestones: [
          "Event-triggered agentic SDLC on CI — the pipeline acts on tickets and events, not just developer prompts",
          "MCP connectors extended into Jira, Confluence, GitHub and observability",
          "Intent catalogue extended across Data, Integration and DevOps domains",
          "**First Delegate pilots in low-risk flows** with named human gates",
          "Port.io golden paths wired so new services arrive with CI/CD, observability and security by default",
          "OpsGenie to PagerDuty migration in flight alongside tooling modernisation"
        ]
      },
      h12: {
        tag: "Scale",
        headline: "Delegate in force — the platform of platforms",
        posture: "Scale",
        board: "Agent registry; observability; self-service <30 min proven",
        milestones: [
          "Agent registry and agent-to-agent patterns — every production agent has owner, scope, model and risk tier",
          "Shared state and memory services; agent observability platform live",
          "Delegate loops running across multiple domains, not just the pilot",
          "**Self-service provisioning under 30 minutes proven** through the fabric",
          "DORA metrics trending up: deployment frequency, lead time, change-failure rate and time to restore",
          "BizTalk strangler pattern underway; legacy decommission on an evidenced path"
        ]
      },
      h24: {
        tag: "Fabric",
        headline: "The fabric — governed autonomy",
        posture: "Orchestrate",
        board: "Policy-as-code mesh; legacy retired; one fabric",
        milestones: [
          "Governed-autonomy fabric: agents coordinate through the registry under policy-as-code",
          "Policy-as-code mesh — approvals, boundaries and data rules are executable",
          "Autonomous runs with outcome review for low-risk, reversible action classes",
          "**Legacy retired: BizTalk 2020, EDW and Synapse decommissioned**",
          "Data, Integration and DevOps operating as one agentic fabric with shared operating memory"
        ]
      }
    },
    pull: {
      quote:
        "Skills travel to the harness; the harness never travels to Pandora. The hosting question never arises — which is why this roadmap carries technology risk, not platform risk.",
      source: "Technical lane · thread to pull in the room"
    }
  },
  {
    id: "people",
    section: "05",
    title: "People & capability",
    shortTitle: "People",
    colorVar: "--people",
    intro:
      "We are building Pandora's muscle, not our dependency. The plan reduces our footprint on purpose and plugs into the talent, onboarding and retention model we already run.",
    horizons: {
      h3: {
        tag: "Enable",
        headline: "Enablement begins with the pilot",
        posture: "PS leads · Pandora pairs",
        board: "Skill enablement; champions seeded; PS leads, Pandora pairs",
        milestones: [
          "Prompt and skill enablement for the teams touching the pilot domain",
          "Champion network seeded inside live delivery teams, pairing on real work",
          "Buddy onboarding for every joiner; standardized JDs and skills alignment agreed with Pandora",
          "Weekly enablement clinics start and continue — skill authoring with Pandora engineers"
        ],
        already:
          "**Proven at Pandora already:** candidate selection, buddy onboarding, quarterly talent reviews and upskilling at scale."
      },
      h6: {
        tag: "Co-author",
        headline: "Pandora hands on the keyboard",
        posture: "PS leads · Pandora pairs → coaching",
        board: "Engineers as agent supervisors; Pandora co-authors skills",
        milestones: [
          "Engineers step into the agent-supervisor role — reviewing, gating and steering agent output",
          "**Pandora engineers co-author skills**; Pandora authors, PS reviews",
          "Certification paths started for key roles through PS learning portals and vendor partnerships",
          "First Pandora-run retrospective on agent-assisted delivery"
        ]
      },
      h12: {
        tag: "Lead",
        headline: "Champions train their own teams",
        posture: "Pandora leads · PS coaches",
        board: "Champions train their teams; Pandora leads, PS coaches",
        milestones: [
          "Champions run enablement for their own teams; PS moves to coach and reviewer",
          "Agent-portfolio ownership emerging — named Pandora owners per agent domain",
          "Capability extends beyond engineering into operations and business-adjacent teams"
        ]
      },
      h24: {
        tag: "Own",
        headline: "A Pandora-owned CoE runs the estate",
        posture: "Pandora owns · PS assures",
        board: "Federated CoE runs the estate; PS footprint narrows by design",
        milestones: [
          "Federated CoE operating model: central standards, domain champions, local authorship",
          "Pandora CoE runs the estate; PS provides architecture assurance and quarterly maturity reviews",
          "**PS footprint narrows by design** as Pandora capability metrics rise"
        ]
      }
    },
    pull: {
      quote:
        "Success for us is Pandora needing us less each phase. Ownership transfer is on the plan, in the metrics, and in the commercial model.",
      source: "People lane · the commitment"
    }
  },
  {
    id: "operations",
    section: "06",
    title: "Operations",
    shortTitle: "Operations",
    colorVar: "--ops",
    intro:
      "An operations loop led by telemetry and grounded in runbooks, not an autonomous robot. Execution is limited to approved, reversible runbooks.",
    horizons: {
      h3: {
        tag: "Gate all",
        headline: "Every action gated; service transition on RFP terms",
        posture: "Human approval on everything",
        board: "Human approval on every action; 24/7 transition-in per SLAs",
        milestones: [
          "**Human approval on every agent action** — no exceptions in the first horizon",
          "AgentOps runbooks and monitoring stood up; incident model for agent actions drafted",
          "24/7 support transition-in on P1 15-minute acknowledgement, 1.5h RTO and 99.99% mission-critical availability terms",
          "Transition mechanics: plan and baseline, validate readiness, controlled execution, prove knowledge, 50+ parameter readiness cutover"
        ],
        already:
          "**Comparable transition benchmark:** 100% readiness criteria met, 95%+ documentation/SOPs/runbooks generated and 97%+ SLA achievement during stabilization."
      },
      h6: {
        tag: "Drill",
        headline: "Drill the incident model until it holds",
        posture: "Delegate behind explicit gates",
        board: "Agent-action incident model live; joint drills; reversible runbooks",
        milestones: [
          "Incident model for agent actions live — who is paged, how rollback happens, how it is audited",
          "Joint AgentOps incident drills; passed unaided is a gate criterion",
          "Reversible runbook execution behind explicit human gates, reusing existing automation and CI runners"
        ]
      },
      h12: {
        tag: "Review",
        headline: "Autonomy with outcome review",
        posture: "Trust, verified continuously",
        board: "Autonomous runs with outcome review; FinOps & SLO discipline",
        milestones: [
          "Autonomous runs with outcome review for proven, low-risk action classes",
          "Continuous evaluation and AI FinOps: cost per task, model mix, token spend and avoidable spend",
          "SLO and error-budget discipline embedded across the platform estate"
        ]
      },
      h24: {
        tag: "Orchestrate",
        headline: "Orchestrated, self-healing operations",
        posture: "Governed autonomy",
        board: "Self-healing operations; toil and run-cost materially down",
        milestones: [
          "Self-healing operations for known failure modes; humans handle the novel",
          "Continuous evaluation loop feeding governance scorecards",
          "**Operational toil and platform run-cost materially reduced**, with evidence against the RFP's ~20% goal"
        ]
      }
    }
  },
  {
    id: "governance",
    section: "07",
    title: "Governance — the control plane",
    shortTitle: "Governance",
    colorVar: "--gov",
    intro:
      "Governance is the thread, not a phase: every increase in autonomy is matched by an increase in control, backed by named components and dated first versions.",
    horizons: {
      h3: {
        tag: "Audit all",
        headline: "Audit from day one",
        posture: "Inside Pandora's AI-governance guardrails",
        board: "Guardrail map; full audit logging; risk tiers defined",
        milestones: [
          "Guardrail ownership map — who owns which control, agreed in writing",
          "**Full audit logging from day one**: every request, context package, approval, tool call and output traceable",
          "Risk-tiered approval model defined",
          "Operating inside Pandora's existing AI-governance and security guardrails"
        ]
      },
      h6: {
        tag: "Charter",
        headline: "Pandora owns the gate charter",
        posture: "Change control arrives",
        board: "Gate charter owned by Pandora; model & prompt change control",
        milestones: [
          "Prompt and model change control — versioned, reviewed, reversible",
          "**Phase 1 to 2 gate charter owned by Pandora** — criteria, owners and measures written by Pandora hands in workshop W2"
        ]
      },
      h12: {
        tag: "Encode",
        headline: "Policy becomes code",
        posture: "Controls are executable",
        board: "Policy-as-code in the mesh; intent catalogue Pandora-owned",
        milestones: [
          "Policy-as-code in the mesh — approval rules and boundaries enforced at runtime",
          "Intent catalogue owned by Pandora — what agents may do, and what remains human-only",
          "Evaluation scorecards embedded in delivery and operations"
        ]
      },
      h24: {
        tag: "Assure",
        headline: "Enterprise assurance",
        posture: "Autonomy under a standing board",
        board: "Governance board; assurance findings trending to zero",
        milestones: [
          "Enterprise agent governance board chaired by Pandora",
          "Policy-as-code library maintained as a product",
          "**Assurance findings trending to zero** — the measurable definition of governed autonomy"
        ]
      }
    }
  }
];

export const controlPlane = [
  ["Agent registry", "Every agent has an owner, scope, model, risk tier and lifecycle status", "6 mo"],
  ["Intent catalogue", "Pandora knows what agents are allowed to do and which intents remain human-only", "3-6 mo"],
  ["Model catalogue", "Approved models, usage boundaries, cost class and data-handling rules are visible", "3 mo"],
  ["Data classification map", "Agent access constrained by data sensitivity and domain ownership", "3-6 mo"],
  ["Risk-tiered approval policies", "Action rights based on risk, reversibility and environment", "3 mo"],
  ["Audit trail", "Every request, context package, approval, tool call and output is traceable", "3 mo"],
  ["Evaluation scorecards", "Quality, safety, reliability and drift measured before expansion", "6-12 mo"],
  ["Incident playbooks", "Agent-caused or agent-assisted incidents have clear response paths", "6 mo"],
  ["AI FinOps dashboard", "Cost per task, model mix, token usage and avoidable spend are managed", "3-6 mo"]
] as const;

export const autonomyTiers = [
  ["T0", "Read-only / answer", "Summarise a runbook, explain a ticket, query ownership", "Logged access · source attribution"],
  ["T1", "Draft recommendation", "Draft a change plan, PR comment, RCA, test plan", "Human review before use"],
  ["T2", "Non-prod approved action", "Create a branch, run tests, provision sandbox resources", "Named-owner approval · rollback path"],
  ["T3", "Production, reversible", "Restart a known service, rotate a non-critical secret, apply an approved runbook", "Service-owner approval · post-action audit · rollback verified"],
  ["T4", "Sensitive or irreversible", "Delete data, change production policy, alter financial or customer-critical flows", "Human-only or CAB/Security approval · no autonomous execution, ever"]
] as const;

export const operatingRoles = [
  ["Agent Product Owner", "Agent backlog, value case, adoption, prioritisation", "Named for pilot", "Owns Delegate backlog", "Owns portfolio roadmap", "Runs domain portfolio"],
  ["AgentOps Lead", "Monitoring, incident model, runbooks, operational readiness", "Drafts runbook model with PS", "Leads drills jointly", "Runs AgentOps dashboard", "Owns continuous improvement"],
  ["Platform Architect", "Reference architecture, connectors, patterns, technical guardrails", "Co-designs foundation", "Approves reusable patterns", "Governs registry / A2A", "Evolves fabric architecture"],
  ["Security / Risk Owner", "Risk tiers, data boundaries, approvals, assurance", "Defines guardrails", "Owns model/prompt change control", "Reviews policy-as-code", "Chairs assurance gates"],
  ["AI FinOps Owner", "Credits, tokens, model mix, cost per task, avoidable spend", "Baselines cost", "Defines budgets & alerts", "Optimises model routing", "Owns value/cost governance"],
  ["Domain Champions", "Adoption, local skill authoring, feedback loops", "Seeded in pilot teams", "Co-author skills", "Train teams", "Form federated community"],
  ["CoE Lead", "Standards, reuse, governance, maturity reviews", "Designate future owner", "Shapes CoE charter", "Runs CoE with PS coaching", "Pandora-owned CoE"]
] as const;

export const raciRows = [
  ["Use-case prioritisation", "PS facilitates / Pandora decides", "Joint", "Pandora leads", "Pandora owns"],
  ["Agent build patterns", "PS leads", "Joint", "Pandora leads", "Pandora owns"],
  ["Governance standards", "Joint", "Pandora owns, PS reviews", "Pandora owns", "Pandora owns"],
  ["Operations readiness", "PS leads transition mechanics", "Joint drills", "Pandora leads", "Pandora owns"],
  ["Architecture assurance", "PS leads", "PS coaches", "PS assures", "PS assures periodically"],
  ["Skills enablement", "PS leads", "Joint champion network", "Pandora champions lead", "CoE owns"]
] as const;

export const sapientCards = [
  {
    when: "3 mo · Dec 2026",
    posture: "PS leads · Pandora pairs",
    psShare: 82,
    do: ["Shadow and pair on live delivery", "Weekly enablement clinics", "Stand up the first pilot", "Define guardrails and baseline metrics"],
    handover: ["Skill library + authoring guide", "Guardrail ownership map", "Pandav pattern documentation", "Pilot operating pack"]
  },
  {
    when: "6 mo · Mar 2027",
    posture: "Joint delivery · Pandora starts leading",
    psShare: 60,
    do: ["Expand Delegate pilots", "Run incident drills jointly", "Review Pandora-authored skills", "Define model/prompt change process"],
    handover: ["AgentOps runbooks v1", "Governance playbook v1", "Intent catalogue", "AI FinOps baseline"]
  },
  {
    when: "12 mo · Sep 2027",
    posture: "Pandora leads · PS coaches",
    psShare: 32,
    do: ["Review Pandora-authored work", "Assure reusable patterns", "Coach champions", "Support scale-out across domains"],
    handover: ["Agent registry", "Reusable connector patterns", "Evaluation scorecards", "CoE charter"]
  },
  {
    when: "24 mo · Sep 2028",
    posture: "Pandora owns · PS assures",
    psShare: 15,
    do: ["Architecture assurance", "Quarterly maturity reviews", "SME injection for new patterns or hard risks"],
    handover: ["Fabric reference architecture", "Policy-as-code library", "Assurance playbook", "Maturity review model"]
  }
];

export const gates = [
  {
    label: "Gate 1",
    title: "3 → 6 months · Assist to first Delegate",
    owner: "Pandora Product / Platform, PS facilitates",
    evidence: ["Pilot live in a controlled domain", "Audit trail complete end to end", "Risk tiers agreed and in use", "Enabled champions in place"],
    thresholds: ["2-3 live use cases", "100% of actions logged", "100% of material actions human-approved", "10-15 champions enabled", "First cost-per-task baseline published"]
  },
  {
    label: "Gate 2",
    title: "6 → 12 months · Delegate pilots to scale",
    owner: "Pandora AgentOps / Security / Domain leads",
    evidence: ["Delegate pilots meeting their SLOs", "Incident drills passed unaided", "Pandora approvals and skill authorship rising"],
    thresholds: ["3+ Delegate pilots in production use", ">=90% audit completeness", ">=80% approvals owned by Pandora", "2 incident drills passed", "10+ Pandora-authored skills in use"]
  },
  {
    label: "Gate 3",
    title: "12 → 24 months · Scale to governed autonomy",
    owner: "Pandora CoE, PS assures",
    evidence: ["Reusable patterns adopted across domains", "Evaluation and FinOps live", "Clean track record on low-risk autonomous actions"],
    thresholds: ["Agent registry covers 100% of production agents", ">=95% eval pass rate for promoted workflows", "Assurance findings trending to zero", "No Sev1 caused by an agent action", "Measurable cost and toil reduction"]
  }
];

export const measurementDomains = [
  ["Adoption", "Active users · enabled champions · Pandora-authored skills · domains onboarded"],
  ["Quality", "Eval pass rate · PR rework rate · escaped defect rate · RCA quality score"],
  ["Operations", "SLO compliance · incident drill pass rate · runbook success rate · rollback success"],
  ["Governance", "Audit completeness · approval compliance · model/prompt change records · risk-tier exceptions"],
  ["FinOps", "Cost per task · token/credit spend by model · cache hit rate · avoided manual effort"],
  ["Capability transfer", "Pandora-led releases · Pandora-owned approvals · PS assurance findings · CoE adoption"]
] as const;

export const rfpRows = [
  ["Provision a data-product workspace in < 30 min", "Technical lane, 12-month self-service milestone — Pandav's provisioning flow is the demo of exactly this"],
  ["AI-ready / agentic infrastructure", "Technical lane, 6-24 months: MCP connectors, agent registry, policy-as-code mesh"],
  ["Onboarding days → minutes · DevEx NPS up from 16", "People + Technical lanes, 6-12 months: golden paths, champions, self-service environments"],
  ["DORA metrics improvement", "Operations + Technical lanes, 12 months: agentic SDLC on CI plus SLO discipline"],
  ["Decommission BizTalk 2020 / EDW / Synapse", "Technical lane, 12-24 months: strangler underway at 12, retired by 24"],
  ["99.99% availability · P1-P4 SLAs", "Operations lane from month 3: transition-in on your SLA terms, gates thereafter"],
  ["~20% data-infra cost down + toil reduction", "Operations lane + FinOps, 12-24 months: measured, not asserted"]
] as const;

export const risks = [
  ["\"Autonomy will run ahead of control.\"", "It structurally cannot: gates precede autonomy, audit is on from day one, and execution is limited to approved, reversible runbooks. Tier-4 actions are never autonomous.", "Governance lane · every gate"],
  ["\"This creates vendor lock-in.\"", "Ownership transfer is in the plan, the metrics and the commercials. Skills are portable files in Git and the IP lands in Pandora repos.", "People lane · Gates 2-3"],
  ["\"What's the hosting and infrastructure burden?\"", "Nothing net-new: standard containers on Azure, read-only connectors into signals Pandora already emits. The harness never travels to Pandora.", "Technical lane · baseline"],
  ["\"Our teams have skills gaps.\"", "The RFP names Kubernetes, Kafka and DevOps practices. Enablement is a first-class workstream with weekly clinics, certifications and champions.", "People lane · all horizons"],
  ["\"Service will be disrupted during transition.\"", "Phased transition with shadow and reverse-shadow, gap analysis every two weeks, knowledge playback to SMEs, and readiness cutover agreed on evidence.", "Operations lane · months 0-6"]
] as const;

export const pandoraAsks = [
  "Named owners per lane — the seven operating-model roles, starting with the pilot's Agent Product Owner",
  "Access and environments for the pilot domain and telemetry connectors",
  "A business owner for the first Delegate use case — engineering and business in one room at workshop W3",
  "Governance and risk participation — Security/Risk in the room from W2, not consulted after",
  "Protected time for enablement clinics — capability transfer fails when squeezed by delivery",
  "Willingness to co-author in the room — the gate charter, backlog and playbook are written by Pandora hands"
];

export const workshops = [
  {
    week: "W1 · Week 1 · Half day",
    title: "Align — the map",
    bullets: ["Mark up the agent taxonomy together", "Validate the adoption baseline", "Surface concerns openly"],
    leavesWith: "Agreed landscape map and adoption baseline — in Pandora's words"
  },
  {
    week: "W2 · Weeks 2-3 · Half day",
    title: "Define the gates",
    bullets: ["Evidence criteria per dimension", "Owner + measure for every gate", "\"What proof lets us delegate?\""],
    leavesWith: "Phase 1 to 2 gate charter — criteria, owners, measures"
  },
  {
    week: "W3 · Weeks 3-4 · Half day",
    title: "Pick the work",
    bullets: ["Score Phase 2 candidates", "Risk-tier against the gates", "Business + engineering in one room"],
    leavesWith: "Delegate backlog — 2-3 prioritised use cases with risk tiers"
  },
  {
    week: "W4 · Weeks 5-6 · Half day",
    title: "Govern & operate",
    bullets: ["Risk-tiered approval model", "Draft the incident model", "Audit and logging requirements"],
    leavesWith: "Governance playbook v1 + AgentOps runbook skeleton"
  }
];

export const w2Agenda = [
  ["09:00", "30 min", "Frame the journey — recap the taxonomy and phases; agree what success looks like by 12:45"],
  ["09:30", "60 min", "Evidence breakouts — four groups, one question: what proof lets us delegate?"],
  ["10:45", "45 min", "Converge and draft the gates — merge criteria; assign an owner and a measure to every gate"],
  ["11:30", "45 min", "Risk-tier the candidates — map Phase 2 use cases against the draft gates"],
  ["12:15", "30 min", "Commit — next steps with named owners; agree the review cadence; nominate champions"]
] as const;

export const askCards = [
  ["Decision one", "Approve the workshop-series start date — four half-days across six weeks, Copenhagen, on Pandora's calendar."],
  ["Decision two", "Name the first Delegate candidate domain and its business owner — the use case we take through W3 and into the pilot."],
  ["What you get for it", "By week six: a landscape map, a gate charter, a prioritised backlog and a governance playbook — every one a Pandora-owned artifact."]
] as const;

export const footer = [
  "Pandora TS&F · Strategic Partner Selection 2027 · Data, Integration & DevOps Platforms — follow-up on the agentic fabric",
  "Appendices on request: full 4x4 grid · autonomy model detail · operating-model RACI · Devin cost analysis · rate card · governance operating model · transition detail"
] as const;
