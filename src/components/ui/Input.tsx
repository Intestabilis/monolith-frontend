import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const inputVariants = cva(
  "flex w-full bg-surface border-2 font-heading text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-bold placeholder:text-text-muted disabled:cursor-not-allowed disabled:bg-muted disabled:text-text-muted",
  {
    variants: {
      variant: {
        default:
          "border-border-strong text-text-primary focus-visible:outline-none focus-visible:border-border-default focus-visible:bg-background-contrast",
        ghost: "border-transparent bg-transparent px-0 focus-visible:ring-0",
        error:
          "border-danger text-danger placeholder:text-danger/50 focus-visible:outline-none focus-visible:border-danger",
      },
      size: {
        default: "h-10 px-3 py-2 text-sm",
        sm: "h-8 px-2 text-xs",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type NativeInputProps = Omit<ComponentProps<"input">, "size">;

export interface InputProps
  extends NativeInputProps, VariantProps<typeof inputVariants> {}

function Input({ className, variant, size, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      className={cn(inputVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export default Input;
