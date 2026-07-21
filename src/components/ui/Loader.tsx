import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";
import FantasyIcon from "../icons/FantasyIcon";

const loaderVariants = cva(
  "transition-opacity flex items-center justify-center",
  {
    variants: {
      variant: {
        text: "font-mono font-bold uppercase tracking-widest text-text-muted animate-pulse",
        d20: " text-text-primary",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        fullscreen: "fixed inset-0 z-50 flex bg-background/80",
      },
    },
    compoundVariants: [
      // text variant sizes
      { variant: "text", size: "sm", className: "text-sm" },
      { variant: "text", size: "md", className: "text-xl" },
      { variant: "text", size: "lg", className: "text-3xl" },
      { variant: "text", size: "fullscreen", className: "text-2xl" },
    ],
    defaultVariants: {
      variant: "text",
      size: "md",
    },
  },
);

interface LoaderProps
  extends ComponentProps<"div">, VariantProps<typeof loaderVariants> {
  text?: string;
}

function Loader({
  text,
  className,
  variant,
  size,
  ref,
  ...props
}: LoaderProps) {
  const currentVariant = variant || "text";
  const currentSize = size || "md";

  if (currentVariant === "text") {
    return (
      <div
        ref={ref}
        className={cn(
          loaderVariants({
            variant: currentVariant,
            size: currentSize,
            className,
          }),
        )}
        {...props}
      >
        {text || currentSize === "sm" ? "..." : "Завантаження..."}
      </div>
    );
  }
  const iconSize = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-16 w-16",
    fullscreen: "h-20 w-20",
  }[currentSize];

  const layoutClass =
    currentSize === "sm" ? "flex-row gap-2" : "flex-col gap-4";

  return (
    <div
      ref={ref}
      className={cn(
        loaderVariants({ variant: currentVariant, size: currentSize }),
        layoutClass,
        className,
      )}
      {...props}
    >
      {/* should remove currentVariant check (since I removed pulsing torch loader variant), but maybe will try to reimplement it in the future */}
      <FantasyIcon
        name={currentVariant}
        className={cn(
          currentVariant === "d20" ? "animate-spin" : "animate-pulse",
          iconSize,
        )}
        style={
          currentVariant === "d20" ? { animationDuration: "3s" } : undefined
        }
      />

      {text && (
        <span
          className={cn(
            "animate-pulse font-mono tracking-widest text-text-primary",
            currentSize === "sm"
              ? "text-sm"
              : "text-xl font-bold uppercase mt-2",
          )}
        >
          {text}
        </span>
      )}
    </div>
  );
}

export default Loader;
