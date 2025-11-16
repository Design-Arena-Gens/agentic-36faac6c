import { archetypeAngles, customerStageCopy, deliveryTemplates } from "./templates";
import type { AgentConfig, Channel, GeneratedMessage } from "./types";

const channelWriters: Record<Channel, (config: AgentConfig) => string> = {
  email: (config) => {
    const pains = config.pains.map((pain) => `• ${pain}`).join("\n");
    return `Hey ${config.customerName || "there"},\n\n${config.personalizationHook}\n\nWhat jumped out to me was how often ${config.pains[0] ?? "teams"} stalls progress. The teams we partner with usually feel it in three places:\n${pains}\n\nHere is how ${config.selectedProduct.name} helps:\n• Promise: ${config.selectedProduct.promise}\n• Proof: ${config.selectedProduct.proof}\n• Payoff: ${config.primaryOutcome}\n\nIf we align this with your plan to ${config.desire}, we can have a rollout in motion before ${config.scarcityWindow}. I recorded a fast teardown that shows the exact workflow (${config.credibilityAsset}).\n\nWould it be wild to block \u203a 20 minutes on ${config.scarcityWindow} to reverse-engineer this for you?\n\n${config.agentPersona.label} at your service,\n${config.agentPersona.headline}`;
  },
  sms: (config) => {
    return `${config.customerName || "Hey"} — quick thought. ${config.selectedProduct.name} gets you ${config.primaryOutcome.toLowerCase()} without ${config.pains[0]?.toLowerCase() ?? "the usual friction"}. ${config.selectedProduct.proof}. Shall I send the ${config.selectedProduct.name.split(" ")[0]} blueprint before ${config.scarcityWindow}?`;
  },
  dm: (config) => {
    return `Saw your note about wanting to ${config.desire.toLowerCase()}. I\'ve been helping teams like yours using ${config.selectedProduct.name}. ${config.selectedProduct.proof}. If I mapped a ${config.followUpCadence === "intense" ? "90-day" : "45-day"} sprint that clears ${config.pains[0]?.toLowerCase() ?? "the main blockers"}, would you take a peek?`;
  }
};

const followUpPlays: Record<AgentConfig["followUpCadence"], string[]> = {
  light: [
    "Day 2 · Send a value nugget recap with 1-sentence CTA",
    "Day 6 · Share testimonial or micro-case study that mirrors their objection",
    "Day 12 · Soft close with open loop about next milestone"
  ],
  standard: [
    "Day 1 · Deliver custom loom showing their current gap vs desired outcome",
    "Day 4 · Text reminder framing the cost of inaction",
    "Day 8 · Share playbook excerpt with 2-line CTA",
    "Day 12 · Scarcity reminder + offer to co-build first step"
  ],
  intense: [
    "Hour 6 · SMS nudge with pattern interrupt and a yes/no question",
    "Day 2 · Email case study with emphasized ROI",
    "Day 3 · DM voice note (human touch) highlighting next micro win",
    "Day 5 · Invite to private workshop slot",
    "Day 9 · Final notice tying urgency cue to their desired outcome"
  ]
};

const successMetricByStage: Record<AgentConfig["customerStage"], string> = {
  "new-lead": "Book a discovery call and secure verbal commitment",
  "warm-lead": "Move to proposal review with written buying criteria",
  "active-customer": "Close expansion deal with 25% ACV uplift",
  "past-client": "Reactivate account with pilot payment received"
};

const subjectVariants = (config: AgentConfig): string[] => {
  const archetype = archetypeAngles[config.archetype];
  const product = config.selectedProduct;
  const lever = config.agentPersona.levers[0];
  return [
    `${config.customerName ? config.customerName + ", " : ""}${product.promise.split(" ").slice(0, 4).join(" ")}`,
    `${archetype.hook} → ${product.name}`,
    `${config.selectedProduct.price} path to ${config.primaryOutcome.toLowerCase()}`,
    `${config.scarcityWindow}: lock in ${product.urgencyCue.replace("Spots", "spots")}`,
    `${lever} + ${config.primaryOutcome}`
  ];
};

export const composeMessage = (config: AgentConfig): GeneratedMessage => {
  const stageInsight = customerStageCopy[config.customerStage];
  const archetype = archetypeAngles[config.archetype];

  const psychologicalLevers = Array.from(
    new Set([
      ...config.agentPersona.levers,
      stageInsight.headline,
      archetype.hook,
      config.selectedProduct.urgencyCue
    ])
  );

  const positioning = `${config.agentPersona.label} · ${stageInsight.headline}`;

  const narrative = (
    `We anchor the conversation around ${config.primaryOutcome.toLowerCase()} so ${config.customerName || "your buyer"} sees the finish line first. ` +
    `Then we layer ${archetype.motivators.join(", ")} to trigger action. ` +
    `By naming ${config.pains.join(" and ") || "the current friction"}, we earn the right to present ${config.selectedProduct.name} as the obvious next move.`
  );

  const callToAction = `Secure a ${config.followUpCadence === "intense" ? "fast-track" : "priority"} strategy sprint before ${config.scarcityWindow}.`;

  const channelMessages = config.channelMix.map((channel) => ({
    channel,
    copy: channelWriters[channel](config)
  }));

  const followUps = followUpPlays[config.followUpCadence];

  const successMetric = successMetricByStage[config.customerStage];

  return {
    subject: subjectVariants(config),
    positioning,
    narrative,
    psychologicalLevers,
    callToAction,
    channelMessages,
    followUps,
    successMetric
  };
};
