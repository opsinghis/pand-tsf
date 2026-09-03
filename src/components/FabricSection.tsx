import {
  architectureRows,
  coreBackendRows,
  fabricCapabilities,
  infrastructureRows,
  pandoraLandscapeRows,
  solutionFlow
} from "../data/journey";
import { FigureBox, Reveal, Section } from "./primitives";

export function FabricSection() {
  return (
    <Section id="fabric" num="00" title="What the agentic fabric is made of">
      <p className="sec-sub">
        Pandav is not a generic AI platform. It is three everyday work loops on one governed backend: a Teams governance
        bot, an agentic SDLC framework, and ops agents that share graph memory, policy, approvals and audit.
      </p>
      <Reveal className="fabric-blueprint">
        <div className="figure-label">
          <strong>Composition view</strong>
          <span>Work surfaces share the same core backend</span>
        </div>
        <div className="capability-grid">
          {fabricCapabilities.map((capability, index) => (
            <article className="capability-card" key={capability.title}>
              <span className="capability-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <span className="capability-label">{capability.label}</span>
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
                <div className="capability-tags">
                  {capability.examples.map((example) => (
                    <span key={example}>{example}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="core-divider">Shared core backend</div>
        <div className="core-grid">
          {coreBackendRows.map(([title, body]) => (
            <article className="core-card" key={title}>
              <h4>{title}</h4>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </Reveal>
      <div className="visual-grid">
        <Reveal className="visual-panel">
          <h3>Solution architecture: request to graph query to action</h3>
          <p>The LLM interface translates language into a known intent, then the graph and policy services decide what can happen.</p>
          <ArchitectureMap />
        </Reveal>
        <Reveal className="visual-panel" delay={0.08}>
          <h3>Governed request flow</h3>
          <p>Each request follows the same sequence whether it starts from Teams, an SDLC harness or an operational signal.</p>
          <SolutionFlow />
        </Reveal>
      </div>
      <div className="visual-grid architecture-deep-dive">
        <Reveal className="visual-panel">
          <h3>Infrastructure architecture: ordinary enterprise footprint</h3>
          <p>What Pandora hosts is standard Azure runtime plus governed connectors around existing M365, ITSM, graph and CI/CD capabilities.</p>
          <InfrastructureDiagram />
          <div className="infra-stack">
            {infrastructureRows.map(([title, body]) => (
              <div className="infra-row" key={title}>
                <strong>{title}</strong>
                <span>{body}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="visual-panel" delay={0.08}>
          <h3>How it maps to Pandora's landscape</h3>
          <p>Nothing in the opening architecture asks Pandora to replace the landscape; it connects the collaboration, identity, ITSM, delivery and operations systems already in play.</p>
          <LandscapeFit />
        </Reveal>
      </div>
    </Section>
  );
}

function ArchitectureMap() {
  return (
    <div className="small-map">
      {architectureRows.map((row) => (
        <div className="map-row" key={row.label}>
          <div className="map-label">{row.label}</div>
          <div className="map-items">
            {row.items.map(([title, body]) => (
              <div className="map-item" key={title}>
                <strong>{title}</strong>
                <span>{body}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SolutionFlow() {
  return (
    <div className="solution-flow">
      {solutionFlow.map((item) => (
        <div className="flow-step" key={item.step}>
          <span>{item.step}</span>
          <div>
            <h4>{item.title}</h4>
            <p>{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function LandscapeFit() {
  return (
    <div className="landscape-grid">
      {pandoraLandscapeRows.map(([system, role, body]) => (
        <article className="landscape-card" key={system}>
          <span>{role}</span>
          <h4>{system}</h4>
          <p>{body}</p>
        </article>
      ))}
    </div>
  );
}

function InfrastructureDiagram() {
  return (
    <svg className="infra-svg" viewBox="0 0 520 300" role="img" aria-label="Pandav infrastructure footprint diagram">
      <defs>
        <marker id="arrow-infra-react" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <rect x="10" y="10" width="500" height="280" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
      <text x="28" y="36" className="svg-label">
        PANDAV INFRASTRUCTURE FOOTPRINT
      </text>
      <FigureBox x={30} y={66} w={118} h={56} fill="#F7E9E9" stroke="#E4B9BD" title="M365 Teams" lines={["bot front door"]} compact />
      <FigureBox x={202} y={56} w={116} h={76} fill="#EDF1F6" stroke="#B6C5D5" title="Azure runtime" lines={["API + bot", "container"]} compact />
      <FigureBox x={374} y={66} w={116} h={56} fill="#F1EDF6" stroke="#C8B9DA" title="LLM gateway" lines={["stateless calls"]} compact />
      <FigureBox x={52} y={174} w={126} h={66} fill="#F1EDF6" stroke="#C8B9DA" title="Neo4j AuraDB" lines={["live access", "graph"]} compact />
      <FigureBox x={197} y={174} w={126} h={66} fill="#EDF1F6" stroke="#B6C5D5" title="PostgreSQL" lines={["transactions", "audit"]} compact />
      <FigureBox x={342} y={174} w={126} h={66} fill="#E9F3EC" stroke="#A9C9B5" title="Enterprise APIs" lines={["SNOW · GitHub", "IAM · runbooks"]} compact />
      <line x1="148" y1="94" x2="199" y2="94" stroke="#C43B44" strokeWidth="1.8" markerEnd="url(#arrow-infra-react)" />
      <line x1="318" y1="94" x2="371" y2="94" stroke="#684E86" strokeWidth="1.8" markerEnd="url(#arrow-infra-react)" />
      <line x1="230" y1="132" x2="138" y2="172" stroke="#684E86" strokeWidth="1.6" markerEnd="url(#arrow-infra-react)" />
      <line x1="260" y1="132" x2="260" y2="171" stroke="#35597B" strokeWidth="1.6" markerEnd="url(#arrow-infra-react)" />
      <line x1="290" y1="132" x2="398" y2="172" stroke="#2E7D4F" strokeWidth="1.6" markerEnd="url(#arrow-infra-react)" />
      <text x="268" y="272" textAnchor="middle" className="svg-small svg-bold" fill="#35597B">
        No separate agent runtime: standard Azure hosting plus governed connectors
      </text>
    </svg>
  );
}
