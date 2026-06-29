import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const labelVariants = cva(
  "font-heading text-sm font-bold uppercase tracking-wider peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-text-muted",
        error: "text-danger",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface LabelProps
  extends ComponentProps<"label">, VariantProps<typeof labelVariants> {}

function Label({ className, variant, ref, ...props }: LabelProps) {
  return (
    <label
      ref={ref}
      className={cn(labelVariants({ variant, className }))}
      {...props}
    ></label>
  );
}

export default Label;
