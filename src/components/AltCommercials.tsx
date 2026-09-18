import {
  ArrowRight,
  BadgeCheck,
  Database,
  Download,
  Gauge,
  GitBranch,
  Network,
  ShieldCheck,
  SlidersHorizontal,
  TimerReset,
  Users,
  Workflow
} from "lucide-react";
import { useMemo, useState, type CSSProperties } from "react";
import { Reveal, Section } from "./primitives";

type LocationId = "india" | "romania" | "denmark";
type CommercialBucketId = "run" | "evolve" | "burst";
type RateBucketId = Exclude<CommercialBucketId, "burst">;
type CoverageProfileId = "core" | "balanced" | "resilient";
type CommercialModelId = "dividend" | "curve" | "credit" | "guarded";
type CapacityDomain = "DevOps" | "Data" | "Integration" | "Legacy";
type CapacityRateId = "seniorEngineer" | "deliveryLead" | "qeEngineer" | "technicalBa" | "legacyEngineer";
type DayRateId = RateBucketId | CapacityRateId;
type CapacityDiscountMode = "auto" | "manual";
type DayRateCard = Record<DayRateId, Record<LocationId, number>>;

interface CommercialControls {
  coverageProfileId: CoverageProfileId;
  modelId: CommercialModelId;
  termMonths: 6 | 12 | 24;
  billableDaysPerMonth: number;
  automationTarget: number;
  evolvePodFte: number;
  runIntensity: number;
  commercialDiscount: number;
  dayRateCard: DayRateCard;
  staffRoleRows: StaffRole[];
  capacityAskRows: CapacityAskRow[];
  capacityDiscountMode: CapacityDiscountMode;
  capacityManualDiscount: number;
}

interface StaffRole {
  id: string;
  bucket: Exclude<CommercialBucketId, "burst">;
  domain: string;
  role: string;
  india: number;
  romania: number;
  denmark: number;
  focus: string;
}

interface ScaledStaffRole extends Omit<StaffRole, "india" | "romania" | "denmark"> {
  fte: Record<LocationId, number>;
  totalFte: number;
  monthlyCost: number;
}

interface CapacityAskRow {
  id: string;
  domain: CapacityDomain;
  request: string;
  rateId: CapacityRateId;
  india: number;
  romania: number;
  denmark: number;
  note: string;
}

interface CapacityAskCostRow extends CapacityAskRow {
  fte: Record<LocationId, number>;
  totalFte: number;
  monthlyCost: number;
  netMonthlyCost: number;
}

const locations: Record<LocationId, { label: string; short: string }> = {
  india: { label: "India", short: "IN" },
  romania: { label: "Romania", short: "RO" },
  denmark: { label: "Denmark", short: "DK" }
};

const locationIds: LocationId[] = ["india", "romania", "denmark"];
const capacityDomains: CapacityDomain[] = ["DevOps", "Data", "Integration", "Legacy"];
const capacityRateIds: CapacityRateId[] = ["seniorEngineer", "deliveryLead", "qeEngineer", "technicalBa", "legacyEngineer"];

const capacityRateLabels: Record<CapacityRateId, string> = {
  seniorEngineer: "10+ year engineer",
  deliveryLead: "PM / product / delivery lead",
  qeEngineer: "QE engineer",
  technicalBa: "Technical BA / schema analyst",
  legacyEngineer: "Legacy BizTalk engineer"
};

const defaultBillableDaysPerMonth = 21;

const defaultDayRateCard: DayRateCard = {
  run: { india: 405, romania: 643, denmark: 1143 },
  evolve: { india: 500, romania: 762, denmark: 1310 },
  seniorEngineer: { india: 500, romania: 762, denmark: 1310 },
  deliveryLead: { india: 595, romania: 857, denmark: 1524 },
  qeEngineer: { india: 381, romania: 595, denmark: 1048 },
  technicalBa: { india: 452, romania: 690, denmark: 1238 },
  legacyEngineer: { india: 452, romania: 667, denmark: 1238 }
};

const coverageProfiles: Array<{ id: CoverageProfileId; label: string; multiplier: number; detail: string }> = [
  {
    id: "core",
    label: "Core controlled",
    multiplier: 0.88,
    detail: "Lean transition coverage with critical after-hours route."
  },
  {
    id: "balanced",
    label: "Balanced",
    multiplier: 1,
    detail: "Recommended base: run coverage, L2 depth and local governance."
  },
  {
    id: "resilient",
    label: "Resilient 24x7",
    multiplier: 1.16,
    detail: "Higher cutover reserve for critical platforms and hypercare."
  }
];

const termOptions: Array<{ months: 6 | 12 | 24; label: string; discount: number; includedBurstDays: number }> = [
  { months: 6, label: "6 mo", discount: 0, includedBurstDays: 0 },
  { months: 12, label: "12 mo", discount: 0.03, includedBurstDays: 3 },
  { months: 24, label: "24 mo", discount: 0.06, includedBurstDays: 7 }
];

const commercialModels = [
  {
    id: "dividend",
    label: "Run + productivity dividend",
    short: "Share verified savings",
    customerGives: "Run + Improve commitment and access to the automation backlog.",
    weGive: "55% of verified run-effort reduction returned as fee reduction or service credit.",
    bestFor: "Competing with staff-heavy SI pricing while proving cost reduction.",
    shareBack: 0.55,
    discount: 0.01,
    fundPercent: 0.04,
    includedBurstDays: 2
  },
  {
    id: "curve",
    label: "Declining run price curve",
    short: "Price steps down",
    customerGives: "A 12-24 month runway and agreed maturity gates.",
    weGive: "Run fee steps down as M2/M3 evidence and automation gates are achieved.",
    bestFor: "Customers who want visible year-one and year-two cost glidepath.",
    shareBack: 0.45,
    discount: 0.02,
    fundPercent: 0.03,
    includedBurstDays: 1
  },
  {
    id: "credit",
    label: "Engineering credit bank",
    short: "Prepaid expert access",
    customerGives: "Customer ask capacity commitment across the agreed skill and location matrix.",
    weGive: "Priority access to DevOps, data and integration SMEs with unused credit rollover.",
    bestFor: "Migration waves, Kafka/Data spikes and release hardening without permanent FTE.",
    shareBack: 0.35,
    discount: 0.015,
    fundPercent: 0.02,
    includedBurstDays: 8
  },
  {
    id: "guarded",
    label: "No-handover protection",
    short: "Transition risk included",
    customerGives: "A clear transition boundary and access to runtime evidence.",
    weGive: "A fixed reverse-engineering allowance before burst charges are triggered.",
    bestFor: "Vendor handover uncertainty, weak runbooks and undocumented legacy flows.",
    shareBack: 0.3,
    discount: 0,
    fundPercent: 0.05,
    includedBurstDays: 5
  }
] as const;

const commercialBuckets = [
  {
    id: "run",
    label: "1. Assured Run Base",
    Icon: Users,
    summary: "Ops L1, L2 and L3 capacity across DevOps, Data and Integration.",
    customerFunds: "Predictable base team, tri-country coverage and SLA ownership.",
    valueReturned: "Stable service, transition control and a measured baseline for reduction."
  },
  {
    id: "evolve",
    label: "2. Improve & Evolve",
    Icon: Workflow,
    summary: "Senior engineering pod focused on reliability, automation and agentification.",
    customerFunds: "A ring-fenced pod that studies incidents, toil and weak handover areas.",
    valueReturned: "Automation backlog, fewer repeated tickets and a lower future run shape."
  },
  {
    id: "burst",
    label: "3. Burst Capacity",
    Icon: TimerReset,
    summary: "Customer ask capacity for spikes, migrations and deep platform problems.",
    customerFunds: "The planned customer ask matrix across skills, locations and volume discount.",
    valueReturned: "Fast access to Kafka, Databricks, Kubernetes, GitHub, API and BizTalk experts."
  }
] as const;

const scopeGroups = [
  {
    domain: "DevOps",
    technologies: "PAKS / AKS / Kubernetes, Terraform / GitOps, Azure DevOps to GitHub, GitHub Actions, runners, Port.io"
  },
  {
    domain: "Data",
    technologies: "Databricks / Olympus, Delta / ADLS Gen2, Unity Catalog, OpenMetadata, Power BI, Synapse / EDW"
  },
  {
    domain: "Integration",
    technologies: "Kafka / Confluent / Nexus, Kong / Pong API platform, BizTalk, event and API connectivity"
  }
];

