import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const skeletonVariants = cva("animate-pulse bg-muted", {
  variants: {
    variant: {
      default: "rounded-none",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SkeletonProps
  extends ComponentProps<"div">, VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ref, ...props }: SkeletonProps) {
  return (
    <div
      ref={ref}
      className={cn(skeletonVariants({ variant, className }))}
      {...props}
    ></div>
  );
}

export default Skeleton;
