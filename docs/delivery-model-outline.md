# The Delivery Model — one team, three locations, Pandora in control
### Outline for the missing "people & capacity" dimension of the Alternative Approach

> **Why this is needed.** The alternative proves *what* we deliver (30 scope items) and *how safely* (lanes, gates, levels). It does not yet show **who delivers it and how that engine grows** — the staffing shape across Gurgaon / nearshore / onsite, the single Sapient leader across all tracks, how Pandora keeps control throughout, how skills and knowledge move, and — the headline you asked for — **how effective capacity rises over the journey without a linear rise in headcount.**
>
> **Positioning:** this is the confidence layer. Everything here reinforces the two-lane, gated, Pandora-in-control story — it never reads as "a big offshore team takes over."

---

## The one idea to land

**One team, one accountable Sapient leader, three locations — and capacity that compounds.**
Lane 1 runs on a proven, distributed managed-service engine (Gurgaon scale + nearshore overlap + onsite leadership). Lane 2 is a small enablement cell of the *same* people, growing only as dials turn. Pandora keeps architecture, standards and the gates. And effective capacity rises each horizon — through onboarding, then AI-augmented delivery, then ownership transfer — so Pandora gets *more* throughput from a lean, stable team.

---

## Proposed placement in the site

Add a separate **"Transition coverage"** menu item inside **Run As-Is**, immediately after **Day one** and before the steady-state People · Technology · Operations section. This answers the customer confidence question first: what happens if the outgoing vendor does not hand over everything?

A new chapter **"The Team"** follows **Run As-Is** (§07–10), before **The Dial** — because it answers "who runs Lane 1 and grows Lane 2" right after the reader has seen the two lanes, transition coverage and governance.

## Section 08 — Transition coverage: protected if vendor handover is incomplete

**Message:** Pandora's specific concern is current vendor to self, inside a bounded window, without assuming complete handover. The answer is an evidence-led transition cockpit, not a document-led promise.

- **Interactive examples:** Kafka/Integration topic replay gaps, Databricks lineage gaps, GitHub release-runner gaps, and legacy EDW/BizTalk feeds that should migrate instead of becoming long-term BAU.
- **Walkthrough rail:** Weeks 0–2 inventory → Weeks 1–6 runtime proof → Day 60 support gate → Days 60–120 development gate → months 4–6 close gaps.
- **Evidence diagram:** vendor pack → live estate evidence → gap register → gate decision.
- **Decision buckets:** transition now; transition with controls; hold/defer; retire/migrate. This visibly demonstrates that not everything is transitioned by default.
- **Confidence mechanism:** each example shows missing handover, independent evidence, coverage uplift, owner, control, and the gate decision.

---

## Section A — The shape: one integrated team across three locations

**Message:** not an offshore hand-off — one team, deliberately distributed for scale, overlap and proximity.

| Location | Role in the engine | Who sits here | Lane emphasis |
|---|---|---|---|
| **Gurgaon (offshore)** | Engineering & operations scale — the delivery backbone | Data, Kafka, DevOps, Cloud engineers across **Development and Operations**; 24/7 ops rotation | Lane 1 majority · Lane 2 skill authoring |
| **Nearshore office** | Timezone overlap with Copenhagen; senior engineering, coordination, faster feedback | Senior/lead engineers, SDET/QE, scrum/delivery coordination | Lane 1 delivery + Lane 2 pilots |
| **Onsite — Copenhagen (Pandora HQ)** | Leadership, liaison, trust — embedded with Pandora leaders | Sapient Delivery Lead + Solution/Engineering lead; rotating SMEs (1–2×/yr onsite per RFP) | Governance, architecture-alignment, both lanes |

- **Visual:** a three-node location map (Gurgaon · nearshore · onsite Copenhagen) with the skills each holds, and a Lane 1 / Lane 2 split shown as a band across all three — most of every location is Lane 1; a thin Lane 2 sliver that grows over time.
- **Confidence hooks:** proven managed-service setup already running for other Pandora product lines; India as the efficient managed-ops standard (per our MSA); nearshore for overlap; onsite for leadership.

## Section B — One leader across all tracks (and how Pandora pairs to it)

**Message:** a single accountable Sapient leader across Data, Integration and DevOps — dev *and* ops — pairing 1:1 with Pandora's leadership. One throat to choke; no track falls between seams.

