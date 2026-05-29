"use client";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  color?: "violet" | "cyan" | "fuchsia";
}

export function GradientBlob({ className, color = "violet" }: Props) {
  const colors: Record<string, string> = {
    violet: "from-violet-600/30 via-fuchsia-600/20 to-transparent",
    cyan: "from-cyan-500/25 via-blue-600/15 to-transparent",
    fuchsia: "from-fuchsia-600/25 via-pink-500/15 to-transparent",
  };
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl bg-gradient-to-br",
        colors[color],
        className
      )}
    />
  );
}
