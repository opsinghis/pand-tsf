import { GitBranch, Route, ShieldCheck } from "lucide-react";
import { hero, pillars } from "../data/alternative";
import { FabricDiagram, MobileFabricFlow } from "./FabricDiagram";
import { Reveal } from "./primitives";

export function AltHero() {
  const lanes = pillars.filter((pillar) => pillar.role === "lane");
  const base = pillars.find((pillar) => pillar.role === "base")!;
  const laneIcons = [Route, GitBranch];

  return (
    <header className="hero" id="hero-anchor">
      <div className="wrap hero-grid">
        <Reveal className="hero-copy alt-hero-copy">
          <div className="kicker">
            <span className="dot" />
            {hero.kicker}
          </div>
          <h1>{hero.headline}</h1>
          <div className="question">
            <p>"{hero.question}"</p>
            <span>— {hero.attribution}</span>
          </div>
          <p className="alt-ownership">{hero.ownership}</p>
          <p className="lede">{hero.lede}</p>
          <p className="alt-oneliner">
            <Route size={16} aria-hidden="true" />
            {hero.oneLiner}
          </p>
        </Reveal>

        <Reveal className="hero-visual alt-hero-visual" delay={0.08}>
          <div className="figure-label">
            <strong>The destination</strong>
            <span>reached at your pace</span>
          </div>
          <FabricDiagram />
          <MobileFabricFlow />
          <p className="diagram-note">
            The agentic fabric you endorsed, shown here as the endpoint. Everything below is the on-ramp — how we reach it,
            step by earned step, at your pace and behind gates you control.
          </p>
        </Reveal>
      </div>

      <div className="wrap">
        <div className="lane-stack" aria-label="Two lanes over a shared governance base">
          <div className="lane-stack-top">
            {lanes.map((pillar, index) => {
              const Icon = laneIcons[index];
              return (
                <Reveal key={pillar.title} className={`lane-card lane-card-${index + 1}`} delay={index * 0.05}>
                  <div className="lane-card-head">
                    <span className="lane-card-icon">
                      <Icon size={15} aria-hidden="true" />
                    </span>
                    <span className="lane-tag">{pillar.tag}</span>
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </Reveal>
              );
            })}
          </div>
          <div className="lane-braces" aria-hidden="true">
            <span />
            <span />
          </div>
          <Reveal className="lane-base" delay={0.12}>
            <span className="lane-base-icon">
              <ShieldCheck size={16} aria-hidden="true" />
            </span>
            <div className="lane-base-body">
              <span className="lane-tag base-tag">{base.tag}</span>
              <h3>{base.title}</h3>
              <p>{base.body}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
