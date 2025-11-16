import { Suspense } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { AgentWorkbench } from "@/components/AgentWorkbench";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 text-center sm:gap-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/20 text-primary-200 shadow-lg shadow-primary-500/40">
          <SparklesIcon className="h-7 w-7" />
        </div>
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary-100/80">
            Agentic sales studio
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
            Launch autonomous sales agents that feel handcrafted for every customer.
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-300 sm:text-xl">
            Map customer psychology, tailor irresistible offers, and deploy multi-channel outreach sequences without copywriters or manual follow-up.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="text-slate-400">Loading studio...</div>}>
        <AgentWorkbench />
      </Suspense>
    </main>
  );
}
