"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Switch } from "@headlessui/react";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";
import { agentPersonas, archetypeAngles, customerStageCopy, deliveryTemplates, productCatalog } from "@/lib/templates";
import { composeMessage } from "@/lib/messageComposer";
import type { AgentConfig, BuyerArchetype, Channel, CustomerStage } from "@/lib/types";

const buyerArchetypeLabels: Record<BuyerArchetype, string> = {
  visionary: "Visionary Pioneers",
  pragmatist: "Pragmatic Operators",
  skeptic: "Data Skeptics",
  relationship: "Relationship Builders"
};

const customerStageLabels: Record<CustomerStage, string> = {
  "new-lead": "New Lead",
  "warm-lead": "Warm Lead",
  "active-customer": "Active Customer",
  "past-client": "Past Client"
};

const channelLabels: Record<Channel, string> = {
  email: "Email",
  sms: "SMS",
  dm: "Direct Message"
};

const defaultConfig: AgentConfig = {
  customerName: "Alex",
  customerStage: "warm-lead",
  archetype: "visionary",
  primaryOutcome: "Ship a magnetic offer funnel that prints qualified calls",
  pains: ["Launching new offers eats weeks", "Team lacks persuasive copy on-demand", "Lead nurture feels generic"],
  desire: "turn every touchpoint into a buying moment",
  credibilityAsset: "loom.com/share/sprint-breakdown",
  scarcityWindow: "Friday",
  channelMix: ["email", "sms", "dm"],
  selectedProduct: productCatalog[1],
  agentPersona: agentPersonas[0],
  personalizationHook: "Congrats on crossing 5M ARR—your latest product drop was a masterclass in positioning.",
  followUpCadence: "standard"
};

