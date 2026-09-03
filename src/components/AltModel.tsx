import { ShieldCheck } from "lucide-react";
import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { changesNote, changesTable, dialSource, foundationPillars, foundationsIntro, foundationsPunchline, gateSeries, gateZero, gatesAnswer, horizons, laneDefinitions, laneRules, platformLabels, scopeDial, terminology } from "../data/alternative";
import { DataTable, PullQuote, Reveal, Section } from "./primitives";
import { LandscapeMap } from "./LandscapeMap";

export function ChangesSection() {
  return (
    <Section id="changes" num="02" title="What changes vs. our July approach — and what doesn't">
      <p className="sec-sub">
        This is a real alternative, not repackaging. The table below is deliberately blunt about what moves — and the note
        beneath it about what stays.
      </p>
      <DataTable
        headers={["Dimension", "July approach", "This alternative"]}
        rows={changesTable.map((row) => row.map((value, index) => ({ value, key: `${row[0]}-${index}` })))}
      />
      <div className="already alt-note">{changesNote}</div>
    </Section>
  );
}

export function ScopeOverviewSection() {
  const groups = (["devops", "data"] as const).map((platform) => ({
    platform,
    ...platformLabels[platform],
    items: scopeDial.filter((item) => item.platform === platform)
  }));

  return (
    <Section id="scope" num="03" title="Your scope of work — the 30 items, up front">
      <p className="sec-sub">{dialSource}</p>

      <div className="scopemap">
        <div className="scopemap-total">
          <strong>30</strong>
          <span>items of scope work — mapped from your platform deep-dive, nothing added or dropped</span>
        </div>
        <div className="scopemap-bar" aria-hidden="true">
          {groups.map((group) => (
            <div className={`scopemap-seg ${group.platform}`} style={{ flexGrow: group.items.length }} key={group.platform}>
              <strong>{group.label}</strong>
              <span>{group.items.length}</span>
            </div>
          ))}
        </div>
        <div className="scopemap-themes">
          <div className="scopemap-theme devops">
            <span className="scopemap-dot" />
            Covers shared Kubernetes (PAKS), the developer portal &amp; DevEx, the tooling migrations, and cost, security &amp; DORA.
          </div>
          <div className="scopemap-theme data">
            <span className="scopemap-dot" />
            Covers a self-serve data platform, Kafka/Nexus integration, one governance &amp; lineage layer, and legacy decommission.
          </div>
        </div>
      </div>

      <div className="scope-grid">
        {groups.map((group) => (
          <div className={`scope-col ${group.platform}`} key={group.platform}>
            <div className="scope-col-head">
              <span className="scope-coldot" />
              <strong>{group.label}</strong>
              <span>{group.items.length} items</span>
            </div>
            <ol className="scope-list">
              {group.items.map((item) => (
                <li key={item.id}>
                  <a href={`#dial-${item.id}`}>
                    <span className="scope-no">{item.sourceNo}</span>
                    <span className="scope-text">
                      <span className="scope-item-name">{item.name}</span>
                      <span className="scope-item-desc">{item.scopeDesc}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <p className="running-note">
        Every one of these 30 items is part of your scope of work from day one. Click any item, or open{" "}
        <a href="#dial-explorer">The dial</a>, to see how each is delivered, the named solution behind it, and the stated
        objective it serves.
      </p>
    </Section>
  );
}

function LevelGateFlow() {
  const levels = [
    { tag: "L0", name: "Run as-is", blurb: ["Conventional delivery —", "the default, forever"], fill: "#EDF1F6", stroke: "#B6C5D5", ink: "#35597B" },
    { tag: "L1", name: "AI-assisted", blurb: ["AI drafts, recommends —", "a human executes"], fill: "#F8F1E6", stroke: "#DDBB8C", ink: "#A3671F" },
    { tag: "L2", name: "Agentic", blurb: ["A bounded loop,", "behind approval gates"], fill: "#F7E9E9", stroke: "#E4B9BD", ink: "#C43B44" }
  ];
  const boxX = [40, 410, 780];
  const gates = [
    { cx: 350, name: "Gate 1", sub: "per item · unlocks L1" },
    { cx: 720, name: "Gate 2", sub: "per item · unlocks L2" }
  ];
  const lock = (cx: number, cy: number, key: string) => (
    <g key={key}>
      <path d={`M ${cx - 8} ${cy - 4} v -5 a 8 8 0 0 1 16 0 v 5`} fill="none" stroke="#2E7D4F" strokeWidth="1.7" />
      <rect x={cx - 13} y={cy - 4} width="26" height="20" rx="3.5" fill="#E9F3EC" stroke="#2E7D4F" strokeWidth="1.7" />
      <circle cx={cx} cy={cy + 5} r="2.3" fill="#2E7D4F" />
    </g>
  );
  return (
    <Reveal>
      <svg className="process-svg" viewBox="0 0 1040 320" role="img" aria-label="Levels and gates: Gate 0 is the estate-wide prerequisite; then each scope item moves L0 to L1 through Gate 1, and L1 to L2 through Gate 2">
        <defs>
          <marker id="arrow-lg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <rect x="10" y="10" width="1020" height="300" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />

        <rect x="40" y="36" width="990" height="50" rx="8" fill="#E9F3EC" stroke="#2E7D4F" />
        {lock(72, 61, "g0lock")}
        <text x="100" y="57" className="svg-small svg-bold" fill="#2E7D4F">GATE 0 · FOUNDATIONS PROVEN — ESTATE-WIDE, PASSES ONCE</text>
        <text x="100" y="74" className="svg-small" fill="#3a5a44">Only after Gate 0 can any per-item dial move. Gates 1 and 2 are then per item, and reversible.</text>

        <line x1="535" y1="86" x2="535" y2="120" stroke="#2E7D4F" strokeWidth="1.8" markerEnd="url(#arrow-lg)" />
        <text x="552" y="110" className="svg-small svg-bold" fill="#2E7D4F">then, per scope item:</text>

        {levels.map((lvl, i) => (
          <g key={lvl.tag}>
            <rect x={boxX[i]} y="140" width="250" height="120" rx="8" fill={lvl.fill} stroke={lvl.stroke} />
            <text x={boxX[i] + 22} y="186" fontSize="26" fontWeight="800" fontFamily="Arial, sans-serif" fill={lvl.ink}>{lvl.tag}</text>
            <text x={boxX[i] + 70} y="186" className="svg-title" fill={lvl.ink}>{lvl.name}</text>
            <text x={boxX[i] + 22} y="216" className="svg-small">{lvl.blurb[0]}</text>
            <text x={boxX[i] + 22} y="232" className="svg-small">{lvl.blurb[1]}</text>
          </g>
        ))}

        {gates.map((g) => (
          <g key={g.name}>
            <line x1={g.cx - 60} y1="200" x2={g.cx - 20} y2="200" stroke="#2E7D4F" strokeWidth="2" markerEnd="url(#arrow-lg)" />
            <line x1={g.cx + 20} y1="200" x2={g.cx + 60} y2="200" stroke="#2E7D4F" strokeWidth="2" markerEnd="url(#arrow-lg)" />
            {lock(g.cx, 200, g.name)}
            <text x={g.cx} y="250" textAnchor="middle" className="svg-small svg-bold" fill="#2E7D4F">{g.name}</text>
            <text x={g.cx} y="264" textAnchor="middle" className="svg-small" fill="#3a5a44">{g.sub}</text>
          </g>
        ))}

        <text x="520" y="294" textAnchor="middle" className="svg-small svg-bold" fill="#35597B">
          Every item starts at L0 and stays there until you turn its dial. You hold all 30 dials.
        </text>
      </svg>
    </Reveal>
  );
}

export function TwoLaneSection() {
  return (
    <Section id="twolane" num="04" title="The two-lane model — one destination">
      <p className="sec-sub">
        Everything in this approach hangs off one structure: two lanes over a shared governance base. Lane 1 delivers the
        RFP as written. Lane 2 holds the agentic fabric ready — and gates are the only crossing points between them.
      </p>
      <SwimlanePlan />
      <div className="lane-defs">
        {laneDefinitions.map((lane) => (
          <Reveal className="lane-def" key={lane.id}>
            <strong>{lane.name}</strong>
            <span>{lane.detail}</span>
          </Reveal>
        ))}
      </div>
      <h3 className="section-inline-title">The three service levels, and the two gates that move between them</h3>
      <LevelGateFlow />
      <h3 className="section-inline-title">Each gate — scope and evidence</h3>
      <div className="gate-cards">
        {gateSeries.map((gate) => (
          <Reveal className="gate-card-sm" key={gate.id}>
            <div className="gate-card-head">
              <strong>{gate.name}</strong>
              <span className="chip live">{gate.scope}</span>
            </div>
            <p className="gate-unlocks">{gate.unlocks}</p>
            <p className="gate-evidence"><strong>Evidence:</strong> {gate.evidence}</p>
          </Reveal>
        ))}
      </div>
      <div className="already alt-note">{gatesAnswer}</div>
      <h3 className="section-inline-title">The terminology, on one card</h3>
      <DataTable
        headers={["Term", "What it means"]}
        rows={terminology.map((row) => row.map((value, index) => ({ value, key: `${row[0]}-${index}` })))}
      />
      <h3 className="section-inline-title">Three rules, stated as commitments</h3>
      <div className="rules-list">
        {laneRules.map((rule, index) => (
          <Reveal className="rule-row" key={rule}>
            <span className="rule-num">{index + 1}</span>
            <span>{rule}</span>
          </Reveal>
        ))}
      </div>
      <PullQuote
        quote="Adopt at the speed of trust. If you never turn a dial, you still have a well-run service that hits its SLAs. Every dial you do turn is pure upside — and the fabric is already built, so the option costs nothing to keep open."
        source="The two-lane commitment"
      />
    </Section>
  );
}

function SwimlanePlan() {
  const colStarts = [168, 372, 576, 780];
  const colWidths = [204, 204, 204, 226];
  const centers = [270, 474, 678, 893];
  const lane1Cells = [
    ["Transition per the RFP", "Support autonomous (day 60)", "Baselines banked", "Gate-0 assessments run"],
    ["Dev autonomous (day 120)", "A quarter of SLAs proven", "Automation wave 1", "Foundations built"],
    ["First cost-down banked", "Migrations majority done", "BizTalk strangler underway", "DORA trending up"],
    ["Legacy retired", "All RFP targets met", "Steady-state + improvement", ""]
  ];
  const lane2Cells = [
    ["Nothing in the estate", "— by design.", "Internal AI on our side only"],
    ["First Assist pilots (L1)", "via Gates 0 + 1", "AI dev-tooling enablement"],
    ["Assist broadens per dials", "First Delegate items (L2)", "via Gate 2 · agentic gov. wakes"],
    ["Items at chosen levels", "Fabric available,", "never mandatory"]
  ];
  const maxLevels = [
    { label: "max L0", fill: "#5C6066" },
    { label: "max L1", fill: "#A3671F" },
    { label: "max L2", fill: "#C43B44" },
    { label: "your mix", fill: "#16181D" }
  ];

  return (
    <Reveal>
      <svg className="process-svg" viewBox="0 0 1040 470" role="img" aria-label="Swimlane plan: Lane 1 and Lane 2 across four horizons, with the three gate kinds as crossing points and the maximum service level available per horizon">
        <defs>
          <marker id="arrow-swim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <pattern id="swim-hatch" width="9" height="9" patternTransform="rotate(-45)" patternUnits="userSpaceOnUse">
            <rect width="9" height="9" fill="#F7E9E9" />
            <line x1="0" y1="0" x2="0" y2="9" stroke="#EFDCDD" strokeWidth="4" />
          </pattern>
        </defs>
        <rect x="10" y="10" width="1020" height="450" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
        <text x="34" y="38" className="svg-label">THE SWIMLANE PLAN — LANES × HORIZONS × GATES × LEVELS</text>

        {[168, 372, 576, 780].map((x) => (
          <line key={x} x1={x} y1="50" x2={x} y2="386" stroke="#E5E2DB" strokeDasharray="3 4" />
        ))}

        <text x="44" y="72" className="svg-small svg-bold">HORIZONS</text>
        {horizons.map((horizon, index) => (
          <g key={horizon.id}>
            <text x={centers[index]} y="68" textAnchor="middle" className="svg-title">{horizon.date}</text>
            <text x={centers[index]} y="84" textAnchor="middle" className="svg-small">{horizon.months} · {horizon.stage}</text>
          </g>
        ))}

        <rect x="30" y="96" width="976" height="96" rx="8" fill="#EDF1F6" stroke="#B6C5D5" />
        <text x="44" y="128" className="svg-title" fill="#35597B">LANE 1</text>
        <text x="44" y="146" className="svg-small svg-bold">Run &amp; Deliver</text>
        <text x="44" y="162" className="svg-small">active day one</text>
        {lane1Cells.map((cell, col) => (
          <g key={`l1-${col}`}>
            {cell.map((line, row) => (
              <text key={line || row} x={colStarts[col] + 12} y={118 + row * 18} className="svg-small">{line}</text>
            ))}
          </g>
        ))}

        <text x="44" y="216" className="svg-small svg-bold" fill="#2E7D4F">GATES</text>
        <text x="44" y="231" className="svg-small">crossing points</text>
        {[474, 678, 893].map((x) => (
          <line key={x} x1={x} y1="248" x2={x} y2="196" stroke="#2E7D4F" strokeWidth="2.2" markerEnd="url(#arrow-swim)" />
        ))}
        <rect x="389" y="203" width="170" height="36" rx="12" fill="#E9F3EC" stroke="#2E7D4F" />
        <text x="474" y="218" textAnchor="middle" className="svg-small svg-bold" fill="#2E7D4F">Gate 0 · once</text>
        <text x="474" y="233" textAnchor="middle" className="svg-small svg-bold" fill="#2E7D4F">Gate 1 · per item</text>
        <rect x="613" y="209" width="130" height="24" rx="12" fill="#E9F3EC" stroke="#2E7D4F" />
        <text x="678" y="225" textAnchor="middle" className="svg-small svg-bold" fill="#2E7D4F">Gate 2 · per item</text>
        <rect x="815" y="209" width="156" height="24" rx="12" fill="#E9F3EC" stroke="#2E7D4F" />
        <text x="893" y="225" textAnchor="middle" className="svg-small svg-bold" fill="#2E7D4F">Quarterly dial reviews</text>

        <rect x="30" y="252" width="976" height="96" rx="8" fill="#F7E9E9" stroke="#E4B9BD" />
        <rect x="170" y="254" width="200" height="92" fill="url(#swim-hatch)" />
        <text x="44" y="284" className="svg-title" fill="#C43B44">LANE 2</text>
        <text x="44" y="302" className="svg-small svg-bold">Improve &amp; Evolve</text>
        <text x="44" y="318" className="svg-small">held ready</text>
        {lane2Cells.map((cell, col) => (
          <g key={`l2-${col}`}>
            {cell.map((line, row) => (
              <text key={line || row} x={colStarts[col] + 12} y={288 + row * 18} className="svg-small">{line}</text>
            ))}
          </g>
        ))}
        {maxLevels.map((level, col) => (
          <g key={level.label}>
            <rect x={colStarts[col] + colWidths[col] - 68} y="259" width="58" height="17" rx="8.5" fill="#FFFFFF" stroke={level.fill} />
            <text x={colStarts[col] + colWidths[col] - 39} y="271" textAnchor="middle" className="svg-small svg-bold" fill={level.fill}>{level.label}</text>
          </g>
        ))}

        <rect x="30" y="356" width="976" height="30" rx="8" fill="#F1EDF6" stroke="#C8B9DA" />
        <text x="518" y="376" textAnchor="middle" className="svg-small svg-bold" fill="#684E86">
          Governance base — service layer active day one · agentic layer activates at the first dial-up
        </text>

        <text x="518" y="416" textAnchor="middle" className="svg-small">
          Levels on every scope item: L0 run as-is · L1 AI-assisted (unlocked by Gate 1) · L2 agentic (unlocked by Gate 2) — all 30 dials in Pandora's hand
        </text>
        <text x="518" y="438" textAnchor="middle" className="svg-small svg-bold" fill="#35597B">
          Three gate kinds. Two lanes. Three levels. One destination.
        </text>
      </svg>
    </Reveal>
  );
}

const foundationHues: Record<string, string> = {
  infra: "--tech",
  people: "--people",
  ops: "--ops",
  governance: "--gov"
};

export function FoundationsSection() {
  const [active, setActive] = useState(foundationPillars[0].id);
  const topDown = [...foundationPillars].reverse();
  const activeIndex = foundationPillars.findIndex((pillar) => pillar.id === active);

  const onKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const delta = event.key === "ArrowUp" ? 1 : -1; // up = toward the top floor
    const next = Math.min(foundationPillars.length - 1, Math.max(0, activeIndex + delta));
    setActive(foundationPillars[next].id);
  };

  return (
    <Section id="foundations" num="05" title="Readiness foundations — Gate 0">
      <p className="sec-sub">{foundationsIntro}</p>

      <div className="fstack-interactive">
        <div className="fstack">
          <div className="fs-unlocked">
            <span>Lane 2 · agentic becomes possible — one dial at a time</span>
          </div>
          <div className="fs-uparrow" aria-hidden="true" />
          <div className="fs-capstone">
            <ShieldCheck size={15} aria-hidden="true" />
            Gate 0 · all four layers proven
          </div>
          <div className="fs-floors" role="tablist" aria-label="Foundation layers" aria-orientation="vertical">
            {topDown.map((pillar, topIndex) => {
              const layerNo = topIndex + 1;
              const on = active === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`fs-panel-${pillar.id}`}
                  tabIndex={on ? 0 : -1}
                  className={`fs-floor ${on ? "active" : ""}`}
                  style={{ "--tier": `var(${foundationHues[pillar.id]})` } as CSSProperties}
                  onClick={() => setActive(pillar.id)}
                  onKeyDown={onKey}
                >
                  <span className="fs-no">{layerNo}</span>
                  <div className="fs-floor-body">
                    <strong>{pillar.title}</strong>
                    <span>{pillar.why}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="fs-ground">Your estate, day one — Lane 1 builds all four layers as it runs</div>
        </div>

        <div className="fs-detail-wrap">
          {foundationPillars.map((pillar, index) => (
            <div
              key={pillar.id}
              id={`fs-panel-${pillar.id}`}
              role="tabpanel"
              className="fs-detail"
              hidden={active !== pillar.id}
              style={{ "--tier": `var(${foundationHues[pillar.id]})` } as CSSProperties}
            >
              <div className="fs-detail-head">
                <span className="fs-no fs-no-lg">{foundationPillars.length - index}</span>
                <div className="fs-detail-title">
                  <span className="cap-loop">Foundation layer {foundationPillars.length - index} of 4</span>
                  <h4 className="cap-title">{pillar.title}</h4>
                </div>
              </div>
              <p className="fs-why">{pillar.why}</p>
              <div className="cap-cols">
                <div className="cap-col">
                  <h5 className="cap-col-title already-title">Assess — months 1–3, joint</h5>
                  <p className="cap-text">{pillar.assess}</p>
                </div>
                <div className="cap-col">
                  <h5 className="cap-col-title netnew-title">Build — months 3–9, inside Lane 1</h5>
                  <p className="cap-text">{pillar.build}</p>
                </div>
              </div>
              <p className="cap-bottom"><strong>Gate-0 evidence:</strong> {pillar.evidence}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="diagram-note fs-note">
        Click a layer to see how we assess, build and prove it. Each rests on the one beneath — skip a floor and everything
        above it is built on air, which is exactly why starting with agentic would have been premature.
      </p>

      <Reveal className="gatecard gate-zero">
        <div className="ghead">
          <h3>
            <span className="chip gate"><ShieldCheck size={13} aria-hidden="true" /> {gateZero.title}</span>
          </h3>
        </div>
        <p className="gate-zero-body">{gateZero.body}</p>
      </Reveal>
      <PullQuote quote={foundationsPunchline} source="Why running as-is first is the agentic journey's first leg" />
    </Section>
  );
}

export function LandscapeSection() {
  return (
    <Section id="landscape" num="06" title="Know the landscape before you adopt any of it">
      <p className="sec-sub">
        The eleven agentic application types, mapped by who owns the loop and where the agent acts — with Pandora's
        adoption status today. This is the shared map the optional W1 workshop marks up together, and the honest answer to
        "where are we, really": four types live, three in pilot, four deliberately not yet.
      </p>
      <LandscapeMap />
    </Section>
  );
}
