"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  /** Shown if the image fails to load (e.g. file not added yet). */
  fallbackInitials?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders a portrait via next/image, gracefully degrading to a gradient
 * monogram if the source is missing — so the layout never looks broken.
 */
export function ProfilePhoto({
  src,
  alt,
  fallbackInitials = "RT",
  className,
  sizes = "(max-width: 1024px) 80vw, 340px",
  priority = false,
}: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-violet-600/40 via-fuchsia-600/30 to-violet-900/40",
          className
        )}
        aria-label={alt}
        role="img"
      >
        <span className="font-display text-5xl font-bold text-white/90 tracking-tight">
          {fallbackInitials}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setErrored(true)}
      className={cn("object-cover", className)}
    />
  );
}
