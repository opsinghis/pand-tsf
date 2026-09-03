import { Sparkles } from "lucide-react";
import { horizons, lanes, maturityLadder, type HorizonId, type Lane, type LaneId } from "../data/journey";
import { laneIcons, laneStyle, Reveal, Section } from "./primitives";

export function SpineSection({
  active,
  onCellSelect
}: {
  active: HorizonId;
  onCellSelect: (laneId: LaneId, horizonId: HorizonId) => void;
}) {
  return (
    <Section id="spine" num="01" title="The spine: horizons × lanes × gates">
      <p className="sec-sub">
        One model runs the whole journey. Four lanes cross four dated horizons, and each transition is unlocked by evidence,
        not by the calendar.
      </p>
      <HorizonRuler />
      <JourneyBoard active={active} onCellSelect={onCellSelect} />
      <div className="split-after">
        <Reveal className="maturity-copy">
          <h3>The maturity ladder beneath the horizons</h3>
          <p>
            No leap into autonomy: each level has an explicit "what must be true" before moving on. Pandora is already
            operating at level 1 today.
          </p>
        </Reveal>
        <MaturityLadder />
      </div>
    </Section>
  );
}

function HorizonRuler() {
  return (
    <div className="ruler" aria-label="Roadmap horizons">
      {horizons.map((horizon) => (
        <div className="tick" key={horizon.id}>
          <span>{horizon.months}</span>
          <strong>
            {horizon.date} · {horizon.stage}
          </strong>
        </div>
      ))}
    </div>
  );
}

function JourneyBoard({
  active,
  onCellSelect
}: {
  active: HorizonId;
  onCellSelect: (laneId: LaneId, horizonId: HorizonId) => void;
}) {
  return (
    <Reveal className="board">
      <div className="board-grid">
        <div className="bh" />
        {horizons.map((horizon) => (
          <div key={horizon.id} className={`bh ${active === horizon.id ? "selected" : ""}`}>
            {horizon.date}
            <span>{horizon.short}</span>
          </div>
        ))}
        {lanes.map((lane) => (
          <BoardRow key={lane.id} lane={lane} active={active} onCellSelect={onCellSelect} />
        ))}
      </div>
      <div className="board-note">
        <Sparkles size={15} />
        Click any cell to jump to that lane and horizon. The scrubber above sets the whole journey at once.
      </div>
    </Reveal>
  );
}

function BoardRow({
  lane,
  active,
  onCellSelect
}: {
  lane: Lane;
  active: HorizonId;
  onCellSelect: (laneId: LaneId, horizonId: HorizonId) => void;
}) {
  const Icon = laneIcons[lane.id];
  return (
    <>
      <div className="blane" style={laneStyle(lane)}>
        <span className="lane-dot" />
        <Icon size={15} />
        {lane.shortTitle}
      </div>
      {horizons.map((horizon) => {
        const cell = lane.horizons[horizon.id];
        return (
          <button
            key={horizon.id}
            className={`cell ${active === horizon.id ? "selected" : ""}`}
            type="button"
            onClick={() => onCellSelect(lane.id, horizon.id)}
            style={laneStyle(lane)}
          >
            <span>{cell.tag}</span>
            {cell.board}
          </button>
        );
      })}
    </>
  );
}

function MaturityLadder() {
  return (
    <Reveal className="ladder">
      {maturityLadder.map((rung) => (
        <div key={rung.level} className={`rung ${rung.current ? "now" : ""}`}>
          <span className="lvl">{rung.level}</span>
          <span className="state">{rung.state}</span>
          <span>{rung.description}</span>
          <span className="req">{rung.requirement}</span>
        </div>
      ))}
    </Reveal>
  );
}
