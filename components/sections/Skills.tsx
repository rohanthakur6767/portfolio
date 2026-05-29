"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  Server,
  Layout,
  Cloud,
  Database,
  Code,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { skills } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  Brain,
  Sparkles,
  Server,
  Layout,
  Cloud,
  Database,
  Code,
};

export function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="container-pad mx-auto">
        <SectionHeading
          eyebrow="Stack"
          title="Tools I reach for."
          description="Categorised by where they live in the system — not just a wall of logos."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((cat, idx) => {
            const Icon = icons[cat.icon] ?? Code;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl transition-all hover:border-violet-500/30 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 text-violet-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{cat.label}</h3>
                </div>

                <ul className="space-y-2.5">
                  {cat.skills.map((s) => (
                    <li key={s.name}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-foreground/85">{s.name}</span>
                        {s.level && (
                          <span className="text-muted-foreground/70 font-mono">
                            {s.level}
                          </span>
                        )}
                      </div>
                      {s.level && (
                        <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.04]">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.level}%` }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
