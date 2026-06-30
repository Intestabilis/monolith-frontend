import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const selectVariants = cva(
  "w-full appearance-none border-2 font-heading font-bold uppercase tracking-wider transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-surface border-border-strong text-text-primary hover:bg-background-contrast focus-visible:border-primary",
        ghost:
          "bg-transparent border-transparent text-text-muted hover:text-text-primary focus-visible:border-border-strong",
        error:
          "bg-danger-surface/10 border-danger text-danger focus-visible:border-danger",
      },
      size: {
        default: "h-10 px-3 py-2 text-sm",
        sm: "h-8 px-2 py-1 text-xs",
        lg: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type NativeSelectProps = Omit<ComponentProps<"select">, "size">;

interface SelectProps
  extends NativeSelectProps, VariantProps<typeof selectVariants> {}

function Select({ className, variant, size, children, ...props }: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        className={cn(selectVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </select>
      {/* Custom down arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-border-strong">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}

export default Select;
