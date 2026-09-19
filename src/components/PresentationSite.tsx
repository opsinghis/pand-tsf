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
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { brand, horizons, navSections } from "../data/alternative";
import { defaultCommercialControls, getCommercialSnapshot } from "./AltCommercials";

const fabricArchitecture = new URL("../assets/presentation/agentic-fabric-architecture.webp", import.meta.url).href;
const dialInActionImage = new URL("../assets/presentation/dial-in-action.webp", import.meta.url).href;
const nexusCurrentImage = new URL("../assets/presentation/nexus/nexus-current.webp", import.meta.url).href;
const nexusProposedImage = new URL("../assets/presentation/nexus/nexus-proposed.webp", import.meta.url).href;
const sanjayPortrait = new URL("../assets/presentation/exec/sanjay.webp", import.meta.url).href;
const shubhraPortrait = new URL("../assets/presentation/exec/shubhra.webp", import.meta.url).href;
const twoLanesApproachImage = new URL("../assets/presentation/twolanes-approach.webp", import.meta.url).href;
const rfsCover = new URL("../assets/presentation/rfs/rfs-cover.jpg", import.meta.url).href;
const rfsPandoraStrip = new URL("../assets/presentation/rfs/rfs-pandora-strip.jpg", import.meta.url).href;
const rfsPortrait = new URL("../assets/presentation/rfs/rfs-portrait.jpg", import.meta.url).href;
const rfsRoute = new URL("../assets/presentation/rfs/rfs-route.jpg", import.meta.url).href;

type PresentationTone = "accent" | "tech" | "people" | "ops" | "gov" | "proof";
type PresentationVisual =
  | "agenda"
  | "exec"
  | "recap"
  | "rfs"
  | "transition"
  | "maturity"
  | "booth"
  | "cases"
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
  talkTrack: string[];
  tone: PresentationTone;
  visual: PresentationVisual;
  detailIds: string[];
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

interface LightboxContent {
  eyebrow: string;
  title: string;
  body: string;
  images: LightboxImage[];
  video?: LightboxVideo;
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
  title: "Gate-controlled transformation in motion.",
  body: "The video shows how an item moves only when the right gate is passed, keeping transformation sequenced, visible and reversible.",
  images: [],
  video: {
    src: "/video/gatedcontrol.mp4",
    label: "Gated control walkthrough",
    caption: "Transformation moves through controlled gates instead of jumping directly to the north star."
  }
};

const dialInActionLightbox: LightboxContent = {
  eyebrow: "P03 Transformation proof",
  title: "Dial in action: human control shifts only when the level rises.",
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
    time: "9:45 - 11:00",
    label: "Exec introduction + India presence",
    owner: "PS leadership slides",
    points: ["PS specifics", "People + Product Strategy", "Organization Transformation", "People Transformation"]
  },
  {
    time: "10:45 - 12:15",
    label: "Revised proposal, open Q&A",
    owner: "Portal-led",
    points: ["What we covered", "Alignment to alternative ask", "Transition, stabilisation, transformation, north star"]
  },
  {
    time: "12:15 - 1:00",
    label: "Lunch",
    owner: "Break",
    points: ["Pause"]
  },
  {
    time: "1:00 - 2:30",
    label: "Deep dive with case studies",
    owner: "Portal + booths",
    points: ["DevOps, Data, Integration proof", "Booth walkthrough", "Real operations flow"]
  },
  {
    time: "2:30 - 2:45",
    label: "Coffee Break",
    owner: "Break",
    points: ["Pause"]
  },
  {
    time: "3:00 - 4:00",
    label: "Operating model & commercials",
    owner: "Portal-led",
    points: ["Team and locations", "Talent and onboarding", "Pandora role", "Commercial levers"]
  }
];

