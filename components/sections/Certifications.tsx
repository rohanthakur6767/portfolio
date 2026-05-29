"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { certifications } from "@/lib/data";

const accentClass: Record<string, string> = {
  violet: "from-violet-500/30 to-fuchsia-500/20 text-violet-200 border-violet-500/30",
  cyan: "from-cyan-500/30 to-blue-500/20 text-cyan-200 border-cyan-500/30",
  emerald: "from-emerald-500/30 to-teal-500/20 text-emerald-200 border-emerald-500/30",
};

export function Certifications() {
  return (
    <section id="certifications" className="section-pad relative">
      <div className="container-pad mx-auto">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials worth checking."
          description="Including the Google Cloud Pro ML Engineer cert — one of the harder ML credentials out there."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl transition-all hover:border-white/[0.12]"
            >
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-gradient-to-br ${
                  accentClass[c.accent] ?? accentClass.violet
                }`}
              >
                <Award className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold leading-snug">
                {c.name}
              </h3>
              <div className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>{c.issuer}</span>
              </div>
              <div className="mt-3">
                <Badge variant="outline" className="text-[10px]">
                  {c.date}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
