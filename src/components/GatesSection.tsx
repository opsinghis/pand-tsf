import { gates, measurementDomains } from "../data/journey";
import { DataTable, Reveal, Section } from "./primitives";

export function GatesSection() {
  return (
    <Section id="gates" num="09" title="The gates — evidence that unlocks each horizon">
      <p className="sec-sub">
        Dates are the plan; gates are the permission to proceed. The thresholds below are our opening position and get
        finalized with Pandora in workshop W2.
      </p>
      <div className="gatecards">
        {gates.map((gate) => (
          <Reveal className="gatecard" key={gate.label}>
            <div className="ghead">
              <h3>
                <span className="chip gate">{gate.label}</span>
                {gate.title}
              </h3>
              <span className="owner">Owner: {gate.owner}</span>
            </div>
            <div className="gbody">
              <div>
                <h4>Evidence required</h4>
                <ul>{gate.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h4>Indicative thresholds</h4>
                <ul>{gate.thresholds.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <h3 className="section-inline-title">The measurement domains behind the gates</h3>
      <DataTable headers={["Domain", "Example metrics"]} rows={measurementDomains.map((row) => row.map((value, index) => ({ value, key: `${row[0]}-${index}` })))} />
    </Section>
  );
}