const defaultCapacityAskRows: CapacityAskRow[] = [
  {
    id: "ask-devops-engineers",
    domain: "DevOps",
    request: "DevOps engineers with 10+ years experience",
    rateId: "seniorEngineer",
    india: 8,
    romania: 0,
    denmark: 0,
    note: "AKS/PAKS, Terraform, GitHub Actions, runners, release hardening and platform automation."
  },
  {
    id: "ask-data-engineers",
    domain: "Data",
    request: "Databricks and Power BI engineers with 10+ years experience",
    rateId: "seniorEngineer",
    india: 7,
    romania: 0,
    denmark: 0,
    note: "Databricks/Olympus, Power BI refresh, Delta/ADLS, data reliability and reporting recovery."
  },
  {
    id: "ask-data-lead",
    domain: "Data",
    request: "Project / product / delivery lead",
    rateId: "deliveryLead",
    india: 1,
    romania: 0,
    denmark: 0,
    note: "Plan, backlog, delivery governance and customer reporting for the data workstream."
  },
  {
    id: "ask-integration-engineers",
    domain: "Integration",
    request: "Kafka and Kong engineers with 10+ years experience",
    rateId: "seniorEngineer",
    india: 10,
    romania: 0,
    denmark: 0,
    note: "Kafka/Confluent/Nexus, Kong/Pong API platform, schemas, connectors and API policy support."
  },
  {
    id: "ask-integration-qe",
    domain: "Integration",
    request: "Integration QE engineer",
    rateId: "qeEngineer",
    india: 1,
    romania: 0,
    denmark: 0,
    note: "Contract testing, event replay validation, API regression and release evidence."
  },
  {
    id: "ask-integration-leads",
    domain: "Integration",
    request: "Project / product / delivery leads",
    rateId: "deliveryLead",
    india: 2,
    romania: 0,
    denmark: 0,
    note: "Kafka/Kong delivery planning, dependency management, cutover governance and stakeholder cadence."
  },
  {
    id: "ask-integration-ba",
    domain: "Integration",
    request: "Kafka technical business analysts",
    rateId: "technicalBa",
    india: 3,
    romania: 0,
    denmark: 0,
    note: "Translate business requirements into event schemas, implementation stories and acceptance rules."
  },
  {
    id: "ask-biztalk-lead",
    domain: "Legacy",
    request: "BizTalk project manager onsite",
    rateId: "deliveryLead",
    india: 0,
    romania: 0,
    denmark: 1,
    note: "Onsite Denmark coordination for legacy discovery, transition control and vendor interface."
  },
  {
    id: "ask-biztalk-engineers",
    domain: "Legacy",
    request: "BizTalk engineers",
    rateId: "legacyEngineer",
    india: 13,
    romania: 0,
    denmark: 0,
    note: "Legacy BizTalk support, adapter analysis, wrapper remediation and knowledge extraction."
  }
];

const staffRoles: StaffRole[] = [
  {
    id: "l1-command",
    bucket: "run",
    domain: "Shared Run",
    role: "Ops L1 command, event intake and evidence capture",
    india: 5,
    romania: 1.5,
    denmark: 0,
    focus: "Alert validation, ticket hygiene, impact classification, runbook trigger and routing."
  },
  {
    id: "l2-devops",
    bucket: "run",
    domain: "DevOps",
    role: "Ops L2 DevOps platform support",
    india: 3,
    romania: 1,
    denmark: 0.5,
    focus: "Kubernetes, Terraform, GitHub, runners, release support and first restore."
  },
  {
    id: "l2-data",
    bucket: "run",
    domain: "Data",
    role: "Ops L2 data platform support",
    india: 3,
    romania: 1,
    denmark: 0.5,
    focus: "Databricks jobs, Delta recovery, Power BI refresh, data quality and backfill."
  },
  {
    id: "l2-integration",
    bucket: "run",
    domain: "Integration",
    role: "Ops L2 integration support",
    india: 2,
    romania: 1,
    denmark: 0.5,
    focus: "Kafka lag, schema issues, Kong/API routing, BizTalk wrapper support and connectivity."
  },
  {
    id: "l3-devops",
    bucket: "run",
    domain: "DevOps",
    role: "Ops L3 DevOps SME",
    india: 1.5,
    romania: 0.5,
    denmark: 0.25,
    focus: "Workflow fixes, IaC defects, platform hardening and repeat incident engineering."
  },
  {
    id: "l3-data",
    bucket: "run",
    domain: "Data",
    role: "Ops L3 data SME",
    india: 1.5,
    romania: 0.5,
    denmark: 0.25,
    focus: "Spark/Delta defects, lineage gaps, recovery design and data reliability fixes."
  },
  {
    id: "l3-integration",
    bucket: "run",
    domain: "Integration",
    role: "Ops L3 integration SME",
    india: 1,
    romania: 0.5,
    denmark: 0.25,
    focus: "Kafka connector repair, schema compatibility, API policy defects and legacy wrapper design."
  },
  {
    id: "governance",
    bucket: "run",
    domain: "Governance",
    role: "Service governance and transition control",
    india: 1,
    romania: 0.5,
    denmark: 1,
    focus: "SLA review, risk register, transition gates, cost/value ledger and Pandora steering."
  },
  {
    id: "sre-evolve",
    bucket: "evolve",
    domain: "Reliability",
    role: "SRE and observability engineering",
    india: 1,
    romania: 1,
    denmark: 0.5,
    focus: "SLOs, alert quality, New Relic coverage, RCA patterns and reliability backlog."
  },
  {
    id: "automation-evolve",
    bucket: "evolve",
    domain: "Automation",
    role: "Automation and agentification engineering",
    india: 2,
    romania: 1,
    denmark: 0,
    focus: "Runbook automation, ticket summarisation, self-healing candidates and agentic gates."
  },
  {
    id: "data-evolve",
    bucket: "evolve",
    domain: "Data",
    role: "Data reliability improvement engineer",
    india: 1,
    romania: 0.5,
    denmark: 0.25,
    focus: "Freshness, lineage, DQ checks, rerun automation and data-product operability."
  },
  {
    id: "integration-evolve",
    bucket: "evolve",
    domain: "Integration",
    role: "Integration reliability improvement engineer",
    india: 1,
    romania: 0.5,
    denmark: 0.25,
    focus: "Kafka lag prevention, schema-drift controls, API contract health and connector recovery."
  }
];

const baseEvolveFte = staffRoles
  .filter((role) => role.bucket === "evolve")
  .reduce((sum, role) => sum + displayRoleFte(role), 0);

function rawRoleFte(role: StaffRole) {
  return role.india + role.romania + role.denmark;
}

function displayRoleFte(role: StaffRole) {
  return locationIds.reduce((sum, locationId) => sum + roundOne(role[locationId]), 0);
}

function displayBucketFte(rows: StaffRole[], bucket: Exclude<CommercialBucketId, "burst">) {
  return rows.filter((row) => row.bucket === bucket).reduce((sum, row) => sum + displayRoleFte(row), 0);
}

function cloneStaffRoles() {
  return staffRoles.map((row) => ({ ...row }));
}

function cloneCapacityAskRows() {
  return defaultCapacityAskRows.map((row) => ({ ...row }));
}

function cloneDayRateCard() {
  return Object.fromEntries(
    (["run", "evolve", ...capacityRateIds] as DayRateId[]).map((rateId) => [rateId, { ...defaultDayRateCard[rateId] }])
  ) as DayRateCard;
}

export const defaultCommercialControls: CommercialControls = {
  coverageProfileId: "balanced",
  modelId: "dividend",
  termMonths: 12,
  billableDaysPerMonth: defaultBillableDaysPerMonth,
  automationTarget: 18,
  evolvePodFte: baseEvolveFte,
  runIntensity: 100,
  commercialDiscount: 0,
  dayRateCard: cloneDayRateCard(),
  staffRoleRows: cloneStaffRoles(),
  capacityAskRows: cloneCapacityAskRows(),
  capacityDiscountMode: "auto",
  capacityManualDiscount: 6
};

function roundOne(value: number) {
  return Math.round(value * 10) / 10;
}

function formatFte(value: number) {
  return roundOne(value).toLocaleString("en-GB", { minimumFractionDigits: value % 1 === 0 ? 0 : 1, maximumFractionDigits: 1 });
}

function formatDays(value: number) {
  return `${formatFte(value)} days`;
}

function formatMoney(value: number) {
  return `EUR ${Math.round(value / 1000).toLocaleString("en-GB")}k`;
}

function formatMoneyFull(value: number) {
  return `EUR ${Math.round(value).toLocaleString("en-GB")}`;
}

function roleCostFromRateCard(
  role: StaffRole,
  fte: Record<LocationId, number>,
  dayRateCard: DayRateCard,
  billableDaysPerMonth: number
) {
  return locationIds.reduce(
    (sum, locationId) => sum + fte[locationId] * dayRateCard[role.bucket][locationId] * billableDaysPerMonth,
    0
  );
}

function scaledRole(role: StaffRole, scale: number, dayRateCard: DayRateCard, billableDaysPerMonth: number): ScaledStaffRole {
  const fte = {
    india: roundOne(role.india * scale),
    romania: roundOne(role.romania * scale),
    denmark: roundOne(role.denmark * scale)
  };
  return {
    id: role.id,
    bucket: role.bucket,
    domain: role.domain,
    role: role.role,
    focus: role.focus,
    fte,
    totalFte: fte.india + fte.romania + fte.denmark,
    monthlyCost: roleCostFromRateCard(role, fte, dayRateCard, billableDaysPerMonth)
  };
}

function capacityRowCost(row: CapacityAskRow, dayRateCard: DayRateCard, billableDaysPerMonth: number) {
  return locationIds.reduce(
    (sum, locationId) => sum + row[locationId] * dayRateCard[row.rateId][locationId] * billableDaysPerMonth,
    0
  );
}

function recommendedCapacityDiscount(totalFte: number) {
  if (totalFte >= 45) return 8;
  if (totalFte >= 30) return 6;
  if (totalFte >= 20) return 5;
  if (totalFte >= 10) return 3;
  return 0;
}

function capacityVolumeBand(totalFte: number) {
  if (totalFte >= 45) return "45+ FTE volume band";
  if (totalFte >= 30) return "30-44 FTE volume band";
  if (totalFte >= 20) return "20-29 FTE volume band";
  if (totalFte >= 10) return "10-19 FTE volume band";
  return "Below volume threshold";
}

