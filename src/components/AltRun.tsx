import { CalendarCheck2, Power } from "lucide-react";
import { Fragment, type CSSProperties } from "react";
import { asIsLanes, dayOneFacts, dialReview, governanceLayers, transitionPlan } from "../data/alternative";
import { PullQuote, Reveal, Section } from "./primitives";

export function DayOneSection() {
  return (
    <Section id="dayone" num="07" title="Day one: run as-is — the RFP delivered as written">
      <p className="sec-sub">
        Transition on the RFP's own mandated plan, re-anchored to the 30 October 2026 award. Your tools, your SLAs, your
        RACI boundary — unchanged. Nothing below requires anything agentic.
      </p>
      <div className="timeline">
        <div className="tl-award">
          <CalendarCheck2 size={14} aria-hidden="true" />
          Contract award · 30 Oct 2026 — mobilisation begins
        </div>
        <div className="tl-track">
          {transitionPlan.map((row, index) => {
            const hue = ["--tech", "--proof", "--ops", "--proof"][index];
            const kind = index % 2 === 0 ? "Ramp-up" : "Autonomous";
            return (
              <div className="tl-stop" key={row.phase} style={{ "--dot": `var(${hue})` } as CSSProperties}>
                <div className="tl-marker">
                  <span className="tl-dot" />
                  {index < transitionPlan.length - 1 && <span className="tl-connector" />}
                </div>
                <span className="tl-window">{row.window}</span>
                <div className="tl-card">
                  <span className={`tl-kind ${kind === "Autonomous" ? "live" : ""}`}>{kind}</span>
                  <strong>{row.phase}</strong>
                  <p>{row.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="tl-foot">Bi-weekly readiness assessments throughout · 50+ parameter cutover, agreed jointly on evidence</p>
      </div>
      <div className="infra-stack dayone-facts">
        {dayOneFacts.map((fact) => (
          <div className="infra-row" key={fact.label}>
            <strong>{fact.label}</strong>
            <span>{fact.value}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function AsIsLanesSection() {
  return (
    <Section id="lanes-asis" num="08" title="People · Technology · Operations — as-is first">
      <p className="sec-sub">
        The three delivery dimensions, each starting conventional and earning its way forward. The pattern is the same in
        all three: the valuable, unglamorous 80% first; the agentic step only ever by invitation.
      </p>
      <div className="asis-grid">
        {asIsLanes.map((lane) => (
          <Reveal className="asis-card" key={lane.id}>
            <h3>{lane.title}</h3>
            <ul>
              {lane.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="already">{lane.message}</div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function GovernanceSection() {
  return (
    <Section id="governance" num="09" title="Governance: two layers, one principle">
      <p className="sec-sub">
        Controls arrive before autonomy — always. Service governance runs from day one on the RFP's own cadence; agentic
        governance is prepared during Lane-1 quarters and switches on only when something agentic first touches the estate.
      </p>
      <div className="gov-planes">
        {governanceLayers.map((layer) => {
          const lit = layer.id === "service";
          return (
            <Fragment key={layer.id}>
              <Reveal className={`gov-plane ${lit ? "lit" : "dormant"}`}>
                <div className="gov-plane-head">
                  <span className={`gov-power ${lit ? "on" : "off"}`} aria-hidden="true">
                    <Power size={15} />
                  </span>
                  <div className="gov-plane-title">
                    <h3>{layer.name}</h3>
                    <span>{layer.sub}</span>
                  </div>
                  <span className={`chip ${lit ? "live" : "gap"}`}>{layer.state}</span>
                </div>
                <ul>
                  {layer.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
              {lit && (
                <div className="gov-switch">
                  <span className="gov-toggle" aria-hidden="true">
                    <span className="gov-toggle-knob" />
                  </span>
                  <span className="gov-switch-label">
                    Off by design. The switch flips at your first dial-up (Gate 1) — never before, and one scope item at a time.
                  </span>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
      <PullQuote quote={dialReview} source="The quarterly dial review — where the two layers meet" />
    </Section>
  );
}
