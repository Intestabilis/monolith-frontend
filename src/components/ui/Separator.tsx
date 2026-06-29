import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const separatorVariants = cva("shrink-0 border-border-muted", {
  variants: {
    orientation: {
      horizontal: "w-full border-t-2",
      vertical: "h-full border-l-2",
    },
    variant: {
      default: "border-solid",
      dashed: "border-dashed",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
  },
});

export interface SeparatorProps
  extends ComponentProps<"div">, VariantProps<typeof separatorVariants> {}

function Separator({
  className,
  orientation,
  variant,
  ref,
  ...props
}: SeparatorProps) {
  return (
    <div
      ref={ref}
      className={cn(separatorVariants({ orientation, variant, className }))}
      {...props}
    />
  );
}

export default Separator;
