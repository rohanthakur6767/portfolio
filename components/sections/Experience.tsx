"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { experience, education } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="section-pad relative">
      <div className="container-pad mx-auto">
        <SectionHeading
          eyebrow="Experience"
          title="Where I'm building right now."
          description="Production AI work today, foundations from a B.Tech in AI & ML."
        />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-transparent" />

            {experience.map((e, i) => (
              <motion.div
                key={e.company}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12 pb-10 last:pb-0"
              >
                <span className="absolute left-[10px] top-1 inline-flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-violet-500/40 animate-ping" />
                  <span className="relative h-3 w-3 rounded-full bg-violet-400 ring-4 ring-background" />
                </span>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 text-violet-300">
                        <Briefcase className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-widest font-semibold">
                          {e.period}
                        </span>
                      </div>
                      <h3 className="mt-1 font-display text-xl md:text-2xl font-semibold">
                        {e.role}
                      </h3>
                      <div className="mt-0.5 text-sm text-muted-foreground flex items-center gap-2">
                        <span>{e.company}</span>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {e.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/85 leading-relaxed">{e.description}</p>

                  <div className="mt-5">
                    <div className="text-xs font-semibold uppercase tracking-widest text-violet-300/80 mb-2">
                      Technical contributions
                    </div>
                    <ul className="space-y-2">
                      {e.contributions.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed"
                        >
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-violet-400 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <div className="text-xs font-semibold uppercase tracking-widest text-emerald-300/80 mb-2">
                      Business impact
                    </div>
                    <ul className="space-y-2">
                      {e.impact.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed"
                        >
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-emerald-400 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {e.stack.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl h-fit"
          >
            <div className="flex items-center gap-2 text-violet-300 mb-4">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest font-semibold">Education</span>
            </div>
            <ul className="space-y-5">
              {education.map((ed) => (
                <li
                  key={ed.institution}
                  className="border-l border-white/[0.08] pl-4"
                >
                  <div className="font-display text-base font-semibold">{ed.institution}</div>
                  <div className="text-sm text-foreground/80">{ed.degree}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{ed.period}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span>{ed.score}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
