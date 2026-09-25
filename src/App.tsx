import { MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import { AltHero } from "./components/AltHero";
import { AltNav } from "./components/AltNav";
import { DialSection, GoalsSection, WalkthroughSection } from "./components/AltDial";
import { AskSectionAlt, CautionSection, FooterAlt, HorizonsSection, PandoraSection, ProofSection, StartSection } from "./components/AltJourney";
import { ChangesSection, FoundationsSection, LandscapeSection, ScopeOverviewSection, TwoLaneSection } from "./components/AltModel";
import { AsIsLanesSection, DayOneSection, GovernanceSection, TransitionCoverageSection } from "./components/AltRun";
import { ConvergenceSection, TeamCapacitySection, TeamLeaderSection, TeamShapeSection, TeamSkillsSection } from "./components/AltTeam";
import { FaqSection } from "./components/AltFaq";
import { BoothVisitSite } from "./components/BoothVisitSite";
import { BackToPresentationLink, PresentationSite } from "./components/PresentationSite";

type SpecialRoute = "presentation" | "booth" | "main";

function getSpecialRoute(): SpecialRoute {
  if (typeof window === "undefined") return "main";
  const path = window.location.pathname.replace(/\/+$/, "");
  if (path === "/presentation") return "presentation";
  if (path === "/booth") return "booth";
  return "main";
}

function scrollToHashAfterRender() {
  if (typeof window === "undefined" || window.location.hash.length <= 1) return;
  window.setTimeout(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, 60);
}

export default function App() {
  const [specialRoute, setSpecialRoute] = useState(getSpecialRoute);

  useEffect(() => {
    const onPopState = () => {
      setSpecialRoute(getSpecialRoute());
      scrollToHashAfterRender();
    };
    const onHashChange = () => scrollToHashAfterRender();
    window.addEventListener("popstate", onPopState);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    scrollToHashAfterRender();
  }, [specialRoute]);

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.28, ease: "easeOut" }}>
      {specialRoute === "presentation" ? (
        <PresentationSite />
      ) : specialRoute === "booth" ? (
        <BoothVisitSite />
      ) : (
        <>
          <AltNav />
          <BackToPresentationLink />
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
        </>
      )}
    </MotionConfig>
  );
}
