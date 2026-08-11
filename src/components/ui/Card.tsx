import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const cardVariants = cva("relative font-heading transition-all", {
  variants: {
    variant: {
      default: "bg-surface border-4 border-border-strong p-6 text-text-primary",
      interactive:
        "bg-background border-2 border-border-strong p-4 hover:border-border-default hover:bg-background-contrast group",
      sub: "flex flex-col justify-center bg-background border border-border-strong p-3",
      dashed:
        "bg-background/50 border-2 border-dashed border-border-strong p-8 text-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends ComponentProps<"div">, VariantProps<typeof cardVariants> {}

function Card({ className, variant, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    ></div>
  );
}

export default Card;
