import { agentLandscape, landscapeCols, landscapeNote, landscapeRows } from "../data/journey";
import { Reveal } from "./primitives";

const OWNER_LABEL = { vendor: "Vendor-managed", shared: "Shared", enterprise: "Enterprise-managed" } as const;

/** Slide-5 landscape matrix: 11 agent types by loop ownership (rows) and
 *  acting surface (columns), coloured by guardrail owner, dotted by adoption. */
export function LandscapeMap() {
  return (
    <Reveal className="landscape">
      <div className="ls-grid" role="table" aria-label="Pandora agentic application landscape">
        <div className="ls-corner" role="columnheader" />
        {landscapeCols.map((col) => (
          <div className="ls-colhead" key={col} role="columnheader">
            {col}
          </div>
        ))}
        {landscapeRows.map((row, rowIndex) => (
          <LandscapeRow key={row.label} row={row} rowIndex={rowIndex} />
        ))}
      </div>
      <div className="ls-legends">
        <div className="ls-legend">
          <span className="ls-legend-title">Adoption</span>
          <span className="ls-key"><i className="ls-dot live" /> Live at Pandora</span>
          <span className="ls-key"><i className="ls-dot pilot" /> Pilot / in build</span>
          <span className="ls-key"><i className="ls-dot none" /> No dot = not yet adopted</span>
        </div>
        <div className="ls-legend">
          <span className="ls-legend-title">Guardrails &amp; infra owner</span>
          <span className="ls-key"><i className="ls-swatch vendor" /> Vendor-managed</span>
          <span className="ls-key"><i className="ls-swatch shared" /> Shared</span>
          <span className="ls-key"><i className="ls-swatch enterprise" /> Enterprise-managed</span>
        </div>
      </div>
      <p className="ls-note">{landscapeNote}</p>
    </Reveal>
  );
}

function LandscapeRow({ row, rowIndex }: { row: (typeof landscapeRows)[number]; rowIndex: number }) {
  return (
    <>
      <div className="ls-rowhead" role="rowheader">
        <strong>{row.label}</strong>
        <span>{row.detail}</span>
      </div>
      {landscapeCols.map((col, colIndex) => {
        const items = agentLandscape.filter((item) => item.row === rowIndex && item.col === colIndex);
        return (
          <div className="ls-cell" key={col} role="cell">
            {items.map((item) => (
              <div className={`ls-item owner-${item.owner}`} key={item.name}>
                <span className="ls-item-head">
                  <strong>{item.name}</strong>
                  {item.adoption !== "none" && (
                    <i
                      className={`ls-dot ${item.adoption}`}
                      title={item.adoption === "live" ? "Live at Pandora" : "Pilot / in build"}
                      aria-label={item.adoption === "live" ? "Live at Pandora" : "Pilot / in build"}
                    />
                  )}
                </span>
                <span className="ls-item-example">{item.example}</span>
                <span className="ls-item-meta">
                  {OWNER_LABEL[item.owner]} · <em>{col}</em>
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}
