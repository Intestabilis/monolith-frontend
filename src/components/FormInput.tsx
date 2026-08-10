import { useId, type ReactNode } from "react";
import { cn } from "../utils/cn";
import Input, { type InputProps } from "./ui/Input";
import Label from "./ui/Label";

export interface FormInputProps extends InputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelAction?: ReactNode;
}

function FormInput({
  label,
  labelAction,
  error,
  id,
  className,
  containerClassName,
  ref,
  variant,
  ...props
}: FormInputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const hasError = !!error;
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-left", containerClassName)}
    >
      <div className="mb-1 flex items-baseline justify-between">
        {label && (
          <Label htmlFor={inputId} variant={hasError ? "error" : "default"}>
            {label}
          </Label>
        )}

        {labelAction && <div>{labelAction}</div>}
      </div>

      <Input
        id={inputId}
        ref={ref}
        variant={hasError ? "error" : variant}
        className={className}
        {...props}
      />
      <div className="min-h-5">
        {hasError && (
          <span className="block truncate font-mono text-xs text-danger">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}

export default FormInput;
