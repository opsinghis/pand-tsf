import { CircleSlash2, GitBranch, Route } from "lucide-react";
import { hero, pillars } from "../data/alternative";
import { Reveal } from "./primitives";

export function AltHero() {
  return (
    <header className="hero" id="hero-anchor">
      <div className="wrap">
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
        <div className="pillars">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} className="pillar alt-pillar" delay={index * 0.05}>
              <span className="alt-pillar-icon">
                {index === 0 ? <Route size={16} /> : index === 1 ? <GitBranch size={16} /> : <CircleSlash2 size={16} />}
              </span>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </header>
  );
}
