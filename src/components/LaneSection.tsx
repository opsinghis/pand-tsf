import { AnimatePresence, motion } from "motion/react";
import { type KeyboardEvent, useRef } from "react";
import { autonomyTiers, controlPlane, horizons, type HorizonId, type Lane } from "../data/journey";
import { DataTable, em, FigureBox, laneIcons, laneStyle, PullQuote, Reveal, Section } from "./primitives";

export function LaneSection({
  lane,
  activeHorizon,
  onSelect
}: {
  lane: Lane;
  activeHorizon: HorizonId;
  onSelect: (horizonId: HorizonId) => void;
}) {
  const Icon = laneIcons[lane.id];
  const activePanel = lane.horizons[activeHorizon];
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelId = `panel-${lane.id}`;
  const tabId = (horizonId: HorizonId) => `tab-${lane.id}-${horizonId}`;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % horizons.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + horizons.length) % horizons.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = horizons.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    onSelect(horizons[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <Section id={lane.id} num={lane.section} title={lane.title} className={`lane-sec lane-${lane.id}`}>
      <div className="lane-heading" style={laneStyle(lane)}>
        <span className="lane-mark">
          <Icon size={16} />
        </span>
        <p>{lane.intro}</p>
      </div>
      {lane.id === "technical" && <TechnicalPathDiagram />}
      {lane.id === "operations" && <OpsLoopDiagram />}
      <div className="tabs" role="tablist" aria-label={`${lane.shortTitle} horizons`}>
        {horizons.map((horizon, index) => (
          <button
            key={horizon.id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            className="tab"
            type="button"
            role="tab"
            id={tabId(horizon.id)}
            aria-selected={activeHorizon === horizon.id}
            aria-controls={panelId}
            tabIndex={activeHorizon === horizon.id ? 0 : -1}
            onClick={() => onSelect(horizon.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {horizon.months}
            <span>{horizon.date}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeHorizon}
          className="panel show"
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId(activeHorizon)}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          style={laneStyle(lane)}
        >
          <div className="phead">
            <h3>{activePanel.headline}</h3>
            <span className="posture">{activePanel.posture}</span>
          </div>
          <ul className="milestones">
            {activePanel.milestones.map((milestone) => (
              <li key={milestone}>
                <span className="m" />
                <span>{em(milestone)}</span>
              </li>
            ))}
          </ul>
          {activePanel.already && <div className="already">{em(activePanel.already)}</div>}
        </motion.div>
      </AnimatePresence>
      {lane.id === "governance" && <GovernanceExtras />}
      {lane.pull && <PullQuote quote={lane.pull.quote} source={lane.pull.source} />}
    </Section>
  );
}

function GovernanceExtras() {
  return (
    <>
      <h3 className="section-inline-title">The governance control plane — nine components, dated</h3>
      <DataTable
        headers={["Component", "Why it matters", "First credible version"]}
        rows={controlPlane.map((row) => row.map((value, index) => ({ value, key: `${row[0]}-${index}` })))}
      />
      <h3 className="section-inline-title">Risk-tiered autonomy — as authority rises, controls tighten</h3>
      <div className="tiers">
        {autonomyTiers.map(([tier, level, example, control]) => (
          <Reveal className="tier" key={tier}>
            <span className="t">{tier}</span>
            <span className="lv">{level}</span>
            <span>{example}</span>
            <span className="ctrl">{control}</span>
          </Reveal>
        ))}
      </div>
    </>
  );
}

function TechnicalPathDiagram() {
  return (
    <Reveal>
      <svg className="process-svg" viewBox="0 0 1040 220" role="img" aria-label="Technical adoption maturity diagram">
        <defs>
          <marker id="arrow-tech-react" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <rect x="10" y="10" width="1020" height="200" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
        <text x="34" y="38" className="svg-label">
          TECHNICAL MATURITY PATH
        </text>
        {[
          ["44", "Dec 2026", "Gateway + skills in Git", "Pandav in one domain", "#EDF1F6", "#B6C5D5"],
          ["293", "Mar 2027", "CI-triggered SDLC", "first Delegate pilots", "#EFF3EA", "#BBD0AF"],
          ["542", "Sep 2027", "Agent registry + observability", "self-service <30 min", "#F8F1E6", "#DDBB8C"],
          ["791", "Sep 2028", "Policy-as-code mesh", "governed fabric", "#F1EDF6", "#C8B9DA"]
        ].map(([x, title, l1, l2, fill, stroke]) => (
          <FigureBox key={title} x={Number(x)} y={70} w={205} h={92} fill={fill} stroke={stroke} title={title} lines={[l1, l2]} />
        ))}
        <line x1="249" y1="116" x2="290" y2="116" stroke="#35597B" strokeWidth="2" markerEnd="url(#arrow-tech-react)" />
        <line x1="498" y1="116" x2="539" y2="116" stroke="#35597B" strokeWidth="2" markerEnd="url(#arrow-tech-react)" />
        <line x1="747" y1="116" x2="788" y2="116" stroke="#35597B" strokeWidth="2" markerEnd="url(#arrow-tech-react)" />
        <text x="520" y="188" textAnchor="middle" className="svg-small svg-bold" fill="#35597B">
          Every step adds capability only after the matching governance gate is proven
        </text>
      </svg>
    </Reveal>
  );
}

function OpsLoopDiagram() {
  return (
    <Reveal>
      <svg className="process-svg" viewBox="0 0 1040 230" role="img" aria-label="Agentic operations loop diagram">
        <defs>
          <marker id="arrow-ops-react" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <rect x="10" y="10" width="1020" height="210" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
        <text x="34" y="38" className="svg-label">
          AGENTIC OPS LOOP
        </text>
        {[
          [42, "Signals", "New Relic · SNOW", "#EDF1F6", "#B6C5D5"],
          [222, "Correlate", "graph + context", "#F1EDF6", "#C8B9DA"],
          [402, "Classify risk", "tier + blast radius", "#F8F1E6", "#DDBB8C"],
          [582, "Human gate", "prod / sensitive", "#F7E9E9", "#E4B9BD"],
          [762, "Runbook", "approved reversible", "#EFF3EA", "#BBD0AF"]
        ].map(([x, title, line, fill, stroke]) => (
          <FigureBox key={String(title)} x={Number(x)} y={78} w={130} h={72} fill={String(fill)} stroke={String(stroke)} title={String(title)} lines={[String(line)]} compact />
        ))}
        <line x1="172" y1="114" x2="219" y2="114" stroke="#A3671F" strokeWidth="2" markerEnd="url(#arrow-ops-react)" />
        <line x1="352" y1="114" x2="399" y2="114" stroke="#A3671F" strokeWidth="2" markerEnd="url(#arrow-ops-react)" />
        <line x1="532" y1="114" x2="579" y2="114" stroke="#A3671F" strokeWidth="2" markerEnd="url(#arrow-ops-react)" />
        <line x1="712" y1="114" x2="759" y2="114" stroke="#A3671F" strokeWidth="2" markerEnd="url(#arrow-ops-react)" />
        <path d="M827 150 C827 190 618 190 590 190" fill="none" stroke="#A3671F" strokeWidth="1.8" markerEnd="url(#arrow-ops-react)" />
        <path d="M450 190 C260 190 107 180 107 153" fill="none" stroke="#A3671F" strokeWidth="1.8" markerEnd="url(#arrow-ops-react)" />
        <rect x="454" y="176" width="132" height="28" rx="8" fill="#FFFFFF" stroke="#E5E2DB" />
        <text x="520" y="194" textAnchor="middle" className="svg-small svg-bold" fill="#A3671F">
          Audit + outcome review
        </text>
      </svg>
    </Reveal>
  );
}
