"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  value: string;
  className?: string;
}

// Animates the numeric portion of a value like "0.952", "98%+", "12m → 2s".
// Falls back to plain text for non-numeric strings.
export function AnimatedCounter({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  // Parse once per `value` — a stable primitive — so the effect below
  // doesn't restart on every render (which would freeze the count near 0).
  const isNumeric = /^[0-9]*\.?[0-9]+/.test(value);
  const [display, setDisplay] = useState(isNumeric ? "0" : value);

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^([0-9]*\.?[0-9]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const numberStr = match[1];
    const suffix = match[2];
    const target = parseFloat(numberStr);
    const decimals = (numberStr.split(".")[1] || "").length;
    const duration = 1100;
    const start = performance.now();

    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      if (t >= 1) {
        // Snap to the exact source string so rounding never drifts.
        setDisplay(numberStr + suffix);
        return;
      }
      const current = Math.max(0, target * eased).toFixed(decimals);
      setDisplay(current + suffix);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {display}
    </motion.span>
  );
}