const presentationChapters: PresentationChapter[] = [
  {
    id: "exec-presence",
    time: "9:45 - 11:00",
    agenda: "Exec introduction + India presence",
    title: "Exec + India",
    headline: "Leadership content stays as placeholder slides.",
    punch: "This chapter gives the room a polished holding structure while PS leadership brings the final executive and India presence material.",
    talkTrack: ["Placeholder portrait slots", "PS specifics stay customer-ready", "No duplication of leadership deck"],
    tone: "people",
    visual: "exec",
    detailIds: ["team-shape", "team-leader", "team-capacity"]
  },
  {
    id: "journey-until-now",
    time: "10:45 - 12:15",
    agenda: "Revised proposal, open Q&A",
    title: "Journey Until Now",
    headline: "The site visit is the fourth step in the same journey.",
    punch: "May proved the Nexus idea, August scaled it into the RFP response, September sharpened the concern, and 1 October is where we land the revised path.",
    talkTrack: ["May 2026: RFS presentation", "August 2026: RFP presentation", "September 2026: post-RFP discussion", "1 October 2026: site visit"],
    tone: "tech",
    visual: "recap",
    detailIds: ["hero-anchor", "changes", "scope", "goals"]
  },
  {
    id: "revised-approach-p03",
    time: "10:45 - 12:15",
    agenda: "Revised proposal, open Q&A",
    title: "Revised Approach",
    headline: "Same north star. Safer adoption path.",
    punch: "We run as-is first, stabilise, transform through maturity gates, then evolve only the items that have earned the move.",
    talkTrack: ["As-is transition", "Stabilisation baseline", "Transformation by evidence", "North star only after gates"],
    tone: "ops",
    visual: "transition",
    detailIds: ["dayone", "transition-coverage", "lanes-asis", "governance", "horizons"]
  },
  {
    id: "maturity-gates",
    time: "10:45 - 12:15",
    agenda: "Revised proposal, open Q&A",
    title: "Maturity Matrix",
    headline: "Every platform item moves through evidence, not aspiration.",
    punch: "M0 to M5 is assessed across documentation, ownership, observability, security, runbooks, data quality, recovery and automation.",
    talkTrack: ["M0 means unknown or unverified", "M2 means measured and repeatable", "M4 means automated with controls", "M5 means agent-assisted closed loop"],
    tone: "accent",
    visual: "maturity",
    detailIds: ["dial-explorer", "walkthroughs", "goals", "proof", "pandora", "start"]
  },
  {
    id: "showcase-booths",
    time: "1:00 - 2:30",
    agenda: "Deep dive augmented with client case studies",
    title: "Booth Walkthrough",
    headline: "Show the work moving through operations lanes.",
    punch: "Use Kafka, Databricks and Kong examples to show when L1, L2, L3 and Development each take the case.",
    talkTrack: ["Alert arrives with service context", "L1 confirms impact", "L2 restores service", "L3 removes recurrence", "Development changes product code when needed"],
    tone: "tech",
    visual: "booth",
    detailIds: ["team-skills", "team-converge", "dial-explorer", "walkthroughs", "transition-coverage"]
  },
  {
    id: "case-studies",
    time: "1:00 - 2:30",
    agenda: "Deep dive augmented with client case studies",
    title: "Client Cases",
    headline: "Proof slots are ready for the real customer stories.",
    punch: "The portal frames what each case must prove: transition under uncertainty, platform operations, data reliability and integration modernization.",
    talkTrack: ["DevOps proof", "Data proof", "Integration proof", "Operations proof", "Named cases inserted during presentation"],
    tone: "proof",
    visual: "cases",
    detailIds: ["proof", "faq", "goals", "team-capacity"]
  },
  {
    id: "operating-commercials",
    time: "3:00 - 4:00",
    agenda: "Operating model & commercials",
    title: "Operate + Price",
    headline: "Team, talent and commercials are one controllable model.",
    punch: "Location mix, FTE counts, rate cards, discounts and customer-ask capacity can be changed live to show cost impact.",
    talkTrack: ["Run Base staffing", "Improve and Evolve engineering", "Customer ask capacity", "One rate card source", "Pandora controls the levers"],
    tone: "people",
    visual: "commercials",
    detailIds: ["team-shape", "team-leader", "team-skills", "team-capacity", "commercials"]
  },
  {
    id: "faq-close",
    time: "4:00",
    agenda: "Open Q&A close",
    title: "FAQ Close",
    headline: "Hard questions are mapped to evidence.",
    punch: "Hostile transition, incomplete handover, onboarding, retention, speed to staff, locations and TCS/Infosys comparisons all have clear answers.",
    talkTrack: ["Transition risk", "Talent continuity", "Commercial competitiveness", "Proof cases", "Pandora role"],
    tone: "gov",
    visual: "faq",
    detailIds: ["faq", "commercials", "transition-coverage", "team-skills", "proof"]
  }
];

function detailHref(sectionId: string, returnId: string) {
  return `/?from=presentation&return=${encodeURIComponent(returnId)}#${sectionId}`;
}

