import { CircleCheck, PlusCircle } from "lucide-react";
import { capabilityReadiness, honestGaps, proofCards, type CapabilityReadiness } from "../data/journey";
import { LandscapeMap } from "./LandscapeMap";
import { PullQuote, Reveal, Section } from "./primitives";

export function BaselineSection() {
  return (
    <Section id="baseline" num="02" title="Where Pandora is today — the honest baseline">
      <p className="sec-sub">
        The entry ticket is already paid. The fabric's building blocks are running inside Pandora's estate now, which is
        why the journey starts at Assist, not zero.
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

      <h3 className="section-inline-title">The agentic application landscape today — eleven types, mapped</h3>
      <p className="sec-sub" style={{ marginBottom: 4 }}>
        Who owns the loop (rows) against where the agent acts (columns), coloured by guardrail and infrastructure owner,
        with Pandora's adoption status on every type. This is the map the W1 workshop marks up together.
      </p>
      <LandscapeMap />

      <h3 className="section-inline-title">Capability readiness — what each loop needs, and what Pandora already has</h3>
      <p className="sec-sub" style={{ marginBottom: 4 }}>
        The clearest way to judge readiness is loop by loop: what the capability requires, what is already in the estate,
        and the little that is genuinely net-new.
      </p>
      <div className="readiness-stack">
        {capabilityReadiness.map((capability) => (
          <CapabilityCard capability={capability} key={capability.id} />
        ))}
      </div>

      <Reveal className="gapslist">
        <span className="chip gap">Honest gaps — this is what the roadmap closes</span>
        <ul>
          {honestGaps.map((gap) => (
            <li key={gap}>{gap}</li>
          ))}
        </ul>
      </Reveal>
      <PullQuote
        quote="You are already in Phase 1. The question is not whether Pandora can host the fabric — it is how deliberately we walk from Assist to governed autonomy."
        source="The framing we will defend in the room"
      />
    </Section>
  );
}

function CapabilityCard({ capability }: { capability: CapabilityReadiness }) {
  return (
    <Reveal className="cap-card">
      <div className="cap-head">
        <div>
          <span className="cap-loop">{capability.loop}</span>
          <h4 className="cap-title">{capability.title}</h4>
        </div>
        <span className="chip live">{capability.proof}</span>
      </div>
      <p className="cap-reframe">{capability.reframe}</p>
      <div className="cap-cols">
        <div className="cap-col">
          <h5 className="cap-col-title already-title">Already in Pandora's estate</h5>
          <ul>
            {capability.already.map((item) => (
              <li key={item.title}>
                <CircleCheck size={15} aria-hidden="true" />
                <span>
                  <strong>{item.title}</strong> — {item.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="cap-col">
          <h5 className="cap-col-title netnew-title">Net-new to stand up</h5>
          {capability.netNew.length === 0 ? (
            <p className="cap-none">
              <strong>None.</strong> {capability.netNewNote}
            </p>
          ) : (
            <ul>
              {capability.netNew.map((item) => (
                <li key={item.title}>
                  <PlusCircle size={15} aria-hidden="true" />
                  <span>
                    <strong>{item.title}</strong> — {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <p className="cap-bottom">{capability.bottomLine}</p>
    </Reveal>
  );
}
