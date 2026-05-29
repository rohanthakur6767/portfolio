"use client";

import { motion } from "framer-motion";
import {
  Database,
  Network,
  Workflow,
  Layers,
  Bot,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { specializations } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  Database,
  Network,
  Workflow,
  Layers,
  Bot,
  Rocket,
};

export function Specialization() {
  return (
    <section id="specialization" className="section-pad relative">
      <GradientBlob className="top-20 -left-32 h-[400px] w-[400px]" color="violet" />
      <GradientBlob className="bottom-0 -right-32 h-[400px] w-[400px]" color="cyan" />

      <div className="container-pad mx-auto relative">
        <SectionHeading
          eyebrow="AI / ML Specialization"
          title="The AI stack I actually ship with."
          description="Not a buzzword cloud — these are the pieces I've built, deployed, and debugged in production."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {specializations.map((s, i) => {
            const Icon = icons[s.icon] ?? Workflow;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl overflow-hidden transition-all hover:border-violet-500/30"
              >
                <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-violet-500/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 text-violet-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
