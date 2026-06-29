import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center border px-2 py-0.5 text-xs font-mono uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "bg-surface border-border-strong text-text-muted",
        master: "bg-primary-surface border-primary text-text-selected",
        player: "bg-warning-surface border-warning-muted text-warning",
        success: "bg-success-surface border-success-muted text-success",
        danger: "bg-danger-surface border-danger-muted text-danger",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends ComponentProps<"span">, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ref, ...props }: BadgeProps) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    ></span>
  );
}

export default Badge;
