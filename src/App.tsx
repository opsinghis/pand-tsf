import { MotionConfig } from "motion/react";
import { AltHero } from "./components/AltHero";
import { AltNav } from "./components/AltNav";
import { DialSection, GoalsSection, WalkthroughSection } from "./components/AltDial";
import { AskSectionAlt, CautionSection, FooterAlt, HorizonsSection, PandoraSection, ProofSection, StartSection } from "./components/AltJourney";
import { ChangesSection, FoundationsSection, LandscapeSection, ScopeOverviewSection, TwoLaneSection } from "./components/AltModel";
import { AsIsLanesSection, DayOneSection, GovernanceSection, TransitionCoverageSection } from "./components/AltRun";
import { ConvergenceSection, TeamCapacitySection, TeamLeaderSection, TeamShapeSection, TeamSkillsSection } from "./components/AltTeam";
import { CommercialsSection } from "./components/AltCommercials";
import { FaqSection } from "./components/AltFaq";

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
        <TransitionCoverageSection />
        <AsIsLanesSection />
        <GovernanceSection />
        <TeamShapeSection />
        <TeamLeaderSection />
        <ConvergenceSection />
        <TeamSkillsSection />
        <TeamCapacitySection />
        <CommercialsSection />
        <DialSection />
        <WalkthroughSection />
        <GoalsSection />
        <HorizonsSection />
        <CautionSection />
        <ProofSection />
        <PandoraSection />
        <StartSection />
        <FaqSection />
        <AskSectionAlt />
      </main>
      <FooterAlt />
    </MotionConfig>
  );
}
