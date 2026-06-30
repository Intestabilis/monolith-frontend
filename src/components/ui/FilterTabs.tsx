import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const filterTabVariants = cva(
  "flex-1 px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wider transition-all sm:flex-none border-2",
  {
    variants: {
      active: {
        true: "shadow-[inset_3px_3px_0px_rgba(0,0,0,0.3)] border-transparent scale-[0.98]",
        false:
          "border-transparent text-text-muted hover:text-text-primary hover:bg-surface/50",
      },

      variant: {
        default: "",
        primary: "",
        warning: "",
      },
    },
    compoundVariants: [
      {
        active: true,
        variant: "default",
        className:
          "bg-surface text-text-selected border-border-strong border-t-border border-l-border",
      },
      {
        active: true,
        variant: "primary",
        className:
          "bg-primary-surface text-text-selected border-primary-hover border-t-primary-surface border-l-primary-surface",
      },
      {
        active: true,
        variant: "warning",
        className:
          "bg-warning-surface text-warning border-warning border-t-warning-muted border-l-warning-muted",
      },
    ],
    defaultVariants: {
      active: false,
      variant: "default",
    },
  },
);

interface FilterTabProps
  extends ComponentProps<"button">, VariantProps<typeof filterTabVariants> {}

function FilterTab({ className, active, variant, ...props }: FilterTabProps) {
  return (
    <button
      type="button"
      className={cn(filterTabVariants({ active, variant, className }))}
      {...props}
    />
  );
}

function FilterGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full flex-col sm:w-auto sm:flex-row items-center border-2 border-border-strong bg-background-contrast p-1",
        className,
      )}
      {...props}
    />
  );
}

export { FilterGroup, FilterTab };
