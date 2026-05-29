"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["All", "Agentic AI", "Machine Learning", "Deep Learning", "Full-Stack"] as const;

const accentMap: Record<Project["accent"], string> = {
  violet: "from-violet-600/40 to-fuchsia-600/30",
  cyan: "from-cyan-500/40 to-blue-600/30",
  amber: "from-amber-500/40 to-orange-500/30",
  emerald: "from-emerald-500/40 to-teal-500/30",
};

export function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="section-pad relative">
      <div className="container-pad mx-auto">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects that actually shipped."
          description="Live demos, hard numbers, and architectures that survive past the README."
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium transition-all",
                filter === c
                  ? "border-violet-500/40 bg-violet-500/15 text-violet-100"
                  : "border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                layout
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/[0.12]",
                  p.featured && "lg:col-span-2"
                )}
              >
                <div
                  className={cn(
                    "absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 -z-10 bg-gradient-to-br blur-2xl group-hover:opacity-100",
                    accentMap[p.accent]
                  )}
                />

                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="default">{p.category}</Badge>
                      {p.featured && (
                        <Badge variant="outline" className="text-violet-300">
                          <Sparkles className="h-3 w-3 mr-1" /> Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {p.links.github && (
                        <a href={p.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                          <Button variant="ghost" size="icon">
                            <Github className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                      {p.links.demo && (
                        <a href={p.links.demo} target="_blank" rel="noreferrer" aria-label="Live demo">
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed text-sm md:text-base max-w-3xl">
                    {p.tagline}
                  </p>

                  {p.metrics && (
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {p.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                        >
                          <div className="font-display text-lg font-semibold gradient-text">
                            {m.value}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/80 mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 grid md:grid-cols-2 gap-5">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-violet-300/80 mb-2">
                        Problem
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">{p.problem}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-violet-300/80 mb-2">
                        Key features
                      </div>
                      <ul className="space-y-1.5">
                        {p.features.slice(0, 4).map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed"
                          >
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-violet-400 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.links.demo && (
                      <a href={p.links.demo} target="_blank" rel="noreferrer">
                        <Button size="sm">
                          Live demo
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Button>
                      </a>
                    )}
                    {p.links.github && (
                      <a href={p.links.github} target="_blank" rel="noreferrer">
                        <Button variant="outline" size="sm">
                          <Github className="h-3.5 w-3.5" />
                          Source
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
