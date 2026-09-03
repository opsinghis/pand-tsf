import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState, type CSSProperties } from "react";
import {
  dialLevels,
  dialNote,
  goalsB21,
  goalsB22,
  goalsC2,
  goalsHeadline,
  goalsNotes,
  platformLabels,
  scopeDial,
  walkthroughs,
  type DialItem,
  type GoalRow,
  type Platform
} from "../data/alternative";
import { DataTable, Reveal, Section } from "./primitives";

type PlatformFilter = Platform | "all";

const goalId = (ref: string) => `goal-${ref.toLowerCase().replace(/\s+/g, "-")}`;
const goalRefs = new Set([...goalsB21, ...goalsB22, ...goalsC2].map((row) => row.ref));
const goalHref = (ref: string) => (goalRefs.has(ref) ? `#${goalId(ref)}` : "#goals");

export function DialSection() {
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [needsL1Only, setNeedsL1Only] = useState(false);

  const visible = scopeDial.filter(
    (item) => (platform === "all" || item.platform === platform) && (!needsL1Only || item.targetNeedsLevel >= 1)
  );

  return (
    <Section id="dial-explorer" num="15" title="The dial: three service levels on every scope item">
      <p className="sec-sub">
        All 30 scope items, each with a defined delivery at every level. Everything starts — and can stay — at Level 0.
        Turning any dial is a per-item decision that belongs to Pandora, behind Gate 0 and the item's own gate. The levels
        and gates are the same ones introduced in the model — repeated here for reference.
      </p>

      <div className="tiers dial-legend">
        {dialLevels.map((level) => (
          <div className="tier" key={level.level}>
            <span className="t">L{level.level}</span>
            <span className="lv">{level.name}</span>
            <span>{level.detail}</span>
          </div>
        ))}
      </div>

      <div className="dial-filters" role="group" aria-label="Filter scope items">
        <SlidersHorizontal size={15} aria-hidden="true" />
        {(["all", "devops", "data"] as const).map((value) => (
          <button
            key={value}
            type="button"
            className={`dial-filter ${platform === value ? "active" : ""}`}
            aria-pressed={platform === value}
            onClick={() => setPlatform(value)}
          >
            {value === "all" ? "All 30 items" : value === "devops" ? "DevOps (13)" : "Data & Integration (17)"}
          </button>
        ))}
        <button
          type="button"
          className={`dial-filter ${needsL1Only ? "active" : ""}`}
          aria-pressed={needsL1Only}
          onClick={() => setNeedsL1Only((current) => !current)}
        >
          Needs Level 1 for its RFP target
        </button>
        <span className="dial-count">{visible.length} shown</span>
      </div>

      <div className="dial-list">
        {scopeDial.map((item) => (
          <DialRow key={item.id} item={item} hidden={!visible.includes(item)} />
        ))}
      </div>
      <p className="running-note">{dialNote}</p>
    </Section>
  );
}

function DialRow({ item, hidden }: { item: DialItem; hidden: boolean }) {
  return (
    <details className="dial-item" id={`dial-${item.id}`} hidden={hidden}>
      <summary>
        <span className={`chip ${item.platform === "devops" ? "gate" : "live"} dial-chip`}>
          {item.platform === "devops" ? "DevOps" : "Data & Int"}
        </span>
        <span className="dial-name">{item.name}</span>
        <span className="dial-needs">
          {item.targetNeedsLevel >= 1 ? "Target needs L1" : "Target met at L0"}
        </span>
        <ChevronDown size={15} aria-hidden="true" className="dial-caret" />
      </summary>
      <div className="dial-provenance">
        <span><strong>Where it&apos;s from:</strong> your {platformLabels[item.platform].label} scope — item {item.sourceNo} of {platformLabels[item.platform].total}, from the platform deep-dive scope mapping.</span>
        <span><strong>Delivered by:</strong> {item.deliveredBy}.</span>
      </div>
      <div className="dial-body">
        <div className="dial-level">
          <h5 className="cap-col-title already-title">L0 · Run as-is — day one</h5>
          <p>{item.level0}</p>
        </div>
        <div className="dial-level">
          <h5 className="cap-col-title netnew-title">L1 · AI-assisted{item.level1H ? ` — earliest ${item.level1H}` : ""}</h5>
          <p>{item.level1}</p>
        </div>
        <div className="dial-level">
          <h5 className="cap-col-title dial-l2-title">L2 · Agentic{item.level2H ? ` — earliest ${item.level2H}` : ""}</h5>
          <p>{item.level2}</p>
        </div>
      </div>
      {item.goals && item.goals.length > 0 && (
        <div className="dial-goals">
          Serves your stated objective: {item.goals.map((goal) => (
            <a className="chip live dial-goal-chip" href={goalHref(goal)} key={goal}>{goal}</a>
          ))}
        </div>
      )}
    </details>
  );
}

