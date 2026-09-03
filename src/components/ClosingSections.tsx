import { BadgeCheck } from "lucide-react";
import { askCards, footer, pandoraAsks, rfpRows, risks, w2Agenda, workshops } from "../data/journey";
import { DataTable, Reveal, Section } from "./primitives";

export function RfpSection() {
  return (
    <Section id="rfp" num="10" title="Where the journey pays: your RFP goals, on this roadmap">
      <p className="sec-sub">
        The agentic journey is not a parallel initiative; it is the mechanism that hits the tender's stated numbers.
      </p>
      <DataTable headers={["RFP goal — your words", "Where the journey delivers it"]} rows={rfpRows.map((row) => row.map((value, index) => ({ value, key: `${row[0]}-${index}` })))} />
    </Section>
  );
}

export function RisksSection() {
  return (
    <Section id="risks" num="11" title="The objections we expect — answered before you raise them">
      <p className="sec-sub">
        A plan that cannot name its own risks is a pitch. Each concern maps to a mitigation already built into a lane or gate.
      </p>
      <div className="risks">
        {risks.map(([objection, answer, owner]) => (
          <Reveal className="risk" key={objection}>
            <span className="obj">{objection}</span>
            <span>{answer}</span>
            <span className="own">{owner}</span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function PandoraSection() {
  return (
    <Section id="pandora" num="12" title="What we need from Pandora">
      <p className="sec-sub">
        This is a two-way commitment. A journey Pandora merely observes is a journey that stalls at the first gate.
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

export function WorkshopsSection() {
  return (
    <Section id="workshops" num="13" title="How we start — four workshops, six weeks">
      <p className="sec-sub">
        Low-commitment entry, high momentum. Every workshop produces a Pandora-owned artifact: the map, the gate charter,
        the backlog and the playbook.
      </p>
      <div className="wsgrid">
        {workshops.map((workshop) => (
          <Reveal className="ws" key={workshop.title}>
            <span className="wk">{workshop.week}</span>
            <h3>{workshop.title}</h3>
            <ul>{workshop.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="leaves">
              <strong>Pandora leaves with</strong>
              {workshop.leavesWith}
            </div>
          </Reveal>
        ))}
      </div>
      <div className="agenda">
        <div className="ahead">
          <h3>Inside the room: W2 — Define the gates</h3>
          <span>Pandora defines the evidence that unlocks each phase. We facilitate; Pandora decides.</span>
        </div>
        {w2Agenda.map(([time, duration, activity]) => (
          <div className="arow" key={time}>
            <span className="t">{time}</span>
            <span className="dur">{duration}</span>
            <span>{activity}</span>
          </div>
        ))}
      </div>
      <p className="running-note">
        <strong>Running throughout:</strong> weekly enablement clinics, champion-network onboarding, pairing on live delivery and
        quarterly maturity reviews from W4 onward.
      </p>
    </Section>
  );
}

export function AskSection() {
  return (
    <section id="ask" className="ask-section">
      <div className="wrap">
        <span className="eyebrow">14 · The ask</span>
        <h2>Two decisions start the journey</h2>
        <div className="askgrid">
          {askCards.map(([title, body]) => (
            <Reveal className="askcard" key={title}>
              <div>{title}</div>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>
        <p className="close-line">
          Horizons and gates. Ownership transfer by design. Sapient leads by becoming unnecessary — and puts that in the
          metrics and the commercials.
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        {footer.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </footer>
  );
}
