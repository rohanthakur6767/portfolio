"use client";

import { motion } from "framer-motion";
import { Compass, Cpu, Workflow, Rocket, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProfilePhoto } from "@/components/shared/ProfilePhoto";
import { profile } from "@/lib/data";

const pillars = [
  {
    icon: Compass,
    title: "Career focus",
    body: "AI/ML engineering with a bias toward shipping. Agentic systems, retrieval, and the operational glue around LLMs.",
  },
  {
    icon: Cpu,
    title: "Technical strengths",
    body: "LangGraph state machines, FastAPI services, pgvector retrieval, classical ML with explainability (SHAP).",
  },
  {
    icon: Workflow,
    title: "Systems I build",
    body: "Stateful AI workflows, RAG pipelines over messy data, ML services with traceable decisions and live demos.",
  },
  {
    icon: Rocket,
    title: "How I work",
    body: "End-to-end ownership — model, backend, frontend, deployment. I write the boring bits too.",
  },
];

export function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-pad mx-auto">
        <SectionHeading
          eyebrow="About"
          title="Engineer-first, model-aware."
          description="I treat AI projects as software products. Latency, state, evaluation, and deployment are first-class concerns — not problems you discover the week before launch."
        />

        <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-start">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-[320px] lg:sticky lg:top-24"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] gradient-border">
              <ProfilePhoto src={profile.photo} alt={`${profile.name} — ${profile.title}`} priority />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="font-display text-lg font-semibold text-white">
                  {profile.name}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-violet-200">
                  <span>{profile.title}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-white/70">
                  <MapPin className="h-3 w-3" />
                  {profile.location}
                </div>
              </div>
              <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-200 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Available
              </div>
            </div>
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-violet-600/25 via-fuchsia-600/10 to-transparent blur-2xl" />
          </motion.div>

          {/* Bio + pillars */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-8 gradient-border"
            >
              <p className="text-foreground/90 leading-relaxed text-base md:text-lg">
                {profile.longBio}
              </p>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.focusAreas.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                    <span className="text-sm text-foreground/85 leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-violet-500/30 hover:bg-white/[0.04]"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 text-violet-200">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
