import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CalendarDays,
  ChevronRight,
  ClipboardCheck,
  Database,
  ExternalLink,
  Gauge,
  GitBranch,
  HelpCircle,
  MapPinned,
  Maximize2,
  Network,
  ShieldCheck,
  Users,
  X,
  Zap
} from "lucide-react";
import { Fragment, useEffect, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { brand, horizons, navSections } from "../data/alternative";
import { defaultCommercialControls, getCommercialSnapshot } from "./AltCommercials";
import { CommercialAccessPanel, useCommercialAccess } from "./CommercialAccess";
import {
  averageScore,
  dimensionMarksFromHorizon,
  maturityHorizons,
  maturityLabel,
  platformMaturityFromScores,
  scoreTone,
  servicePlatforms,
  type ServicePlatform
} from "./AltRun";

const fabricArchitecture = new URL("../assets/presentation/agentic-fabric-architecture.webp", import.meta.url).href;
const dialInActionImage = new URL("../assets/presentation/dial-in-action.webp", import.meta.url).href;
const nexusCurrentImage = new URL("../assets/presentation/nexus/nexus-current.webp", import.meta.url).href;
const nexusProposedImage = new URL("../assets/presentation/nexus/nexus-proposed.webp", import.meta.url).href;
const sanjayPortrait = "/exec/sanjay.webp";
const shubhraPortrait = "/exec/shubhra.webp";
const tilakPortrait = "/exec/tilak.jpg";
const twoLanesApproachImage = new URL("../assets/presentation/twolanes-approach.webp", import.meta.url).href;
const rfsCover = new URL("../assets/presentation/rfs/rfs-cover.jpg", import.meta.url).href;
const rfsPandoraStrip = new URL("../assets/presentation/rfs/rfs-pandora-strip.jpg", import.meta.url).href;
const rfsPortrait = new URL("../assets/presentation/rfs/rfs-portrait.jpg", import.meta.url).href;
const rfsRoute = new URL("../assets/presentation/rfs/rfs-route.jpg", import.meta.url).href;
const asoCaseImage = "/cases/aso.jpg";
const nissanCaseImage = "/cases/nissan.jpg";
const optumCaseImage = "/cases/optum.jpg";
const pandoraCaseImage = "/cases/pandora.jpg";
const kingfisherCaseImage = "/cases/kingfisher.jpg";
const boCaseImage = "/cases/bo.jpg";
const mcdonaldsCaseImage = "/cases/mcdonalds.jpg";
const lorealCaseImage = "/cases/loreal.jpg";
const omPortrait = "/teams/om.jpeg";

type PresentationTone = "accent" | "tech" | "people" | "ops" | "gov" | "proof";
type PresentationVisual =
  | "agenda"
  | "exec"
  | "recap"
  | "rfs"
  | "sitevisit"
  | "boothvisit"
  | "meetteam"
  | "transition"
  | "maturity"
  | "lane2"
  | "cases"
  | "team"
  | "engineering"
  | "commercials"
  | "faq";
type PresentationIcon = typeof HelpCircle;

interface PresentationChapter {
  id: string;
  time: string;
  agenda: string;
  title: string;
  headline: string;
  punch: string;
  tone: PresentationTone;
  visual: PresentationVisual;
  detailIds: string[];
  detailLinks?: PresentationDetailLink[];
}

interface PresentationDetailLink {
  href: string;
  label: string;
  num: string;
}

interface LightboxImage {
  src: string;
  alt: string;
  label: string;
  caption: string;
}

interface LightboxVideo {
  src: string;
  label: string;
  caption: string;
}

interface LightboxPerson {
  name: string;
  role: string;
  track: string;
  initials: string;
  source?: string;
  image?: string;
  imagePosition?: string;
  placeholderImage?: boolean;
  pending?: boolean;
}

interface LightboxContent {
  eyebrow: string;
  title: string;
  body: string;
  images: LightboxImage[];
  video?: LightboxVideo;
  person?: LightboxPerson;
  view?: "transition-baseline" | "team-member";
}

type OpenLightbox = (content: LightboxContent) => void;

const sectionById = new Map(navSections.map((section) => [section.id, section]));

const nexusLifecycleLightbox: LightboxContent = {
  eyebrow: "RFS proof",
  title: "Nexus agentic lifecycle",
  body: "The modal shows the source Nexus lifecycle view and the proposed agentic lifecycle simplification side by side.",
  images: [
    {
      src: nexusCurrentImage,
      alt: "Current Nexus lifecycle screenshot",
      label: "Current lifecycle",
      caption: "The current Nexus journey is long, gate-heavy and difficult to walk through in a customer conversation."
    },
    {
      src: nexusProposedImage,
      alt: "Proposed Nexus agentic lifecycle screenshot",
      label: "Agentic lifecycle",
      caption: "The proposed view collapses the flow into clearer phases while keeping evidence and approvals visible."
    }
  ]
};

const fabricLightbox: LightboxContent = {
  eyebrow: "RFP response",
  title: "The RFP response scaled Nexus into a governed fabric.",
  body: "This is the architecture proof point behind the story: Teams, ServiceNow, Port, GitHub, observability and FinOps are front doors into governed agents backed by graph memory, policy and evidence.",
  images: [
    {
      src: fabricArchitecture,
      alt: "Agentic fabric architecture slide preview",
      label: "Agentic fabric architecture",
      caption: "The governed fabric connects the platform estate, enterprise systems, evidence ledger and agent runtime."
    }
  ]
};

const postRfpLightbox: LightboxContent = {
  eyebrow: "POST-RFP DISCUSSION",
  title: "Two-lane approach: run stays active while improvement earns the dial-up.",
  body: "This is the pivot we are taking into the site visit: Lane 1 keeps delivery stable while Lane 2 stays held until horizons, gates and maturity levels are proven.",
  images: [
    {
      src: twoLanesApproachImage,
      alt: "Two-lane swimlane approach showing horizons, gates and maturity levels",
      label: "Two-lane swimlane plan",
      caption: "Lane 1 keeps Run and Deliver active from day one; Lane 2 improves and evolves only after the right gates, horizons and level limits are met."
    }
  ]
};

const gatedControlVideoLightbox: LightboxContent = {
  eyebrow: "P03 Transformation proof",
  title: "Gate-based transformation in motion.",
  body: "The video shows how an item moves only when the right gate is passed, keeping transformation sequenced, visible and reversible.",
  images: [],
  video: {
    src: "/video/gatedcontrol.mp4",
    label: "Gated flow walkthrough",
    caption: "Transformation moves through approved gates instead of jumping directly to the north star."
  }
};

const transitionBaselineLightbox: LightboxContent = {
  eyebrow: "P03 As-is transition",
  title: "Transition baseline: assess while taking over.",
  body: "The radar uses the same maturity tracker as the detailed site. The starting mark is deliberately evidence-led: as runtime proof improves, stabilisation moves each technology group up the scale.",
  images: [],
  view: "transition-baseline"
};

const agenticFabricVideoLightbox: LightboxContent = {
  eyebrow: "P03 North star view",
  title: "Agentic fabric north star.",
  body: "This video shows the north star view of the agentic fabric, connected across front doors, governance, graph memory, evidence and platform execution.",
  images: [],
  video: {
    src: "/video/agenticfabric.mp4",
    label: "Agentic fabric walkthrough",
    caption: "The fabric becomes active only after the transition gates prove that the service, guardrails and evidence are ready."
  }
};

const dialInActionLightbox: LightboxContent = {
  eyebrow: "P03 Transformation proof",
  title: "Dial in action: human approval shifts only when the level rises.",
  body: "This view shows how the same maturity dial applies to data-product workspace and infrastructure provisioning: Level 0 stays human-run, Level 1 is AI-assisted with approval, and Level 2 becomes agent-run with human outcome review.",
  images: [
    {
      src: dialInActionImage,
      alt: "Dial in action example comparing data-product workspace and PAKS namespace provisioning across Level 0, Level 1 and Level 2",
      label: "Dial in action",
      caption: "The boundary moves toward the agent as maturity rises, but the human gate remains until the item earns Level 2."
    }
  ]
};

const originalAgenda = [
  {
    time: "9:30 - 9:45",
    label: "Meet & Greet",
    owner: "Om Singh",
    points: ["Agenda walkthrough", "Introductions", "Coffee"],
    targetId: "presentation-start"
  },
  {
    time: "9:45 - 10:45",
    label: "PS site walkthrough - team areas visit",
    owner: "Ravi Shankar",
    points: ["Real development & operations", "DevOps + Integration", "ASO", "Nissan"],
    targetId: "site-walkthrough"
  },
  {
    time: "10:45 - 11:00",
    label: "Tea / Coffee Break",
    owner: "Break",
    points: ["Refresh", "Move to booth area"],
    targetId: "booth-walkthrough"
  },
  {
    time: "11:00 - 11:45",
    label: "Client examples - booth walkthrough",
    owner: "Kalpesh",
    points: ["DevOps showcase", "McDonalds", "Data platform management", "Loreal"],
    targetId: "booth-walkthrough"
  },
  {
    time: "12:00 - 12:30",
    label: "Lunch",
    owner: "Break",
    points: ["Pause"],
    targetId: "meet-your-team"
  },
  {
    time: "12:30 - 1:00",
    label: "Meet your team",
    owner: "Om Singh",
    points: ["Team identified for T&SF", "Roles", "Locations", "Support model"],
    targetId: "meet-your-team"
  },
  {
    time: "1:00 - 2:00",
    label: "Exec intros - PS in India",
    owner: "Sanjay Menon",
    points: ["India presence", "People + Product Strategy", "Organization Transformation", "Talent management"],
    targetId: "exec-presence"
  },
  {
    time: "2:00 - 3:00",
    label: "Revised proposal - deep dive",
    owner: "Om Singh",
    points: ["Open Q&A", "Operating model", "Transition", "Case Study - 5"],
    targetId: "journey-until-now"
  },
  {
    time: "3:00 - 3:30",
    label: "Commercials & team model",
    owner: "Sebastian Jandrey",
    points: ["Location / team model", "Commercial model"],
    targetId: "team-overview"
  },
  {
    time: "3:30 - 3:45",
    label: "Tea / Coffee Break",
    owner: "Break",
    points: ["Refresh", "Prepare for online closure"],
    targetId: "engineering-leadership"
  },
  {
    time: "3:45 - 4:15",
    label: "Exec closure - online meet",
    owner: "Tilak Doddapaneni",
    points: ["Reassurance on AI", "Innovation", "Engineering confidence"],
    targetId: "engineering-leadership"
  },
  {
    time: "4:15 - 4:30",
    label: "Debrief",
    owner: "Group",
    points: ["Actions", "Open points", "Next steps"],
    targetId: "faq-close"
  }
];

const presentationChapters: PresentationChapter[] = [
  {
    id: "site-walkthrough",
    time: "9:45 - 10:45",
    agenda: "PS site walkthrough - team areas visit",
    title: "Site Walkthrough",
    headline: "Walk the retail floor, then unpack the cases.",
    punch: "Ravi Shankar, India Retail CTO, takes the group through one of the retail delivery floors. We see teams in action across Pandora, ASO, Optum, Kingfisher and B&O, then sit down for ASO, Nissan and Optum case walkthroughs focused on Integration, Data and DevOps.",
    tone: "proof",
    visual: "sitevisit",
    detailIds: ["scope", "team-skills", "proof"],
    detailLinks: [
      { num: "03", label: "Scope: DevOps, Data, Integration", href: detailHref("scope", "site-walkthrough") },
      { num: "14", label: "Skills and knowledge transfer", href: detailHref("team-skills", "site-walkthrough") },
      { num: "22", label: "Proof and customer cases", href: detailHref("proof", "site-walkthrough") }
    ]
  },
  {
    id: "booth-walkthrough",
    time: "11:00 - 11:45",
    agenda: "Client examples - booth walkthrough",
    title: "Booth Walkthrough",
    headline: "Two booths. One operating model.",
    punch: "Kalpesh uses McDonalds and Loreal to show how great operations work across DevOps, Data and Integration: service ownership, platform reliability, 24x7 support, incident flow, AI load reduction, adoption and shift-left.",
    tone: "tech",
    visual: "boothvisit",
    detailIds: ["scope", "dayone", "governance"],
    detailLinks: [
      { num: "01", label: "Data operating model", href: "/booth#data-operating-model" },
      { num: "02", label: "Integration operating model", href: "/booth#integration-operating-model" },
      { num: "03", label: "PAKS / DevOps operations", href: "/booth#paks-operations" },
      { num: "04", label: "Incident and reliability model", href: "/booth#incident-reliability" }
    ]
  },
  {
    id: "meet-your-team",
    time: "12:30 - 1:00",
    agenda: "Meet your team",
    title: "Meet The Team",
    headline: "Customer ask mapped to the org model.",
    punch: "We keep the same structure as the team-leader model: Pandora steers, one overall engineering lead is accountable, and DevOps, Data and Integration sit underneath with named specialists visible today plus remaining role names to confirm.",
    tone: "people",
    visual: "meetteam",
    detailIds: ["team-shape", "team-leader", "team-skills", "team-capacity"]
  },
  {
    id: "exec-presence",
    time: "1:00 - 2:00",
    agenda: "Exec intros - PS in India",
    title: "PS In India",
    headline: "Sanjay anchors PS in India and transformation capability.",
    punch: "This is the leadership session for India presence, PS specifics, People + Product Strategy, Organization Transformation and People Transformation including talent management.",
    tone: "people",
    visual: "exec",
    detailIds: ["team-shape", "team-leader", "team-capacity"]
  },
  {
    id: "journey-until-now",
    time: "2:00 - 3:00",
    agenda: "Revised proposal - deep dive",
    title: "Journey Until Now",
    headline: "The site visit is the fourth step in the same journey.",
    punch: "May proved the Nexus idea, August scaled it into the RFP response, September sharpened the concern, and 1 October is where we land the revised path.",
    tone: "tech",
    visual: "recap",
    detailIds: ["hero-anchor", "changes", "scope", "goals"]
  },
  {
    id: "revised-approach-p03",
    time: "2:00 - 3:00",
    agenda: "Revised proposal - deep dive",
    title: "Revised Approach",
    headline: "Same north star. Safer adoption path.",
    punch: "We run as-is first, stabilise, transform through maturity gates, then evolve only the items that have earned the move.",
    tone: "ops",
    visual: "transition",
    detailIds: ["dayone", "transition-coverage", "lanes-asis", "governance", "horizons"]
  },
  {
    id: "maturity-gates",
    time: "2:00 - 3:00",
    agenda: "Revised proposal - deep dive",
    title: "Maturity Matrix",
    headline: "Handover continues while maturity becomes transparent.",
    punch: "We do not wait for perfect handover. During transition, every scoped item gets an evidence-based M0-M5 baseline so gaps are visible, priorities are clear, and improvement work moves the estate to a better state over time.",
    tone: "accent",
    visual: "maturity",
    detailIds: ["dial-explorer", "walkthroughs", "goals", "proof", "pandora", "start"]
  },
  {
    id: "lane2-movement",
    time: "2:00 - 3:00",
    agenda: "Revised proposal - deep dive",
    title: "Lane 2 Movement",
    headline: "Lane 2 moves one item at a time through evidence gates.",
    punch: "The maturity matrix creates candidates, not a forced transformation wave. Each item enters Lane 2 with a Pandora owner, evidence, rollback, stakeholder sign-off and a clear reason to move from run-as-is to assisted, then to a higher maturity pattern only when Gate 2 passes.",
    tone: "tech",
    visual: "lane2",
    detailIds: ["twolane", "foundations", "dial-explorer", "walkthroughs", "horizons"]
  },
  {
    id: "case-studies",
    time: "2:00 - 3:00",
    agenda: "Revised proposal - deep dive",
    title: "Client Cases",
    headline: "Case Study 5 connects proof back to the revised proposal.",
    punch: "The morning cases prove capability; this afternoon case anchors transition, operating model and the path from run to evolve.",
    tone: "proof",
    visual: "cases",
    detailIds: ["proof", "faq", "goals", "team-capacity"]
  },
  {
    id: "team-overview",
    time: "3:00 - 3:30",
    agenda: "Commercials & Team Model",
    title: "Team + Commercials",
    headline: "Team model and commercial model stay connected.",
    punch: "Sebastian anchors how location mix, team model, rate cards and commercial levers connect to the same delivery model: run base, improve and evolve, and controlled burst capacity.",
    tone: "people",
    visual: "team",
    detailIds: ["team-shape", "team-leader", "team-skills", "team-capacity", "commercials"]
  },
  {
    id: "engineering-leadership",
    time: "3:45 - 4:15",
    agenda: "Exec closure - online meet",
    title: "Exec Closure",
    headline: "Tilak closes with AI and innovation reassurance.",
    punch: "Tilak Doddapaneni, Executive Vice President and Global Head of Engineering at Publicis Sapient, reassures the room on AI, innovation, engineering quality and why the model is safe to evolve.",
    tone: "people",
    visual: "engineering",
    detailIds: ["team-shape", "team-leader", "team-skills", "team-capacity", "faq"]
  },
  {
    id: "faq-close",
    time: "4:15 - 4:30",
    agenda: "Debrief",
    title: "Debrief",
    headline: "Close with actions, evidence and open questions.",
    punch: "The debrief turns the day into next steps: what was proven in the walkthrough, what needs follow-up, which commercial/team assumptions remain open, and where Pandora wants more evidence.",
    tone: "gov",
    visual: "faq",
    detailIds: ["faq", "commercials", "transition-coverage", "team-skills", "proof"]
  }
];

function detailHref(sectionId: string, returnId: string) {
  return `/?from=presentation&return=${encodeURIComponent(returnId)}#${sectionId}`;
}

function jumpToPresentationTarget(event: MouseEvent<HTMLAnchorElement>, targetId: string) {
  if (typeof window === "undefined") return;
  const target = document.getElementById(targetId);
  if (!target) return;

  event.preventDefault();
  const top = target.getBoundingClientRect().top + window.scrollY;
  const previousScrollBehavior = document.documentElement.style.scrollBehavior;

  window.history.pushState(null, "", `#${targetId}`);
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo({ top, left: 0, behavior: "auto" });
  window.requestAnimationFrame(() => {
    window.scrollTo({ top, left: 0, behavior: "auto" });
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
  });
}

function pageLabel(index: number) {
  return `P${String(index + 1).padStart(2, "0")}`;
}

const coverPageLabel = "P00";
const closePageLabel = pageLabel(presentationChapters.length);

function getSections(ids: string[]) {
  return ids.map((id) => sectionById.get(id)).filter((section): section is NonNullable<typeof section> => Boolean(section));
}

function DetailLinks({ chapter }: { chapter: PresentationChapter }) {
  const sections = getSections(chapter.detailIds);
  const links: PresentationDetailLink[] = chapter.detailLinks ?? sections.map((section) => ({
    href: detailHref(section.id, chapter.id),
    label: section.label,
    num: section.num
  }));
  return (
    <div className="pres-detail-links" aria-label="Detailed section links">
      <span>Deep dive</span>
      <div>
        {links.map((link) => (
          <a href={link.href} key={`${link.num}-${link.label}`}>
            <em>{link.num}</em>
            <strong>{link.label}</strong>
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}

function PresentationNav() {
  return (
    <nav className="pres-nav" aria-label="Presentation chapters">
      <a className="pres-brand" href="#presentation-start">
        <em>{coverPageLabel}</em>
        <span>{brand}</span>
      </a>
      <div className="pres-nav-links">
        {presentationChapters.map((chapter, index) => (
          <a href={`#${chapter.id}`} key={chapter.id}>
            <small>{pageLabel(index)}</small>
            <span>{chapter.title}</span>
          </a>
        ))}
      </div>
      <a className="pres-detail-home" href={detailHref("hero-anchor", "presentation-start")}>
        Full detail
        <ExternalLink size={13} aria-hidden="true" />
      </a>
    </nav>
  );
}

function AgendaBackLink() {
  return (
    <a
      className="pres-slide-agenda-link"
      href="#presentation-start"
      onClick={(event) => jumpToPresentationTarget(event, "presentation-start")}
    >
      <ArrowLeft size={12} aria-hidden="true" />
      Agenda
    </a>
  );
}

function SlideShell({
  chapter,
  index,
  children
}: {
  chapter: PresentationChapter;
  index: number;
  children: ReactNode;
}) {
  const page = pageLabel(index);
  return (
    <section className={`pres-slide tone-${chapter.tone} slide-${chapter.id}`} id={chapter.id} aria-label={`${page} ${chapter.title}`}>
      <div className="pres-slide-inner">
        <span className="pres-page-flag">{page}</span>
        <AgendaBackLink />
        <div className="pres-slide-copy">
          <span className="pres-kicker">{page} | {chapter.time} | {String(index + 1).padStart(2, "0")} / {presentationChapters.length}</span>
          <small className="pres-agenda-label">{chapter.agenda}</small>
          <h2>{chapter.headline}</h2>
          <p>{chapter.punch}</p>
          <DetailLinks chapter={chapter} />
        </div>
        <div className="pres-visual">{children}</div>
      </div>
    </section>
  );
}

function CommercialPresentationSlide({
  chapter,
  index,
  onOpenLightbox
}: {
  chapter: PresentationChapter;
  index: number;
  onOpenLightbox: OpenLightbox;
}) {
  const { unlocked } = useCommercialAccess();
  if (unlocked) {
    return (
      <SlideShell chapter={chapter} index={index}>
        <VisualFor kind={chapter.visual} chapterId={chapter.id} onOpenLightbox={onOpenLightbox} />
      </SlideShell>
    );
  }

  const page = pageLabel(index);
  return (
    <section className={`pres-slide tone-${chapter.tone}`} id={chapter.id} aria-label={`${page} ${chapter.title}`}>
      <div className="pres-slide-inner">
        <span className="pres-page-flag">{page}</span>
        <AgendaBackLink />
        <div className="pres-slide-copy">
          <span className="pres-kicker">{page} | {chapter.time} | {String(index + 1).padStart(2, "0")} / {presentationChapters.length}</span>
          <small className="pres-agenda-label">{chapter.agenda}</small>
          <h2>Commercials are available on request.</h2>
          <p>
            This section contains rate cards, cost levers, discounts and customer ask capacity. Unlock it only when the
            commercial discussion is ready.
          </p>
        </div>
        <div className="pres-visual">
          <CommercialAccessPanel mode="presentation" />
        </div>
      </div>
    </section>
  );
}

function AgendaVisual() {
  return (
    <div className="pres-agenda-board">
      {originalAgenda.map((item) => (
        <a
          className={`pres-agenda-row ${item.owner === "Break" ? "break" : ""}`}
          href={`#${item.targetId}`}
          key={`${item.time}-${item.label}`}
          aria-label={`Open ${item.label}`}
          onClick={(event) => jumpToPresentationTarget(event, item.targetId)}
        >
          <div>
            <span>{item.time}</span>
            <strong>{item.label}</strong>
          </div>
          <small>{item.owner}</small>
          <ul>
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <ChevronRight size={18} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function ExecutivePlaceholderVisual() {
  return (
    <div className="pres-exec-board opening">
      <div className="pres-exec-card">
        <div className="pres-portrait" style={{ "--portrait": 0 } as CSSProperties & Record<"--portrait", number>}>
          <img src={sanjayPortrait} alt="Sanjay portrait" />
        </div>
        <strong>Sanjay</strong>
        <span>Managing Director, Publicis Sapient India</span>
        <small>Subject: Exec intros - PS in India</small>
      </div>
      <div className="pres-exec-later">
        <Users size={22} aria-hidden="true" />
        <span>1:00 - 2:00 PM session</span>
        <strong>India presence and transformation capability.</strong>
        <small>People + Product Strategy, Organization Transformation and People Transformation including talent management.</small>
      </div>
    </div>
  );
}

function SiteWalkthroughVisual() {
  const squads: Array<[string, string, string]> = [
    ["Pandora", "Retail platform context", pandoraCaseImage],
    ["ASO", "Development capability", asoCaseImage],
    ["Optum", "Scaled team operations", optumCaseImage],
    ["Kingfisher", "Multi-brand retail platform", kingfisherCaseImage],
    ["B&O", "Premium retail experience", boCaseImage]
  ];
  const cases: Array<[string, string, string]> = [
    ["ASO", "Development + platform + operations", asoCaseImage],
    ["Nissan", "Platform capabilities + operations", nissanCaseImage],
    ["Optum", "Data platform + operations", optumCaseImage]
  ];
  const focusAreas: Array<[string, string, PresentationIcon]> = [
    ["Integration", "Kafka, Kong, APIs and event operations.", Network],
    ["Data", "Databricks, medallion architecture, Unity Catalog and data reliability.", Database],
    ["DevOps", "AKS cluster operations, pipelines, platform engineering and run discipline.", GitBranch]
  ];
  return (
    <div className="pres-site-story">
      <div className="pres-site-picture" aria-label="Retail floor walkthrough illustration">
        <div className="pres-floor-lead">
          <MapPinned size={18} aria-hidden="true" />
          <span>Led by Ravi Shankar</span>
          <strong>India Retail CTO</strong>
        </div>
        <div className="pres-floor-path" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        {squads.map(([name, detail, image], index) => (
          <div className={`pres-floor-squad squad-${index + 1}`} key={name}>
            <img src={image} alt={`${name} brand marker`} />
            <strong>{name}</strong>
            <span>{detail}</span>
          </div>
        ))}
        <div className="pres-floor-engage">
          <Zap size={16} aria-hidden="true" />
          <span>Engage with team members during the walkthrough.</span>
        </div>
      </div>
      <section className="pres-case-walkthrough">
        <span>After the team-area walkthrough</span>
        <strong>Customer case walkthrough: ASO + Nissan + Optum</strong>
        <p>Selected to show development and platform capabilities in a practical customer setting.</p>
        <div className="pres-case-brand-grid">
          {cases.map(([name, detail, image]) => (
            <article className={`case-${name.toLowerCase()}`} key={name}>
              <img src={image} alt={`${name} case study brand visual`} />
              <small>{name}</small>
              <span>{detail}</span>
            </article>
          ))}
        </div>
      </section>
      <div className="pres-site-focus">
        {focusAreas.map(([title, detail, Icon]) => (
          <div key={title}>
            <Icon size={19} aria-hidden="true" />
            <strong>{title}</strong>
            <span>{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoothWalkthroughVisual() {
  const booths: Array<[string, string, string, string, string]> = [
    ["Booth 1", "McDonalds", "DevOps operations", "PAKS, portal/tooling, platform reliability and shift-left.", mcdonaldsCaseImage],
    ["Booth 2", "Loreal", "Data platform management", "Databricks, Power BI, governance, freshness and data reliability.", lorealCaseImage]
  ];
  const coverage: Array<[string, string, PresentationIcon]> = [
    ["Data service model", "Databricks, Power BI, Unity Catalog, DQ and reliability.", Database],
    ["Integration service model", "Kafka, Kong, APIs, schema quality and replay controls.", Network],
    ["DevOps platform ops", "AKS/PAKS, portal, golden paths, GitHub and tooling.", GitBranch],
    ["24x7 + incident", "On-call, incident command, MTTD, MTTA, MTTR and 99.99%.", ShieldCheck],
    ["AI load reduction", "Alert summary, triage assist, runbook recommendation and automation backlog.", Bot],
    ["Adoption + shift-left", "Direct team engagement, self-service, evidence and golden paths.", Users]
  ];
  return (
    <div className="pres-booth-visit">
      <div className="pres-booth-stage">
        {booths.map(([tag, name, role, detail, image]) => (
          <article key={name} className="pres-booth-card">
            <img src={image} alt={`${name} booth brand visual`} />
            <span>{tag}</span>
            <strong>{name}</strong>
            <small>{role}</small>
            <p>{detail}</p>
          </article>
        ))}
      </div>
      <div className="pres-booth-coverage" aria-label="Booth coverage summary">
        {coverage.map(([title, detail, Icon]) => (
          <div key={title}>
            <Icon size={17} aria-hidden="true" />
            <strong>{title}</strong>
            <span>{detail}</span>
          </div>
        ))}
      </div>
      <a className="pres-booth-route" href="/booth#booth-overview">
        <span>
          <strong>Open detailed booth route</strong>
          <small>All booth pages stay available for the deeper walkthrough.</small>
        </span>
        <ExternalLink size={15} aria-hidden="true" />
      </a>
    </div>
  );
}

function MeetTeamVisual({ onOpenLightbox }: { onOpenLightbox: OpenLightbox }) {
  type TeamMember = {
    name: string;
    role: string;
    source?: string;
    pending?: boolean;
    image?: string;
    imagePosition?: string;
    placeholderImage?: boolean;
  };
  const peopleGroups: Array<{
    track: string;
    role: string;
    Icon: PresentationIcon;
    members: TeamMember[];
  }> = [
    {
      track: "Leadership",
      role: "Overall engineering lead",
      Icon: Users,
      members: [
        { name: "Om Singh", role: "Overall Engineering Lead", image: omPortrait, imagePosition: "62% 42%" }
      ]
    },
    {
      track: "Data Platform",
      role: "Data leads",
      Icon: Database,
      members: [
        { name: "Manish Kukreti", role: "Data Lead" },
        { name: "Anil Yadav", role: "Data Lead" }
      ]
    },
    {
      track: "Kafka",
      role: "Technologists",
      Icon: Network,
      members: [
        { name: "Reena Sharma", role: "Sr. Technologist" },
        { name: "Navneet Singh", role: "Technologist", source: "Lloyds" },
        { name: "Amit Kumar V", role: "Technologist", source: "Marriott" }
      ]
    },
    {
      track: "BizTalk",
      role: "Legacy leads",
      Icon: ClipboardCheck,
      members: [
        { name: "Rajesh Sinha", role: "BizTalk Lead" },
        { name: "Banke Bihari", role: "BizTalk Lead" }
      ]
    },
    {
      track: "Infra - AKS",
      role: "DevOps specialists",
      Icon: GitBranch,
      members: [
        { name: "Vaibhav Chaturvedi", role: "DevOps Specialist" },
        { name: "Amit Shrivastava", role: "DevOps Specialist" },
        { name: "Amit Kumar 35", role: "DevOps Specialist" }
      ]
    },
    {
      track: "SRE",
      role: "To be confirmed",
      Icon: Users,
      members: [{ name: "Kalpesh to add", role: "SRE coverage", pending: true }]
    }
  ];
  const totalNamedPeople = peopleGroups.reduce((total, group) => total + group.members.filter((member) => !member.pending).length, 0);
  const initialsFor = (name: string) => {
    const usable = name.replace(/\d+/g, "").split(/\s+/).filter((part) => part.length > 0 && part.toLowerCase() !== "to");
    const first = usable[0]?.[0] ?? "";
    const last = usable.length > 1 ? usable[usable.length - 1]?.[0] ?? "" : "";
    return `${first}${last}`.toUpperCase() || "?";
  };
  const displayNameFor = (name: string) => {
    if (/to add/i.test(name)) return "To be named";
    return name.replace(/\s+\d+$/, "").trim();
  };
  const placeholderPortraits = [
    { image: sanjayPortrait, imagePosition: "50% 38%" },
    { image: shubhraPortrait, imagePosition: "50% 34%" },
    { image: tilakPortrait, imagePosition: "50% 34%" },
    { image: omPortrait, imagePosition: "62% 42%" }
  ];
  const namedMembers = peopleGroups
    .flatMap((group) => group.members.map((member) => ({ ...member, track: group.track })))
    .map((member, index) => {
      if (member.pending || member.image) return member;
      const placeholder = placeholderPortraits[index % placeholderPortraits.length];
      return { ...member, ...placeholder, placeholderImage: true };
    });
  const memberByName = new Map(namedMembers.map((member) => [member.name, member]));
  const openMember = (member: TeamMember & { track: string }) => {
    const roleLine = `${member.role}${member.source ? ` - ${member.source}` : ""}`;
    onOpenLightbox({
      eyebrow: "Indicative mugshot",
      title: member.name,
      body: member.pending
        ? `${member.track}: this role still needs a named resource.`
        : `${member.track}: ${roleLine}. ${member.placeholderImage ? "Placeholder portrait shown for slide completeness; replace with the actual photo when available." : member.image ? "Click-through photo shown from the slide." : "Same marker as the slide; replace with a real photo when available."}`,
      images: [],
      view: "team-member",
      person: {
        name: member.name,
        role: member.role,
        source: member.source,
        track: member.track,
        initials: initialsFor(member.name),
        image: member.image,
        imagePosition: member.imagePosition,
        placeholderImage: member.placeholderImage,
        pending: member.pending
      }
    });
  };
  const requestedRoles = 29;
  const remainingNamedRoles = requestedRoles - totalNamedPeople;
  const omMember = namedMembers.find((member) => member.name === "Om Singh");
  const visiblePeople = namedMembers.filter((member) => !member.pending);
  const pendingMembers = namedMembers.filter((member) => member.pending);
  const summaryTiles = [
    ["Customer ask", requestedRoles.toString(), "roles"],
    ["Named today", totalNamedPeople.toString(), "people"],
    ["Still to name", remainingNamedRoles.toString(), "roles"]
  ];
  const groupedPeople = [
    {
      label: "Data",
      people: namedMembers.filter((member) => member.track === "Data Platform")
    },
    {
      label: "DevOps / AKS",
      people: namedMembers.filter((member) => member.track === "Infra - AKS")
    },
    {
      label: "Integration",
      people: namedMembers.filter((member) => member.track === "Kafka" || member.track === "BizTalk")
    },
    {
      label: "SRE",
      people: pendingMembers
    }
  ];
  const capacityTracks: Array<{
    track: string;
    ask: string;
    required: number;
    named: number;
    remaining: string;
    scope: string;
    Icon: PresentationIcon;
    people: string[];
  }> = [
    {
      track: "DevOps / Cloud",
      ask: "8 DevOps engineers",
      required: 8,
      named: 3,
      remaining: "5 DevOps engineer names to confirm",
      scope: "AKS, GitHub, CI/CD, runners, IaC, observability and platform operations.",
      Icon: GitBranch,
      people: ["Vaibhav Chaturvedi", "Amit Shrivastava", "Amit Kumar 35"]
    },
    {
      track: "Data Platform",
      ask: "7 data engineers + 1 BA",
      required: 8,
      named: 2,
      remaining: "6 data role names to confirm",
      scope: "Databricks, Power BI, medallion architecture, Unity Catalog and pipeline reliability.",
      Icon: Database,
      people: ["Manish Kukreti", "Anil Yadav"]
    },
    {
      track: "Integration + Legacy",
      ask: "10 integration engineers + 1 QE + 1 BA",
      required: 12,
      named: 5,
      remaining: "7 integration / QE / BA names to confirm",
      scope: "Kafka, Kong, schemas, APIs, QE, technical BA, cutover and BizTalk knowledge capture.",
      Icon: Network,
      people: ["Reena Sharma", "Navneet Singh", "Amit Kumar V", "Rajesh Sinha", "Banke Bihari"]
    },
    {
      track: "Overall + SRE",
      ask: "1 engineering lead + SRE names",
      required: 1,
      named: 1,
      remaining: "SRE named coverage to confirm",
      scope: "Single accountable engineering owner, service governance, 24x7 escalation and SRE coverage.",
      Icon: Users,
      people: ["Om Singh"]
    }
  ];
  const governance = [
    ["Pandora on the wheel", "Pandora keeps priorities, gate approvals, risk acceptance and final staffing confirmation."],
    ["Overall engineering lead", "Om Singh identified · pairs with Pandora and orchestrates every track."]
  ];
  return (
    <div className="pres-meet-team">
      <div className="pres-team-roster">
        <div className="pres-team-roster-head">
          <span>People Pandora will meet</span>
          <strong>{totalNamedPeople} named specialists visible today.</strong>
          <p>Customer ask is {requestedRoles} roles across lead, DevOps, Data and Integration; {remainingNamedRoles} role names still need to be confirmed.</p>
        </div>
        {omMember ? (
          <button
            type="button"
            className="pres-meet-lead-card"
            onClick={() => openMember(omMember)}
            aria-label="Open mugshot for Om Singh"
          >
            <i aria-hidden="true">
              <img src={omMember.image} alt="" style={{ objectPosition: omMember.imagePosition }} />
            </i>
            <span>
              <small>Overall engineering lead</small>
              <strong>Om Singh</strong>
              <em>Accountable lead across DevOps, Data and Integration</em>
            </span>
          </button>
        ) : null}
        <div className="pres-team-summary-tiles" aria-label="Team staffing summary">
          {summaryTiles.map(([label, value, unit]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{unit}</small>
            </div>
          ))}
        </div>
        <div className="pres-team-groups" aria-label="Named people grouped by workstream">
          {groupedPeople.map((group) => (
            <section key={group.label}>
              <span>{group.label}</span>
              <div>
                {group.people.map((member) => (
                  <button
                    type="button"
                    className={member.pending ? "pending" : undefined}
                    key={`${group.label}-${member.name}`}
                    onClick={() => openMember(member)}
                    title={`${member.name} - ${member.track}`}
                    aria-label={`Open mugshot for ${member.name}`}
                  >
                    <i className="pres-team-person-avatar" aria-hidden="true">
                      {member.image ? <img src={member.image} alt="" style={{ objectPosition: member.imagePosition }} /> : <span>{initialsFor(member.name)}</span>}
                    </i>
                    <span className="pres-team-person-copy">
                      <strong>{displayNameFor(member.name)}</strong>
                      <small>{member.source ? `${member.role} · ${member.source}` : member.role}</small>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <div className="pres-team-wheel">
        {governance.map(([title, detail], index) => (
          <section className={index === 0 ? "pandora" : "lead"} key={title}>
            {index === 0 ? <ShieldCheck size={21} aria-hidden="true" /> : <Users size={21} aria-hidden="true" />}
            <span>{title}</span>
            <strong>{detail}</strong>
          </section>
        ))}
      </div>
      <div className="pres-team-tracks">
        {capacityTracks.map((track) => {
          const coverage = Math.min(100, Math.round((track.named / track.required) * 100));
          return (
          <section key={track.track}>
            <track.Icon size={20} aria-hidden="true" />
            <span>{track.ask}</span>
            <strong>{track.track}</strong>
            <p>{track.scope}</p>
            <div className="pres-team-meter" aria-label={`${track.track}: ${track.named} named in room of ${track.required} requested roles`}>
              <i style={{ width: `${coverage}%` } as CSSProperties} />
            </div>
            <div className="pres-team-fill">
              <b>{track.named}/{track.required} named in room</b>
              <small>{track.remaining}</small>
            </div>
            <div className="pres-team-avatars" aria-label={`${track.track} named people`}>
              {track.people.length > 0 ? track.people.map((person) => {
                const member = memberByName.get(person);
                return (
                  <button
                    type="button"
                    key={`${track.track}-${person}`}
                    title={person}
                    onClick={() => openMember(member ? member : { name: person, role: "Named specialist", track: track.track })}
                    aria-label={`Open mugshot for ${person}`}
                  >
                    {member?.image ? <img src={member.image} alt="" style={{ objectPosition: member.imagePosition }} /> : initialsFor(person)}
                  </button>
                );
              }) : (
                <button
                  type="button"
                  className="empty"
                  onClick={() => openMember({ name: "To be named", role: track.remaining, track: track.track, pending: true })}
                  aria-label={`Open role gap for ${track.track}`}
                >
                  TBN
                </button>
              )}
            </div>
          </section>
          );
        })}
      </div>
    </div>
  );
}

function RecapVisual({ onOpenLightbox }: { onOpenLightbox: OpenLightbox }) {
  const recap: Array<{
    date: string;
    label: string;
    title: string;
    body: string;
    proof: string;
    lightbox?: LightboxContent;
  }> = [
    {
      date: "May 2026",
      label: "RFS presentation",
      title: "Nexus agentic lifecycle",
      body: "We showed how the Nexus integration lifecycle could move from 113 activities and 11 gates into a cleaner 4-phase model while keeping governance.",
      proof: "Nexus: Discover, Build, Deploy, Operate",
      lightbox: nexusLifecycleLightbox
    },
    {
      date: "August 2026",
      label: "RFP presentation",
      title: "Agentic fabric at scale",
      body: "The RFP response scaled the Nexus thinking into Teams-based governance, graph memory, policy gates and efficient execution across the 30 scope items.",
      proof: "Fabric: graph, policy, evidence ledger",
      lightbox: fabricLightbox
    },
    {
      date: "September 2026",
      label: "Post-RFP discussion",
      title: "Ambition recalibrated",
      body: "Pandora's feedback was clear: the destination was attractive, but the adoption path felt too ambitious for day one transition risk.",
      proof: "Customer ask: alternative approach",
      lightbox: postRfpLightbox
    },
    {
      date: "1 October 2026",
      label: "Site Visit",
      title: "Revised path lands here",
      body: "The site visit anchors the revised proposal: run as-is first, stabilise, mature through gates, and activate agentic capability only where evidence exists.",
      proof: "Today: transition, maturity, Lane 2, commercials"
    }
  ];

  return (
    <div className="pres-journey-now">
      <div className="pres-journey-track" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      {recap.map((item, index) => {
        const cardBody = (
          <>
            <em>{item.date}</em>
            <span>{item.label}</span>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
            <small>{item.proof}</small>
            {item.lightbox ? (
              <i>
                <Maximize2 size={13} aria-hidden="true" />
                Open proof
              </i>
            ) : null}
            {index < recap.length - 1 ? <ArrowRight size={18} aria-hidden="true" /> : null}
          </>
        );
        const className = `pres-journey-card ${index === recap.length - 1 ? "current" : ""} ${item.lightbox ? "clickable" : ""}`;
        return item.lightbox ? (
          <button
            type="button"
            className={className}
            onClick={() => onOpenLightbox(item.lightbox as LightboxContent)}
            aria-label={`Open proof for ${item.title}`}
            key={item.title}
          >
            {cardBody}
          </button>
        ) : (
          <div className={className} key={item.title}>
            {cardBody}
          </div>
        );
      })}
      <div className="pres-journey-proof">
        <div>
          <strong>What changed?</strong>
          <span>Not the destination. The sequencing changed from agentic-first to evidence-first.</span>
        </div>
        <div>
          <strong>Why now?</strong>
          <span>The site visit lets us show the practical transition route, not just the north-star architecture.</span>
        </div>
      </div>
    </div>
  );
}

function RfsSummaryVisual() {
  const metrics = [
    ["17", "RFS slides"],
    ["3", "platform domains"],
    ["5", "workstreams"],
    ["113 -> 4", "Nexus lifecycle"]
  ];
  const coverage = [
    {
      title: "Platform scope",
      body: "DevOps tooling, Olympus data platform and Nexus integration platform, with scale context around engineers, applications, teams and Kafka event volume.",
      proof: "~650 engineers | ~100 Nexus apps | ~50 Olympus teams | 300M events/day"
    },
    {
      title: "Transition stance",
      body: "Sapient capability increases while incumbent dependency decreases, with shadow operations and progressive production responsibility transfer.",
      proof: "No single-day cutover"
    },
    {
      title: "Transformation workstreams",
      body: "Shared Kubernetes, ADO-to-GitHub, Kafka-to-Parquet, Agentic Nexus lifecycle and Observability sequenced across analysis, pilot and scale.",
      proof: "0-3M | 3-6M | 6-12M"
    },
    {
      title: "Agentic operating model",
      body: "Nexus agents, SDLC agents, DevOps agents and human gatekeepers, with approval gates retained where accountability cannot be delegated.",
      proof: "Humans govern; agents execute"
    }
  ];

  return (
    <div className="pres-rfs-summary">
      <div className="pres-rfs-visuals">
        <img className="pres-rfs-strip" src={rfsPandoraStrip} alt="RFS deck Pandora brand strip" />
        <div className="pres-rfs-image-grid">
          <img src={rfsRoute} alt="RFS deck route visual" />
          <img src={rfsPortrait} alt="RFS deck Pandora campaign visual" />
          <img src={rfsCover} alt="RFS deck cover thumbnail" />
        </div>
      </div>
      <div className="pres-rfs-story">
        <div className="pres-rfs-metrics">
          {metrics.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="pres-rfs-coverage">
          {coverage.map((item) => (
            <div key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
              <small>{item.proof}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TransitionVisual({
  enableTransformationVideo = false,
  onOpenLightbox
}: {
  enableTransformationVideo?: boolean;
  onOpenLightbox?: OpenLightbox;
}) {
  const journey = [
    ["As-is transition", "Run existing tooling, SLAs and processes without day-one change."],
    ["Stabilisation", "Use runtime evidence, shadowing and SMEs to close undocumented gaps."],
    ["Transformation", "Move selected items through maturity gates with rollback and ownership."],
    ["North star", "Agentic fabric becomes active only where guardrails and evidence are proven."]
  ];
  const cover = [
    ["Vendor docs missing", "Runtime discovery + reverse shadowing"],
    ["SME unavailable", "Sapient SME fill and pattern libraries"],
    ["Runbook weak", "Incident evidence converted into owned runbooks"],
    ["Ownership unclear", "Governance gate blocks full transition"]
  ];
  const showBaselineBridge = enableTransformationVideo && Boolean(onOpenLightbox);

  return (
    <div className="pres-transition">
      <div className={`pres-transition-road${showBaselineBridge ? " has-baseline-bridge" : ""}`}>
        {journey.map(([step, detail], index) => {
          const isTransformation = index === 2;
          const isNorthStar = index === 3;
          const isInteractive = enableTransformationVideo && Boolean(onOpenLightbox) && (isTransformation || isNorthStar);
          const cardBody = (
            <>
              <span>{index + 1}</span>
              <strong>{step}</strong>
              <small>{detail}</small>
              {isInteractive && isTransformation ? (
                <div className="pres-transition-actions">
                  <button type="button" onClick={() => onOpenLightbox?.(gatedControlVideoLightbox)}>
                    <Maximize2 size={13} aria-hidden="true" />
                    Watch gated flow
                  </button>
                  <button type="button" onClick={() => onOpenLightbox?.(dialInActionLightbox)}>
                    <Maximize2 size={13} aria-hidden="true" />
                    See dial in action
                  </button>
                </div>
              ) : null}
              {isInteractive && isNorthStar ? (
                <div className="pres-transition-actions">
                  <button type="button" onClick={() => onOpenLightbox?.(agenticFabricVideoLightbox)}>
                    <Maximize2 size={13} aria-hidden="true" />
                    Watch north star
                  </button>
                </div>
              ) : null}
            </>
          );
          const card = (
            <div className={`pres-transition-card${isInteractive ? " interactive" : ""}`}>
              {cardBody}
            </div>
          );
          return (
            <Fragment key={step}>
              {card}
              {showBaselineBridge && index === 1 ? (
                <button
                  type="button"
                  className="pres-transition-baseline-bridge"
                  onClick={() => onOpenLightbox?.(transitionBaselineLightbox)}
                >
                  <Maximize2 size={15} aria-hidden="true" />
                  <span>View baseline</span>
                </button>
              ) : null}
            </Fragment>
          );
        })}
      </div>
      <div className="pres-gap-map">
        {cover.map(([risk, response]) => (
          <div key={risk}>
            <small>{risk}</small>
            <ArrowRight size={14} aria-hidden="true" />
            <strong>{response}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function MaturityVisual() {
  const levels = [
    ["M0", "Unknown", "Evidence is missing or unverified. The item stays visible in transition instead of being accepted blindly."],
    ["M1", "Discovered", "Inventory and gaps are known. Owners, dependencies and evidence still need to be proven."],
    ["M2", "Run-ready", "Support can monitor, triage and run known actions while remaining gaps stay visible."],
    ["M3", "Risk-mitigated", "Ownership, alerts, runbooks, escalation and recovery evidence are reliable enough for governed operation."],
    ["M4", "Proactive", "Trends, SLOs and problem patterns help prevent repeat issues and guide improvement work."],
    ["M5", "Pandav-ready", "The pattern is structured enough for assisted operations with policy, evidence and human gates."]
  ];
  const dimensions = [
    "Documentation",
    "Inventory",
    "Ownership",
    "Dependencies",
    "SLOs",
    "Observability",
    "Alerting",
    "Runbooks",
    "Release",
    "Security",
    "Data quality",
    "Recovery",
    "Cost",
    "Knowledge",
    "Automation"
  ];
  const [activeLevel, setActiveLevel] = useState(2);
  const current = levels[activeLevel];

  return (
    <div className="pres-maturity">
      <div className="pres-maturity-purpose">
        <strong>Used during transition, not after transition.</strong>
        <p>
          The matrix lets us keep handover moving while collecting transparent evidence on where each platform item sits
          today. That baseline becomes the backlog: stabilise the weak points first, then lift maturity over time.
        </p>
      </div>
      <div className="pres-maturity-scale">
        {levels.map(([level, name], index) => (
          <button type="button" className={index === activeLevel ? "active" : ""} onClick={() => setActiveLevel(index)} key={level}>
            <strong>{level}</strong>
            <span>{name}</span>
          </button>
        ))}
      </div>
      <div className="pres-maturity-body">
        <div className="pres-maturity-ring" aria-label={`Selected maturity ${current[0]}`}>
          {dimensions.map((dimension, index) => {
            const score = Math.max(0, Math.min(5, activeLevel - (index % 3 === 0 ? 1 : 0)));
            return (
              <span
                key={dimension}
                className={score >= activeLevel && activeLevel > 0 ? "ready" : ""}
                style={{ "--i": index, "--score": score } as CSSProperties & Record<"--i" | "--score", number>}
                title={dimension}
              />
            );
          })}
          <strong>{current[0]}</strong>
          <small>{current[1]}</small>
        </div>
        <div className="pres-dimension-panel">
          <strong>{current[0]}: {current[1]}</strong>
          <p>{current[2]}</p>
          <div>
            {dimensions.map((dimension, index) => (
              <span key={dimension} className={index < activeLevel * 3 ? "on" : ""}>{dimension}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface LaneTwoItem {
  id: string;
  label: string;
  area: string;
  baseline: string;
  assist: string;
  higher: string;
  evidence: string[];
  stakeholders: string[];
}

const laneTwoItems: LaneTwoItem[] = [
  {
    id: "kafka",
    label: "Kafka connector",
    area: "Integration",
    baseline: "Support lag, restart and replay conventionally while owner and schema gaps are visible.",
    assist: "Pandav drafts schema-drift diagnosis, replay recommendation and connector recovery evidence.",
    higher: "Approved bounded replay or connector recovery pattern with audit, rollback and outcome review.",
    evidence: ["topic owner", "lag alert quality", "schema contract", "replay drill", "rollback route"],
    stakeholders: ["Pandora Integration Owner", "Ops L2/L3", "Security / Risk", "Sapient Kafka SME"]
  },
  {
    id: "databricks",
    label: "Databricks pipeline",
    area: "Data",
    baseline: "Operate rerun and backfill manually while lineage, freshness and ownership are made transparent.",
    assist: "Assistant prepares failed-run summary, lineage impact, backfill checklist and DQ evidence pack.",
    higher: "Approved rerun or freshness-triage pattern runs with guardrails and human outcome review.",
    evidence: ["job owner", "lineage", "freshness alert", "backfill rehearsal", "DQ threshold"],
    stakeholders: ["Pandora Data Owner", "Ops L2 Data", "Data L3 SME", "Business Report Owner"]
  },
  {
    id: "github",
    label: "GitHub runner",
    area: "DevOps",
    baseline: "Run release support through known routes while runner, secret and rollback gaps are closed.",
    assist: "Assistant drafts failed-build triage, flaky-test pattern and policy-gate repair recommendation.",
    higher: "Approved pipeline repair or recovery recipe executes only inside release guardrails.",
    evidence: ["repo owner", "runner baseline", "secret path", "rollback drill", "release evidence"],
    stakeholders: ["Pandora Platform Lead", "Ops L2 DevOps", "Ops L3 DevOps", "Release Owner"]
  },
  {
    id: "kong",
    label: "Kong API",
    area: "API Platform",
    baseline: "Support route, policy and consumer-impact issues while catalogue and SLO gaps are visible.",
    assist: "Assistant correlates gateway metrics, contract drift, failed auth and consumer impact.",
    higher: "Approved contract-health or policy-drift pattern recommends action with owner approval.",
    evidence: ["API owner", "consumer map", "SLO signal", "policy evidence", "rollback route"],
    stakeholders: ["Pandora API Owner", "Ops L2 Integration", "Architecture", "Sapient API SME"]
  }
];

const laneTwoSteps: Array<{
  id: string;
  label: string;
  title: string;
  kind: "level" | "gate" | "evidence";
  owner: string;
  detail: (item: LaneTwoItem) => string;
}> = [
  {
    id: "baseline",
    label: "Level 1",
    title: "Run baseline",
    kind: "level",
    owner: "Ops + service owner",
    detail: (item) => item.baseline
  },
  {
    id: "gate1",
    label: "Gate 1",
    title: "Assist gate",
    kind: "gate",
    owner: "Pandora owner + risk",
    detail: () => "Owner, audit, human approval and rollback are proven before the item moves into assisted improvement."
  },
  {
    id: "assist",
    label: "Level 2",
    title: "Assisted improvement",
    kind: "level",
    owner: "Improve & Evolve engineer",
    detail: (item) => item.assist
  },
  {
    id: "measure",
    label: "Prove",
    title: "Evidence period",
    kind: "evidence",
    owner: "Ops L2/L3 + governance",
    detail: () => "Incidents, SLOs, rollback success, usage and stakeholder confidence are measured before the next dial-up."
  },
  {
    id: "gate2",
    label: "Gate 2",
    title: "Higher-maturity gate",
    kind: "gate",
    owner: "Pandora governance",
    detail: () => "The item must show a stable assisted track record, passed incident drill, SLO adherence and evaluation evidence."
  },
  {
    id: "higher",
    label: "Level 3",
    title: "Higher maturity pattern",
    kind: "level",
    owner: "Pandora approves",
    detail: (item) => item.higher
  }
];

function LaneTwoVisual() {
  const [activeItemId, setActiveItemId] = useState(laneTwoItems[0].id);
  const [activeStep, setActiveStep] = useState(0);
  const activeItem = laneTwoItems.find((item) => item.id === activeItemId) ?? laneTwoItems[0];
  const currentStep = laneTwoSteps[activeStep] ?? laneTwoSteps[0];
  const progress = `${(activeStep / (laneTwoSteps.length - 1)) * 100}%`;

  return (
    <div className="pres-lane2">
      <div className="pres-lane2-picker" aria-label="Choose item moving through Lane 2">
        {laneTwoItems.map((item) => (
          <button
            type="button"
            className={item.id === activeItem.id ? "active" : ""}
            aria-pressed={item.id === activeItem.id}
            key={item.id}
            onClick={() => {
              setActiveItemId(item.id);
              setActiveStep(0);
            }}
          >
            <strong>{item.label}</strong>
            <span>{item.area}</span>
          </button>
        ))}
      </div>

      <div className="pres-lane2-rail" style={{ "--progress": progress } as CSSProperties}>
        <i aria-hidden="true" />
        {laneTwoSteps.map((step, index) => (
          <button
            type="button"
            className={`${step.kind} ${index === activeStep ? "active" : ""} ${index < activeStep ? "passed" : ""}`}
            aria-current={index === activeStep}
            key={step.id}
            onClick={() => setActiveStep(index)}
          >
            <span>{step.label}</span>
            <strong>{step.title}</strong>
          </button>
        ))}
      </div>

      <div className="pres-lane2-body">
        <section className="pres-lane2-current">
          <span>{activeItem.label} · {currentStep.label}</span>
          <strong>{currentStep.title}</strong>
          <p>{currentStep.detail(activeItem)}</p>
          <small>{currentStep.owner}</small>
        </section>

        <section className="pres-lane2-evidence">
          <span>Evidence collected before movement</span>
          <div>
            {activeItem.evidence.map((evidence) => (
              <strong key={evidence}>{evidence}</strong>
            ))}
          </div>
        </section>

        <section className="pres-lane2-stakeholders">
          <span>Stakeholders involved</span>
          <div>
            {activeItem.stakeholders.map((stakeholder) => (
              <strong key={stakeholder}>{stakeholder}</strong>
            ))}
          </div>
        </section>
      </div>

      <div className="pres-lane2-note">
        <ShieldCheck size={17} aria-hidden="true" />
        <span>Lane 2 is selective: the baseline nominates candidates, gates protect movement, and Pandora approves every dial-up.</span>
      </div>
    </div>
  );
}

function CasesVisual() {
  const cases: Array<[string, string, PresentationIcon]> = [
    ["ASO", "Development and operations proof from the team-area walkthrough.", Users],
    ["Nissan", "DevOps / Integration operating example from the morning visit.", Network],
    ["McDonalds", "DevOps showcase proof for the booth walkthrough.", GitBranch],
    ["Loreal", "Data Platform Management proof for the booth walkthrough.", Database],
    ["Case Study 5", "Transition and operating-model evidence tied to the revised proposal.", ClipboardCheck]
  ];

  return (
    <div className="pres-cases">
      {cases.map(([title, detail, Icon]) => (
        <div key={title}>
          <Icon size={24} aria-hidden="true" />
          <strong>{title}</strong>
          <p>{detail}</p>
          <small>Insert specific metric, visual or proof artifact during presentation</small>
        </div>
      ))}
    </div>
  );
}

function TeamOverviewVisual() {
  const streams: Array<[string, string, string, PresentationIcon]> = [
    ["DevOps", "8 FTE", "CI/CD, PAKS, IaC, GitHub, observability and platform on-call.", GitBranch],
    ["Data", "8 FTE", "7 Databricks / Power BI engineers plus delivery governance.", Database],
    ["Integration", "16 FTE", "Kafka/Kong engineers, QE, delivery leads and Kafka technical BAs.", Network],
    ["Legacy", "1 FTE", "Onsite BizTalk / legacy PM for vendor dependency and transition evidence.", ClipboardCheck]
  ];
  const buckets = [
    ["Base support", "Run service, incident flow, L1/L2/L3 routing and 24x7 on-call rota."],
    ["Improve & Evolve", "Engineering-minded capacity converts recurring toil into automation and better maturity."],
    ["Burst / SME", "Quarterly dial-up for migrations, specialist gaps, abnormal demand or Sapient SME pull-in."]
  ];

  return (
    <div className="pres-team-overview">
      <div className="pres-team-lead-card">
        <Users size={24} aria-hidden="true" />
        <div>
          <span>Placement logic</span>
          <strong>34 FTE steady team, one engineering lead</strong>
          <p>Not three disconnected squads: one backlog, one governance rhythm, domain depth where the platforms need it.</p>
        </div>
      </div>

      <div className="pres-team-streams">
        {streams.map(([label, fte, detail, Icon]) => (
          <div key={label}>
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
            <strong>{fte}</strong>
            <p>{detail}</p>
          </div>
        ))}
      </div>

      <div className="pres-team-ops">
        <section>
          <span>24x7 support model</span>
          <strong>Domain on-call, not night-shift staffing</strong>
          <p>DevOps, Data and Integration each carry primary / secondary cover. Major incidents pull the engineering lead and delivery leads into command.</p>
          <div>
            <small>DevOps P/S</small>
            <small>Data P/S</small>
            <small>Integration P/S</small>
            <small>Incident command</small>
          </div>
        </section>
        <section>
          <span>Capacity model</span>
          <strong>Run, improve and flex through explicit choices</strong>
          <ul>
            {buckets.map(([label, detail]) => (
              <li key={label}>
                <b>{label}</b>
                <em>{detail}</em>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="pres-team-footer">
        <ShieldCheck size={17} aria-hidden="true" />
        <span>Commercial levers remain protected in the detail site; this slide explains the operating shape before price.</span>
        <a href={detailHref("commercials", "team-overview")}>
          Commercial levers
          <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

function EngineeringLeadershipVisual() {
  const themes = [
    ["AI reassurance", "Where AI helps, where it stays gated, and how engineering accountability remains human-owned."],
    ["Innovation path", "How agentic capability is earned through maturity, evidence and adoption rather than forced day one."],
    ["Engineering quality", "Standards, review discipline, platform reliability and release confidence."],
    ["Capability depth", "Senior engineering depth across DevOps, Data and Integration."]
  ];

  return (
    <div className="pres-engineering-leadership">
      <div className="pres-engineering-profile">
        <figure className="pres-engineering-photo">
          <img src={tilakPortrait} alt="Tilak portrait" />
        </figure>
        <span>End-of-day executive session</span>
        <strong>Tilak Doddapaneni</strong>
        <p>Executive Vice President and Global Head of Engineering at Publicis Sapient</p>
      </div>
      <div className="pres-engineering-story">
        <span>What this session should land</span>
        <strong>AI, innovation and engineering confidence.</strong>
        <p>
          This is the senior engineering perspective on why the model can safely evolve: AI remains governed,
          innovation is evidence-led, and the engineering bar stays visible as support shifts into improvement.
        </p>
        <div>
          {themes.map(([label, detail]) => (
            <section key={label}>
              <b>{label}</b>
              <small>{detail}</small>
            </section>
          ))}
        </div>
      </div>
      <div className="pres-engineering-close">
        <ShieldCheck size={17} aria-hidden="true" />
        <span>Placed after the commercial and team discussion so Tilak can close on innovation confidence, AI guardrails and engineering depth.</span>
      </div>
    </div>
  );
}

function CommercialVisual() {
  const snapshot = getCommercialSnapshot(defaultCommercialControls);
  const bars = [
    { label: "Run Base", value: snapshot.runMonthly, tone: "tech" },
    { label: "Improve + Evolve", value: snapshot.evolveMonthly, tone: "people" },
    { label: "Customer Ask", value: snapshot.burstMonthly, tone: "proof" }
  ];
  const max = Math.max(...bars.map((bar) => bar.value), 1);
  const operating = [
    ["L1/L2/L3", "Ops support separated by case type"],
    ["Locations", "India, Romania and Denmark mix"],
    ["Talent", "Onboarding, backups, retention and knowledge transfer"],
    ["Levers", "FTE, billable days, day rates and discount"]
  ];

  return (
    <div className="pres-commercial">
      <div className="pres-commercial-disclaimer">
        <ShieldCheck size={16} aria-hidden="true" />
        <span>Dummy model: values are driven by the rate card, FTE, billable days and discounts. Replace with real inputs for actual cost.</span>
      </div>
      <div className="pres-operating-stack">
        {operating.map(([label, detail]) => (
          <div key={label}>
            <strong>{label}</strong>
            <span>{detail}</span>
          </div>
        ))}
      </div>
      <div className="pres-money-panel">
        {bars.map((bar) => (
          <div className={`pres-money-row tone-${bar.tone}`} key={bar.label}>
            <span>{bar.label}</span>
            <i><b style={{ width: `${Math.max(8, (bar.value / max) * 100)}%` }} /></i>
            <strong>EUR {Math.round(bar.value / 1000).toLocaleString("en-GB")}k</strong>
          </div>
        ))}
        <div className="pres-commercial-total">
          <span>Net monthly model</span>
          <strong>EUR {Math.round(snapshot.netMonthly / 1000).toLocaleString("en-GB")}k</strong>
        </div>
      </div>
    </div>
  );
}

function FaqVisual() {
  const faqTopics: Array<[string, string, PresentationIcon]> = [
    ["Transition", "What if the outgoing vendor does not hand over everything?", ShieldCheck],
    ["People", "How do people become effective and how do we retain knowledge?", Users],
    ["Staffing", "How fast can we get people across technology?", CalendarDays],
    ["Location", "Why GGN, Romania and Denmark?", MapPinned],
    ["Commercials", "How do we compete with TCS, Infosys and Tech Mahindra?", Gauge],
    ["Agentic", "When does Pandav become real, and when does it stay dormant?", Bot]
  ];

  return (
    <div className="pres-faq-map">
      {faqTopics.map(([label, question, FaqIcon]) => (
        <div key={label}>
          <FaqIcon size={22} aria-hidden="true" />
          <strong>{label}</strong>
          <small>{question}</small>
        </div>
      ))}
      <a href={detailHref("faq", "faq-close")}>
        Open FAQ
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    </div>
  );
}

function platformShortLabel(platform: ServicePlatform) {
  const labels: Record<string, string> = {
    paks: "PAKS",
    iac: "IaC",
    github: "GitHub",
    runners: "Run",
    portal: "Port",
    itsm: "ITSM",
    pagerduty: "PD",
    newrelic: "NR",
    databricks: "DBX",
    storage: "Delta",
    catalog: "UC",
    kafka: "Kafka",
    kong: "Kong",
    powerbi: "PBI",
    biztalk: "BizTalk",
    synapse: "EDW",
    "ai-ready": "AI"
  };
  return labels[platform.id] ?? platform.technology.slice(0, 8);
}

function presentationRadarPoint(index: number, total: number, value: number, outerRadius = 39) {
  const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
  const radius = (Math.max(0, Math.min(5, value)) / 5) * outerRadius;
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius
  };
}

function TransitionBaselineRadar({
  summaries,
  averageMaturity
}: {
  summaries: Array<{ platform: ServicePlatform; level: number }>;
  averageMaturity: number;
}) {
  const total = summaries.length;
  const points = summaries.map((summary, index) => presentationRadarPoint(index, total, summary.level));
  const polygon = points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
  const closingPoint = points[0] ? `${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}` : "";

  return (
    <svg className="pres-baseline-radar" viewBox="0 0 100 100" role="img" aria-label="Transition baseline radar across 17 scoped technology groups">
      {[1, 2, 3, 4, 5].map((ring) => (
        <circle className="pres-baseline-radar-ring" cx="50" cy="50" r={(ring / 5) * 39} key={ring} />
      ))}
      {summaries.map((summary, index) => {
        const outer = presentationRadarPoint(index, total, 5);
        const label = presentationRadarPoint(index, total, 5.72);
        return (
          <g key={summary.platform.id}>
            <line className="pres-baseline-radar-axis" x1="50" y1="50" x2={outer.x} y2={outer.y} />
            <text
              className="pres-baseline-radar-label"
              x={label.x}
              y={label.y}
              textAnchor={label.x < 42 ? "end" : label.x > 58 ? "start" : "middle"}
              dominantBaseline={label.y < 44 ? "text-after-edge" : label.y > 56 ? "text-before-edge" : "middle"}
            >
              {platformShortLabel(summary.platform)}
            </text>
          </g>
        );
      })}
      <polygon className="pres-baseline-radar-area" points={polygon} />
      <polyline className="pres-baseline-radar-line" points={`${polygon} ${closingPoint}`} />
      {points.map((point, index) => (
        <circle className="pres-baseline-radar-dot" cx={point.x} cy={point.y} r="1.5" key={summaries[index].platform.id} />
      ))}
      <text className="pres-baseline-radar-core" x="50" y="48" textAnchor="middle">
        M{averageMaturity.toFixed(1)}
      </text>
      <text className="pres-baseline-radar-sub" x="50" y="54" textAnchor="middle">
        estate
      </text>
    </svg>
  );
}

function TransitionBaselinePanel() {
  const [activeHorizon, setActiveHorizon] = useState(0);
  const dimensionMarks = dimensionMarksFromHorizon(activeHorizon);
  const summaries = servicePlatforms.map((platform) => {
    const scores = dimensionMarks[platform.id];
    return { platform, scores, ...platformMaturityFromScores(scores) };
  });
  const levelValues = summaries.map((summary) => summary.level);
  const averageMaturity = averageScore(levelValues);
  const runReadyCount = summaries.filter((summary) => summary.level >= 2).length;
  const controlledCount = summaries.filter((summary) => summary.level >= 3).length;
  const proactiveCount = summaries.filter((summary) => summary.level >= 4).length;
  const gapCount = summaries.filter((summary) => summary.level <= 1).length;
  const horizon = maturityHorizons[activeHorizon] ?? maturityHorizons[0];

  return (
    <div className="pres-baseline-panel">
      <div className="pres-baseline-toolbar">
        <div>
          <span>Evidence horizon</span>
          <strong>{horizon.label} · {horizon.title}</strong>
        </div>
        <div className="pres-baseline-tabs" role="tablist" aria-label="Transition maturity horizon">
          {maturityHorizons.map((item, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={index === activeHorizon}
              key={item.id}
              onClick={() => setActiveHorizon(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pres-baseline-body">
        <section className="pres-baseline-radar-card" aria-label="Transition maturity spider chart">
          <div className="pres-baseline-card-head">
            <span>Spider graph</span>
            <strong>{servicePlatforms.length} scoped technology groups</strong>
          </div>
          <TransitionBaselineRadar summaries={summaries} averageMaturity={averageMaturity} />
        </section>

        <section className="pres-baseline-summary" aria-label="Transition maturity summary">
          <div className="pres-baseline-summary-copy">
            <span>How to explain this</span>
            <strong>As-is transition starts the measurement, not the transformation.</strong>
            <p>
              We take over the running service, mark each technology conservatively from runtime evidence, then use
              stabilisation to raise weak dimensions: ownership, observability, recovery, runbooks, security and automation readiness.
            </p>
          </div>
          <div className="pres-baseline-kpis">
            <div>
              <span>Average mark</span>
              <strong>M{averageMaturity.toFixed(1)}</strong>
            </div>
            <div>
              <span>Run-ready</span>
              <strong>{runReadyCount}/{summaries.length}</strong>
            </div>
            <div>
              <span>Risk-mitigated+</span>
              <strong>{controlledCount}</strong>
            </div>
            <div>
              <span>M0/M1 gaps</span>
              <strong>{gapCount}</strong>
            </div>
            <div>
              <span>Proactive+</span>
              <strong>{proactiveCount}</strong>
            </div>
          </div>
          <a className="pres-baseline-detail-link" href={detailHref("transition-coverage", "revised-approach-p03")}>
            Open full maturity tracker
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </section>
      </div>

      <div className="pres-baseline-table" role="table" aria-label="Seventeen technology maturity rows">
        <div className="pres-baseline-table-head" role="row">
          <span role="columnheader">Technology group</span>
          <span role="columnheader">Maturity</span>
          <span role="columnheader">Weakest evidence</span>
          <span role="columnheader">Decision</span>
        </div>
        {summaries.map(({ platform, level, weakestDimension, weakestScore }) => {
          const Icon = platform.Icon;
          return (
            <div className="pres-baseline-row" role="row" key={platform.id}>
              <span className="pres-baseline-tech" role="cell">
                <Icon size={15} aria-hidden="true" />
                <span>
                  <strong>{platform.technology}</strong>
                  <small>{platform.domain}</small>
                </span>
              </span>
              <span className={`pres-baseline-pill ${scoreTone(level)}`} role="cell">{maturityLabel(level)}</span>
              <span className="pres-baseline-weakest" role="cell">
                <strong>{weakestDimension.abbr} {maturityLabel(weakestScore)}</strong>
                <small>{weakestDimension.short}</small>
              </span>
              <span className={`pres-baseline-decision tone-${platform.decisionTone}`} role="cell">{platform.decision}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PresentationLightbox({ content, onClose }: { content: LightboxContent | null; onClose: () => void }) {
  if (!content) return null;
  const mediaCount = content.images.length + (content.video ? 1 : 0);
  const viewClass = content.view ? `view-${content.view}` : "";

  return (
    <div className="pres-lightbox-backdrop" role="presentation" onClick={onClose}>
      <section
        className={`pres-lightbox media-count-${mediaCount} image-count-${content.images.length} ${content.video ? "has-video" : ""} ${viewClass}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pres-lightbox-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="pres-lightbox-close" onClick={onClose} aria-label="Close visual proof">
          <X size={18} aria-hidden="true" />
          <span>Esc</span>
        </button>
        <div className="pres-lightbox-head">
          <span>{content.eyebrow}</span>
          <h3 id="pres-lightbox-title">{content.title}</h3>
          <p>{content.body}</p>
        </div>
        <div className="pres-lightbox-grid">
          {content.view === "team-member" && content.person ? (
            <TeamMemberPassport person={content.person} />
          ) : content.view === "transition-baseline" ? (
            <TransitionBaselinePanel />
          ) : (
            <>
              {content.video ? (
                <figure className="pres-lightbox-video-frame">
                  <video src={content.video.src} controls autoPlay muted loop playsInline />
                  <figcaption>
                    <strong>{content.video.label}</strong>
                    <span>{content.video.caption}</span>
                  </figcaption>
                </figure>
              ) : null}
              {content.images.map((image) => (
                <figure key={image.label}>
                  <img src={image.src} alt={image.alt} />
                  <figcaption>
                    <strong>{image.label}</strong>
                    <span>{image.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function TeamMemberPassport({ person }: { person: LightboxPerson }) {
  const roleLine = `${person.role}${person.source ? ` - ${person.source}` : ""}`;
  return (
    <div className="pres-passport-card">
      <div className={`pres-passport-photo ${person.pending ? "pending" : ""}`}>
        {person.image ? (
          <img
            src={person.image}
            alt={`${person.name} passport style mugshot`}
            style={{ objectPosition: person.imagePosition }}
          />
        ) : <span>{person.initials}</span>}
      </div>
      <div className="pres-passport-meta">
        <span>{person.track}</span>
        <strong>{person.name}</strong>
        <p>{roleLine}</p>
      </div>
    </div>
  );
}

function VisualFor({
  kind,
  chapterId,
  onOpenLightbox
}: {
  kind: PresentationVisual;
  chapterId: string;
  onOpenLightbox: OpenLightbox;
}) {
  if (kind === "agenda") return <AgendaVisual />;
  if (kind === "exec") return <ExecutivePlaceholderVisual />;
  if (kind === "recap") return <RecapVisual onOpenLightbox={onOpenLightbox} />;
  if (kind === "rfs") return <RfsSummaryVisual />;
  if (kind === "sitevisit") return <SiteWalkthroughVisual />;
  if (kind === "boothvisit") return <BoothWalkthroughVisual />;
  if (kind === "meetteam") return <MeetTeamVisual onOpenLightbox={onOpenLightbox} />;
  if (kind === "transition") {
    return (
      <TransitionVisual
        enableTransformationVideo={chapterId === "revised-approach-p03"}
        onOpenLightbox={onOpenLightbox}
      />
    );
  }
  if (kind === "maturity") return <MaturityVisual />;
  if (kind === "lane2") return <LaneTwoVisual />;
  if (kind === "cases") return <CasesVisual />;
  if (kind === "team") return <TeamOverviewVisual />;
  if (kind === "engineering") return <EngineeringLeadershipVisual />;
  if (kind === "commercials") return <CommercialVisual />;
  return <FaqVisual />;
}

export function BackToPresentationLink() {
  const [href] = useState(() => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    if (params.get("from") !== "presentation") return null;
    return `/presentation#${params.get("return") ?? "overview"}`;
  });

  if (!href) return null;
  return (
    <a className="back-to-presentation" href={href}>
      <ArrowLeft size={15} aria-hidden="true" />
      Back to presentation
    </a>
  );
}

export function PresentationSite() {
  const [lightbox, setLightbox] = useState<LightboxContent | null>(null);
  const allLinkedIds = new Set(presentationChapters.flatMap((chapter) => chapter.detailIds));
  const unlinkedSections = navSections.filter((section) => !allLinkedIds.has(section.id));

  useEffect(() => {
    if (!lightbox) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [lightbox]);

  return (
    <div className="presentation-site">
      <PresentationNav />

      <header className="pres-hero" id="presentation-start">
        <div className="pres-hero-copy">
          <span className="pres-kicker">Site visit agenda</span>
          <h1>Pandora T&amp;SF - Site Visit</h1>
          <p>Part of the ongoing RFP process to choose the right platform partner: see real operations, meet the proposed team, review the revised approach, and close the commercial, AI and innovation questions.</p>
          <div className="pres-hero-actions">
            <a href="#site-walkthrough">
              Start walkthrough
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a href={detailHref("hero-anchor", "presentation-start")}>
              Detail site
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="pres-hero-board">
          <div className="pres-pandora-visual" aria-label="Pandora branded workshop visual">
            <figure>
              <img src="/pandora/model1.webp" alt="Pandora jewellery campaign model wearing layered necklaces" />
            </figure>
            <figure>
              <img src="/pandora/model2.webp" alt="Pandora jewellery campaign model wearing gold bracelets" />
            </figure>
            <div>
              <span>Pandora TS&F</span>
              <strong>Site visit agenda</strong>
              <small>Ongoing RFP process - Platform partner selection</small>
            </div>
          </div>
          <AgendaVisual />
        </div>
      </header>

      {presentationChapters.map((chapter, index) =>
        chapter.visual === "commercials" ? (
          <CommercialPresentationSlide chapter={chapter} index={index} onOpenLightbox={setLightbox} key={chapter.id} />
        ) : (
          <SlideShell chapter={chapter} index={index} key={chapter.id}>
            <VisualFor kind={chapter.visual} chapterId={chapter.id} onOpenLightbox={setLightbox} />
          </SlideShell>
        )
      )}

      {unlinkedSections.length > 0 ? (
        <section className="pres-link-audit" aria-label="All remaining detailed links">
          {unlinkedSections.map((section) => (
            <a href={detailHref(section.id, "faq-close")} key={section.id}>#{section.id}</a>
          ))}
        </section>
      ) : null}

      <section className="pres-slide pres-close" id="presentation-close">
        <div className="pres-close-inner">
          <span className="pres-page-flag pres-page-flag-close">{closePageLabel}</span>
          <AgendaBackLink />
          <Zap size={26} aria-hidden="true" />
          <h2>Run as-is. Prove maturity. Earn the fabric.</h2>
          <div className="pres-close-grid">
            {horizons.map((horizon) => (
              <div key={horizon.id}>
                <span>{horizon.date}</span>
                <strong>{horizon.stage}</strong>
                <small>{horizon.months}</small>
              </div>
            ))}
          </div>
          <a href={detailHref("ask-final", "presentation-close")}>
            Final ask
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
      <PresentationLightbox content={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}