function getCapacityAskSnapshot(controls: CommercialControls) {
  const grossRows = controls.capacityAskRows.map((row) => {
    const fte = {
      india: row.india,
      romania: row.romania,
      denmark: row.denmark
    };
    return {
      ...row,
      fte,
      totalFte: locationIds.reduce((sum, locationId) => sum + row[locationId], 0),
      monthlyCost: capacityRowCost(row, controls.dayRateCard, controls.billableDaysPerMonth)
    };
  });
  const totalFte = grossRows.reduce((sum, row) => sum + row.totalFte, 0);
  const grossMonthly = grossRows.reduce((sum, row) => sum + row.monthlyCost, 0);
  const recommendedDiscount = recommendedCapacityDiscount(totalFte);
  const discountPercent =
    controls.capacityDiscountMode === "auto" ? recommendedDiscount : Math.max(0, controls.capacityManualDiscount);
  const discountAmount = grossMonthly * (discountPercent / 100);
  const netMonthly = Math.max(0, grossMonthly - discountAmount);
  const rows: CapacityAskCostRow[] = grossRows.map((row) => ({
    ...row,
    netMonthlyCost: row.monthlyCost * (1 - discountPercent / 100)
  }));
  const domainTotals = capacityDomains.map((domain) => ({
    domain,
    fte: rows.filter((row) => row.domain === domain).reduce((sum, row) => sum + row.totalFte, 0),
    monthlyCost: rows.filter((row) => row.domain === domain).reduce((sum, row) => sum + row.monthlyCost, 0),
    netMonthlyCost: rows.filter((row) => row.domain === domain).reduce((sum, row) => sum + row.netMonthlyCost, 0)
  }));
  const locationTotals = locationIds.reduce(
    (totals, locationId) => {
      totals[locationId] = rows.reduce((sum, row) => sum + row[locationId], 0);
      return totals;
    },
    { india: 0, romania: 0, denmark: 0 } as Record<LocationId, number>
  );
  return {
    rows,
    totalFte,
    grossMonthly,
    recommendedDiscount,
    discountPercent,
    discountAmount,
    netMonthly,
    quarterlyNet: netMonthly * 3,
    annualNet: netMonthly * 12,
    domainTotals,
    locationTotals,
    volumeBand: capacityVolumeBand(totalFte)
  };
}

function getCoverageProfile(id: CoverageProfileId) {
  return coverageProfiles.find((profile) => profile.id === id) ?? coverageProfiles[1];
}

function getTermOption(months: CommercialControls["termMonths"]) {
  return termOptions.find((term) => term.months === months) ?? termOptions[1];
}

function getCommercialModel(id: CommercialModelId) {
  return commercialModels.find((model) => model.id === id) ?? commercialModels[0];
}

export function getCommercialSnapshot(controls: CommercialControls = defaultCommercialControls) {
  const coverage = getCoverageProfile(controls.coverageProfileId);
  const term = getTermOption(controls.termMonths);
  const model = getCommercialModel(controls.modelId);
  const sourceStaffRows = controls.staffRoleRows;
  const rawRunFte = sourceStaffRows.filter((row) => row.bucket === "run").reduce((sum, row) => sum + rawRoleFte(row), 0);
  const rawEvolveFte = sourceStaffRows.filter((row) => row.bucket === "evolve").reduce((sum, row) => sum + rawRoleFte(row), 0);
  const displayRunBaselineFte = displayBucketFte(sourceStaffRows, "run");
  const displayEvolveBaselineFte = displayBucketFte(sourceStaffRows, "evolve");
  const runScale = coverage.multiplier * (controls.runIntensity / 100);
  const evolveScale = rawEvolveFte > 0 ? controls.evolvePodFte / rawEvolveFte : 0;
  const staffRows = sourceStaffRows.map((role) =>
    scaledRole(role, role.bucket === "run" ? runScale : evolveScale, controls.dayRateCard, controls.billableDaysPerMonth)
  );
  const runRows = staffRows.filter((row) => row.bucket === "run");
  const evolveRows = staffRows.filter((row) => row.bucket === "evolve");
  const runMonthly = runRows.reduce((sum, row) => sum + row.monthlyCost, 0);
  const evolveMonthly = evolveRows.reduce((sum, row) => sum + row.monthlyCost, 0);
  const capacityAsk = getCapacityAskSnapshot(controls);
  const monthlyBurstDays = capacityAsk.totalFte * controls.billableDaysPerMonth;
  const quarterlyBurstDays = monthlyBurstDays * 3;
  const includedBurstDays = Math.min(quarterlyBurstDays, model.includedBurstDays + term.includedBurstDays);
  const billableBurstDays = Math.max(0, quarterlyBurstDays - includedBurstDays);
  const monthlyBillableBurstDays = billableBurstDays / 3;
  const customerAskBlendedDayRate = monthlyBurstDays > 0 ? capacityAsk.grossMonthly / monthlyBurstDays : 0;
  const includedBurstValue = (includedBurstDays * customerAskBlendedDayRate) / 3;
  const burstMonthly = capacityAsk.netMonthly;
  const locationFte = locationIds.reduce(
    (totals, locationId) => {
      totals[locationId] = staffRows.reduce((sum, row) => sum + row.fte[locationId], 0);
      return totals;
    },
    { india: 0, romania: 0, denmark: 0 } as Record<LocationId, number>
  );
  const runFte = runRows.reduce((sum, row) => sum + row.totalFte, 0);
  const evolveFte = evolveRows.reduce((sum, row) => sum + row.totalFte, 0);
  const grossMonthly = runMonthly + evolveMonthly + burstMonthly;
  const termDiscount = (runMonthly + evolveMonthly) * term.discount;
  const modelDiscount = (runMonthly + evolveMonthly) * model.discount;
  const automationDividend = runMonthly * (controls.automationTarget / 100) * model.shareBack;
  const automationFund = (runMonthly + evolveMonthly) * model.fundPercent;
  const beforeCommercialDiscount = Math.max(0, grossMonthly - termDiscount - modelDiscount - automationDividend);
  const commercialDiscountAmount = beforeCommercialDiscount * (controls.commercialDiscount / 100);
  const valueBackMonthly =
    termDiscount + modelDiscount + automationDividend + automationFund + includedBurstValue + commercialDiscountAmount;
  const netMonthly = Math.max(0, beforeCommercialDiscount - commercialDiscountAmount);
  const targetRunReduction = Math.min(0.34, (controls.automationTarget / 100) * 0.72);
  const targetRunMonthly = runMonthly * (1 - targetRunReduction);
  const targetRunFte = runFte * (1 - targetRunReduction);
  const curveRows = [
    {
      label: "Transition",
      period: "M1-3",
      run: runMonthly,
      evolve: evolveMonthly,
      burst: burstMonthly,
      valueBack: termDiscount + modelDiscount
    },
    {
      label: "Stabilise",
      period: "M4-6",
      run: runMonthly * (1 - targetRunReduction * 0.28),
      evolve: evolveMonthly,
      burst: burstMonthly,
      valueBack: valueBackMonthly * 0.35
    },
    {
      label: "Optimise",
      period: "M7-12",
      run: runMonthly * (1 - targetRunReduction * 0.62),
      evolve: evolveMonthly * 0.96,
      burst: burstMonthly,
      valueBack: valueBackMonthly * 0.72
    },
    {
      label: "Efficient run",
      period: "Y2 target",
      run: targetRunMonthly,
      evolve: evolveMonthly * 0.9,
      burst: burstMonthly,
      valueBack: valueBackMonthly
    }
  ].map((row) => ({
    ...row,
    gross: row.run + row.evolve + row.burst,
    net: Math.max(0, row.run + row.evolve + row.burst - row.valueBack)
  }));
  const bucketTotals = [
    { id: "run" as const, label: "Run Base", amount: runMonthly, fte: runFte, detail: "Ops L1/L2/L3" },
    { id: "evolve" as const, label: "Improve & Evolve", amount: evolveMonthly, fte: evolveFte, detail: "engineering pod" },
    { id: "burst" as const, label: "Burst Capacity", amount: burstMonthly, fte: capacityAsk.totalFte, detail: "customer ask matrix" }
  ];

  return {
    controls,
    coverage,
    term,
    model,
    staffRows,
    runRows,
    evolveRows,
    locationFte,
    runFte,
    evolveFte,
    totalFte: runFte + evolveFte,
    rawRunFte,
    rawEvolveFte,
    displayRunBaselineFte,
    displayEvolveBaselineFte,
    runScale,
    evolveScale,
    quarterlyBurstDays,
    monthlyBurstDays,
    includedBurstDays,
    billableBurstDays,
    monthlyBillableBurstDays,
    runMonthly,
    evolveMonthly,
    burstMonthly,
    grossMonthly,
    termDiscount,
    modelDiscount,
    automationDividend,
    automationFund,
    includedBurstValue,
    beforeCommercialDiscount,
    commercialDiscountAmount,
    valueBackMonthly,
    netMonthly,
    yearOneNet: netMonthly * 12,
    targetRunFte,
    targetRunMonthly,
    curveRows,
    bucketTotals,
    capacityAsk
  };
}

type CommercialSnapshot = ReturnType<typeof getCommercialSnapshot>;