- **The Sapient Delivery Lead** owns delivery across all three tracks and both lanes — accountable for SLAs, throughput, capability transfer and the improvement backlog.
- Under them, **track leads** (Data & Integration lead; DevOps & Cloud lead) and an **AgentOps/enablement lead** — but accountability rolls up to one person.
- **Pairs with Pandora:** Sapient Delivery Lead ↔ Pandora Delivery Lead; Sapient Solution/Engineering lead ↔ Pandora Engineering Manager & Lead/Senior Engineers.
- **Cadence:** Weekly Delivery Forum (both sides' leads) · Monthly Governance · Quarterly maturity + dial review.
- **Visual:** a slim org/accountability diagram — one Sapient leader at the top spanning the three track columns (Data/Integration · DevOps/Cloud · AgentOps-enablement), each column showing dev + ops, and a mirrored Pandora leadership row it pairs to.

## Section C — How Pandora stays in control the whole way

**Message:** control is structural, not promised. Pandora holds the wheel at every level while we run the day-to-day.

- **Pandora retains** (per the RFP): Lead & Senior Engineers, architecture, standards, and the roadmap. We execute and elevate.
- **RACI by decision type:** direction/architecture/standards = Pandora **A**; day-to-day delivery/ops = Sapient **R**, Pandora **I/C**; every gate (0/1/2) and every dial-up = Pandora **A** (named owner sign-off).
- **Control instruments:** the gates, the quarterly dial review, monthly Eng-Manager→vendor-manager performance feedback, and living documentation so Pandora can operate anything we build.
- **Visual:** a "who decides / who does" control strip — a horizontal RACI band across Direction · Architecture · Standards · Delivery · Operations · Gate sign-off, colouring Pandora-owned vs Sapient-run, making the boundary obvious.

## Section D — Skills coverage: the matrix behind the scope

**Message:** the exact engineering skills the scope needs, present across every operating tier and development, from day one.

- **Skills × tier grid:** rows = Data engineering · Kafka/Confluent · DevOps/CI-CD · Cloud/Kubernetes/Terraform · SRE/Observability · QE/SDET; columns = Ops L1 · Ops L2 · Ops L3 · Improve & Evolve · Development.
- **Left-to-right operating logic:** L1 monitors, logs and routes; L2 diagnoses and restores; L3 engineers the fix; Improve & Evolve converts repeat fixes into Lane-2 backlog items; Development turns them into permanent code, IaC, tests, runbooks and platform patterns.
- Ties to the RFP's named gaps (Kubernetes, Kafka, DevOps fundamentals) — we bring the depth Pandora flagged as thin, and enable Pandora's people in it.
- **Visual:** a compact skills-coverage matrix plus an interactive case simulator: choose Data, Kafka, DevOps, Cloud/K8s, SRE or QE, then move one genuine case through Signal → L1 → L2 → L3 → Improve & Evolve → Development → permanent fix/reusable pattern.

## Section E — Training & knowledge sharing (so it sticks with Pandora)

**Message:** knowledge transfer is a designed workstream, not a hope — and it is role-based across L1, L2, L3, improvement and development.

- **Onboarding:** standardized JDs, selection panels (incl. Pandora), buddy system, role-specific onboarding materials (proven model).
- **Shadow / reverse-shadow:** on-parallel shadow in transition across L1/L2/L3 and development; reverse-shadow where PS plays knowledge back to incumbent SMEs from alert → restore → fix → backlog → build; 50+ parameter readiness before cutover.
- **Ongoing:** weekly enablement clinics, certifications (leveraging vendor partnerships), champion network, living docs (tiered runbooks, fix patterns, ADRs, architecture, knowledge wiki).
- **Cross-location KT:** a single knowledge base and paved runbooks so Gurgaon/nearshore/onsite operate identically; "Pandora staff must be able to operate any vendor-delivered capability" is the acceptance bar.
- **AI-fluency tie-in:** this is also Gate-0 pillar 2 — enabling Pandora engineers on Copilot/Claude — so training now *is* readiness for later.
- **Visual:** a knowledge-transfer loop (Acquire → Document → Play back → Certify → Own) with readiness thresholds by role: operate, restore, fix and build.

## Section F — Capacity that compounds (the headline visual you asked for)

**Message:** effective capacity rises each horizon — without a linear rise in headcount — and an increasing share is Pandora-owned.

Drivers of the rising capacity curve, by horizon (award-anchored: Jan 2027 · Apr 2027 · Oct 2027 · Oct 2028):
1. **Ramp & stabilise (to Jan 2027):** onboarding + transition; capacity climbs to steady baseline.
2. **AI-augmented delivery (Apr 2027):** our own team's AI tooling (internal, no estate footprint) lifts throughput per engineer — the Devin/23-phase evidence — *before* any estate dial-up.
3. **Dialled AI (Oct 2027):** as Pandora turns L1 dials, assisted flows raise platform-team throughput further.
4. **Owned & optimised (Oct 2028):** reusable patterns + Pandora-owned CoE; capacity high, Sapient footprint narrowing, cost/toil down ~20%.

- **Two overlaid ideas on one chart:** (a) **effective capacity / throughput** rising across horizons, while (b) **headcount stays flat or reduces** — the gap between them is the productivity dividend. Optionally a third band: **share of capacity Pandora-owned** rising.
- **Confidence framing:** more done, by a leaner, more stable team, increasingly owned by Pandora — the opposite of "bring an army."
- **Visual:** a capacity-growth chart (capacity line rising, headcount line flat/declining, ownership share shading up), with the four drivers annotated at their horizons.

## Section G — What we ask of Pandora (people-specific) & confidence close

- Pandora participation in selection panels; access for onboarding; protected time for enablement clinics; named Pandora counterparts per track.
- **Close:** one accountable leader, one team across three locations, Pandora in control at every gate, capacity compounding, ownership transferring — *the delivery engine that makes the gentle path credible.*

---

## Data we already have to populate this (per your note)

- Sufficient **Data, Kafka, DevOps and Cloud engineers** across **development and operations**.
- Managed-service setup + rate card (offshore/nearshore/local) already established with Pandora.
- Proven transition metrics (100/95/90/97) and AI-productivity evidence (Devin, 23-phase pipeline) — reused as the capacity-curve proof.
- The RFP's own resource, RACI, transition and SLA structure to anchor the model.

## Open decisions before building

1. **Nearshore location** — name a specific PS nearshore hub (e.g., a European center) or keep it generic "nearshore"?
2. **Headcount numbers** — show indicative team sizes/ratios per location & track, or keep it shape-only (roles, not numbers) for this document?
3. **Capacity chart** — illustrative curve (labelled as such), or anchor to specific throughput/DORA/cost targets?
4. **Placement** — new "The Team" chapter after Run As-Is (recommended), or fold into the existing People·Technology·Ops section?
5. **Scope** — build all of A–G, or lead with the three highest-impact (A location/lane map, B one-leader org, F capacity curve) first?
