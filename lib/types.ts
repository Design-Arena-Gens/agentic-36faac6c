export type CustomerStage = "new-lead" | "warm-lead" | "active-customer" | "past-client";

export type BuyerArchetype =
  | "visionary"
  | "pragmatist"
  | "skeptic"
  | "relationship";

export type Channel = "email" | "sms" | "dm";

export interface Product {
  id: string;
  name: string;
  price: string;
  promise: string;
  proof: string;
  urgencyCue: string;
}

export interface AgentPersona {
  id: string;
  label: string;
  headline: string;
  tone: string;
  levers: string[];
  strategy: string;
}

export interface AgentConfig {
  customerName: string;
  customerStage: CustomerStage;
  archetype: BuyerArchetype;
  primaryOutcome: string;
  pains: string[];
  desire: string;
  credibilityAsset: string;
  scarcityWindow: string;
  channelMix: Channel[];
  selectedProduct: Product;
  agentPersona: AgentPersona;
  personalizationHook: string;
  followUpCadence: "light" | "standard" | "intense";
}

export interface ChannelMessage {
  channel: Channel;
  copy: string;
}

export interface GeneratedMessage {
  subject: string[];
  positioning: string;
  narrative: string;
  psychologicalLevers: string[];
  callToAction: string;
  channelMessages: ChannelMessage[];
  followUps: string[];
  successMetric: string;
}