function CommercialCurveSvg({ snapshot }: { snapshot: CommercialSnapshot }) {
  const maxGross = Math.max(...snapshot.curveRows.map((row) => row.gross));
  const points = snapshot.curveRows.map((row, index) => {
    const x = 72 + index * 154;
    const y = 182 - (row.net / maxGross) * 120;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const grossPoints = snapshot.curveRows.map((row, index) => {
    const x = 72 + index * 154;
    const y = 182 - (row.gross / maxGross) * 120;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg className="commercial-curve-svg" viewBox="0 0 560 220" role="img" aria-label="Commercial curve from transition to efficient run">
      <rect x="18" y="20" width="524" height="170" rx="8" />
      {[0, 1, 2, 3].map((tick) => (
        <line key={tick} x1="48" x2="522" y1={62 + tick * 34} y2={62 + tick * 34} />
      ))}
      <polyline className="gross-line" points={grossPoints.join(" ")} />
      <polyline className="net-line" points={points.join(" ")} />
      {snapshot.curveRows.map((row, index) => {
        const x = 72 + index * 154;
        const netY = 182 - (row.net / maxGross) * 120;
        const grossY = 182 - (row.gross / maxGross) * 120;
        return (
          <g key={row.period}>
            <line className="curve-drop" x1={x} x2={x} y1={grossY} y2={netY} />
            <circle className="gross-dot" cx={x} cy={grossY} r="4.5" />
            <circle className="net-dot" cx={x} cy={netY} r="5.5" />
            <text x={x} y="205" textAnchor="middle">{row.period}</text>
          </g>
        );
      })}
      <text x="54" y="42" className="curve-label">gross cost</text>
      <text x="390" y="76" className="curve-label net">net after value-back</text>
    </svg>
  );
}

function CostStack({ snapshot }: { snapshot: CommercialSnapshot }) {
  const total = snapshot.bucketTotals.reduce((sum, item) => sum + item.amount, 0);
  return (
    <div className="commercial-cost-stack" aria-label="Cost split by commercial bucket">
      {snapshot.bucketTotals.map((bucket) => (
        <span
          key={bucket.id}
          className={`commercial-stack-segment ${bucket.id}`}
          style={{ width: `${Math.max(7, (bucket.amount / total) * 100)}%` }}
        >
          <strong>{bucket.label}</strong>
          <small>{formatMoney(bucket.amount)}</small>
        </span>
      ))}
    </div>
  );
}

function LocationMix({ snapshot }: { snapshot: CommercialSnapshot }) {
  const total = locationIds.reduce((sum, id) => sum + snapshot.locationFte[id], 0);
  return (
    <div className="commercial-location-mix" aria-label="FTE mix by location">
      {locationIds.map((id) => {
        const share = total > 0 ? (snapshot.locationFte[id] / total) * 100 : 0;
        return (
          <div className={`commercial-location ${id}`} key={id}>
            <div>
              <span>{locations[id].label}</span>
              <strong>{formatFte(snapshot.locationFte[id])} FTE</strong>
            </div>
            <i><b style={{ width: `${Math.max(6, share)}%` }} /></i>
          </div>
        );
      })}
    </div>
  );
}

function CapacityDomainBars({ capacityAsk }: { capacityAsk: CommercialSnapshot["capacityAsk"] }) {
  const maxDomainFte = Math.max(...capacityAsk.domainTotals.map((row) => row.fte), 1);
  return (
    <div className="commercial-capacity-bars" aria-label="Customer ask by domain">
      {capacityAsk.domainTotals.map((row) => (
        <div className={`commercial-capacity-domain ${row.domain.toLowerCase()}`} key={row.domain}>
          <div>
            <span>{row.domain}</span>
            <strong>{formatFte(row.fte)} FTE</strong>
          </div>
          <i><b style={{ width: `${Math.max(5, (row.fte / maxDomainFte) * 100)}%` }} /></i>
          <small>{formatMoney(row.monthlyCost)} gross monthly</small>
        </div>
      ))}
    </div>
  );
}

function CommercialWorkbookSheet({ rows, name }: { rows: Array<Array<string | number>>; name: string }) {
  return { rows, name };
}

function escapeXml(value: string | number) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[character] ?? character;
  });
}

function xlsxColumnName(index: number) {
  let column = "";
  let current = index;
  while (current > 0) {
    const remainder = (current - 1) % 26;
    column = String.fromCharCode(65 + remainder) + column;
    current = Math.floor((current - 1) / 26);
  }
  return column;
}

function xlsxCell(row: number, column: number, value: string | number) {
  const reference = `${xlsxColumnName(column)}${row}`;
  if (typeof value === "number") return `<c r="${reference}"><v>${Number.isFinite(value) ? value : 0}</v></c>`;
  return `<c r="${reference}" t="inlineStr"><is><t>${escapeXml(value)}</t></is></c>`;
}

function xlsxRow(rowIndex: number, row: Array<string | number>) {
  return `<row r="${rowIndex}">${row.map((value, index) => xlsxCell(rowIndex, index + 1, value)).join("")}</row>`;
}

function worksheetXml(rows: Array<Array<string | number>>) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>
    <col min="1" max="1" width="24" customWidth="1"/>
    <col min="2" max="2" width="34" customWidth="1"/>
    <col min="3" max="8" width="20" customWidth="1"/>
    <col min="9" max="10" width="44" customWidth="1"/>
  </cols>
  <sheetData>${rows.map((row, index) => xlsxRow(index + 1, row)).join("")}</sheetData>
</worksheet>`;
}

function workbookXml(sheetNames: string[]) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    ${sheetNames.map((name, index) => `<sheet name="${escapeXml(name)}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`).join("")}
  </sheets>
</workbook>`;
}

function workbookRelsXml(sheetCount: number) {
  const sheetRelationships = Array.from({ length: sheetCount }, (_, index) =>
    `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`
  ).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheetRelationships}</Relationships>`;
}

function rootRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
}

function contentTypesXml(sheetCount: number) {
  const sheetOverrides = Array.from({ length: sheetCount }, (_, index) =>
    `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`
  ).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  ${sheetOverrides}
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;
}

function appPropertiesXml(sheetNames: string[]) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Pandav alternative site</Application>
  <HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>${sheetNames.length}</vt:i4></vt:variant></vt:vector></HeadingPairs>
  <TitlesOfParts><vt:vector size="${sheetNames.length}" baseType="lpstr">${sheetNames.map((name) => `<vt:lpstr>${escapeXml(name)}</vt:lpstr>`).join("")}</vt:vector></TitlesOfParts>
</Properties>`;
}

function corePropertiesXml() {
  const timestamp = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Pandora commercial model</dc:title>
  <dc:creator>Pandav alternative site</dc:creator>
  <cp:lastModifiedBy>Pandav alternative site</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${timestamp}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${timestamp}</dcterms:modified>
</cp:coreProperties>`;
}

type ZipEntry = { path: string; content: string };

function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let index = 0; index < 8; index += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function littleEndian(value: number, bytes: number) {
  const result = new Uint8Array(bytes);
  for (let index = 0; index < bytes; index += 1) result[index] = (value >>> (index * 8)) & 0xff;
  return result;
}

function concatBytes(parts: Uint8Array[]) {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    output.set(part, offset);
    offset += part.length;
  }
  return output;
}

function dosDateParts(date = new Date()) {
  const year = Math.max(1980, date.getFullYear());
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { dosTime, dosDate };
}

function xlsxZip(files: ZipEntry[]) {
  const encoder = new TextEncoder();
  const { dosTime, dosDate } = dosDateParts();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let localOffset = 0;

  files.forEach((file) => {
    const pathBytes = encoder.encode(file.path);
    const contentBytes = encoder.encode(file.content);
    const crc = crc32(contentBytes);
    const localHeader = concatBytes([
      littleEndian(0x04034b50, 4),
      littleEndian(20, 2),
      littleEndian(0, 2),
      littleEndian(0, 2),
      littleEndian(dosTime, 2),
      littleEndian(dosDate, 2),
      littleEndian(crc, 4),
      littleEndian(contentBytes.length, 4),
      littleEndian(contentBytes.length, 4),
      littleEndian(pathBytes.length, 2),
      littleEndian(0, 2),
      pathBytes
    ]);
    localParts.push(localHeader, contentBytes);
    centralParts.push(
      concatBytes([
        littleEndian(0x02014b50, 4),
        littleEndian(20, 2),
        littleEndian(20, 2),
        littleEndian(0, 2),
        littleEndian(0, 2),
        littleEndian(dosTime, 2),
        littleEndian(dosDate, 2),
        littleEndian(crc, 4),
        littleEndian(contentBytes.length, 4),
        littleEndian(contentBytes.length, 4),
        littleEndian(pathBytes.length, 2),
        littleEndian(0, 2),
        littleEndian(0, 2),
        littleEndian(0, 2),
        littleEndian(0, 2),
        littleEndian(0, 4),
        littleEndian(localOffset, 4),
        pathBytes
      ])
    );
    localOffset += localHeader.length + contentBytes.length;
  });

  const centralDirectory = concatBytes(centralParts);
  const localDirectory = concatBytes(localParts);
  const endOfCentralDirectory = concatBytes([
    littleEndian(0x06054b50, 4),
    littleEndian(0, 2),
    littleEndian(0, 2),
    littleEndian(files.length, 2),
    littleEndian(files.length, 2),
    littleEndian(centralDirectory.length, 4),
    littleEndian(localDirectory.length, 4),
    littleEndian(0, 2)
  ]);

  return concatBytes([localDirectory, centralDirectory, endOfCentralDirectory]);
}

