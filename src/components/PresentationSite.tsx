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
import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from "react";
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
const sanjayPortrait = new URL("../assets/presentation/exec/sanjay.webp", import.meta.url).href;
const tilakPortrait = new URL("../assets/presentation/exec/tilak.jpg", import.meta.url).href;
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
  view?: "transition-baseline";
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
    time: "9:45 - 11:00",
    label: "Exec introduction + India presence",
    owner: "PS leadership slides",
    points: ["Opening executive context", "India presence", "PS specifics"]
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
    owner: "Portal + proof walkthrough",
    points: ["DevOps, Data, Integration proof", "Lane 2 movement", "Real operations flow"]
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
    points: ["Team and locations", "Talent and onboarding", "Tilak engineering leadership", "Commercial levers"]
  }
];

const presentationChapters: PresentationChapter[] = [
  {
    id: "exec-presence",
    time: "9:45 - 11:00",
    agenda: "Exec introduction + India presence",
    title: "Exec + India",
    headline: "Opening leadership anchors India presence.",
    punch: "Page 01 now keeps the opening executive context focused on Sanjay and the India presence. The engineering leadership discussion moves to the end of the day with Tilak.",
    talkTrack: ["Sanjay opening placeholder", "India presence", "PS specifics", "Engineering leadership later"],
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
    headline: "Handover continues while maturity becomes transparent.",
    punch: "We do not wait for perfect handover. During transition, every scoped item gets an evidence-based M0-M5 baseline so gaps are visible, priorities are clear, and improvement work moves the estate to a better state over time.",
    talkTrack: ["Transition keeps moving", "Evidence baseline by item", "Prioritise gaps transparently", "Improve maturity over time"],
    tone: "accent",
    visual: "maturity",
    detailIds: ["dial-explorer", "walkthroughs", "goals", "proof", "pandora", "start"]
  },
  {
    id: "lane2-movement",
    time: "1:00 - 2:30",
    agenda: "Deep dive augmented with client case studies",
    title: "Lane 2 Movement",
    headline: "Lane 2 moves one item at a time through evidence gates.",
    punch: "The maturity matrix creates candidates, not a forced transformation wave. Each item enters Lane 2 with a Pandora owner, evidence, rollback, stakeholder sign-off and a clear reason to move from run-as-is to assisted, then to a higher maturity pattern only when Gate 2 passes.",
    talkTrack: ["Candidate from maturity baseline", "Gate 1 unlocks assist", "Evidence period proves stability", "Gate 2 unlocks higher maturity", "Pandora approves every move"],
    tone: "tech",
    visual: "lane2",
    detailIds: ["twolane", "foundations", "dial-explorer", "walkthroughs", "horizons"]
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
    id: "team-overview",
    time: "3:00 - 4:00",
    agenda: "Operating model & commercials",
    title: "Team Overview",
    headline: "One engineering team runs, improves and flexes on demand.",
    punch: "We position a 34 FTE steady team across DevOps, Data and Integration, backed by domain on-call, one engineering lead, delivery governance and optional burst capacity when Pandora wants to dial up demand.",
    talkTrack: ["34 FTE steady team", "24x7 domain on-call rota", "One engineering lead", "Run + Improve + Burst capacity", "Pandora owns gates and priorities"],
    tone: "people",
    visual: "team",
    detailIds: ["team-shape", "team-leader", "team-skills", "team-capacity", "commercials"]
  },
  {
    id: "engineering-leadership",
    time: "End of day",
    agenda: "Engineering leadership session",
    title: "Engineering Leadership",
    headline: "Engineering leadership closes the operating model story.",
    punch: "Tilak, Executive Vice President and Global Head of Engineering at Publicis Sapient, connects the proposed model to engineering quality, capability depth, transformation safety and the route from run to evolve.",
    talkTrack: ["Engineering bar", "Scaled delivery quality", "Capability depth", "Run-to-evolve path", "Leadership Q&A"],
    tone: "people",
    visual: "engineering",
    detailIds: ["team-shape", "team-leader", "team-skills", "team-capacity", "faq"]
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
        <div className="pres-slide-copy">
          <span className="pres-kicker">{page} | {chapter.time} | {String(index + 1).padStart(2, "0")} / {presentationChapters.length}</span>
          <small className="pres-agenda-label">{chapter.agenda}</small>
          <h2>Commercials are available on request.</h2>
          <p>
            This section contains rate cards, cost levers, discounts and customer ask capacity. Unlock it only when the
            commercial discussion is ready.
          </p>
          <div className="pres-talk-track" aria-label={`${chapter.title} locked talk track`}>
            <span>Restricted content</span>
            <span>Password required</span>
            <span>Presenter controlled</span>
          </div>
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
  return (
    <div className="pres-exec-board opening">
      <div className="pres-exec-card">
        <div className="pres-portrait" style={{ "--portrait": 0 } as CSSProperties & Record<"--portrait", number>}>
          <img src={sanjayPortrait} alt="Sanjay portrait" />
        </div>
        <strong>Sanjay</strong>
        <span>Managing Director, Publicis Sapient India</span>
        <small>Subject: Exec introduction + India presence</small>
      </div>
      <a className="pres-exec-later" href="#engineering-leadership">
        <CalendarDays size={22} aria-hidden="true" />
        <span>Later in the day</span>
        <strong>Engineering leadership session moves to Tilak.</strong>
        <small>End-of-day discussion after the operating model overview.</small>
      </a>
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
    ["DevOps", "Platform transition, CI/CD, observability, DORA and operating-model proof.", GitBranch],
    ["Data", "Databricks, Power BI, Unity Catalog, lineage, data quality and cost governance proof.", Database],
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
    ["Quality bar", "Engineering standards, review discipline and release confidence."],
    ["Capability depth", "How we staff senior engineering depth across DevOps, Data and Integration."],
    ["Transformation safety", "Why maturity gates protect the customer while the model evolves."],
    ["Talent system", "How onboarding, backups, retention and knowledge transfer keep continuity."]
  ];

  return (
    <div className="pres-engineering-leadership">
      <div className="pres-engineering-profile">
        <figure className="pres-engineering-photo">
          <img src={tilakPortrait} alt="Tilak portrait" />
        </figure>
        <span>End-of-day executive session</span>
        <strong>Tilak</strong>
        <p>Executive Vice President and Global Head of Engineering at Publicis Sapient</p>
      </div>
      <div className="pres-engineering-story">
        <span>What this session should land</span>
        <strong>From proposed team shape to engineering confidence.</strong>
        <p>
          This is the senior engineering perspective on why the operating model can work: depth in the right domains,
          visible gates, quality discipline and a practical route from support stability to platform improvement.
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
        <span>Placed after the Team Overview so Tilak can respond to the proposed support model, engineering setup and maturity path.</span>
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
          {content.view === "transition-baseline" ? (
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
          <span className="pres-page-flag pres-page-flag-cover">{coverPageLabel}</span>
          <span className="pres-kicker">{coverPageLabel} | Presentation mode</span>
          <h1>Pandora TS&F customer workshop</h1>
          <p>Agenda-led story with executive placeholders, Nexus proof, revised proposal, maturity gates, Lane 2 movement, operating model and commercials.</p>
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