function pageLabel(index: number) {
  return `P${String(index + 1).padStart(2, "0")}`;
}

const coverPageLabel = "P00";
const closePageLabel = pageLabel(presentationChapters.length);

function getSections(ids: string[]) {
  return ids.map((id) => sectionById.get(id)).filter((section): section is NonNullable<typeof section> => Boolean(section));
}

function DetailLinks({ chapterId, detailIds }: { chapterId: string; detailIds: string[] }) {
  const sections = getSections(detailIds);
  return (
    <div className="pres-detail-links" aria-label="Detailed section links">
      <span>Deep dive</span>
      <div>
        {sections.map((section) => (
          <a href={detailHref(section.id, chapterId)} key={section.id}>
            <em>{section.num}</em>
            <strong>{section.label}</strong>
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
    <section className={`pres-slide tone-${chapter.tone}`} id={chapter.id} aria-label={`${page} ${chapter.title}`}>
      <div className="pres-slide-inner">
        <span className="pres-page-flag">{page}</span>
        <div className="pres-slide-copy">
          <span className="pres-kicker">{page} | {chapter.time} | {String(index + 1).padStart(2, "0")} / {presentationChapters.length}</span>
          <small className="pres-agenda-label">{chapter.agenda}</small>
          <h2>{chapter.headline}</h2>
          <p>{chapter.punch}</p>
          <div className="pres-talk-track" aria-label={`${chapter.title} talk track`}>
            {chapter.talkTrack.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
          <DetailLinks chapterId={chapter.id} detailIds={chapter.detailIds} />
        </div>
        <div className="pres-visual">{children}</div>
      </div>
    </section>
  );
}

function AgendaVisual() {
  return (
    <div className="pres-agenda-board">
      {originalAgenda.map((item, index) => (
        <div className={`pres-agenda-row ${item.owner === "Break" ? "break" : ""}`} key={`${item.time}-${item.label}`}>
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
          {index < originalAgenda.length - 1 ? <ChevronRight size={18} aria-hidden="true" /> : null}
        </div>
      ))}
    </div>
  );
}

function ExecutivePlaceholderVisual() {
  const cards = [
    {
      subject: "Exec introduction + India presence",
      name: "Sanjay",
      title: "Managing Director, Publicis Sapient India",
      image: sanjayPortrait
    },
    {
      name: "Shubhra",
      title: "Global Chief Delivery Officer, Publicis Sapient",
      subject: "People + Product Strategy, Organization Transformation, People Transformation",
      image: shubhraPortrait
    }
  ];

  return (
    <div className="pres-exec-board">
      {cards.map((card, index) => (
        <div className="pres-exec-card" key={`${card.name}-${index}`}>
          <div className="pres-portrait" style={{ "--portrait": index } as CSSProperties & Record<"--portrait", number>}>
            <img src={card.image} alt={`${card.name} portrait`} />
          </div>
          <strong>{card.name}</strong>
          <span>{card.title}</span>
          <small>Subject: {card.subject}</small>
        </div>
      ))}
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
      proof: "Today: transition, maturity, booths, commercials"
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

function NexusCollapseVisual({ onOpenLightbox }: { onOpenLightbox: OpenLightbox }) {
  const phases = [
    {
      id: "discover",
      title: "Discover",
      replaces: "Groups A + B",
      before: "16 activities",
      now: "5 steps",
      gate: "Schema + Architecture Approval",
      bullets: ["Parse request", "Classify data", "Generate schema", "Create approval pack"]
    },
    {
      id: "build",
      title: "Build",
      replaces: "Groups C + D + E",
      before: "52 activities",
      now: "8 steps",
      gate: "Security Review if PII/SPD",
      bullets: ["Provision access", "Generate facade", "Wire IaC and CI/CD", "Run tests"]
    },
    {
      id: "deploy",
      title: "Deploy",
      replaces: "Group F",
      before: "15 activities",
      now: "4 steps per environment",
      gate: "UAT + PROD approvals",
      bullets: ["Validate readiness", "Request approval", "Deploy", "Run E2E validation"]
    },
    {
      id: "operate",
      title: "Operate",
      replaces: "Groups G + H + I + J",
      before: "Continuous activity set",
      now: "Event-driven operations",
      gate: "Incident escalation",
      bullets: ["Monitor", "Triage", "Resolve or escalate", "Learn continuously"]
    }
  ];
  const [active, setActive] = useState(0);
  const activePhase = phases[active];
  const activityMarkers = [
    ["Auto", 81, "72%"],
    ["Merged", 13, "11%"],
    ["Removed", 8, "7%"],
    ["Kept", 11, "10%"]
  ];

  return (
    <div className="pres-nexus">
      <div className="pres-nexus-topline">
        <div>
          <span>Original Nexus lifecycle</span>
          <strong>113 activities</strong>
          <small>10 groups | 9 phases | 11 gates</small>
        </div>
        <ArrowRight size={24} aria-hidden="true" />
        <div>
          <span>Agentic operating model</span>
          <strong>4 phases</strong>
          <small>~20 meaningful steps | 5 gates</small>
        </div>
      </div>
      <div className="pres-marker-grid" aria-label="Activity marker breakdown">
        {activityMarkers.map(([label, count, pct]) => (
          <div key={label}>
            <strong>{count}</strong>
            <span>{label}</span>
            <small>{pct}</small>
          </div>
        ))}
      </div>
      <div className="pres-phase-flow">
        {phases.map((phase, index) => (
          <button type="button" className={index === active ? "active" : ""} onClick={() => setActive(index)} key={phase.id}>
            <span>{phase.title}</span>
            <strong>{phase.now}</strong>
          </button>
        ))}
      </div>
      <div className="pres-phase-detail">
        <div>
          <span>{activePhase.replaces}</span>
          <strong>{activePhase.before} becomes {activePhase.now}</strong>
          <small>Gate retained: {activePhase.gate}</small>
        </div>
        <ul>
          {activePhase.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
      <button type="button" className="pres-visual-open" onClick={() => onOpenLightbox(nexusLifecycleLightbox)}>
        <Maximize2 size={15} aria-hidden="true" />
        Open lifecycle evidence
      </button>
    </div>
  );
}

function FabricVisual({ onOpenLightbox }: { onOpenLightbox: OpenLightbox }) {
  const fabricLayers = [
    ["Front doors", "Teams, ServiceNow, Port, GitHub, dashboards"],
    ["Agent layer", "Enablement, SDLC and Ops agents"],
    ["Core", "Graph, policy, approval, evidence ledger"],
    ["Estate", "AKS, Databricks, Unity Catalog, Kafka, Kong"]
  ];

  return (
    <div className="pres-fabric">
      <button type="button" className="pres-fabric-image" onClick={() => onOpenLightbox(fabricLightbox)} aria-label="Open Agentic Fabric architecture image">
        <img src={fabricArchitecture} alt="Agentic fabric architecture slide preview" />
        <span>
          <Maximize2 size={14} aria-hidden="true" />
          Open fabric image
        </span>
      </button>
      <div className="pres-fabric-layers">
        {fabricLayers.map(([layer, detail]) => (
          <div key={layer}>
            <strong>{layer}</strong>
            <span>{detail}</span>
          </div>
        ))}
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
    ["North star", "Agentic fabric becomes active only where controls and evidence are proven."]
  ];
  const cover = [
    ["Vendor docs missing", "Runtime discovery + reverse shadowing"],
    ["SME unavailable", "Sapient SME fill and pattern libraries"],
    ["Runbook weak", "Incident evidence converted into owned runbooks"],
    ["Ownership unclear", "Governance gate blocks full transition"]
  ];

  return (
    <div className="pres-transition">
      <div className="pres-transition-road">
        {journey.map(([step, detail], index) => {
          const isTransformation = index === 2;
          const isInteractive = enableTransformationVideo && isTransformation && onOpenLightbox;
          const cardBody = (
            <>
              <span>{index + 1}</span>
              <strong>{step}</strong>
              <small>{detail}</small>
              {isInteractive ? (
                <div className="pres-transition-actions">
                  <button type="button" onClick={() => onOpenLightbox?.(gatedControlVideoLightbox)}>
                    <Maximize2 size={13} aria-hidden="true" />
                    Watch gate control
                  </button>
                  <button type="button" onClick={() => onOpenLightbox?.(dialInActionLightbox)}>
                    <Maximize2 size={13} aria-hidden="true" />
                    See dial in action
                  </button>
                </div>
              ) : null}
            </>
          );
          return isInteractive ? (
            <div className="interactive" key={step}>
              {cardBody}
            </div>
          ) : (
            <div key={step}>{cardBody}</div>
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
    ["M0", "Unknown", "Not documented, not observable, ownership or runtime behavior unverified."],
    ["M1", "Known", "Inventory exists, but operation is manual and evidence is incomplete."],
    ["M2", "Repeatable", "Measured process, known runbook, manual execution still acceptable."],
    ["M3", "Monitored", "Owned dashboards, alerts and runbooks support reliable triage."],
    ["M4", "Automated", "Standard actions automated with approval, audit and rollback."],
    ["M5", "Agent-assisted", "Closed-loop assist with policy, evidence and human gates."]
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

function BoothVisual() {
  const lanes = [
    ["Signal", "Kafka lag / Databricks failure / Kong 5xx"],
    ["L1", "Confirm alert quality, business impact and known route"],
    ["L2", "Restore service: replay, rerun, scale, route or restart"],
    ["L3", "Remove recurrence: platform pattern, automation, SLO fix"],
    ["Dev", "Change code only when defect, schema or product logic requires it"]
  ];
  const examples = [
    ["Kafka lag", "L2 clears consumer issue; L3 tunes lag thresholds and replay; Dev changes consumer code only if defect exists."],
    ["Databricks job failure", "L2 reruns and restores; L3 hardens dependency checks; Dev fixes bad transform logic."],
    ["Kong 5xx spike", "L1 validates impact; L2 restores route; L3 strengthens gateway policy; Dev fixes API code if needed."]
  ];

  return (
    <div className="pres-booth">
      <div className="pres-booth-lanes">
        {lanes.map(([lane, action], index) => (
          <div key={lane}>
            <span>{index + 1}</span>
            <strong>{lane}</strong>
            <small>{action}</small>
          </div>
        ))}
      </div>
      <div className="pres-example-stack">
        {examples.map(([title, detail]) => (
          <div key={title}>
            <strong>{title}</strong>
            <span>{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CasesVisual() {
  const cases: Array<[string, string, PresentationIcon]> = [
    ["DevOps", "Platform transition, CI/CD, observability, DORA and operating-model proof.", GitBranch],
    ["Data", "Databricks, Power BI, Unity Catalog, lineage, data quality and cost control proof.", Database],
    ["Integration", "Kafka, Kong, BizTalk, API governance, event quality and migration proof.", Network],
    ["Operations", "24x7 run, incident triage, L1/L2/L3 separation and automation backlog proof.", ClipboardCheck]
  ];

  return (
    <div className="pres-cases">
      {cases.map(([title, detail, Icon]) => (
        <div key={title}>
          <Icon size={24} aria-hidden="true" />
          <strong>{title}</strong>
          <p>{detail}</p>
          <small>Insert named client case and metric during presentation</small>
        </div>
      ))}
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

function PresentationLightbox({ content, onClose }: { content: LightboxContent | null; onClose: () => void }) {
  if (!content) return null;
  const mediaCount = content.images.length + (content.video ? 1 : 0);

  return (
    <div className="pres-lightbox-backdrop" role="presentation" onClick={onClose}>
      <section
        className={`pres-lightbox media-count-${mediaCount} image-count-${content.images.length} ${content.video ? "has-video" : ""}`}
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
        </div>
      </section>
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
  if (kind === "transition") {
    return (
      <TransitionVisual
        enableTransformationVideo={chapterId === "revised-approach-p03"}
        onOpenLightbox={onOpenLightbox}
      />
    );
  }
  if (kind === "maturity") return <MaturityVisual />;
  if (kind === "booth") return <BoothVisual />;
  if (kind === "cases") return <CasesVisual />;
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
          <span className="pres-page-flag pres-page-flag-cover">{coverPageLabel}</span>
          <span className="pres-kicker">{coverPageLabel} | Presentation mode</span>
          <h1>Pandora TS&F customer workshop</h1>
          <p>Agenda-led story with executive placeholders, Nexus proof, revised proposal, maturity gates, booth flow, operating model and commercials.</p>
          <div className="pres-hero-actions">
            <a href="#exec-presence">
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
              <strong>Transition with the brand in the room.</strong>
              <small>DevOps · Data · Integration</small>
            </div>
          </div>
          <AgendaVisual />
        </div>
      </header>

      {presentationChapters.map((chapter, index) => (
        <SlideShell chapter={chapter} index={index} key={chapter.id}>
          <VisualFor kind={chapter.visual} chapterId={chapter.id} onOpenLightbox={setLightbox} />
        </SlideShell>
      ))}

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