function commercialWorkbookSheets(snapshot: CommercialSnapshot) {
  const summaryRows: Array<Array<string | number>> = [
    ["Pandora commercial scenario"],
    ["Selected model", snapshot.model.label],
    ["Coverage profile", snapshot.coverage.label],
    ["Contract term", `${snapshot.controls.termMonths} months`],
    ["Pricing unit", "EUR per person day"],
    ["Billable days per month", roundOne(snapshot.controls.billableDaysPerMonth)],
    ["Automation target", `${snapshot.controls.automationTarget}%`],
    ["Run staffing intensity", `${snapshot.controls.runIntensity}%`],
    ["Additional discretionary discount", `${snapshot.controls.commercialDiscount}%`],
    [],
    ["Metric", "Value"],
    ["Run base editable FTE baseline", roundOne(snapshot.displayRunBaselineFte)],
    ["Run base FTE", roundOne(snapshot.runFte)],
    ["Improve & Evolve editable FTE baseline", roundOne(snapshot.displayEvolveBaselineFte)],
    ["Improve & Evolve FTE", roundOne(snapshot.evolveFte)],
    ["Total staffed FTE", roundOne(snapshot.totalFte)],
    ["Burst pricing source", "Customer ask calculator matrix"],
    ["Customer ask / burst capacity FTE", roundOne(snapshot.capacityAsk.totalFte)],
    ["Customer ask capacity days per month", roundOne(snapshot.monthlyBurstDays)],
    ["Customer ask capacity days per quarter", roundOne(snapshot.quarterlyBurstDays)],
    ["Included specialist credit days per quarter", roundOne(snapshot.includedBurstDays)],
    ["Priced burst capacity days per quarter", roundOne(snapshot.billableBurstDays)],
    ["Priced burst capacity days monthly equivalent", roundOne(snapshot.monthlyBillableBurstDays)],
    ["Run base monthly equivalent", Math.round(snapshot.runMonthly)],
    ["Improve & Evolve monthly equivalent", Math.round(snapshot.evolveMonthly)],
    ["Burst gross monthly equivalent", Math.round(snapshot.capacityAsk.grossMonthly)],
    ["Burst capacity discount monthly", Math.round(snapshot.capacityAsk.discountAmount)],
    ["Burst monthly equivalent", Math.round(snapshot.burstMonthly)],
    ["Gross monthly equivalent", Math.round(snapshot.grossMonthly)],
    ["Term discount monthly", Math.round(snapshot.termDiscount)],
    ["Model discount monthly", Math.round(snapshot.modelDiscount)],
    ["Automation dividend monthly", Math.round(snapshot.automationDividend)],
    ["Additional discount monthly", Math.round(snapshot.commercialDiscountAmount)],
    ["Automation fund value monthly", Math.round(snapshot.automationFund)],
    ["Included customer ask credit value monthly", Math.round(snapshot.includedBurstValue)],
    ["Net monthly equivalent after all discounts/dividend", Math.round(snapshot.netMonthly)],
    ["Year-one net", Math.round(snapshot.yearOneNet)],
    ["Target run FTE after maturity", roundOne(snapshot.targetRunFte)],
    [],
    ["Customer ask capacity FTE", roundOne(snapshot.capacityAsk.totalFte)],
    ["Customer ask gross monthly equivalent", Math.round(snapshot.capacityAsk.grossMonthly)],
    ["Customer ask discount mode", snapshot.controls.capacityDiscountMode === "auto" ? "Auto volume band" : "Manual"],
    ["Customer ask discount applied", `${snapshot.capacityAsk.discountPercent}%`],
    ["Customer ask discount monthly", Math.round(snapshot.capacityAsk.discountAmount)],
    ["Customer ask net monthly equivalent", Math.round(snapshot.capacityAsk.netMonthly)],
    ["Customer ask net quarterly", Math.round(snapshot.capacityAsk.quarterlyNet)],
    ["Customer ask net annual", Math.round(snapshot.capacityAsk.annualNet)],
    [],
    ["Curve", "Period", "Run", "Improve", "Burst", "Value back", "Net"],
    ...snapshot.curveRows.map((row) => [
      row.label,
      row.period,
      Math.round(row.run),
      Math.round(row.evolve),
      Math.round(row.burst),
      Math.round(row.valueBack),
      Math.round(row.net)
    ])
  ];

  const staffingRows: Array<Array<string | number>> = [
    ["Bucket", "Domain", "Role", "India FTE", "Romania FTE", "Denmark FTE", "Total FTE", "Monthly equivalent cost", "Focus"],
    ...snapshot.staffRows.map((row) => [
      row.bucket === "run" ? "Assured Run Base" : "Improve & Evolve",
      row.domain,
      row.role,
      row.fte.india,
      row.fte.romania,
      row.fte.denmark,
      roundOne(row.totalFte),
      Math.round(row.monthlyCost),
      row.focus
    ]),
    [],
    ["Editable FTE assumptions", "Domain", "Role", "India base FTE", "Romania base FTE", "Denmark base FTE", "Base total FTE", "Focus"],
    ...snapshot.controls.staffRoleRows.map((row) => [
      row.bucket === "run" ? "Assured Run Base" : "Improve & Evolve",
      row.domain,
      row.role,
      row.india,
      row.romania,
      row.denmark,
      roundOne(rawRoleFte(row)),
      row.focus
    ]),
    [],
    [
      "Burst Capacity - customer ask matrix",
      "Domain",
      "Request / skill",
      "Rate category",
      "India FTE",
      "Romania FTE",
      "Denmark FTE",
      "Total FTE",
      "Gross monthly equivalent",
      "Net monthly equivalent",
      "Notes"
    ],
    ...snapshot.capacityAsk.rows.map((row) => [
      "Burst Capacity",
      row.domain,
      row.request,
      capacityRateLabels[row.rateId],
      row.fte.india,
      row.fte.romania,
      row.fte.denmark,
      roundOne(row.totalFte),
      Math.round(row.monthlyCost),
      Math.round(row.netMonthlyCost),
      row.note
    ])
  ];

  const modelRows: Array<Array<string | number>> = [
    ["Commercial model", "Customer gives", "We give back", "Best fit", "Share back", "Model discount", "Included specialist credit days/qtr", "Automation fund"],
    ...commercialModels.map((model) => [
      model.label,
      model.customerGives,
      model.weGive,
      model.bestFor,
      `${Math.round(model.shareBack * 100)}%`,
      `${Math.round(model.discount * 100)}%`,
      model.includedBurstDays,
      `${Math.round(model.fundPercent * 100)}%`
    ]),
    [],
    ["Scope group", "Technologies"],
    ...scopeGroups.map((group) => [group.domain, group.technologies])
  ];

  const rateCardRows: Array<Array<string | number>> = [
    ["Unified day rate card", "India", "Romania", "Denmark", "Unit", "Used by"],
    [
      "Assured Run Base staffing",
      snapshot.controls.dayRateCard.run.india,
      snapshot.controls.dayRateCard.run.romania,
      snapshot.controls.dayRateCard.run.denmark,
      "EUR per person day",
      "Run Base staffed FTE"
    ],
    [
      "Improve & Evolve staffing",
      snapshot.controls.dayRateCard.evolve.india,
      snapshot.controls.dayRateCard.evolve.romania,
      snapshot.controls.dayRateCard.evolve.denmark,
      "EUR per person day",
      "Improve & Evolve staffed FTE"
    ],
    [],
    ["Customer ask / burst capacity skill rates"],
    ...capacityRateIds.map((rateId) => [
      capacityRateLabels[rateId],
      snapshot.controls.dayRateCard[rateId].india,
      snapshot.controls.dayRateCard[rateId].romania,
      snapshot.controls.dayRateCard[rateId].denmark,
      "EUR per person day",
      "Customer ask / burst capacity calculator"
    ]),
    [],
    ["Billable days per month", roundOne(snapshot.controls.billableDaysPerMonth)],
    ["Staffed monthly equivalent formula", "FTE x day rate x billable days/month"],
    ["Burst capacity monthly formula", "Customer ask matrix gross monthly less customer ask discount"],
    [],
    ["Discount assumption", "Value"],
    ["Additional discretionary discount", `${snapshot.controls.commercialDiscount}%`],
    ["Applied after term discount, model discount and automation dividend", Math.round(snapshot.commercialDiscountAmount)]
  ];

  const capacityRows: Array<Array<string | number>> = [
    ["Customer shared capacity request"],
    ["Pricing unit", "EUR per person day"],
    ["Rate source", "Unified Rate Card tab"],
    ["Billable days per month", roundOne(snapshot.controls.billableDaysPerMonth)],
    ["Total FTE", roundOne(snapshot.capacityAsk.totalFte)],
    ["Gross monthly equivalent", Math.round(snapshot.capacityAsk.grossMonthly)],
    ["Discount mode", snapshot.controls.capacityDiscountMode === "auto" ? "Auto volume band" : "Manual"],
    ["Volume band", snapshot.capacityAsk.volumeBand],
    ["Discount applied", `${snapshot.capacityAsk.discountPercent}%`],
    ["Discount monthly", Math.round(snapshot.capacityAsk.discountAmount)],
    ["Net monthly equivalent", Math.round(snapshot.capacityAsk.netMonthly)],
    ["Net quarterly", Math.round(snapshot.capacityAsk.quarterlyNet)],
    ["Net annual", Math.round(snapshot.capacityAsk.annualNet)],
    [],
    ["Domain", "Request / skill", "Rate category", "India FTE", "Romania FTE", "Denmark FTE", "Total FTE", "Gross monthly equivalent", "Net monthly equivalent", "Notes"],
    ...snapshot.capacityAsk.rows.map((row) => [
      row.domain,
      row.request,
      capacityRateLabels[row.rateId],
      row.fte.india,
      row.fte.romania,
      row.fte.denmark,
      roundOne(row.totalFte),
      Math.round(row.monthlyCost),
      Math.round(row.netMonthlyCost),
      row.note
    ]),
    [],
    ["Domain", "FTE", "Gross monthly equivalent", "Net monthly equivalent"],
    ...snapshot.capacityAsk.domainTotals.map((row) => [
      row.domain,
      roundOne(row.fte),
      Math.round(row.monthlyCost),
      Math.round(row.netMonthlyCost)
    ])
  ];

  return [
    CommercialWorkbookSheet({ name: "Commercial Summary", rows: summaryRows }),
    CommercialWorkbookSheet({ name: "Staffing Detail", rows: staffingRows }),
    CommercialWorkbookSheet({ name: "Value Models", rows: modelRows }),
    CommercialWorkbookSheet({ name: "Rate Card", rows: rateCardRows }),
    CommercialWorkbookSheet({ name: "Customer Ask Calc", rows: capacityRows })
  ];
}

