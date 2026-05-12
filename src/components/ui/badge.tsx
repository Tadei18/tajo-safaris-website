import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 px-3 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-full",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        accent: "bg-accent text-ink",
        sand: "bg-sand text-ink",
        rust: "bg-rust text-white",
        outline: "border border-ink/20 text-ink-soft bg-transparent",
        white: "bg-white/95 text-ink",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}
