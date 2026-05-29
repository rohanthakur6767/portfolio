"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Search,
  FileText,
  PenLine,
  Gauge,
  UserCheck,
  Send,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";

const nodes = [
  { label: "Plan", icon: Compass, note: "LLM proposes outline & search queries" },
  { label: "Research", icon: Search, note: "Tavily grounded web search" },
  { label: "Summarize", icon: FileText, note: "Map–reduce over sources" },
  { label: "Draft", icon: PenLine, note: "Long-form newsletter generation" },
  { label: "Critique", icon: Gauge, note: "Self-critique → score → conditional route" },
  { label: "Approval", icon: UserCheck, note: "HITL pause via interrupt_before" },
  { label: "Send", icon: Send, note: "Dispatch on approval, persist state" },
];

export function Architecture() {
  return (
    <section className="section-pad relative">
      <div className="container-pad mx-auto">
        <SectionHeading
          eyebrow="Case Study"
          title="A look inside the Newsletter Agent."
          description="Seven nodes, one conditional self-critique loop, and a human-in-the-loop checkpoint that survives across HTTP requests."
        />

        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 md:p-10 gradient-border relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-grid-pattern [background-size:32px_32px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {nodes.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="relative rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 p-4 text-center"
              >
                <div className="absolute -top-2 -left-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                  {i + 1}
                </div>
                <n.icon className="mx-auto h-5 w-5 text-violet-200" />
                <div className="mt-2 font-display text-sm font-semibold">{n.label}</div>
                <div className="mt-1 text-[10px] text-muted-foreground leading-snug">
                  {n.note}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-violet-300/80 mb-2">
                State
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">
                LangGraph <span className="font-mono">MemorySaver</span> checkpoints
                state per <span className="font-mono">thread_id</span>, so the
                approval pause survives across independent HTTP requests.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-violet-300/80 mb-2">
                Streaming
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">
                FastAPI streams every node&apos;s trace to the client over{" "}
                <span className="font-mono">Server-Sent Events</span>, giving the UI
                a live, debuggable view of the agent&apos;s reasoning.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-violet-300/80 mb-2">
                Inference
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Groq Llama-3.3-70B for low-latency generation, Tavily for grounded
                research. End-to-end runtime: <span className="font-mono">~45s</span>.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {[
              "LangGraph",
              "interrupt_before",
              "MemorySaver",
              "FastAPI",
              "SSE",
              "Groq",
              "Tavily",
              "Docker",
              "HF Spaces",
            ].map((t) => (
              <Badge key={t} variant="outline" className="text-xs">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
