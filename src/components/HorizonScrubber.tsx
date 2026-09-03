import { CalendarDays } from "lucide-react";
import { horizons, type HorizonId } from "../data/journey";

export function HorizonScrubber({ active, onSelect }: { active: HorizonId; onSelect: (horizonId: HorizonId) => void }) {
  return (
    <div className="scrubber-shell" aria-label="Global horizon scrubber">
      <div className="wrap scrubber">
        <div className="scrubber-label">
          <CalendarDays size={16} />
          <span>Global horizon scrubber</span>
        </div>
        <div className="scrubber-buttons" role="tablist" aria-label="Select horizon for all lanes">
          {horizons.map((horizon) => (
            <button
              key={horizon.id}
              type="button"
              className={active === horizon.id ? "active" : undefined}
              role="tab"
              aria-selected={active === horizon.id}
              onClick={() => onSelect(horizon.id)}
            >
              <span>{horizon.months}</span>
              <strong>{horizon.date}</strong>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
