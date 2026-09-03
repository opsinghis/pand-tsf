import { FigureBox } from "./primitives";

/** The agentic fabric — shown in the hero as the destination, not the vehicle. */
export function FabricDiagram() {
  return (
    <svg className="fabric-svg" viewBox="0 0 640 460" role="img" aria-label="Pandav agentic fabric architecture — the destination">
      <defs>
        <marker id="arrow-fabric-alt" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <rect x="8" y="8" width="624" height="444" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
      <text x="28" y="34" className="svg-label">THREE WORK LOOPS, ONE GOVERNED CORE</text>
      <FigureBox x={30} y={72} w={170} h={86} fill="#F7E9E9" stroke="#E4B9BD" title="Teams governance bot" lines={["access · approvals", "policy · ServiceNow"]} compact />
      <FigureBox x={235} y={72} w={170} h={86} fill="#EFF3EA" stroke="#BBD0AF" title="Agentic SDLC" lines={["Claude · Codex", "tickets to PRs"]} compact />
      <FigureBox x={440} y={72} w={170} h={86} fill="#F8F1E6" stroke="#DDBB8C" title="Ops agents" lines={["signals · RCA", "approved runbooks"]} compact />
      <FigureBox x={203} y={198} w={234} h={98} fill="#EDF1F6" stroke="#B6C5D5" title="Pandav core backend" lines={["LLM request interface", "intent to graph query"]} />
      <line x1="115" y1="158" x2="252" y2="196" stroke="#C43B44" strokeWidth="1.9" markerEnd="url(#arrow-fabric-alt)" />
      <line x1="320" y1="158" x2="320" y2="195" stroke="#55763F" strokeWidth="1.9" markerEnd="url(#arrow-fabric-alt)" />
      <line x1="525" y1="158" x2="388" y2="196" stroke="#A3671F" strokeWidth="1.9" markerEnd="url(#arrow-fabric-alt)" />
      <rect x="74" y="316" width="492" height="44" rx="8" fill="#FFFFFF" stroke="#E5E2DB" />
      <text x="320" y="343" textAnchor="middle" className="svg-small svg-bold">
        Graph context plus policy decides: answer, draft, approve, execute or block
      </text>
      <FigureBox x={30} y={370} w={170} h={64} fill="#F1EDF6" stroke="#C8B9DA" title="Neo4j graph DB" lines={["identity · ownership", "roles · grants"]} compact />
      <FigureBox x={235} y={370} w={170} h={64} fill="#EDF1F6" stroke="#B6C5D5" title="Policy and audit" lines={["PostgreSQL", "ServiceNow truth"]} compact />
      <FigureBox x={440} y={370} w={170} h={64} fill="#E9F3EC" stroke="#A9C9B5" title="Enterprise APIs" lines={["GitHub · Jira · IAM", "K8s · runbooks"]} compact />
      <line x1="320" y1="296" x2="320" y2="313" stroke="#35597B" strokeWidth="2" markerEnd="url(#arrow-fabric-alt)" />
      <line x1="190" y1="360" x2="116" y2="368" stroke="#684E86" strokeWidth="1.7" markerEnd="url(#arrow-fabric-alt)" />
      <line x1="320" y1="360" x2="320" y2="367" stroke="#35597B" strokeWidth="1.7" markerEnd="url(#arrow-fabric-alt)" />
      <line x1="450" y1="360" x2="524" y2="368" stroke="#2E7D4F" strokeWidth="1.7" markerEnd="url(#arrow-fabric-alt)" />
    </svg>
  );
}

export function MobileFabricFlow() {
  return (
    <div className="mobile-fabric-flow" aria-label="Compact Pandav agentic fabric diagram">
      <div className="mobile-loops">
        <span>Teams governance bot</span>
        <span>Agentic SDLC</span>
        <span>Ops agents</span>
      </div>
      <div className="mobile-arrow">↓</div>
      <div className="mobile-node control">Pandav core backend</div>
      <div className="mobile-arrow">↓</div>
      <div className="mobile-node memory">LLM interface maps requests to graph queries</div>
      <div className="mobile-gate">Neo4j graph + policy + audit gate every action</div>
    </div>
  );
}
