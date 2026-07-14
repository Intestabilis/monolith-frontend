import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold uppercase transition-all",
  {
    variants: {
      variant: {
        default:
          "bg-surface border-border-strong border-2 text-text-primary hover:border-border-default hover:text-text-selected disabled:text-text-muted",
        primary:
          "bg-primary border-primary border-2 text-text-selected hover:bg-primary-hover hover:border-primary-hover",
        destructive:
          "bg-danger-surface border-primary border-2 text-danger hover:bg-primary-hover hover:text-text-selected",
        ghost:
          "bg-transparent text-text-muted hover:text-text-primary border-transparent border-2 disabled:text-text-muted",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 py-4",
        icon: "h-8 w-8 p-0 shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ref, ...props }: ButtonProps) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    ></button>
  );
}

export default Button;
