import { horizons, operatingRoles, raciRows, type HorizonId } from "../data/journey";
import { DataTable, PullQuote, Reveal, Section } from "./primitives";

const horizonIds = horizons.map((horizon) => horizon.id);

export function OperatingModelSection({ active }: { active: HorizonId }) {
  const activeIndex = horizonIds.indexOf(active) + 2;

  return (
    <Section id="tom" num="07" title="The target operating model — who runs the fabric">
      <p className="sec-sub">
        The journey does not depend on individual enthusiasts or a PS-only delivery pod. These enduring Pandora roles operate
        the fabric and grow into full ownership across the horizons.
      </p>
      <OwnershipHub active={active} />
      <DataTable
        headers={["Role", "Core accountability", ...horizons.map((h) => h.date)]}
        rows={operatingRoles.map((row) =>
          row.map((cell, index) => ({ value: cell, active: index === activeIndex, key: `${row[0]}-${index}` }))
        )}
      />
      <h3 className="section-inline-title">Capability ownership by horizon — the RACI snapshot</h3>
      <DataTable
        headers={["Capability", ...horizons.map((h) => h.date)]}
        rows={raciRows.map((row) =>
          row.map((cell, index) => ({ value: cell, active: index === activeIndex - 1, key: `${row[0]}-${index}` }))
        )}
      />
      <PullQuote quote="The operating model matures with the technology. By year two, PS is advising and assuring — not running the daily fabric." source="Target operating model · design intent" />
    </Section>
  );
}

function OwnershipHub({ active }: { active: HorizonId }) {
  const activeIndex = horizonIds.indexOf(active);
  const ring = [
    "Product Owner",
    "AgentOps",
    "Architecture",
    "Security",
    "AI FinOps",
    "Champions",
    "CoE Lead"
  ];
  const label = ["PS-led", "Joint", "Pandora-led", "Pandora-owned"][activeIndex];

  return (
    <Reveal className="hub-panel">
      <div className="figure-label">
        <strong>Operating-model hub</strong>
        <span>{label} · {horizons[activeIndex].date}</span>
      </div>
      <svg viewBox="0 0 720 340" role="img" aria-label="Operating model hub and spoke diagram">
        <rect x="10" y="10" width="700" height="320" rx="8" fill="#FBFAF8" stroke="#E5E2DB" />
        <circle cx="360" cy="170" r="58" fill="#F7E9E9" stroke="#C43B44" strokeWidth="1.5" />
        <text x="360" y="164" textAnchor="middle" className="svg-title">
          Agentic
        </text>
        <text x="360" y="185" textAnchor="middle" className="svg-title">
          CoE
        </text>
        {ring.map((item, index) => {
          const angle = (Math.PI * 2 * index) / ring.length - Math.PI / 2;
          const x = 360 + Math.cos(angle) * 230;
          const y = 170 + Math.sin(angle) * 110;
          return (
            <g key={item}>
              <line x1="360" y1="170" x2={x} y2={y} stroke="#C9CBD0" strokeWidth="1.5" />
              <rect x={x - 70} y={y - 27} width="140" height="54" rx="8" fill="#FFFFFF" stroke="#E5E2DB" />
              <text x={x} y={y - 3} textAnchor="middle" className="svg-small svg-bold">
                {item}
              </text>
              <text x={x} y={y + 15} textAnchor="middle" className="svg-small">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </Reveal>
  );
}
