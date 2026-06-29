import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../utils/cn";

export const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipPortal = TooltipPrimitive.Portal;

type TooltipContentProps = ComponentProps<typeof TooltipPrimitive.Content>;

function TooltipContent({
  className,
  sideOffset = 6,
  ref,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPortal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 overflow-hidden rounded-none",
          "bg-surface border border-border-strong px-2.5 py-1 shadow-sm",
          "font-mono text-[11px] text-text-primary leading-tight",
          // for animation from index.css
          "tooltip",
          className,
        )}
        {...props}
      />
    </TooltipPortal>
  );
}

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
}

function Tooltip({
  children,
  content,
  side = "top",
  delayDuration = 400,
}: TooltipProps) {
  if (!content) return <>{children}</>;

  return (
    <TooltipRoot delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </TooltipRoot>
  );
}

export default Tooltip;
