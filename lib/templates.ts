import type { AgentPersona, BuyerArchetype, Channel, CustomerStage, Product } from "./types";

export const customerStageCopy: Record<CustomerStage, { headline: string; toneHint: string }> = {
  "new-lead": {
    headline: "Spark curiosity with relevance and social proof",
    toneHint: "High energy with a focus on quick wins"
  },
  "warm-lead": {
    headline: "Re-ignite momentum with tailored outcomes",
    toneHint: "Confident and collaborative"
  },
  "active-customer": {
    headline: "Expand the partnership by highlighting hidden value",
    toneHint: "Partner-centric with strategic vision"
  },
  "past-client": {
    headline: "Win back attention with a refreshed promise",
    toneHint: "Warm, respectful, and forward-looking"
  }
};

export const archetypeAngles: Record<BuyerArchetype, { motivators: string[]; objections: string[]; hook: string }> = {
  visionary: {
    motivators: ["category leadership", "innovation edge", "transformational ROI"],
    objections: ["status quo fatigue", "differentiation concerns"],
    hook: "Paint the future they want to pioneer"
  },
  pragmatist: {
    motivators: ["operational efficiency", "measurable ROI", "proven playbooks"],
    objections: ["resource risk", "implementation drag"],
    hook: "Lead with proof and process"
  },
  skeptic: {
    motivators: ["risk mitigation", "clarity", "transparent logic"],
    objections: ["too good to be true", "lack of control"],
    hook: "Offer evidence and options"
  },
  relationship: {
    motivators: ["trust", "values alignment", "long-term support"],
    objections: ["impersonal vendors", "lack of rapport"],
    hook: "Lead with empathy and partnership"
  }
};

export const deliveryTemplates: Record<Channel, { opener: string; cadence: string }> = {
  email: {
    opener: "Expansive storytelling with layered value",
    cadence: "Subject line → pattern interrupt → insight → offer → CTA"
  },
  sms: {
    opener: "Punchy, outcome-first message",
    cadence: "Hook → payoff → micro-CTA"
  },
  dm: {
    opener: "Conversational bridge with quick proof",
    cadence: "Context → insight → question"
  }
};

export const agentPersonas: AgentPersona[] = [
  {
    id: "the-closer",
    label: "The Closer",
    headline: "High-conversion agent using urgency and proof",
    tone: "decisive, energetic, laser-focused on outcomes",
    levers: ["AIDA sequencing", "loss aversion", "scarcity cues"],
    strategy: "Fast-track conversions by spotlighting specific ROI and time-sensitive wins."
  },
  {
    id: "the-strategist",
    label: "The Strategist",
    headline: "Strategic advisor who co-creates the roadmap",
    tone: "consultative, insightful, confident",
    levers: ["authority bias", "future pacing", "risk mitigation"],
    strategy: "Guide the buyer to picture themselves succeeding with your offer already in place."
  },
  {
    id: "the-champion",
    label: "The Champion",
    headline: "Relationship-first guide who makes buyers feel understood",
    tone: "warm, human, supportive",
    levers: ["likability bias", "reciprocity", "belonging"],
    strategy: "Amplify empathy and align your product with their values and culture."
  }
];

export const productCatalog: Product[] = [
  {
    id: "conversion-lab",
    name: "Conversion Lab Accelerator",
    price: "$1,497",
    promise: "Launch a high-converting funnel in 30 days",
    proof: "Average clients see a 3.2x lift in demo bookings",
    urgencyCue: "Spots reset every quarter and we have 6 left"
  },
  {
    id: "evergreen-agents",
    name: "Evergreen AI Agent Suite",
    price: "$349/mo",
    promise: "Automate buyer conversations across email, SMS, and social",
    proof: "Built-in playbooks trained on 1.2M sales interactions",
    urgencyCue: "Founding membership pricing increases next month"
  },
  {
    id: "offer-mastery",
    name: "Offer Mastery Bootcamp",
    price: "$997",
    promise: "Design offers that convert across cold and warm channels",
    proof: "Used by 800+ founders to scale past their revenue plateaus",
    urgencyCue: "Cohort kicks off on Monday—bonus workshop expires in 72 hours"
  }
];
