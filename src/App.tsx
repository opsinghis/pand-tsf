import { MotionConfig } from "motion/react";
import { AltHero } from "./components/AltHero";
import { AltNav } from "./components/AltNav";
import { DialSection, GoalsSection, WalkthroughSection } from "./components/AltDial";
import { AskSectionAlt, CautionSection, FooterAlt, HorizonsSection, PandoraSection, ProofSection, StartSection } from "./components/AltJourney";
import { ChangesSection, FoundationsSection, LandscapeSection, ScopeOverviewSection, TwoLaneSection } from "./components/AltModel";
import { AsIsLanesSection, DayOneSection, GovernanceSection } from "./components/AltRun";
import { TeamCapacitySection, TeamLeaderSection, TeamShapeSection, TeamSkillsSection } from "./components/AltTeam";

export default function App() {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.28, ease: "easeOut" }}>
      <AltNav />
      <main>
        <AltHero />
        <ChangesSection />
        <ScopeOverviewSection />
        <TwoLaneSection />
        <FoundationsSection />
        <LandscapeSection />
        <DayOneSection />
        <AsIsLanesSection />
        <GovernanceSection />
        <TeamShapeSection />
        <TeamLeaderSection />
        <TeamSkillsSection />
        <TeamCapacitySection />
        <DialSection />
        <WalkthroughSection />
        <GoalsSection />
        <HorizonsSection />
        <CautionSection />
        <ProofSection />
        <PandoraSection />
        <StartSection />
        <AskSectionAlt />
      </main>
      <FooterAlt />
    </MotionConfig>
  );
}
