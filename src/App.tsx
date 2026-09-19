import { MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import { AltHero } from "./components/AltHero";
import { AltNav } from "./components/AltNav";
import { DialSection, GoalsSection, WalkthroughSection } from "./components/AltDial";
import { AskSectionAlt, CautionSection, FooterAlt, HorizonsSection, PandoraSection, ProofSection, StartSection } from "./components/AltJourney";
import { ChangesSection, FoundationsSection, LandscapeSection, ScopeOverviewSection, TwoLaneSection } from "./components/AltModel";
import { AsIsLanesSection, DayOneSection, GovernanceSection, TransitionCoverageSection } from "./components/AltRun";
import { ConvergenceSection, TeamCapacitySection, TeamLeaderSection, TeamShapeSection, TeamSkillsSection } from "./components/AltTeam";
import { CommercialsSection } from "./components/AltCommercials";
import { FaqSection } from "./components/AltFaq";
import { BackToPresentationLink, PresentationSite } from "./components/PresentationSite";

function isPresentationRoute() {
  if (typeof window === "undefined") return false;
  return window.location.pathname.replace(/\/+$/, "") === "/presentation";
}

function scrollToHashAfterRender() {
  if (typeof window === "undefined" || window.location.hash.length <= 1) return;
  window.setTimeout(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, 60);
}

export default function App() {
  const [presentationRoute, setPresentationRoute] = useState(isPresentationRoute);

  useEffect(() => {
    const onPopState = () => {
      setPresentationRoute(isPresentationRoute());
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
  }, [presentationRoute]);

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.28, ease: "easeOut" }}>
      {presentationRoute ? (
        <PresentationSite />
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
        </>
      )}
    </MotionConfig>
  );
}
