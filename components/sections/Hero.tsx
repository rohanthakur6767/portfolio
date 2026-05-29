"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ParticleField } from "@/components/shared/ParticleField";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { profile, metrics } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center pt-24 pb-20 overflow-hidden"
    >
      <ParticleField className="absolute inset-0 h-full w-full -z-10" density={70} />

      <div className="absolute inset-0 -z-20 bg-grid-pattern [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <GradientBlob className="-top-32 -left-20 h-[480px] w-[480px]" color="violet" />
      <GradientBlob className="top-1/3 -right-32 h-[420px] w-[420px]" color="fuchsia" />

      <div className="container-pad mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
          <div className="flex flex-col gap-7 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1.5 text-xs font-medium text-violet-200 backdrop-blur-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
            >
              <span className="block text-foreground">{profile.name}</span>
              <span className="block gradient-text mt-2">
                Building production-grade AI.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl"
            >
              {profile.shortBio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a href="#projects">
                <Button size="lg" className="group">
                  Explore my work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </a>
              <a href={profile.resumeUrl} download>
                <Button variant="outline" size="lg">
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Button variant="secondary" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Button variant="secondary" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-wrap items-center gap-2 pt-2"
            >
              {[
                "LangGraph",
                "RAG",
                "FastAPI",
                "pgvector",
                "XGBoost",
                "GCP Pro ML",
              ].map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl shadow-2xl shadow-violet-950/40 gradient-border">
              <div className="flex items-center gap-2 pb-4 border-b border-white/[0.06]">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">
                  ~ rohan.shipping_metrics.json
                </span>
              </div>
              <div className="pt-5 grid grid-cols-2 gap-4">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div className="font-display text-2xl md:text-3xl font-semibold gradient-text">
                      <AnimatedCounter value={m.value} />
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground/80">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                <span>Numbers from shipped projects. No vanity metrics.</span>
              </div>
            </div>

            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-transparent blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
