import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const alertVariants = cva(
  "w-full border-2 p-3 font-mono text-sm transition-colors",
  {
    variants: {
      variant: {
        default: "border-border-strong bg-surface text-text-primary",
        error: "border-danger-muted bg-danger-surface text-danger",
        warning: "border-warning-muted bg-warning-surface text-warning",
        success: "border-success-muted bg-success-surface text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface AlertProps
  extends ComponentProps<"div">, VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ref, children, ...props }: AlertProps) {
  return (
    // <div
    //   ref={ref}
    //   role="alert"
    //   className={cn(
    //     alertVariants({ variant, className }),
    //     !children && "invisible opacity-0",
    //   )}
    //   {...props}
    // >
    //   {children || "\u00A0"}
    // </div>

    // REVIEW ok this trick do proper appearance on the first error but it still glitches a little
    <div
      className={cn(
        "grid transition-all duration-300 ease-in-out",
        children ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">
        <div
          ref={ref}
          role="alert"
          className={cn(alertVariants({ variant, className }))}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Alert;
