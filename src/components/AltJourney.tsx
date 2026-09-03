import { BadgeCheck } from "lucide-react";
import { motion } from "motion/react";
import {
  askCards,
  benefitCurves,
  cautionHonesty,
  cautionIntro,
  cautionRows,
  closeLine,
  footerLines,
  horizonBoard,
  horizons,
  pandoraAsks,
  proofCards,
  startPlan
} from "../data/alternative";
import { DataTable, PullQuote, Reveal, Section } from "./primitives";

export function HorizonsSection() {
  return (
    <Section id="horizons" num="13" title="The journey, re-anchored to the 30 October award">
      <p className="sec-sub">
        Four checkpoints — January 2027, April 2027, October 2027, October 2028 — each shown in both lanes. Read Lane 2 at
        three months carefully: it is empty on purpose.
      </p>
      <div className="hboard">
        {horizonBoard.map((row) => {
          const horizon = horizons.find((candidate) => candidate.id === row.id)!;
          return (
            <Reveal className="hblock" key={row.id}>
              <div className="hblock-head">
                <strong>{horizon.months} · {horizon.date}</strong>
                <span>{horizon.stage}</span>
              </div>
              <div className="hblock-lanes">
                <div className="hlane hlane1">
                  <h5 className="cap-col-title already-title">Lane 1 · Run &amp; Deliver</h5>
                  <ul className="milestones alt-miles">
                    {row.lane1.map((item) => (
                      <li key={item}><span className="m m1" />{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={`hlane hlane2 ${row.lane2Empty ? "empty" : ""}`}>
                  <h5 className="cap-col-title dial-l2-title">Lane 2 · Improve &amp; Evolve</h5>
                  <ul className="milestones alt-miles">
                    {row.lane2.map((item) => (
                      <li key={item}><span className="m m2" />{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export function CautionSection() {
  return (
    <Section id="caution" num="14" title="The cost of caution — shown, not hidden">
      <p className="sec-sub">{cautionIntro}</p>
      <DataTable
        headers={["RFP target", "Level 0 · as-is", "Level 1 · assisted", "Level 2 · agentic"]}
        rows={cautionRows.map((row) => [
          { value: row.target, key: `${row.target}-t` },
          { value: row.l0, key: `${row.target}-0` },
          { value: row.l1, key: `${row.target}-1`, active: row.l1.startsWith("✅") },
          { value: row.l2, key: `${row.target}-2` }
        ])}
      />
      <BenefitCurves />
      <PullQuote quote={cautionHonesty} source="Named openly — the credibility rule of this proposal" />
    </Section>
  );
}

function BenefitCurves() {
  return (
    <Reveal className="curves-panel">
      <div className="figure-label">
        <strong>{benefitCurves.label}</strong>
        <span>{benefitCurves.note}</span>
      </div>
      <svg viewBox="0 0 900 250" role="img" aria-label="Benefit curves: the July approach rises earlier; the alternative starts slower and converges to the same destination">
        <rect x="20" y="20" width="860" height="190" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
        <path d="M70 195 C180 130 300 85 480 62 C640 44 760 38 830 36 L830 210 L70 210 Z" fill="#C43B44" opacity="0.10" />
        <path d="M70 202 C240 196 380 168 520 120 C660 78 770 48 830 38 L830 210 L70 210 Z" fill="#35597B" opacity="0.14" />
        <motion.path
          d="M70 195 C180 130 300 85 480 62 C640 44 760 38 830 36"
          fill="none" stroke="#C43B44" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="8 7"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        />
        <motion.path
          d="M70 202 C240 196 380 168 520 120 C660 78 770 48 830 38"
          fill="none" stroke="#35597B" strokeWidth="4" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        />
        {horizons.map((horizon, index) => {
          const x = 70 + index * 253;
          return (
            <g key={horizon.id}>
              <line x1={x} y1="34" x2={x} y2="210" stroke="#E5E2DB" />
              <text x={x} y="232" textAnchor="middle" className="svg-small svg-bold">{horizon.date}</text>
            </g>
          );
        })}
        <text x="150" y="118" className="svg-small svg-bold" fill="#C43B44">July approach (accelerated, still available)</text>
        <text x="330" y="188" className="svg-small svg-bold" fill="#35597B">This alternative — foundations first</text>
        <text x="700" y="30" className="svg-small svg-bold" fill="#16181D">Same destination</text>
      </svg>
    </Reveal>
  );
}

export function ProofSection() {
  return (
    <Section id="proof" num="15" title="Why this is low-risk">
      <p className="sec-sub">
        The gentle path is not a bet. The takeover model is proven at Pandora, the fabric already exists, and the coverage
        never depends on anything novel.
      </p>
      <div className="proofgrid">
        {proofCards.map((card) => (
          <Reveal className="proofcard" key={card.stat}>
            <span className="chip live">{card.chip}</span>
            <div className="num">{card.stat}</div>
            <p>{card.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function PandoraSection() {
  return (
    <Section id="pandora" num="16" title="What we need from Pandora — deliberately lighter">
      <p className="sec-sub">
        To start this approach, you commit to running a service well — nothing else. Everything agentic remains a decision
        you have not yet made.
      </p>
      <div className="ask-list">
        {pandoraAsks.map((ask) => (
          <Reveal className="ask-row" key={ask}>
            <BadgeCheck size={18} />
            <span>{ask}</span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function StartSection() {
  return (
    <Section id="start" num="17" title="How we start">
      <p className="sec-sub">
        Concrete, dated, reversible. The first possible dial moment is also the first possible "not yet" — by design.
      </p>
      <div className="agenda">
        <div className="ahead">
          <h3>From award to the first dial review</h3>
          <span>Anchored to contract award, 30 October 2026</span>
        </div>
        {startPlan.map((row) => (
          <div className="arow trow" key={row.when}>
            <span className="t">{row.when}</span>
            <span />
            <span>{row.what}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function AskSectionAlt() {
  return (
    <section id="ask-final" className="ask-section">
      <div className="wrap">
        <span className="eyebrow">The ask</span>
        <h2>One decision starts the gentler path</h2>
        <div className="askgrid">
          {askCards.map(([title, body]) => (
            <Reveal className="askcard" key={title}>
              <div>{title}</div>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>
        <p className="close-line">{closeLine}</p>
      </div>
    </section>
  );
}

export function FooterAlt() {
  return (
    <footer>
      <div className="wrap">
        {footerLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </footer>
  );
}
