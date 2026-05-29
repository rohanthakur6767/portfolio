import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-violet-500/30 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20",
        outline: "border-white/10 bg-white/[0.02] text-foreground/80",
        solid: "border-transparent bg-violet-600 text-white",
        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
        amber: "border-amber-500/30 bg-amber-500/10 text-amber-300",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
