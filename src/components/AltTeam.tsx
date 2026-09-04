import { ArrowLeftRight, BadgeCheck, Check } from "lucide-react";
import type { CSSProperties } from "react";
import {
  capacityDrivers,
  convergeClincher,
  convergeIntro,
  convergeMechanisms,
  capacityNote,
  controlBands,
  controlNote,
  ktLoop,
  ktNote,
  skillBridge,
  skillRows,
  skillTierHeaders,
  skillsNote,
  teamAsks,
  teamClose,
  teamIntro,
  teamLeaderNote,
  teamLocations,
  teamTracks
} from "../data/alternative";
import { PullQuote, Reveal, Section } from "./primitives";

// ── 10 · One team, three locations ───────────────────────────────────────
export function TeamShapeSection() {
  return (
    <Section id="team-shape" num="10" title="One team, three locations — not a hand-off">
      <p className="sec-sub">{teamIntro}</p>
      <div className="loc-connector" aria-hidden="true">
        <span>One team · one backlog · one leader · one knowledge base</span>
      </div>
      <div className="loc-grid">
        {teamLocations.map((loc) => (
          <Reveal className="loc-card" key={loc.id}>
            <div className="loc-head">
              <strong>{loc.city}</strong>
              <span className="loc-kind">{loc.kind}</span>
            </div>
            <p className="loc-role">{loc.role}</p>
            <ul className="loc-roles">
              {loc.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            <div className="loc-lane-block">
              <span className="loc-lane-cap">Where its effort goes today</span>
              <div className="loc-lane-key">
                <span className="lll lane1"><i />Lane 1 · Run &amp; Deliver<b>{loc.lane1}%</b></span>
                <span className="lll lane2"><i />Lane 2 · Improve &amp; Evolve<b>{100 - loc.lane1}%</b></span>
              </div>
              <div
                className="loc-lane"
                role="img"
                aria-label={`Effort at ${loc.city} today: ${loc.lane1}% Lane 1 run and deliver, ${100 - loc.lane1}% Lane 2 improve and evolve`}
              >
                <span className="loc-lane1" style={{ width: `${loc.lane1}%` } as CSSProperties} />
                <span className="loc-lane2" style={{ width: `${100 - loc.lane1}%` } as CSSProperties} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="diagram-note loc-note">
        Read the bars the same way in every card: each location is <strong>mostly Lane 1</strong> (run &amp; deliver) today.
        The coral <strong>Lane 2</strong> slice is not a second team — it is the same people doing enablement, and it grows
        only as you turn dials.
      </p>
    </Section>
  );
}

// ── 11 · One leader, Pandora in control ──────────────────────────────────
export function TeamLeaderSection() {
  return (
    <Section id="team-leader" num="11" title="One leader across all tracks — and Pandora on the wheel">
      <p className="sec-sub">{teamLeaderNote}</p>
      <OrgDiagram />
      <h3 className="section-inline-title">Who decides, who does — control by design</h3>
      <div className="control-strip">
        {controlBands.map((band) => (
          <div className={`control-seg ${band.owner}`} key={band.area}>
            <span>{band.area}</span>
          </div>
        ))}
      </div>
      <div className="control-legend">
        <span><i className="cl-dot pandora" /> Pandora-owned (accountable)</span>
        <span><i className="cl-dot joint" /> Joint</span>
        <span><i className="cl-dot sapient" /> Sapient-run (responsible)</span>
      </div>
      <div className="already alt-note">{controlNote}</div>
    </Section>
  );
}

function OrgDiagram() {
  const trackX = [180, 520, 860];
  return (
    <Reveal>
      <svg className="process-svg" viewBox="0 0 1040 400" role="img" aria-label="Delivery org: Pandora leadership pairs 1:1 with one accountable Sapient Delivery Lead, who runs three tracks (each spanning development and operations); Pandora also keeps a direct, transparent dotted line to every track lead, which is encouraged">
        <defs>
          <marker id="arrow-org" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <rect x="10" y="10" width="1020" height="380" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />

        <rect x="150" y="28" width="740" height="52" rx="8" fill="#EDF1F6" stroke="#B6C5D5" />
        <text x="520" y="50" textAnchor="middle" className="svg-title" fill="#35597B">Pandora leadership — Delivery Lead + Engineering Manager</text>
        <text x="520" y="68" textAnchor="middle" className="svg-small">retains architecture · standards · roadmap · Lead &amp; Senior Engineers</text>

        {/* Primary accountability line: Pandora pairs 1:1 with the Sapient Delivery Lead */}
        <line x1="520" y1="80" x2="520" y2="98" stroke="#5C6066" strokeWidth="1.8" markerEnd="url(#arrow-org)" />
        <text x="536" y="94" className="svg-small svg-bold" fill="#5C6066">pairs 1:1</text>

        <rect x="300" y="98" width="440" height="50" rx="8" fill="#F7E9E9" stroke="#E4B9BD" />
        <text x="520" y="119" textAnchor="middle" className="svg-title" fill="#C43B44">One Sapient Delivery Lead</text>
        <text x="520" y="137" textAnchor="middle" className="svg-small">accountable across all tracks · both lanes · SLAs, throughput, capability transfer</text>

        {/* Transparent direct-access rail: Pandora → every track lead (dotted, encouraged) */}
        <g stroke="#35597B" strokeWidth="1.6" strokeDasharray="2 4" fill="none">
          <line x1="180" y1="80" x2="180" y2="178" />
          <line x1="860" y1="80" x2="860" y2="178" />
          <line x1="180" y1="178" x2="860" y2="178" />
          <line x1="180" y1="178" x2="180" y2="204" markerEnd="url(#arrow-org)" />
          <line x1="520" y1="178" x2="520" y2="204" markerEnd="url(#arrow-org)" />
          <line x1="860" y1="178" x2="860" y2="204" markerEnd="url(#arrow-org)" />
        </g>
        <rect x="303" y="150" width="434" height="26" rx="13" fill="#EDF1F6" stroke="#35597B" />
        <text x="520" y="167" textAnchor="middle" className="svg-small svg-bold" fill="#35597B">Pandora's direct line to every lead — transparent &amp; encouraged</text>

        {teamTracks.map((track, i) => (
          <g key={track.id}>
            <line x1="520" y1="148" x2={trackX[i]} y2="206" stroke="#C9CBD0" strokeWidth="1.6" markerEnd="url(#arrow-org)" />
            <rect x={trackX[i] - 150} y="206" width="300" height="118" rx="8" fill="#FFFFFF" stroke="#E5E2DB" />
            <text x={trackX[i]} y="232" textAnchor="middle" className="svg-title">{track.name}</text>
            <rect x={trackX[i] - 138} y="246" width="276" height="32" rx="6" fill="#EFF3EA" stroke="#BBD0AF" />
            <text x={trackX[i] - 126} y="259" className="svg-small svg-bold" fill="#55763F">DEV</text>
            <text x={trackX[i] - 126} y="272" className="svg-small">{track.dev}</text>
            <rect x={trackX[i] - 138} y="284" width="276" height="32" rx="6" fill="#F8F1E6" stroke="#DDBB8C" />
            <text x={trackX[i] - 126} y="297" className="svg-small svg-bold" fill="#A3671F">OPS</text>
            <text x={trackX[i] - 126} y="310" className="svg-small">{track.ops}</text>
          </g>
        ))}

        {/* Legend: distinguish the accountability chain from the transparent access line */}
        <g>
          <line x1="150" y1="352" x2="192" y2="352" stroke="#5C6066" strokeWidth="1.8" />
          <text x="200" y="356" className="svg-small" fill="#5C6066">Accountability — one Sapient Lead delivers</text>
          <line x1="560" y1="352" x2="602" y2="352" stroke="#35597B" strokeWidth="1.8" strokeDasharray="2 4" />
          <text x="610" y="356" className="svg-small" fill="#35597B">Direct access — Pandora sees every lead (encouraged)</text>
        </g>
        <text x="520" y="378" textAnchor="middle" className="svg-small svg-bold" fill="#35597B">
          Distributed across Gurgaon · Bucharest · Copenhagen — one team, one backlog
        </text>
      </svg>
    </Reveal>
  );
}

// ── 12 · One team, sequenced — dev/ops convergence ───────────────────────
export function ConvergenceSection() {
  return (
    <Section id="team-converge" num="12" title="Two waves in transition, one team at the destination">
      <p className="sec-sub">{convergeIntro}</p>
      <ConvergenceDiagram />
      <div className="conv-mechs">
        {convergeMechanisms.map((mech, index) => (
          <Reveal className="conv-mech" key={mech.title}>
            <span className="conv-mech-no">{index + 1}</span>
            <div>
              <strong>{mech.title}</strong>
              <p>{mech.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <PullQuote quote={convergeClincher} source="Why the agentic dial resolves the dev/ops question" />
    </Section>
  );
}

function ConvergenceDiagram() {
  const horizons4 = [
    { x: 200, date: "Jan 2027" },
    { x: 420, date: "Apr 2027" },
    { x: 640, date: "Oct 2027" },
    { x: 860, date: "Oct 2028" }
  ];
  return (
    <Reveal>
      <svg className="process-svg" viewBox="0 0 1040 280" role="img" aria-label="Development and operations start as two streams and converge into one build-and-run team by Oct 2028, enabled by agentic ops removing operational cognitive load">
        <rect x="10" y="10" width="1020" height="260" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
        <text x="34" y="36" className="svg-label">DEVELOPMENT AND OPERATIONS CONVERGE — ONE BUILD-AND-RUN TEAM</text>

        {horizons4.map((h) => (
          <line key={h.date} x1={h.x} y1="54" x2={h.x} y2="236" stroke="#E5E2DB" strokeDasharray="3 4" />
        ))}

        <rect x="34" y="64" width="150" height="38" rx="7" fill="#EFF3EA" stroke="#BBD0AF" />
        <text x="109" y="87" textAnchor="middle" className="svg-title" fill="#55763F">Development</text>
        <rect x="34" y="196" width="150" height="38" rx="7" fill="#F8F1E6" stroke="#DDBB8C" />
        <text x="109" y="219" textAnchor="middle" className="svg-title" fill="#A3671F">Operations · 24×7</text>

        <path d="M184 83 C 420 92 640 120 852 138" fill="none" stroke="#55763F" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
        <path d="M184 215 C 420 206 640 158 852 138" fill="none" stroke="#A3671F" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
        <line x1="852" y1="138" x2="1006" y2="138" stroke="#35597B" strokeWidth="7" strokeLinecap="round" />

        <rect x="300" y="116" width="392" height="46" rx="8" fill="#E9F3EC" stroke="#2E7D4F" />
        <text x="496" y="134" textAnchor="middle" className="svg-small svg-bold" fill="#2E7D4F">Agentic ops (Ops L2/L3) removes the operational cognitive load —</text>
        <text x="496" y="150" textAnchor="middle" className="svg-small" fill="#3a5a44">so build-minded engineers can own what they run.</text>

        <rect x="836" y="104" width="180" height="68" rx="8" fill="#EDF1F6" stroke="#B6C5D5" />
        <text x="926" y="126" textAnchor="middle" className="svg-title" fill="#35597B">One team</text>
        <text x="926" y="144" textAnchor="middle" className="svg-small">build it · run it</text>
        <text x="926" y="158" textAnchor="middle" className="svg-small">agent-supervised</text>

        {horizons4.map((h) => (
          <text key={h.date} x={h.x} y="256" textAnchor="middle" className="svg-small svg-bold">{h.date}</text>
        ))}
      </svg>
    </Reveal>
  );
}

// ── 13 · Skills, training and knowledge transfer ─────────────────────────
export function TeamSkillsSection() {
  return (
    <Section id="team-skills" num="13" title="Skills coverage, training and knowledge transfer">
      <p className="sec-sub">{skillsNote}</p>
      <div className="skills-ladder">
        <div className="sl-shared-band">
          <span />
          <strong>Operations extends to L3, where it becomes the same senior engineering skill as development</strong>
        </div>
        <div className="sl-head">
          <span>Engineering skill</span>
          {skillTierHeaders.map((tier) => (
            <span key={tier.label}>
              <strong>{tier.label}</strong>
              <small>{tier.detail}</small>
            </span>
          ))}
        </div>
        {skillRows.map((row) => (
          <div className="sl-row" key={row.skill}>
            <span className="sl-skill">{row.skill}</span>
            <span data-tier="Ops L1 · Monitor & route">{row.t1}</span>
            <span data-tier="Ops L2 · Diagnose & restore">{row.t2}</span>
            <span className="sl-shared" data-tier="Ops L3 · Engineer fix">{row.t3}</span>
            <span className="sl-shared" data-tier="Development · Build & change">{row.dev}</span>
          </div>
        ))}
      </div>
      <Reveal className="l3-bridge">
        <div className="l3-bridge-copy">
          <strong>{skillBridge.title}</strong>
          <p>{skillBridge.detail}</p>
        </div>
        <div className="l3-flow" aria-label={skillBridge.flow.join(" to ")}>
          {skillBridge.flow.map((step, index) => (
            <div className={`l3-node ${index === 3 || index === 4 ? "shared" : ""}`} key={step}>
              <span>{step}</span>
              {index < skillBridge.flow.length - 1 && (
                <i className={index === 3 ? "swap" : ""} aria-hidden="true">
                  {index === 3 ? <ArrowLeftRight size={15} /> : "→"}
                </i>
              )}
            </div>
          ))}
        </div>
      </Reveal>
      <h3 className="section-inline-title">Knowledge transfer — a designed loop, so it sticks with Pandora</h3>
      <div className="kt-loop">
        {ktLoop.map((step, index) => (
          <div className={`kt-step ${step.step === "Own" ? "own" : ""}`} key={step.step}>
            <div className="kt-step-head">
              <span className="kt-no">{index + 1}</span>
              <strong>{step.step}</strong>
            </div>
            <p>{step.detail}</p>
            {index < ktLoop.length - 1 && <span className="kt-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <div className="already alt-note">{ktNote}</div>
    </Section>
  );
}

// ── 13 · Capacity that compounds ─────────────────────────────────────────
export function TeamCapacitySection() {
  return (
    <Section id="team-capacity" num="14" title="Capacity that compounds — more from a leaner, stabler team">
      <p className="sec-sub">
        The headline: effective capacity rises each horizon without a matching rise in headcount, and an increasing share
        of it is owned by Pandora. Here is what drives it.
      </p>
      <CapacityChart />
      <div className="cap-drivers">
        {capacityDrivers.map((driver, index) => (
          <Reveal className="cap-driver" key={driver.at}>
            <span className="cap-driver-no">{index + 1}</span>
            <div>
              <div className="cap-driver-head">
                <strong>{driver.label}</strong>
                <span>{driver.at}</span>
              </div>
              <p>{driver.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <PullQuote quote={capacityNote} source="The capacity dividend of the gentle path" />
      <h3 className="section-inline-title">What we need from Pandora (people)</h3>
      <div className="ask-list team-asks">
        {teamAsks.map((ask) => (
          <Reveal className="ask-row" key={ask}>
            <BadgeCheck size={18} />
            <span>{ask}</span>
          </Reveal>
        ))}
      </div>
      <p className="team-close">
        <Check size={16} aria-hidden="true" />
        {teamClose}
      </p>
    </Section>
  );
}

function CapacityChart() {
  const horizonX = [130, 400, 670, 940];
  const dates = ["Jan 2027", "Apr 2027", "Oct 2027", "Oct 2028"];
  return (
    <Reveal className="curves-panel">
      <div className="figure-label">
        <strong>Effective capacity over the journey</strong>
        <span>illustrative — capacity rises while the team stays lean</span>
      </div>
      <svg viewBox="0 0 1040 320" role="img" aria-label="Capacity chart: effective capacity rises across the four horizons while team size stays flat, and the Pandora-owned share grows">
        <rect x="20" y="16" width="1000" height="250" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />

        {/* Pandora-owned share — rising green area at the base */}
        <path d="M110 250 L110 236 C300 224 500 200 690 176 C820 160 900 150 960 146 L960 250 Z" fill="#2E7D4F" opacity="0.12" />
        <text x="150" y="242" className="svg-small svg-bold" fill="#2E7D4F">Pandora-owned share ↑</text>

        {/* Effective capacity — steel, rising */}
        <path d="M130 214 C300 188 470 150 660 112 C790 86 880 70 940 60" fill="none" stroke="#35597B" strokeWidth="3.5" strokeLinecap="round" />
        <text x="720" y="86" className="svg-small svg-bold" fill="#35597B">Effective capacity</text>

        {/* Team size — muted, flat/declining */}
        <path d="M130 196 C360 194 620 196 940 204" fill="none" stroke="#8A8F96" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 5" />
        <text x="150" y="188" className="svg-small svg-bold" fill="#8A8F96">Team size — flat, then leaner</text>

        {/* the productivity dividend gap */}
        <line x1="800" y1="74" x2="800" y2="200" stroke="#5C6066" strokeWidth="1" strokeDasharray="3 3" />
        <text x="808" y="120" className="svg-small svg-bold" fill="#5C6066">productivity</text>
        <text x="808" y="132" className="svg-small svg-bold" fill="#5C6066">dividend</text>

        {horizonX.map((x, i) => (
          <g key={dates[i]}>
            <line x1={x} y1="30" x2={x} y2="250" stroke="#E5E2DB" strokeDasharray="3 4" />
            <circle cx={x} cy={[214, 176, 130, 60][i]} r="4.5" fill="#35597B" stroke="#fff" strokeWidth="1.5" />
            <text x={x} y="284" textAnchor="middle" className="svg-small svg-bold">{dates[i]}</text>
            <text x={x} y="300" textAnchor="middle" className="svg-small">{["Ramp", "AI-augmented", "Dialled AI", "Owned"][i]}</text>
          </g>
        ))}
      </svg>
    </Reveal>
  );
}
