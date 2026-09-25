import { ChevronDown, HelpCircle, Link as LinkIcon, ListFilter } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal, Section } from "./primitives";

type FaqCategory = "Transition" | "People" | "Capability" | "Commercials" | "Proof";
type FaqCategoryFilter = FaqCategory | "All";

interface FaqLink {
  label: string;
  href: string;
}

interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string[];
  links: FaqLink[];
}

const faqCategories: FaqCategoryFilter[] = ["All", "Transition", "People", "Capability", "Commercials", "Proof"];

const faqs: FaqItem[] = [
  {
    id: "transition-imperfect-state",
    category: "Transition",
    question: "How will you transition from the under-documented current state?",
    answer: [
      "We do not depend only on incumbent-vendor documents. We run a transition factory that builds operational truth from runtime evidence: tickets, logs, dashboards, repositories, pipelines, configuration, access paths and production behaviour.",
      "Every component is moved through discovery, shadowing, reverse shadowing, runbook reconstruction, observability checks and a readiness gate. If evidence is missing, the item is explicitly marked as a gap, not silently accepted as transitioned."
    ],
    links: [
      { label: "Transition coverage", href: "#transition-coverage" },
      { label: "Day-one run as-is", href: "#dayone" },
      { label: "Gate 0 foundations", href: "#foundations" },
      { label: "Governance", href: "#governance" }
    ]
  },
  {
    id: "vendor-no-handover",
    category: "Transition",
    question: "What if the outgoing vendor does not hand over everything or the transition turns hostile?",
    answer: [
      "We treat incomplete handover as an expected transition risk, not as an exception. Missing artefacts become named transition gaps with an owner, evidence required, decision route and date.",
      "The permitted decisions are explicit: transition now, transition with risk mitigation, hold until evidence is complete, reverse-engineer through a governed backlog or burst pool, or mark for migration/retirement if the legacy path is not worth preserving.",
      "Where the gap needs specialist depth, we bring in Sapient SMEs as needed to close the evidence gap: Kafka schema and connector SMEs, Databricks/Power BI SMEs, DevOps platform SMEs, BizTalk SMEs or security/network SMEs. That gives the transition team access to depth without permanently over-staffing the run service."
    ],
    links: [
      { label: "Transition coverage", href: "#transition-coverage" },
      { label: "Landscape map", href: "#landscape" },
      { label: "Governance", href: "#governance" },
      { label: "Team capacity", href: "#team-capacity" }
    ]
  },
  {
    id: "onboarding-cost-process",
    category: "Commercials",
    question: "What is the onboarding cost and process?",
    answer: [
      "Standard mobilisation is part of the transition model: access setup, KT plan, shadowing, reverse shadowing, runbook familiarisation, service-readiness checks and reporting cadence.",
      "Exceptional reverse engineering is handled transparently. If undocumented BizTalk maps, Kafka schemas, pipelines, dashboards or platform dependencies need reconstruction, the work goes into a governed transition backlog or agreed burst-capacity pool rather than becoming hidden cost."
    ],
    links: [
      { label: "How we start", href: "#start" },
      { label: "Transition coverage", href: "#transition-coverage" },
      { label: "Transition coverage", href: "#transition-coverage" }
    ]
  },
  {
    id: "new-joiner-effectiveness",
    category: "People",
    question: "Does a new joiner become 100% effective immediately?",
    answer: [
      "No. We should be explicit that people ramp through a readiness path. A practical pattern is Week 1 at 25-40%, Weeks 2-3 at 50-60%, Weeks 4-6 at 70-80%, and Weeks 6-8 approaching full effectiveness, depending on the technology and production criticality.",
      "Critical ownership is not assigned just because someone has joined. The person shadows, reverse-shadows, handles supervised tickets and passes a readiness gate before independent ownership."
    ],
    links: [
      { label: "Skills & KT", href: "#team-skills" },
      { label: "Capacity that compounds", href: "#team-capacity" },
      { label: "Build-and-run team", href: "#team-converge" }
    ]
  },
  {
    id: "knowledge-retention",
    category: "People",
    question: "How do you retain talent and knowledge if people leave?",
    answer: [
      "We do not operate the service as a dependency on named individuals. We use role ownership, primary and secondary owners, documented runbooks, ticket history, RCA patterns, decision logs, dashboards and known-error records.",
      "Knowledge is captured into the operating system of the service. If one person leaves, the replacement inherits evidence, playbooks, context and backup ownership rather than starting from zero."
    ],
    links: [
      { label: "Skills & KT", href: "#team-skills" },
      { label: "One team, three locations", href: "#team-shape" },
      { label: "Governance", href: "#governance" }
    ]
  },
  {
    id: "skill-mobilisation",
    category: "Capability",
    question: "How fast can you get people across DevOps, Data, Kafka/Kong and BizTalk?",
    answer: [
      "Indicatively, PM/product/delivery roles can usually mobilise in 1-2 weeks, DevOps and Data engineers in 2-4 weeks, Kafka/Kong engineers in 3-5 weeks, and BizTalk specialists in 4-6 weeks depending on seniority, onsite need and background checks.",
      "For immediate gaps we use interim SMEs or burst capacity while permanent roles ramp. We should distinguish mobilisation speed from full production effectiveness; full ownership still requires onboarding and readiness evidence."
    ],
    links: [
      { label: "Team capacity", href: "#team-capacity" },
      { label: "Skills & KT", href: "#team-skills" },
      { label: "Team capacity", href: "#team-capacity" }
    ]
  },
  {
    id: "enough-capability",
    category: "Capability",
    question: "Do you have enough people and capability across the scope?",
    answer: [
      "We show one domain engineering team across DevOps, Data and Integration. The same engineers handle first response, restoration, code fixes, planned development and improvement; they rotate through after-hours and weekend on-call. There is no separate Ops L1 layer.",
      "The team capacity model shows the requested roles and the available run, improve and specialist coverage across DevOps, Databricks/Power BI, Kafka/Kong and BizTalk."
    ],
    links: [
      { label: "Skills & KT", href: "#team-skills" },
      { label: "Team capacity", href: "#team-capacity" },
      { label: "Scope of work", href: "#scope" },
      { label: "Your goals", href: "#goals" }
    ]
  },
  {
    id: "location-model",
    category: "People",
    question: "Why Gurgaon, Romania and Denmark?",
    answer: [
      "Gurgaon gives scale, cost efficiency, senior engineering depth and extended coverage. Romania gives European time-zone overlap, strong engineering depth and continuity between India and Denmark. Denmark is used selectively for customer proximity, onsite governance, legacy/vendor coordination and high-context decisions.",
      "The point is not to put every role in the cheapest or most expensive location. The point is to put the right work in the right place, then expose the location mix so the customer can see how it affects cost and coverage."
    ],
    links: [
      { label: "One team, three locations", href: "#team-shape" },
      { label: "Team and location model", href: "#team-shape" },
      { label: "Governance", href: "#governance" }
    ]
  },
  {
    id: "competitive-pricing",
    category: "Commercials",
    question: "How will you match players like TCS or Infosys?",
    answer: [
      "We should match them where the comparison is fair: scale roles, offshore delivery, transparent rate cards, volume discounts, service governance and predictable staffing. But we should not reduce the response to lowest-rate body-shopping.",
      "Our commercial response is total cost of service: location blend, editable rate card, term discount, volume discount, productivity dividend, engineering credit bank, burst-capacity model and a declining run-cost curve as automation removes repeated work."
    ],
    links: [
      { label: "Team capacity", href: "#team-capacity" },
      { label: "Cost of caution", href: "#caution" },
      { label: "Capacity that compounds", href: "#team-capacity" }
    ]
  },
  {
    id: "differentiation",
    category: "Proof",
    question: "How do we differentiate the response beyond people and rates?",
    answer: [
      "The differentiation is three-part: transition from an imperfect current state, enough capability to protect the run service, and proof that we have done comparable takeover work before.",
      "That means the response should lead with how we take ownership without perfect handover, how the team model avoids single-person dependency, and which cases prove transition, documentation, reverse shadow and stabilisation outcomes."
    ],
    links: [
      { label: "Transition coverage", href: "#transition-coverage" },
      { label: "Team skills", href: "#team-skills" },
      { label: "Why this is low-risk", href: "#proof" }
    ]
  },
  {
    id: "case-proof",
    category: "Proof",
    question: "Where do we show cases where we have done this before?",
    answer: [
      "Use the Proof section as the main evidence anchor, and connect it explicitly to the delivery cases we walked through during the presentation. The proof is not theoretical; it is based on cases where we have already delivered takeover, documentation rebuild, reverse shadow and stabilisation outcomes.",
      "The current proof card captures the presented Pandora delivery evidence: 100% readiness criteria met, 95%+ documentation and runbooks generated, 90%+ tickets resolved independently in reverse shadow, and 97%+ SLA achievement during stabilisation.",
      "For the customer conversation, each reference case should be explained as: starting point, scope, what gaps existed, what we rebuilt, what service outcomes improved and why it is relevant to Pandora's DevOps, Data, Integration and Legacy transition."
    ],
    links: [
      { label: "Why this is low-risk", href: "#proof" },
      { label: "Transition coverage", href: "#transition-coverage" },
      { label: "Journey", href: "#horizons" }
    ]
  }
];

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<FaqCategoryFilter>("All");
  const visibleFaqs = useMemo(
    () => faqs.filter((item) => activeCategory === "All" || item.category === activeCategory),
    [activeCategory]
  );

  return (
    <Section id="faq" num="25" title="FAQ - customer questions, answered with proof links">
      <p className="sec-sub wide">
        A single place to handle cross-cutting questions on transition risk, onboarding, people, capability, commercials and
        proof. Each answer links back to the section that supports it.
      </p>

      <Reveal className="faq-console">
        <div className="faq-head">
          <div>
            <span className="coverage-kicker">Customer Q&A map</span>
            <h3>Use this when the discussion jumps across topics</h3>
          </div>
          <div className="faq-filter" role="group" aria-label="Filter FAQ questions">
            <ListFilter size={15} aria-hidden="true" />
            {faqCategories.map((category) => (
              <button
                type="button"
                className={activeCategory === category ? "active" : ""}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                key={category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="faq-table" role="list">
          {visibleFaqs.map((item, index) => (
            <details className={`faq-item ${item.category.toLowerCase()}`} role="listitem" open={index === 0} key={item.id}>
              <summary>
                <span className="faq-chip">{item.category}</span>
                <strong>{item.question}</strong>
                <span className="faq-covered-count">{item.links.length} reference links</span>
                <ChevronDown size={16} aria-hidden="true" className="faq-caret" />
              </summary>
              <div className="faq-answer">
                <div className="faq-copy">
                  {item.answer.map((paragraph) => (
                    <p key={paragraph.slice(0, 42)}>{paragraph}</p>
                  ))}
                </div>
                <div className="faq-links" aria-label={`Reference links for ${item.question}`}>
                  <span><HelpCircle size={14} aria-hidden="true" /> Covered here</span>
                  {item.links.map((link) => (
                    <a href={link.href} key={`${item.id}-${link.href}`}>
                      <LinkIcon size={13} aria-hidden="true" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