export function WalkthroughSection() {
  return (
    <Section id="walkthroughs" num="16" title="The dial in action — two concrete walkthroughs">
      <p className="sec-sub">
        The same service, at each level, so the choice is tangible: what you get on day one, what the first dial-up adds,
        and what full agentic would look like — if and when you choose it.
      </p>
      <div className="legend-hint">
        <span><i className="wt-swatch human" /> Human</span>
        <span><i className="wt-swatch agent" /> Agent</span>
        <span>Watch the boundary slide toward the agent as the level rises — the human always holds the gate until L2.</span>
      </div>
      <div className="wsgrid walk-grid">
        {walkthroughs.map((walkthrough) => (
          <Reveal className="ws walk-card" key={walkthrough.id}>
            <h3>{walkthrough.title}</h3>
            {walkthrough.steps.map((step, index) => {
              const agentShare = [15, 55, 85][index];
              const hue = ["--tech", "--ops", "--accent"][index];
              const boundary = [
                "Human-run · engineer approves & applies",
                "AI-assisted · human approves every action",
                "Agent-run · human reviews outcomes"
              ][index];
              return (
                <div className="wt-level" key={step.level} style={{ "--lv": `var(${hue})` } as CSSProperties}>
                  <div className="wt-level-head">
                    <strong>{step.level}</strong>
                    <span className="wt-boundary">{boundary}</span>
                  </div>
                  <div className="wt-splitrow" aria-hidden="true">
                    <span className="wt-end">Human</span>
                    <div className="wt-split">
                      <span className="wt-human" style={{ width: `${100 - agentShare}%` }} />
                      <span className="wt-agent" style={{ width: `${agentShare}%` }} />
                    </div>
                    <span className="wt-end">Agent</span>
                  </div>
                  <p className="wt-text">{step.text}</p>
                </div>
              );
            })}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function GoalsSection() {
  return (
    <Section id="goals" num="17" title="Everything you asked for, on the gentler path — every stated goal traced">
      <p className="sec-sub">{goalsHeadline}</p>
      <GoalTable title="Data Platform — your stated objectives (8)" rows={goalsB21} />
      <GoalTable title="Integration Platform — your stated objectives (8)" rows={goalsB22} />
      <GoalTable title="DevOps Platform — your stated objectives (4)" rows={goalsC2} />
      <div className="goal-notes">
        {goalsNotes.map((note) => (
          <p className="already alt-note" key={note.slice(0, 30)}>{note}</p>
        ))}
      </div>
    </Section>
  );
}

function GoalTable({ title, rows }: { title: string; rows: GoalRow[] }) {
  return (
    <>
      <h3 className="section-inline-title">{title}</h3>
      <DataTable
        headers={["Ref", "RFP goal — your words", "Lane 1 · as-is delivery", "Fully met at", "Horizon"]}
        rows={rows.map((row) => [
          { value: row.ref, key: `${row.ref}-ref`, id: goalId(row.ref) },
          { value: row.goal + (row.note ? ` — ${row.note}` : ""), key: `${row.ref}-goal` },
          { value: row.lane1, key: `${row.ref}-lane1` },
          { value: row.metAt === 0 ? "Level 0" : "Level 1", key: `${row.ref}-met`, active: row.metAt === 1 },
          { value: row.horizon, key: `${row.ref}-h` }
        ])}
      />
    </>
  );
}
