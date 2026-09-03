import { motion } from "motion/react";
import { horizons, sapientCards } from "../data/journey";
import { PullQuote, Reveal, Section } from "./primitives";

export function SapientSection() {
  return (
    <Section id="sapient" num="08" title="How Sapient leads — and steps back on schedule">
      <p className="sec-sub">
        At each horizon: the posture we take, the work we do, and the assets we hand over. The coral fades and the steel
        takes over by design.
      </p>
      <OwnershipTransferChart />
      <div className="shift">
        {sapientCards.map((card) => (
          <Reveal className="shiftcard" key={card.when}>
            <motion.div className="shiftbar" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} style={{ transformOrigin: "left" }}>
              <span style={{ width: `${card.psShare}%` }} />
            </motion.div>
            <div className="head">
              <span className="when">{card.when}</span>
              <div className="posture">{card.posture}</div>
            </div>
            <div className="body">
              <h4>What we do</h4>
              <ul>{card.do.map((item) => <li key={item}>{item}</li>)}</ul>
              <h4>What we hand over</h4>
              <ul>{card.handover.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="prose-block">
        <p>
          <strong>What PS uniquely brings:</strong> gated-workshop facilitation, migration patterns and quality gates proven in
          delivery, AgentOps IP, thought-leadership SMEs on demand, and a commercial model tied to ownership transfer.
        </p>
        <p>
          <strong>The joint operating cadence:</strong> Weekly Delivery Forum, Monthly Governance Meeting and Quarterly maturity
          review from the first quarter onward.
        </p>
      </div>
      <PullQuote quote="Sapient leads by making itself progressively unnecessary — and we put that in the metrics and the commercials." source="The one-line answer to Q3" />
    </Section>
  );
}

function OwnershipTransferChart() {
  return (
    <Reveal className="ownership-chart">
      <div className="figure-label">
        <strong>Ownership transfer</strong>
        <span>illustrative shift in day-to-day leadership</span>
      </div>
      <svg viewBox="0 0 900 240" role="img" aria-label="Ownership transfer area chart from PS-led to Pandora-owned">
        <rect x="20" y="20" width="860" height="184" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
        <path d="M70 62 C240 72 320 105 415 124 C540 150 645 170 830 178 L830 204 L70 204 Z" fill="#C43B44" opacity="0.18" />
        <path d="M70 182 C230 170 338 138 438 112 C555 82 665 62 830 48 L830 204 L70 204 Z" fill="#35597B" opacity="0.18" />
        <motion.path
          d="M70 62 C240 72 320 105 415 124 C540 150 645 170 830 178"
          fill="none"
          stroke="#C43B44"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
        />
        <motion.path
          d="M70 182 C230 170 338 138 438 112 C555 82 665 62 830 48"
          fill="none"
          stroke="#35597B"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
        />
        {horizons.map((horizon, index) => {
          const x = 70 + index * 253;
          return (
            <g key={horizon.id}>
              <line x1={x} y1="38" x2={x} y2="204" stroke="#E5E2DB" />
              <text x={x} y="224" textAnchor="middle" className="svg-small svg-bold">
                {horizon.short}
              </text>
            </g>
          );
        })}
        <text x="75" y="50" className="svg-small svg-bold" fill="#C43B44">
          PS leads
        </text>
        <text x="790" y="44" className="svg-small svg-bold" fill="#35597B">
          Pandora owns
        </text>
      </svg>
    </Reveal>
  );
}