export function AgentWorkbench() {
  const [config, setConfig] = useState<AgentConfig>(defaultConfig);
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);
  const [customPainPoint, setCustomPainPoint] = useState("");

  const generated = useMemo(() => composeMessage(config), [config]);

  const toggleChannel = useCallback(
    (channel: Channel) => {
      setConfig((prev) => {
        const exists = prev.channelMix.includes(channel);
        const nextChannels = exists
          ? prev.channelMix.filter((ch) => ch !== channel)
          : [...prev.channelMix, channel];
        return {
          ...prev,
          channelMix: nextChannels.length > 0 ? nextChannels : [channel]
        };
      });
    },
    [setConfig]
  );

  const copyToClipboard = useCallback((label: string, payload: string) => {
    void navigator.clipboard.writeText(payload);
    setCopiedChannel(label);
    setTimeout(() => setCopiedChannel(null), 1400);
  }, []);

  const updateConfig = useCallback(<K extends keyof AgentConfig>(key: K, value: AgentConfig[K]) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const addPainPoint = useCallback(() => {
    const trimmed = customPainPoint.trim();
    if (!trimmed) return;
    updateConfig("pains", [...config.pains, trimmed]);
    setCustomPainPoint("");
  }, [config.pains, customPainPoint, updateConfig]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card-panel relative space-y-6 rounded-3xl p-6 sm:p-8"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Agent Blueprint</h2>
          <p className="text-sm text-slate-300">
            Tune buyer psychology, offers, and channel mix. The agent adapts messaging in real-time.
          </p>
        </div>

        <div className="grid gap-6">
          <FieldGroup title="Customer Identity" description="Shape how the agent mirrors your buyer.">
            <LabelledInput
              label="Customer name"
              placeholder="Prospect name or team"
              value={config.customerName}
              onChange={(value) => updateConfig("customerName", value)}
            />

            <SelectRow label="Pipeline stage" value={config.customerStage} onChange={(value) => updateConfig("customerStage", value as CustomerStage)}>
              {Object.entries(customerStageLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectRow>

            <SelectRow label="Buyer archetype" value={config.archetype} onChange={(value) => updateConfig("archetype", value as BuyerArchetype)}>
              {Object.entries(buyerArchetypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectRow>

            <LabelledTextArea
              label="Personal hook"
              value={config.personalizationHook}
              onChange={(value) => updateConfig("personalizationHook", value)}
              placeholder="Reference a win, trigger, or recent signal they've shared"
            />

            <InfoBanner
              title={customerStageCopy[config.customerStage].headline}
              body={`${customerStageCopy[config.customerStage].toneHint}. ${archetypeAngles[config.archetype].hook}.`}
            />
          </FieldGroup>

          <FieldGroup title="Offer & Outcomes" description="Align the promise to the core desire.">
            <SelectRow
              label="Product focus"
              value={config.selectedProduct.id}
              onChange={(value) => {
                const product = productCatalog.find((item) => item.id === value);
                if (product) updateConfig("selectedProduct", product);
              }}
            >
              {productCatalog.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} • {product.price}
                </option>
              ))}
            </SelectRow>

            <LabelledInput
              label="Primary outcome"
              value={config.primaryOutcome}
              onChange={(value) => updateConfig("primaryOutcome", value)}
              placeholder="What win are we promising?"
            />

            <LabelledInput
              label="Dream state"
              value={config.desire}
              onChange={(value) => updateConfig("desire", value)}
              placeholder="How do they want to feel or operate?"
            />

            <LabelledInput
              label="Credibility asset"
              value={config.credibilityAsset}
              onChange={(value) => updateConfig("credibilityAsset", value)}
              placeholder="Case study link, Loom, testimonial"
            />

            <LabelledInput
              label="Urgency window"
              value={config.scarcityWindow}
              onChange={(value) => updateConfig("scarcityWindow", value)}
              placeholder="Friday, 48 hours, end-of-month..."
            />
          </FieldGroup>

          <FieldGroup title="Pain points" description="Stack 1-3 tensions the message will dissolve.">
            <div className="space-y-3">
              {config.pains.map((pain, index) => (
                <div key={index} className="flex items-start gap-3 rounded-xl border border-slate-700/60 bg-slate-900/60 p-3 text-sm">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500/20 text-primary-300">
                    {index + 1}
                  </span>
                  <p className="text-slate-200">{pain}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={customPainPoint}
                onChange={(event) => setCustomPainPoint(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addPainPoint();
                  }
                }}
                placeholder="Add another friction—keep it specific"
                className="flex-1 rounded-xl border border-slate-700/70 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-500/40"
              />
              <button
                type="button"
                onClick={addPainPoint}
                className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              >
                Add tension
              </button>
            </div>
          </FieldGroup>

          <FieldGroup title="Agent persona" description="Pick the energy that best matches your buyer.">
            <div className="grid gap-4">
              {agentPersonas.map((persona) => {
                const active = config.agentPersona.id === persona.id;
                return (
                  <button
                    key={persona.id}
                    type="button"
                    onClick={() => updateConfig("agentPersona", persona)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-primary-400/80 bg-primary-500/10 shadow-lg shadow-primary-500/20"
                        : "border-slate-700/70 bg-slate-900/50 hover:border-primary-400/60 hover:bg-slate-900"
                    }`}
                  >
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary-200/80">
                      {persona.label}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-100">{persona.headline}</p>
                    <p className="mt-2 text-sm text-slate-300">Tone: {persona.tone}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.35em] text-slate-400">Psychology levers</p>
                    <p className="mt-1 text-sm text-slate-200">{persona.levers.join(" • ")}</p>
                  </button>
                );
              })}
            </div>
          </FieldGroup>

          <FieldGroup title="Channels" description="Deploy the message across high-intent surfaces.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {(Object.keys(channelLabels) as Channel[]).map((channel) => (
                <ChannelToggle
                  key={channel}
                  label={channelLabels[channel]}
                  active={config.channelMix.includes(channel)}
                  description={deliveryTemplates[channel].opener}
                  onToggle={() => toggleChannel(channel)}
                />
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Follow up rhythm</p>
              <div className="flex flex-wrap gap-2">
                {["light", "standard", "intense"].map((cadence) => (
                  <button
                    key={cadence}
                    type="button"
                    onClick={() => updateConfig("followUpCadence", cadence as AgentConfig["followUpCadence"])}
                    className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                      config.followUpCadence === cadence
                        ? "bg-primary-500 text-white shadow shadow-primary-500/40"
                        : "bg-slate-900/60 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {cadence}
                  </button>
                ))}
              </div>
            </div>
          </FieldGroup>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card-panel space-y-6 rounded-3xl p-6 sm:p-8"
      >
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-50">Sales Play Output</h2>
            <p className="text-sm text-slate-300">Download-ready messaging engineered for {buyerArchetypeLabels[config.archetype].toLowerCase()}.</p>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(
              "playbook",
              [
                `Subject ideas:`,
                ...generated.subject,
                "\nPositioning:",
                generated.positioning,
                "\nNarrative:",
                generated.narrative,
                "\nCTA:",
                generated.callToAction,
                "\nLevers:",
                generated.psychologicalLevers.join(", "),
                "\nFollow ups:",
                generated.followUps.join(" | ")
              ].join("\n")
            )}
            className="inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary-100 transition hover:bg-primary-500/20"
          >
            {copiedChannel === "playbook" ? <CheckIcon className="h-4 w-4" /> : <ClipboardDocumentIcon className="h-4 w-4" />}Copy playbook
          </button>
        </header>

        <div className="space-y-6">
          <div className="space-y-3 rounded-2xl border border-slate-700/70 bg-slate-900/50 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-primary-200/80">Positioning Statement</p>
            <p className="text-lg font-semibold text-slate-50">{generated.positioning}</p>
            <p className="text-sm text-slate-300">{generated.narrative}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {generated.psychologicalLevers.map((lever) => (
                <span key={lever} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
                  {lever}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/40 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Subject line ideas</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-200">
              {generated.subject.map((subject) => (
                <li key={subject}>• {subject}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {generated.channelMessages.map(({ channel, copy }) => (
              <motion.div
                key={channel}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{channelLabels[channel]}</p>
                    <p className="text-sm text-slate-300">{deliveryTemplates[channel].cadence}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(channel, copy)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 px-3 py-1 text-xs text-slate-300 transition hover:border-primary-500/40 hover:text-primary-200"
                  >
                    {copiedChannel === channel ? <CheckIcon className="h-4 w-4" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
                    Copy {channelLabels[channel]}
                  </button>
                </div>
                <pre className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-100">
                  {copy}
                </pre>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Follow-up plan</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {generated.followUps.map((step) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary-400"></span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs uppercase tracking-[0.35em] text-slate-400">North Star Metric</p>
            <p className="mt-1 text-sm text-slate-200">{generated.successMetric}</p>
            <p className="mt-1 text-xs text-slate-400">CTA: {generated.callToAction}</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

interface FieldGroupProps {
  title: string;
  description: string;
  children: ReactNode;
}

function FieldGroup({ title, description, children }: FieldGroupProps) {
  return (
    <fieldset className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5">
      <legend className="px-2 text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
        {title}
      </legend>
      <p className="text-xs text-slate-400">{description}</p>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}

interface LabelledInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function LabelledInput({ label, value, onChange, placeholder }: LabelledInputProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.35em] text-slate-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-500/30"
      />
    </label>
  );
}

function LabelledTextArea({ label, value, onChange, placeholder }: LabelledInputProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.35em] text-slate-400">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-4 py-2 text-sm leading-relaxed text-slate-100 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-500/30"
      />
    </label>
  );
}

interface SelectRowProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}

function SelectRow({ label, value, onChange, children }: SelectRowProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.35em] text-slate-400">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-500/30"
      >
        {children}
      </select>
    </label>
  );
}

interface InfoBannerProps {
  title: string;
  body: string;
}

function InfoBanner({ title, body }: InfoBannerProps) {
  return (
    <div className="rounded-2xl border border-primary-500/30 bg-primary-500/10 p-4 text-sm text-primary-100">
      <p className="font-semibold text-primary-50">{title}</p>
      <p className="mt-1 text-xs text-primary-100/80">{body}</p>
    </div>
  );
}

interface ChannelToggleProps {
  label: string;
  description: string;
  active: boolean;
  onToggle: () => void;
}

function ChannelToggle({ label, description, active, onToggle }: ChannelToggleProps) {
  return (
    <div className={`space-y-3 rounded-2xl border p-4 transition ${
      active
        ? "border-primary-400/80 bg-primary-500/10 shadow-lg shadow-primary-500/20"
        : "border-slate-700/70 bg-slate-900/40"
    }`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-50">{label}</p>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
        <Switch
          checked={active}
          onChange={() => onToggle()}
          className={`${
            active ? "bg-primary-500" : "bg-slate-700"
          } relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
        >
          <span
            aria-hidden="true"
            className={`${
              active ? "translate-x-5" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </div>
  );
}
