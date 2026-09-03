import { ArrowLeft, Network, ShieldCheck } from "lucide-react";
import {
  accessGraphCards,
  architectureHero,
  architectureOverviewCards,
  infrastructureZones,
  opsAgentRows,
  opsFlow,
  pandavCoreModules,
  pandavCoreSequence,
  referenceFacts,
  sdlcFlow,
  sdlcFrameworkRows,
  securityByComponent,
  securityControls,
  teamsGovernanceSteps
} from "../data/architecture";
import { FigureBox, Reveal, Section } from "./primitives";
import { v3GraphSvg, v3LayersSvg, v3SystemSvg } from "./v3ArchitectureDiagrams";

export function ArchitecturePage() {
  return (
    <div className="architecture-page">
      <ArchitectureHero />
      <Section id="architecture-overall" num="A0" title="Overall architecture">
        <p className="sec-sub">
          The fabric is a set of governed work surfaces around one core backend. Teams handles adoption and approvals,
          SDLC skills handle day-to-day engineering work, and ops agents handle telemetry-led operations.
        </p>
        <Reveal className="arch-diagram-panel">
          <div className="figure-label">
            <strong>System architecture from v3</strong>
            <span>Component layout, data flows, graph, ServiceNow and provisioning tools</span>
          </div>
          <OverallArchitectureDiagram />
        </Reveal>
        <Reveal className="arch-card-grid" delay={0.08}>
          {architectureOverviewCards.map((card) => (
            <article className="arch-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <div className="arch-tags">
                {card.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </Reveal>
      </Section>

      <Section id="architecture-infra" num="A1" title="Infrastructure and network architecture">
        <p className="sec-sub">
          The hosting model is deliberately ordinary: Microsoft 365 and Azure Bot Service for the channel, standard Azure
          runtime for the backend, managed data services for state, and explicit outbound connectors to enterprise systems.
        </p>
        <Reveal className="arch-diagram-panel arch-diagram-panel--wide">
          <div className="figure-label">
            <strong>System layers from v3</strong>
            <span>Interaction, API, agent, tool, data and provisioning layers</span>
          </div>
          <InfrastructureNetworkDiagram />
        </Reveal>
        <Reveal className="arch-zone-grid" delay={0.08}>
          {infrastructureZones.map((zone) => (
            <article className="arch-row" key={zone.zone}>
              <h3>{zone.zone}</h3>
              <p>{zone.body}</p>
              <div className="arch-tags">
                {zone.controls.map((control) => (
                  <span key={control}>{control}</span>
                ))}
              </div>
            </article>
          ))}
        </Reveal>
      </Section>

      <Section id="architecture-graph" num="A2" title="Access graph model">
        <p className="sec-sub">
          The graph is the control model. It connects Pandora organisation structure, Entra identity, projects, systems,
          resources, roles, approval policies, grants and ServiceNow evidence into one queryable access model.
        </p>
        <Reveal className="arch-diagram-panel">
          <div className="figure-label">
            <strong>Neo4j access graph from v3</strong>
            <span>Nodes, relationships, policy attachment and grant evidence</span>
          </div>
          <AccessGraphDiagram />
        </Reveal>
        <Reveal className="arch-card-grid" delay={0.08}>
          {accessGraphCards.map((card) => (
            <article className="arch-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </Reveal>
      </Section>

      <Section id="architecture-security" num="A3" title="Security model across the fabric">
        <p className="sec-sub">
          Security is not bolted onto individual agents. The same identity, graph policy, approval, secrets, tool execution
          and audit controls apply across the Teams bot, SDLC framework, ops agents and Pandav core.
        </p>
        <div className="arch-split">
          <Reveal className="arch-diagram-panel">
            <SecurityArchitectureDiagram />
          </Reveal>
          <Reveal className="arch-list-panel" delay={0.08}>
            {securityControls.map((item) => (
              <article className="security-row" key={item.layer}>
                <span>{item.layer}</span>
                <p>{item.control}</p>
              </article>
            ))}
          </Reveal>
        </div>
        <Reveal className="security-matrix">
          {securityByComponent.map(([component, control]) => (
            <article key={component}>
              <h3>{component}</h3>
              <p>{control}</p>
            </article>
          ))}
        </Reveal>
      </Section>

      <Section id="architecture-core" num="A4" title="Pandav core detail">
        <p className="sec-sub">
          The core is the governed translation layer. It takes natural language or events, resolves graph context, applies
          policy, creates evidence and only then executes typed tools.
        </p>
        <div className="arch-split">
          <Reveal className="arch-diagram-panel">
            <PandavCoreDiagram />
          </Reveal>
          <Reveal className="arch-list-panel" delay={0.08}>
            {pandavCoreModules.map((module) => (
              <article className="arch-row" key={module.title}>
                <h3>{module.title}</h3>
                <p>{module.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
        <StepList title="Core execution sequence" steps={pandavCoreSequence} />
      </Section>

      <Section id="architecture-teams" num="A5" title="Teams governance bot detail">
        <p className="sec-sub">
          The Teams bot is the adoption surface for access and governance. It keeps the user in Teams while the core handles
          identity resolution, graph lookup, approval routing, ServiceNow evidence and provisioning.
        </p>
        <div className="arch-split">
          <Reveal className="arch-diagram-panel">
            <TeamsGovernanceDiagram />
          </Reveal>
          <Reveal className="arch-list-panel" delay={0.08}>
            {teamsGovernanceSteps.map((step) => (
              <article className="arch-row" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section id="architecture-sdlc" num="A6" title="Agentic SDLC framework detail">
        <p className="sec-sub">
          The SDLC capability is a framework and skill library, not another platform. The skills travel across Claude Code,
          Codex CLI, CI runners and future SaaS agents while Jira, Confluence and GitHub remain the delivery record.
        </p>
        <div className="arch-split">
          <Reveal className="arch-diagram-panel">
            <AgenticSdlcDiagram />
          </Reveal>
          <Reveal className="arch-list-panel" delay={0.08}>
            {sdlcFrameworkRows.map((row) => (
              <article className="arch-row" key={row.title}>
                <h3>{row.title}</h3>
                <p>{row.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
        <StepList title="SDLC operating flow" steps={sdlcFlow} />
      </Section>

      <Section id="architecture-ops" num="A7" title="Ops agents detail">
        <p className="sec-sub">
          Ops agents are telemetry-led and runbook-grounded. They reduce manual monitoring by correlating signals, resolving
          context and moving known operational patterns through policy and human gates.
        </p>
        <div className="arch-split">
          <Reveal className="arch-diagram-panel">
            <OpsAgentDiagram />
          </Reveal>
          <Reveal className="arch-list-panel" delay={0.08}>
            {opsAgentRows.map((row) => (
              <article className="arch-row" key={row.title}>
                <h3>{row.title}</h3>
                <p>{row.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
        <StepList title="Ops operating flow" steps={opsFlow} />
      </Section>
    </div>
  );
}

function ArchitectureHero() {
  return (
    <header id="architecture" className="arch-hero">
      <div className="wrap arch-hero-grid">
        <Reveal className="arch-hero-copy">
          <div className="kicker">
            <span className="dot" />
            {architectureHero.kicker}
          </div>
          <h1>{architectureHero.headline}</h1>
          <p className="lede">{architectureHero.lede}</p>
          <div className="hero-actions" aria-label="Architecture actions">
            <a href="#journey">
              <ArrowLeft size={16} />
              Back to journey
            </a>
            <a href="#architecture-overall">
              <Network size={16} />
              Open diagrams
            </a>
            <a href="#architecture-security">
              <ShieldCheck size={16} />
              Security model
            </a>
          </div>
        </Reveal>
        <Reveal className="arch-reference" delay={0.08}>
          <div className="figure-label">
            <strong>Reference basis</strong>
            <span>Lifted from Pandav architecture v3</span>
          </div>
          {referenceFacts.map((fact) => (
            <p key={fact}>{fact}</p>
          ))}
        </Reveal>
      </div>
    </header>
  );
}

function StepList({ title, steps }: { title: string; steps: readonly string[] }) {
  return (
    <Reveal className="arch-step-panel">
      <h3>{title}</h3>
      <div className="arch-steps">
        {steps.map((step, index) => (
          <div className="arch-step" key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function OverallArchitectureDiagram() {
  return <V3Diagram label="Pandav v3 system architecture" svg={v3SystemSvg} />;
}

function InfrastructureNetworkDiagram() {
  return (
    <div className="arch-diagram-stack">
      <V3Diagram label="Pandav v3 system layers" svg={v3LayersSvg} />
      <NetworkFootprintDiagram />
    </div>
  );
}

function AccessGraphDiagram() {
  return <V3Diagram label="Pandav v3 Neo4j access graph model" svg={v3GraphSvg} />;
}

function V3Diagram({ label, svg }: { label: string; svg: string }) {
  return <div className="architecture-v3-diagram" aria-label={label} dangerouslySetInnerHTML={{ __html: svg }} />;
}

function NetworkFootprintDiagram() {
  return (
    <svg className="architecture-svg" viewBox="0 0 900 500" role="img" aria-label="Pandav infrastructure and network diagram">
      <defs>
        <marker id="arch-arrow-network" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <rect x="8" y="8" width="884" height="484" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
      <text x="28" y="36" className="svg-label">
        INFRASTRUCTURE AND NETWORK FOOTPRINT
      </text>
      <rect x="28" y="70" width="176" height="360" rx="8" fill="#F7E9E9" stroke="#E4B9BD" />
      <rect x="246" y="70" width="200" height="360" rx="8" fill="#EDF1F6" stroke="#B6C5D5" />
      <rect x="488" y="70" width="176" height="360" rx="8" fill="#F1EDF6" stroke="#C8B9DA" />
      <rect x="706" y="70" width="156" height="360" rx="8" fill="#E9F3EC" stroke="#A9C9B5" />
      <text x="116" y="96" textAnchor="middle" className="svg-title">M365 tenant</text>
      <text x="346" y="96" textAnchor="middle" className="svg-title">Azure app zone</text>
      <text x="576" y="96" textAnchor="middle" className="svg-title">Data/control</text>
      <text x="784" y="96" textAnchor="middle" className="svg-title">Enterprise APIs</text>
      <FigureBox x={54} y={132} w={124} h={60} fill="#FFFFFF" stroke="#E4B9BD" title="Teams client" lines={["chat · cards"]} compact />
      <FigureBox x={54} y={236} w={124} h={60} fill="#FFFFFF" stroke="#E4B9BD" title="Admin portal" lines={["graph editor"]} compact />
      <FigureBox x={276} y={120} w={140} h={62} fill="#FFFFFF" stroke="#B6C5D5" title="Azure Bot Service" lines={["bot registration"]} compact />
      <FigureBox x={276} y={220} w={140} h={76} fill="#FFFFFF" stroke="#B6C5D5" title="Pandav API" lines={["FastAPI", "container/App Service"]} compact />
      <FigureBox x={276} y={336} w={140} h={62} fill="#FFFFFF" stroke="#B6C5D5" title="LLM gateway" lines={["stateless calls"]} compact />
      <FigureBox x={516} y={112} w={120} h={58} fill="#FFFFFF" stroke="#C8B9DA" title="Neo4j AuraDB" lines={["access graph"]} compact />
      <FigureBox x={516} y={198} w={120} h={58} fill="#FFFFFF" stroke="#C8B9DA" title="PostgreSQL" lines={["state · audit"]} compact />
      <FigureBox x={516} y={284} w={120} h={58} fill="#FFFFFF" stroke="#C8B9DA" title="Key Vault" lines={["secrets"]} compact />
      <FigureBox x={516} y={370} w={120} h={42} fill="#FFFFFF" stroke="#C8B9DA" title="Service Bus" lines={["retry"]} compact />
      <FigureBox x={728} y={116} w={112} h={54} fill="#FFFFFF" stroke="#A9C9B5" title="ServiceNow" lines={["RITM"]} compact />
      <FigureBox x={728} y={204} w={112} h={54} fill="#FFFFFF" stroke="#A9C9B5" title="GitHub/Jira" lines={["delivery"]} compact />
      <FigureBox x={728} y={292} w={112} h={54} fill="#FFFFFF" stroke="#A9C9B5" title="New Relic" lines={["signals"]} compact />
      <FigureBox x={728} y={380} w={112} h={54} fill="#FFFFFF" stroke="#A9C9B5" title="IAM/K8s/etc." lines={["targets"]} compact />
      <line x1="178" y1="162" x2="273" y2="150" stroke="#C43B44" strokeWidth="1.7" markerEnd="url(#arch-arrow-network)" />
      <line x1="416" y1="150" x2="513" y2="140" stroke="#684E86" strokeWidth="1.5" markerEnd="url(#arch-arrow-network)" />
      <line x1="416" y1="258" x2="513" y2="226" stroke="#35597B" strokeWidth="1.5" markerEnd="url(#arch-arrow-network)" />
      <line x1="416" y1="258" x2="725" y2="142" stroke="#2E7D4F" strokeWidth="1.5" markerEnd="url(#arch-arrow-network)" />
      <line x1="416" y1="258" x2="725" y2="231" stroke="#185FA5" strokeWidth="1.5" markerEnd="url(#arch-arrow-network)" />
      <line x1="416" y1="374" x2="513" y2="314" stroke="#A3671F" strokeWidth="1.5" markerEnd="url(#arch-arrow-network)" />
      <line x1="636" y1="399" x2="725" y2="407" stroke="#5C6066" strokeWidth="1.5" markerEnd="url(#arch-arrow-network)" />
      <text x="346" y="450" textAnchor="middle" className="svg-small svg-bold" fill="#35597B">
        Standard Azure runtime; no separate hosted agent platform
      </text>
      <text x="576" y="450" textAnchor="middle" className="svg-small svg-bold" fill="#684E86">
        Secrets, graph state, audit state and retries are separated
      </text>
    </svg>
  );
}

function SecurityArchitectureDiagram() {
  return (
    <svg className="architecture-svg" viewBox="0 0 900 430" role="img" aria-label="Security control model across Pandav">
      <defs>
        <marker id="arch-arrow-security" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <rect x="8" y="8" width="884" height="414" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
      <text x="28" y="36" className="svg-label">
        SECURITY CONTROL STACK
      </text>
      <FigureBox x={40} y={88} w={128} h={72} fill="#F7E9E9" stroke="#E4B9BD" title="Request" lines={["Teams · SDLC", "Ops signal"]} compact />
      <FigureBox x={200} y={88} w={128} h={72} fill="#F1EDF6" stroke="#C8B9DA" title="Identity" lines={["Entra ID", "Microsoft Graph"]} compact />
      <FigureBox x={360} y={88} w={128} h={72} fill="#F1EDF6" stroke="#C8B9DA" title="Graph policy" lines={["Neo4j", "ApprovalPolicy"]} compact />
      <FigureBox x={520} y={88} w={128} h={72} fill="#F8F1E6" stroke="#DDBB8C" title="Human gate" lines={["approval card", "risk tier"]} compact />
      <FigureBox x={680} y={88} w={128} h={72} fill="#E9F3EC" stroke="#A9C9B5" title="Typed tool" lines={["idempotent", "least privilege"]} compact />
      <line x1="168" y1="124" x2="197" y2="124" stroke="#C43B44" strokeWidth="1.7" markerEnd="url(#arch-arrow-security)" />
      <line x1="328" y1="124" x2="357" y2="124" stroke="#684E86" strokeWidth="1.7" markerEnd="url(#arch-arrow-security)" />
      <line x1="488" y1="124" x2="517" y2="124" stroke="#A3671F" strokeWidth="1.7" markerEnd="url(#arch-arrow-security)" />
      <line x1="648" y1="124" x2="677" y2="124" stroke="#2E7D4F" strokeWidth="1.7" markerEnd="url(#arch-arrow-security)" />
      <rect x="58" y="214" width="784" height="46" rx="8" fill="#FFFFFF" stroke="#E5E2DB" />
      <text x="450" y="242" textAnchor="middle" className="svg-small svg-bold">
        The LLM selects intent; it never bypasses graph policy, approvals, typed tools or audit evidence
      </text>
      <FigureBox x={128} y={306} w={150} h={58} fill="#EDF1F6" stroke="#B6C5D5" title="Key Vault" lines={["connector secrets"]} compact />
      <FigureBox x={374} y={306} w={150} h={58} fill="#F1EDF6" stroke="#C8B9DA" title="PostgreSQL" lines={["insert-only audit"]} compact />
      <FigureBox x={620} y={306} w={150} h={58} fill="#E9F3EC" stroke="#A9C9B5" title="ServiceNow" lines={["RITM evidence"]} compact />
      <line x1="744" y1="160" x2="706" y2="304" stroke="#2E7D4F" strokeWidth="1.3" markerEnd="url(#arch-arrow-security)" />
      <line x1="744" y1="160" x2="450" y2="304" stroke="#35597B" strokeWidth="1.3" markerEnd="url(#arch-arrow-security)" />
      <line x1="744" y1="160" x2="204" y2="304" stroke="#A3671F" strokeWidth="1.3" markerEnd="url(#arch-arrow-security)" />
    </svg>
  );
}

function PandavCoreDiagram() {
  return (
    <svg className="architecture-svg" viewBox="0 0 820 420" role="img" aria-label="Pandav core internal architecture">
      <defs>
        <marker id="arch-arrow-core" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <rect x="8" y="8" width="804" height="404" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
      <text x="28" y="36" className="svg-label">
        PANDAV CORE BACKEND
      </text>
      <FigureBox x={42} y={82} w={142} h={72} fill="#EDF1F6" stroke="#B6C5D5" title="API boundary" lines={["chat · invoke", "events · signals"]} compact />
      <FigureBox x={238} y={66} w={154} h={80} fill="#F1EDF6" stroke="#C8B9DA" title="LLM interface" lines={["intent mapping", "entity extraction"]} compact />
      <FigureBox x={440} y={66} w={170} h={80} fill="#F1EDF6" stroke="#C8B9DA" title="Agent orchestrator" lines={["Claude tool use", "bounded planning"]} compact />
      <FigureBox x={648} y={82} w={132} h={72} fill="#F8F1E6" stroke="#DDBB8C" title="Tool dispatcher" lines={["typed tools"]} compact />
      <FigureBox x={74} y={230} w={132} h={64} fill="#F1EDF6" stroke="#C8B9DA" title="Graph service" lines={["Neo4j client"]} compact />
      <FigureBox x={256} y={230} w={132} h={64} fill="#EDF1F6" stroke="#B6C5D5" title="Policy engine" lines={["risk · compliance"]} compact />
      <FigureBox x={438} y={230} w={132} h={64} fill="#F8F1E6" stroke="#DDBB8C" title="Approval engine" lines={["route · escalate"]} compact />
      <FigureBox x={620} y={230} w={132} h={64} fill="#E9F3EC" stroke="#A9C9B5" title="Audit writer" lines={["Postgres · graph"]} compact />
      <line x1="184" y1="118" x2="235" y2="106" stroke="#35597B" strokeWidth="1.6" markerEnd="url(#arch-arrow-core)" />
      <line x1="392" y1="106" x2="437" y2="106" stroke="#684E86" strokeWidth="1.6" markerEnd="url(#arch-arrow-core)" />
      <line x1="610" y1="106" x2="645" y2="118" stroke="#A3671F" strokeWidth="1.6" markerEnd="url(#arch-arrow-core)" />
      <line x1="512" y1="146" x2="140" y2="228" stroke="#684E86" strokeWidth="1.4" markerEnd="url(#arch-arrow-core)" />
      <line x1="512" y1="146" x2="322" y2="228" stroke="#35597B" strokeWidth="1.4" markerEnd="url(#arch-arrow-core)" />
      <line x1="512" y1="146" x2="504" y2="228" stroke="#A3671F" strokeWidth="1.4" markerEnd="url(#arch-arrow-core)" />
      <line x1="714" y1="154" x2="686" y2="228" stroke="#2E7D4F" strokeWidth="1.4" markerEnd="url(#arch-arrow-core)" />
      <rect x="84" y="342" width="652" height="42" rx="8" fill="#FFFFFF" stroke="#E5E2DB" />
      <text x="410" y="368" textAnchor="middle" className="svg-small svg-bold" fill="#35597B">
        Traversal first, policy second, ServiceNow before material action, audit always
      </text>
    </svg>
  );
}

function TeamsGovernanceDiagram() {
  return (
    <svg className="architecture-svg" viewBox="0 0 820 370" role="img" aria-label="Teams governance bot architecture">
      <defs>
        <marker id="arch-arrow-teams" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <rect x="8" y="8" width="804" height="354" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
      <text x="28" y="36" className="svg-label">
        TEAMS GOVERNANCE BOT
      </text>
      <FigureBox x={42} y={90} w={132} h={74} fill="#F7E9E9" stroke="#E4B9BD" title="Teams client" lines={["natural request", "status updates"]} compact />
      <FigureBox x={226} y={90} w={132} h={74} fill="#F7E9E9" stroke="#E4B9BD" title="Azure Bot" lines={["Bot Framework", "aadObjectId"]} compact />
      <FigureBox x={410} y={90} w={150} h={74} fill="#EDF1F6" stroke="#B6C5D5" title="Pandav core" lines={["Graph + policy", "ServiceNow"]} compact />
      <FigureBox x={612} y={90} w={150} h={74} fill="#F8F1E6" stroke="#DDBB8C" title="Approval card" lines={["approve/reject", "graph validated"]} compact />
      <FigureBox x={124} y={238} w={150} h={62} fill="#E9F3EC" stroke="#A9C9B5" title="Target system" lines={["GitHub · IAM · K8s"]} compact />
      <FigureBox x={344} y={238} w={150} h={62} fill="#F1EDF6" stroke="#C8B9DA" title="Neo4j grant" lines={["AccessGrant"]} compact />
      <FigureBox x={564} y={238} w={150} h={62} fill="#E9F3EC" stroke="#A9C9B5" title="ServiceNow" lines={["RITM fulfilled"]} compact />
      <line x1="174" y1="127" x2="223" y2="127" stroke="#C43B44" strokeWidth="1.7" markerEnd="url(#arch-arrow-teams)" />
      <line x1="358" y1="127" x2="407" y2="127" stroke="#35597B" strokeWidth="1.7" markerEnd="url(#arch-arrow-teams)" />
      <line x1="560" y1="127" x2="609" y2="127" stroke="#A3671F" strokeWidth="1.7" markerEnd="url(#arch-arrow-teams)" />
      <line x1="682" y1="164" x2="640" y2="236" stroke="#A3671F" strokeWidth="1.5" markerEnd="url(#arch-arrow-teams)" />
      <line x1="484" y1="164" x2="420" y2="236" stroke="#684E86" strokeWidth="1.5" markerEnd="url(#arch-arrow-teams)" />
      <line x1="484" y1="164" x2="204" y2="236" stroke="#2E7D4F" strokeWidth="1.5" markerEnd="url(#arch-arrow-teams)" />
      <text x="410" y="332" textAnchor="middle" className="svg-small svg-bold" fill="#C43B44">
        User stays in Teams; policy, ticketing, provisioning and audit happen behind the bot
      </text>
    </svg>
  );
}

function AgenticSdlcDiagram() {
  return (
    <svg className="architecture-svg" viewBox="0 0 820 370" role="img" aria-label="Agentic SDLC framework architecture">
      <defs>
        <marker id="arch-arrow-sdlc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <rect x="8" y="8" width="804" height="354" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
      <text x="28" y="36" className="svg-label">
        AGENTIC SDLC FRAMEWORK
      </text>
      <FigureBox x={42} y={128} w={150} h={76} fill="#EFF3EA" stroke="#BBD0AF" title="Skill library" lines={["files in Git", "LISA/RALPH"]} compact />
      <FigureBox x={284} y={62} w={132} h={68} fill="#EDF1F6" stroke="#B6C5D5" title="Claude Code" lines={["developer IDE"]} compact />
      <FigureBox x={284} y={150} w={132} h={68} fill="#EDF1F6" stroke="#B6C5D5" title="Codex CLI" lines={["developer IDE"]} compact />
      <FigureBox x={284} y={238} w={132} h={68} fill="#EDF1F6" stroke="#B6C5D5" title="CI runners" lines={["event triggered"]} compact />
      <FigureBox x={516} y={72} w={132} h={68} fill="#F8F1E6" stroke="#DDBB8C" title="Jira/Confluence" lines={["tickets · docs"]} compact />
      <FigureBox x={516} y={172} w={132} h={68} fill="#E9F3EC" stroke="#A9C9B5" title="GitHub" lines={["code · tests · PR"]} compact />
      <FigureBox x={516} y={272} w={132} h={52} fill="#F1EDF6" stroke="#C8B9DA" title="Registry/evals" lines={["evidence"]} compact />
      <FigureBox x={692} y={172} w={94} h={68} fill="#F1EDF6" stroke="#C8B9DA" title="Pandav core" lines={["policy", "audit"]} compact />
      <line x1="192" y1="166" x2="281" y2="96" stroke="#55763F" strokeWidth="1.5" markerEnd="url(#arch-arrow-sdlc)" />
      <line x1="192" y1="166" x2="281" y2="184" stroke="#55763F" strokeWidth="1.5" markerEnd="url(#arch-arrow-sdlc)" />
      <line x1="192" y1="166" x2="281" y2="272" stroke="#55763F" strokeWidth="1.5" markerEnd="url(#arch-arrow-sdlc)" />
      <line x1="416" y1="96" x2="513" y2="106" stroke="#A3671F" strokeWidth="1.5" markerEnd="url(#arch-arrow-sdlc)" />
      <line x1="416" y1="184" x2="513" y2="206" stroke="#2E7D4F" strokeWidth="1.5" markerEnd="url(#arch-arrow-sdlc)" />
      <line x1="416" y1="272" x2="513" y2="298" stroke="#684E86" strokeWidth="1.5" markerEnd="url(#arch-arrow-sdlc)" />
      <line x1="648" y1="206" x2="689" y2="206" stroke="#684E86" strokeWidth="1.4" markerEnd="url(#arch-arrow-sdlc)" />
      <text x="410" y="340" textAnchor="middle" className="svg-small svg-bold" fill="#55763F">
        Same skills across harnesses; delivery evidence stays in Pandora systems
      </text>
    </svg>
  );
}

function OpsAgentDiagram() {
  return (
    <svg className="architecture-svg" viewBox="0 0 820 370" role="img" aria-label="Ops agent architecture">
      <defs>
        <marker id="arch-arrow-ops" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <rect x="8" y="8" width="804" height="354" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
      <text x="28" y="36" className="svg-label">
        OPS AGENTS
      </text>
      <FigureBox x={40} y={80} w={132} h={78} fill="#F8F1E6" stroke="#DDBB8C" title="Signal intake" lines={["New Relic", "SNOW · metadata"]} compact />
      <FigureBox x={226} y={80} w={150} h={78} fill="#F8F1E6" stroke="#DDBB8C" title="Correlation agents" lines={["incidents · drift", "cost · controls"]} compact />
      <FigureBox x={430} y={80} w={132} h={78} fill="#EDF1F6" stroke="#B6C5D5" title="Graph + policy" lines={["owner · risk", "blast radius"]} compact />
      <FigureBox x={616} y={80} w={132} h={78} fill="#F7E9E9" stroke="#E4B9BD" title="Human gate" lines={["PagerDuty", "approver"]} compact />
      <FigureBox x={164} y={240} w={150} h={62} fill="#E9F3EC" stroke="#A9C9B5" title="Runbook execution" lines={["CI runner", "reversible action"]} compact />
      <FigureBox x={386} y={240} w={150} h={62} fill="#E9F3EC" stroke="#A9C9B5" title="ServiceNow update" lines={["RCA · action log"]} compact />
      <FigureBox x={608} y={240} w={150} h={62} fill="#F1EDF6" stroke="#C8B9DA" title="Governance score" lines={["evals · FinOps"]} compact />
      <line x1="172" y1="119" x2="223" y2="119" stroke="#A3671F" strokeWidth="1.7" markerEnd="url(#arch-arrow-ops)" />
      <line x1="376" y1="119" x2="427" y2="119" stroke="#35597B" strokeWidth="1.7" markerEnd="url(#arch-arrow-ops)" />
      <line x1="562" y1="119" x2="613" y2="119" stroke="#C43B44" strokeWidth="1.7" markerEnd="url(#arch-arrow-ops)" />
      <line x1="496" y1="158" x2="244" y2="238" stroke="#2E7D4F" strokeWidth="1.5" markerEnd="url(#arch-arrow-ops)" />
      <line x1="496" y1="158" x2="462" y2="238" stroke="#2E7D4F" strokeWidth="1.5" markerEnd="url(#arch-arrow-ops)" />
      <line x1="682" y1="158" x2="682" y2="238" stroke="#684E86" strokeWidth="1.5" markerEnd="url(#arch-arrow-ops)" />
      <text x="410" y="334" textAnchor="middle" className="svg-small svg-bold" fill="#A3671F">
        Agents reduce manual monitoring; production action remains policy-controlled
      </text>
    </svg>
  );
}