export function buildCommercialWorkbookBlob(snapshot: CommercialSnapshot = getCommercialSnapshot()) {
  const sheets = commercialWorkbookSheets(snapshot);
  const files: ZipEntry[] = [
    { path: "[Content_Types].xml", content: contentTypesXml(sheets.length) },
    { path: "_rels/.rels", content: rootRelsXml() },
    { path: "docProps/app.xml", content: appPropertiesXml(sheets.map((sheet) => sheet.name)) },
    { path: "docProps/core.xml", content: corePropertiesXml() },
    { path: "xl/workbook.xml", content: workbookXml(sheets.map((sheet) => sheet.name)) },
    { path: "xl/_rels/workbook.xml.rels", content: workbookRelsXml(sheets.length) },
    ...sheets.map((sheet, index) => ({ path: `xl/worksheets/sheet${index + 1}.xml`, content: worksheetXml(sheet.rows) }))
  ];
  return new Blob([xlsxZip(files)], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
}

function downloadCommercialWorkbook(snapshot: CommercialSnapshot) {
  if (typeof document === "undefined") return;
  const blob = buildCommercialWorkbookBlob(snapshot);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pandora-commercial-model-${new Date().toISOString().slice(0, 10)}.xlsx`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function CommercialsSection() {
  const [controls, setControls] = useState<CommercialControls>(defaultCommercialControls);
  const [activeBucketId, setActiveBucketId] = useState<CommercialBucketId>("run");
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [showCapacityAsk, setShowCapacityAsk] = useState(false);
  const snapshot = useMemo(() => getCommercialSnapshot(controls), [controls]);
  const activeBucket = commercialBuckets.find((bucket) => bucket.id === activeBucketId) ?? commercialBuckets[0];
  const activeBucketIndex = commercialBuckets.findIndex((bucket) => bucket.id === activeBucketId);
  const maxCurveGross = Math.max(...snapshot.curveRows.map((row) => row.gross));

  const updateControls = (patch: Partial<CommercialControls>) => setControls((current) => ({ ...current, ...patch }));
  const updateDayRate = (rateId: DayRateId, locationId: LocationId, value: number) => {
    const safeValue = Number.isFinite(value) ? Math.max(0, value) : 0;
    setControls((current) => ({
      ...current,
      dayRateCard: {
        ...current.dayRateCard,
        [rateId]: {
          ...current.dayRateCard[rateId],
          [locationId]: safeValue
        }
      }
    }));
  };
  const updateBillableDaysPerMonth = (value: number) => {
    const safeValue = Number.isFinite(value) ? Math.min(31, Math.max(1, value)) : defaultBillableDaysPerMonth;
    updateControls({ billableDaysPerMonth: safeValue });
  };
  const updateStaffRoleFte = (roleId: string, locationId: LocationId, value: number) => {
    const safeValue = Number.isFinite(value) ? Math.max(0, value) : 0;
    setControls((current) => {
      const changedRole = current.staffRoleRows.find((row) => row.id === roleId);
      const staffRoleRows = current.staffRoleRows.map((row) => (row.id === roleId ? { ...row, [locationId]: safeValue } : row));
      const nextEvolvePodFte =
        changedRole?.bucket === "evolve"
          ? roundOne(displayBucketFte(staffRoleRows, "evolve"))
          : current.evolvePodFte;
      return {
        ...current,
        staffRoleRows,
        evolvePodFte: nextEvolvePodFte
      };
    });
  };
  const updateCapacityCount = (rowId: string, locationId: LocationId, value: number) => {
    const safeValue = Number.isFinite(value) ? Math.max(0, value) : 0;
    setControls((current) => ({
      ...current,
      capacityAskRows: current.capacityAskRows.map((row) => (row.id === rowId ? { ...row, [locationId]: safeValue } : row))
    }));
  };
  const resetAssumptions = () =>
    updateControls({
      commercialDiscount: 0,
      billableDaysPerMonth: defaultBillableDaysPerMonth,
      dayRateCard: cloneDayRateCard(),
      staffRoleRows: cloneStaffRoles(),
      evolvePodFte: baseEvolveFte,
      runIntensity: 100
    });
  const resetCapacityAsk = () =>
    updateControls({
      capacityAskRows: cloneCapacityAskRows(),
      capacityDiscountMode: "auto",
      capacityManualDiscount: 6
    });
  const visibleSourceStaffRows = controls.staffRoleRows.filter((row) => row.bucket === activeBucketId);

  return (
    <Section id="commercials" num="16" title="Commercials - transparent run cost, engineered down over time">
      <p className="sec-sub wide">
        The commercial model is split into three buckets: a staffed Run Base for Ops L1/L2/L3, an Improve & Evolve pod that
        reduces toil and agentifies safe patterns, and customer ask capacity for specialist engineering demand. The levers below
        show how the price changes as coverage, term, automation ambition and the customer ask matrix change.
      </p>

      <Reveal className="commercial-console">
        <div className="commercial-console-head">
          <div>
            <span className="coverage-kicker">Commercial cockpit</span>
            <h3>Move from a fixed people price to a value-back operating model</h3>
          </div>
          <div className="commercial-head-actions">
            <button
              type="button"
              className={`commercial-assumption-toggle ${showAssumptions ? "active" : ""}`}
              aria-expanded={showAssumptions}
              onClick={() => setShowAssumptions((current) => !current)}
            >
              <SlidersHorizontal size={15} aria-hidden="true" />
              Day rates & discount
            </button>
            <button
              type="button"
              className={`commercial-assumption-toggle ${showCapacityAsk ? "active" : ""}`}
              aria-expanded={showCapacityAsk}
              onClick={() => setShowCapacityAsk((current) => !current)}
            >
              <Users size={15} aria-hidden="true" />
              Customer ask calculator
            </button>
            <button type="button" className="commercial-export" onClick={() => downloadCommercialWorkbook(snapshot)}>
              <Download size={15} aria-hidden="true" />
              Download Excel
            </button>
          </div>
        </div>

        <div className="commercial-kpis" aria-label="Commercial summary">
          <div>
            <span>Monthly equivalent net</span>
            <strong>{formatMoney(snapshot.netMonthly)}</strong>
            <small>after term discount, automation dividend and optional commercial discount</small>
          </div>
          <div>
            <span>Run base</span>
            <strong>{formatFte(snapshot.runFte)} FTE</strong>
            <small>{formatMoney(snapshot.runMonthly)} before value-back</small>
          </div>
          <div>
            <span>Improve & Evolve</span>
            <strong>{formatFte(snapshot.evolveFte)} FTE</strong>
            <small>{formatMoney(snapshot.evolveMonthly)} ring-fenced engineering</small>
          </div>
          <div>
            <span>Monthly value-back</span>
            <strong>{formatMoney(snapshot.valueBackMonthly)}</strong>
            <small>credits, dividend, fund, customer ask credit and optional discount</small>
          </div>
        </div>

        <div className="commercial-grid">
          <div className="commercial-model-panel">
            <div className="commercial-diagram-head">
              <span className="coverage-kicker">Three-bucket structure</span>
              <strong>Click a bucket to inspect the commercial boundary</strong>
            </div>
            <div
              className="commercial-bucket-diagram"
              style={{ "--active-x": `${16.666 + activeBucketIndex * 33.333}%` } as CSSProperties}
            >
              <span className="commercial-rail" aria-hidden="true" />
              <span className="commercial-token" aria-hidden="true" />
              {commercialBuckets.map((bucket) => {
                const Icon = bucket.Icon;
                const active = bucket.id === activeBucketId;
                return (
                  <button
                    type="button"
                    className={`commercial-bucket ${active ? "active" : ""}`}
                    aria-pressed={active}
                    onClick={() => setActiveBucketId(bucket.id)}
                    key={bucket.id}
                  >
                    <span><Icon size={18} aria-hidden="true" /></span>
                    <strong>{bucket.label}</strong>
                    <small>{bucket.summary}</small>
                  </button>
                );
              })}
            </div>
            <div className="commercial-bucket-detail">
              <div>
                <span>Customer funds</span>
                <p>{activeBucket.customerFunds}</p>
              </div>
              <ArrowRight size={17} aria-hidden="true" />
              <div>
                <span>We give back</span>
                <p>{activeBucket.valueReturned}</p>
              </div>
            </div>
            <CostStack snapshot={snapshot} />
          </div>

          <div className="commercial-controls">
            <div className="commercial-control-title">
              <SlidersHorizontal size={15} aria-hidden="true" />
              <strong>Commercial levers</strong>
            </div>

            <label className="commercial-slider">
              <span>Run staffing intensity <b>{controls.runIntensity}%</b></span>
              <input
                type="range"
                min="85"
                max="120"
                step="5"
                value={controls.runIntensity}
                onChange={(event) => updateControls({ runIntensity: Number(event.currentTarget.value) })}
              />
            </label>

            <label className="commercial-slider">
              <span>Improve & Evolve pod <b>{formatFte(controls.evolvePodFte)} FTE</b></span>
              <input
                type="range"
                min="4"
                max="10"
                step="0.5"
                value={controls.evolvePodFte}
                onChange={(event) => updateControls({ evolvePodFte: Number(event.currentTarget.value) })}
              />
            </label>

            <label className="commercial-slider">
              <span>Automation dividend target <b>{controls.automationTarget}%</b></span>
              <input
                type="range"
                min="0"
                max="35"
                step="1"
                value={controls.automationTarget}
                onChange={(event) => updateControls({ automationTarget: Number(event.currentTarget.value) })}
              />
            </label>

            <div className="commercial-burst-source">
              <span>Burst capacity price</span>
              <strong>{formatMoney(snapshot.burstMonthly)}</strong>
              <small>
                Sourced from the Customer ask calculator: {formatFte(snapshot.capacityAsk.totalFte)} FTE, {formatMoney(snapshot.capacityAsk.grossMonthly)}
                gross monthly, {snapshot.capacityAsk.discountPercent}% discount.
              </small>
            </div>

            <div className="commercial-segments" role="group" aria-label="Coverage profile">
              {coverageProfiles.map((profile) => (
                <button
                  type="button"
                  className={controls.coverageProfileId === profile.id ? "active" : ""}
                  aria-pressed={controls.coverageProfileId === profile.id}
                  onClick={() => updateControls({ coverageProfileId: profile.id })}
                  key={profile.id}
                >
                  <strong>{profile.label}</strong>
                  <span>{profile.detail}</span>
                </button>
              ))}
            </div>

            <div className="commercial-term-buttons" role="group" aria-label="Commercial term">
              {termOptions.map((term) => (
                <button
                  type="button"
                  className={controls.termMonths === term.months ? "active" : ""}
                  aria-pressed={controls.termMonths === term.months}
                  onClick={() => updateControls({ termMonths: term.months })}
                  key={term.months}
                >
                  {term.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showAssumptions && (
          <div className="commercial-assumptions-panel" id="commercial-assumptions">
            <div className="commercial-assumptions-head">
              <div>
                <span className="coverage-kicker">Hidden commercial assumptions</span>
                <h4>Unified day rate card and discretionary discount controls</h4>
                <p>
                  Use this only when you want to show how base staffing rates, Improve & Evolve rates, customer ask skill
                  rates, billable-days assumptions or a top-level discount change the live economics.
                </p>
              </div>
              <button type="button" onClick={resetAssumptions}>Reset assumptions</button>
            </div>

            <div className="commercial-days-assumption">
              <div>
                <span>Billing basis</span>
                <strong>Day rate card x staffed FTE x billable days/month</strong>
                <small>Monthly and annual values are derived outputs; the editable commercial unit is now EUR per person day.</small>
              </div>
              <label>
                <span>Billable days / month</span>
                <input
                  type="number"
                  min="1"
                  max="31"
                  step="0.5"
                  value={controls.billableDaysPerMonth}
                  onChange={(event) => updateBillableDaysPerMonth(Number(event.currentTarget.value))}
                  aria-label="Billable days per month"
                />
              </label>
            </div>

            <div className="commercial-rate-table" role="table" aria-label="Unified day rate card assumptions">
              <div className="commercial-rate-head" role="row">
                <span role="columnheader">Day rate card</span>
                {locationIds.map((locationId) => (
                  <span role="columnheader" key={locationId}>{locations[locationId].label}</span>
                ))}
                <span role="columnheader">Unit</span>
              </div>
              {([
                ["run", "Base staffing", "EUR / person day"],
                ["evolve", "Improve & Evolve", "EUR / person day"]
              ] as Array<[RateBucketId, string, string]>).map(([bucket, label, unit]) => (
                <div className="commercial-rate-row" role="row" key={bucket}>
                  <span role="cell">
                    <strong>{label}</strong>
                    <small>multiplied by staffed FTE and {controls.billableDaysPerMonth} billable days/month</small>
                  </span>
                  {locationIds.map((locationId) => (
                    <label role="cell" key={`${bucket}-${locationId}`}>
                      <span>{locations[locationId].short}</span>
                      <input
                        type="number"
                        min="0"
                        step="5"
                        value={controls.dayRateCard[bucket][locationId]}
                        onChange={(event) => updateDayRate(bucket, locationId, Number(event.currentTarget.value))}
                        aria-label={`${label} ${locations[locationId].label} rate`}
                      />
                    </label>
                  ))}
                  <span role="cell">{unit}</span>
                </div>
              ))}
              <div className="commercial-rate-row commercial-rate-section-row" role="row">
                <span role="cell">Customer ask / burst capacity skill rates</span>
              </div>
              {capacityRateIds.map((rateId) => (
                <div className="commercial-rate-row" role="row" key={rateId}>
                  <span role="cell">
                    <strong>{capacityRateLabels[rateId]}</strong>
                    <small>
                      used by the customer ask / burst capacity calculator
                    </small>
                  </span>
                  {locationIds.map((locationId) => (
                    <label role="cell" key={`${rateId}-${locationId}`}>
                      <span>{locations[locationId].short}</span>
                      <input
                        type="number"
                        min="0"
                        step="5"
                        value={controls.dayRateCard[rateId][locationId]}
                        onChange={(event) => updateDayRate(rateId, locationId, Number(event.currentTarget.value))}
                        aria-label={`${capacityRateLabels[rateId]} ${locations[locationId].label} day rate`}
                      />
                    </label>
                  ))}
                  <span role="cell">EUR / person day</span>
                </div>
              ))}
            </div>

            <div className="commercial-fte-assumptions">
              <div className="commercial-fte-formulas" aria-label="FTE calculation basis">
                <div>
                  <span>Run Base build-up</span>
                  <strong>{formatFte(snapshot.displayRunBaselineFte)} editable baseline to {formatFte(snapshot.runFte)} modelled FTE</strong>
                  <small>Coverage and run-intensity multiplier: {Math.round(snapshot.runScale * 100)}%; quarter-FTE roles display to one decimal.</small>
                </div>
                <div>
                  <span>Improve & Evolve build-up</span>
                  <strong>{formatFte(snapshot.displayEvolveBaselineFte)} editable mix to {formatFte(snapshot.evolveFte)} modelled FTE</strong>
                  <small>The Improve & Evolve slider keeps the total pod size visible while this table controls the role and location mix.</small>
                </div>
              </div>
              <div className="commercial-fte-table" role="table" aria-label="Run Base and Improve FTE assumptions">
                <div className="commercial-fte-row commercial-fte-head" role="row">
                  <span role="columnheader">Bucket / role</span>
                  <span role="columnheader">India</span>
                  <span role="columnheader">Romania</span>
                  <span role="columnheader">Denmark</span>
                  <span role="columnheader">FTE</span>
                  <span role="columnheader">Monthly equiv.</span>
                </div>
                {controls.staffRoleRows.map((row) => {
                  const computed = snapshot.staffRows.find((staffRow) => staffRow.id === row.id);
                  return (
                    <div className={`commercial-fte-row ${row.bucket}`} role="row" key={row.id}>
                      <span role="cell">
                        <strong>{row.bucket === "run" ? "Run Base" : "Improve & Evolve"} - {row.role}</strong>
                        <small>{row.domain} - {row.focus}</small>
                      </span>
                      {locationIds.map((locationId) => (
                        <label role="cell" key={`${row.id}-${locationId}`}>
                          <span>{locations[locationId].short}</span>
                          <input
                            type="number"
                            min="0"
                            step="0.25"
                            value={row[locationId]}
                            onChange={(event) => updateStaffRoleFte(row.id, locationId, Number(event.currentTarget.value))}
                            aria-label={`${row.role} ${locations[locationId].label} FTE`}
                          />
                        </label>
                      ))}
                      <b role="cell">{formatFte(computed?.totalFte ?? rawRoleFte(row))}</b>
                      <b role="cell">{formatMoney(computed?.monthlyCost ?? 0)}</b>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="commercial-discount-grid">
              <label className="commercial-slider commercial-discount-slider">
                <span>Additional discretionary discount <b>{controls.commercialDiscount}%</b></span>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={controls.commercialDiscount}
                  onChange={(event) => updateControls({ commercialDiscount: Number(event.currentTarget.value) })}
                />
                <em>Applied after term discount, commercial-model discount and automation dividend.</em>
              </label>
              <div className="commercial-discount-impact">
                <ShieldCheck size={17} aria-hidden="true" />
                <div>
                  <span>Current discount impact</span>
                  <strong>{formatMoney(snapshot.commercialDiscountAmount)} / month</strong>
                  <small>Net monthly equivalent moves to {formatMoney(snapshot.netMonthly)} with the current assumptions.</small>
                </div>
              </div>
            </div>
          </div>
        )}

        {showCapacityAsk && (
          <div className="commercial-capacity-panel" id="commercial-capacity-calculator">
            <div className="commercial-assumptions-head">
              <div>
                <span className="coverage-kicker">Hidden customer ask / burst calculator</span>
                <h4>Customer ask cost calculator</h4>
                <p>
                  Seeded with the latest customer list. Counts can be moved across locations, while the rates come from the
                  unified Day rates & discount panel. The discount can follow an automatic volume band or a manual negotiation position.
                </p>
              </div>
              <button type="button" onClick={resetCapacityAsk}>Reset customer ask</button>
            </div>

            <div className="commercial-capacity-kpis" aria-label="Customer ask cost summary">
              <div>
                <span>Total request</span>
                <strong>{formatFte(snapshot.capacityAsk.totalFte)} FTE</strong>
                <small>{formatFte(snapshot.capacityAsk.locationTotals.india)} India, {formatFte(snapshot.capacityAsk.locationTotals.romania)} Romania, {formatFte(snapshot.capacityAsk.locationTotals.denmark)} Denmark</small>
              </div>
              <div>
                <span>Gross monthly equivalent</span>
                <strong>{formatMoney(snapshot.capacityAsk.grossMonthly)}</strong>
                <small>day rates x FTE x {controls.billableDaysPerMonth} days</small>
              </div>
              <div>
                <span>Applied discount</span>
                <strong>{snapshot.capacityAsk.discountPercent}%</strong>
                <small>{snapshot.capacityAsk.volumeBand}</small>
              </div>
              <div>
                <span>Net monthly equivalent</span>
                <strong>{formatMoney(snapshot.capacityAsk.netMonthly)}</strong>
                <small>{formatMoneyFull(snapshot.capacityAsk.discountAmount)} discount per month</small>
              </div>
              <div>
                <span>Quarter / annual</span>
                <strong>{formatMoney(snapshot.capacityAsk.quarterlyNet)}</strong>
                <small>{formatMoney(snapshot.capacityAsk.annualNet)} annual run-rate</small>
              </div>
            </div>

            <div className="commercial-shared-rate-note">
              <ShieldCheck size={17} aria-hidden="true" />
              <div>
                <span>Shared rate source</span>
                <strong>Uses the unified day rate card</strong>
                <small>
                  Skill day rates and billable days/month are controlled in Day rates & discount. Current basis:
                  {` ${controls.billableDaysPerMonth}`} billable days/month.
                </small>
              </div>
            </div>

            <div className="commercial-capacity-layout">
              <div className="commercial-capacity-side">
                <CapacityDomainBars capacityAsk={snapshot.capacityAsk} />
                <div className="commercial-capacity-discount">
                  <div className="commercial-capacity-mode" role="group" aria-label="Customer ask discount mode">
                    {([
                      ["auto", "Auto volume band"],
                      ["manual", "Manual discount"]
                    ] as Array<[CapacityDiscountMode, string]>).map(([mode, label]) => (
                      <button
                        type="button"
                        className={controls.capacityDiscountMode === mode ? "active" : ""}
                        aria-pressed={controls.capacityDiscountMode === mode}
                        onClick={() => updateControls({ capacityDiscountMode: mode })}
                        key={mode}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <label className="commercial-slider commercial-capacity-discount-slider">
                    <span>
                      Overall customer ask discount
                      <b>{controls.capacityDiscountMode === "auto" ? snapshot.capacityAsk.recommendedDiscount : controls.capacityManualDiscount}%</b>
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="0.5"
                      value={controls.capacityDiscountMode === "auto" ? snapshot.capacityAsk.recommendedDiscount : controls.capacityManualDiscount}
                      disabled={controls.capacityDiscountMode === "auto"}
                      onChange={(event) => updateControls({ capacityManualDiscount: Number(event.currentTarget.value) })}
                    />
                    <em>
                      {controls.capacityDiscountMode === "auto"
                        ? `Auto uses ${snapshot.capacityAsk.volumeBand}; switch to manual to override.`
                        : "Manual override applied after the gross monthly-equivalent cost is calculated."}
                    </em>
                  </label>
                </div>
              </div>

              <div className="commercial-capacity-table" role="table" aria-label="Customer ask headcount by skill and location">
                <div className="commercial-capacity-row commercial-capacity-head-row" role="row">
                  <span role="columnheader">Scope / request</span>
                  <span role="columnheader">Rate category</span>
                  <span role="columnheader">India</span>
                  <span role="columnheader">Romania</span>
                  <span role="columnheader">Denmark</span>
                  <span role="columnheader">Total</span>
                  <span role="columnheader">Gross monthly</span>
                  <span role="columnheader">Net monthly</span>
                </div>
                {snapshot.capacityAsk.rows.map((row) => (
                  <div className="commercial-capacity-row" role="row" key={row.id}>
                    <span role="cell">
                      <strong>{row.request}</strong>
                      <small>{row.domain} - {row.note}</small>
                    </span>
                    <span role="cell">{capacityRateLabels[row.rateId]}</span>
                    {locationIds.map((locationId) => (
                      <label role="cell" key={`${row.id}-${locationId}`}>
                        <span>{locations[locationId].short}</span>
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          value={controls.capacityAskRows.find((item) => item.id === row.id)?.[locationId] ?? 0}
                          onChange={(event) => updateCapacityCount(row.id, locationId, Number(event.currentTarget.value))}
                          aria-label={`${row.request} ${locations[locationId].label} FTE`}
                        />
                      </label>
                    ))}
                    <b role="cell">{formatFte(row.totalFte)}</b>
                    <b role="cell">{formatMoney(row.monthlyCost)}</b>
                    <b role="cell">{formatMoney(row.netMonthlyCost)}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Reveal>

      <Reveal className="commercial-scope-band">
        {scopeGroups.map((group) => (
          <div className="commercial-scope-item" key={group.domain}>
            {group.domain === "DevOps" ? <GitBranch size={17} /> : group.domain === "Data" ? <Database size={17} /> : <Network size={17} />}
            <div>
              <strong>{group.domain}</strong>
              <span>{group.technologies}</span>
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal className="commercial-workbench">
        <div className="commercial-curve-panel">
          <div className="commercial-panel-head">
            <span className="coverage-kicker">Cost glidepath</span>
            <h3>Improvement work reduces the shape of Run</h3>
          </div>
          <CommercialCurveSvg snapshot={snapshot} />
          <div className="commercial-curve-bars">
            {snapshot.curveRows.map((row) => (
              <div className="commercial-curve-row" key={row.period}>
                <span>{row.period}</span>
                <i>
                  <b style={{ width: `${Math.max(6, (row.net / maxCurveGross) * 100)}%` }} />
                </i>
                <strong>{formatMoney(row.net)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="commercial-value-panel">
          <div className="commercial-panel-head">
            <span className="coverage-kicker">Commercial models</span>
            <h3>Different ways to beat a pure FTE price</h3>
          </div>
          <div className="commercial-model-cards">
            {commercialModels.map((model) => {
              const active = model.id === controls.modelId;
              return (
                <button
                  type="button"
                  className={`commercial-model-card ${active ? "active" : ""}`}
                  aria-pressed={active}
                  onClick={() => updateControls({ modelId: model.id })}
                  key={model.id}
                >
                  <strong>{model.label}</strong>
                  <span>{model.short}</span>
                  <small>{model.weGive}</small>
                </button>
              );
            })}
          </div>
          <div className="commercial-giveget">
            <div>
              <span>Customer commits</span>
              <p>{snapshot.model.customerGives}</p>
            </div>
            <div>
              <span>We give back</span>
              <p>{snapshot.model.weGive}</p>
            </div>
            <div>
              <span>Commercial effect</span>
              <p>
                {formatMoney(snapshot.automationDividend)} productivity dividend, {formatDays(snapshot.includedBurstDays)} included
                specialist credit per quarter and {formatMoney(snapshot.automationFund)} improvement fund value per month.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="commercial-staffing-panel">
        <div className="commercial-panel-head">
          <span className="coverage-kicker">Staffing and location mix</span>
          <h3>{activeBucket.label}</h3>
        </div>
        <div className="commercial-staffing-grid">
          <div className="commercial-location-card">
            <LocationMix snapshot={snapshot} />
            <div className="commercial-target-box">
              <Gauge size={17} aria-hidden="true" />
              <div>
                <span>Target run shape after maturity</span>
                <strong>{formatFte(snapshot.targetRunFte)} FTE / {formatMoney(snapshot.targetRunMonthly)}</strong>
                <small>driven by automation target and verified toil reduction</small>
              </div>
            </div>
          </div>

          <div className="commercial-role-table" role="table" aria-label={`${activeBucket.label} commercial detail`}>
            {activeBucketId !== "burst" ? (
              <>
                <div className="commercial-role-head" role="row">
                  <span role="columnheader">Domain / role</span>
                  <span role="columnheader">India</span>
                  <span role="columnheader">Romania</span>
                  <span role="columnheader">Denmark</span>
                  <span role="columnheader">FTE</span>
                  <span role="columnheader">Cost</span>
                </div>
                {visibleSourceStaffRows.map((row) => {
                  const computed = snapshot.staffRows.find((staffRow) => staffRow.id === row.id);
                  return (
                    <div className="commercial-role-row" role="row" key={row.id}>
                      <span role="cell">
                        <strong>{row.role}</strong>
                        <small>{row.domain} - {row.focus}</small>
                      </span>
                      {locationIds.map((locationId) => (
                        <label role="cell" key={`${row.id}-visible-${locationId}`}>
                          <span>{locations[locationId].short}</span>
                          <input
                            type="number"
                            min="0"
                            step="0.25"
                            value={row[locationId]}
                            onChange={(event) => updateStaffRoleFte(row.id, locationId, Number(event.currentTarget.value))}
                            aria-label={`${row.role} ${locations[locationId].label} FTE`}
                          />
                        </label>
                      ))}
                      <b role="cell">{formatFte(computed?.totalFte ?? rawRoleFte(row))}</b>
                      <b role="cell">{formatMoney(computed?.monthlyCost ?? 0)}</b>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="commercial-burst-list">
                <div className="commercial-burst-summary">
                  <div>
                    <span>Pricing source</span>
                    <strong>Customer ask matrix</strong>
                    <small>
                      Burst capacity is the planned customer ask: {formatFte(snapshot.capacityAsk.totalFte)} FTE across
                      DevOps, data, integration and legacy skills.
                    </small>
                  </div>
                  <div>
                    <span>Net monthly</span>
                    <strong>{formatMoney(snapshot.burstMonthly)}</strong>
                    <small>{formatMoney(snapshot.capacityAsk.grossMonthly)} gross less {snapshot.capacityAsk.discountPercent}% customer ask discount.</small>
                  </div>
                </div>
                {snapshot.capacityAsk.rows.map((row) => (
                  <div className="commercial-burst-row" key={row.id}>
                    <div>
                      <strong>{row.request}</strong>
                      <span>{row.domain} - {capacityRateLabels[row.rateId]}</span>
                      <small>{row.note}</small>
                    </div>
                    <b>{formatFte(row.totalFte)} FTE</b>
                    <em>{formatMoney(row.monthlyCost)} gross</em>
                    <strong>{formatMoney(row.netMonthlyCost)}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal className="commercial-close-note">
        <BadgeCheck size={18} aria-hidden="true" />
        <span>
          This is deliberately not just a day-rate story. The base service is staffed to protect transition; the Improve & Evolve
          pod is funded to shrink repeated work; burst capacity keeps scarce engineering skills available without turning
          them into permanent cost.
        </span>
      </Reveal>
    </Section>
  );
}
