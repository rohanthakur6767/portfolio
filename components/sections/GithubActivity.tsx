"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Users, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { profile } from "@/lib/data";

interface GhStats {
  publicRepos: number;
  followers: number;
  following: number;
  stars: number;
  forks: number;
  topLanguages: { name: string; pct: number }[];
}

export function GithubActivity() {
  const [stats, setStats] = useState<GhStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        if (active) setStats(d);
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const cards = [
    { label: "Repositories", value: stats?.publicRepos ?? "—", icon: Activity },
    { label: "Stars earned", value: stats?.stars ?? "—", icon: Star },
    { label: "Forks", value: stats?.forks ?? "—", icon: GitFork },
    { label: "Followers", value: stats?.followers ?? "—", icon: Users },
  ];

  return (
    <section id="github" className="section-pad relative">
      <div className="container-pad mx-auto">
        <SectionHeading
          eyebrow="GitHub"
          title="Built in public."
          description="Live stats from my GitHub. Updated every request, cached server-side."
        />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          <div className="grid grid-cols-2 gap-4">
            {cards.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 text-violet-200">
                  <c.icon className="h-4 w-4" />
                </div>
                <div className="mt-3 font-display text-2xl md:text-3xl font-semibold gradient-text">
                  {loading ? "…" : c.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </div>
              </motion.div>
            ))}

            <div className="col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl">
              <div className="text-xs font-semibold uppercase tracking-widest text-violet-300/80 mb-3">
                Top languages
              </div>
              {loading || !stats ? (
                <div className="h-2 w-full rounded-full bg-white/[0.04] animate-pulse" />
              ) : (
                <div className="space-y-2.5">
                  {stats.topLanguages.slice(0, 5).map((l) => (
                    <div key={l.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{l.name}</span>
                        <span className="font-mono text-muted-foreground">
                          {l.pct.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/[0.04] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${l.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-violet-300/80">
                Contribution graph
              </div>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Button size="sm" variant="outline">
                  <Github className="h-3.5 w-3.5" />
                  View on GitHub
                </Button>
              </a>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3 overflow-x-auto">
              {/* Static asset; works even when API rate limits */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://ghchart.rshah.org/8b5cf6/${profile.githubUsername}`}
                alt={`${profile.name} GitHub contribution graph`}
                className="min-w-[640px] w-full"
                loading="lazy"
              />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Source:{" "}
              <a
                href={`https://github.com/${profile.githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                @{profile.githubUsername}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
