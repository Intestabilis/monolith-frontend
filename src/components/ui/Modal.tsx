import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

// REVIEW may need in the future if decide to do opening/closing with Trigger not state etc
// const ModalTrigger = DialogPrimitive.Trigger;
// const ModalClose = DialogPrimitive.Close;

const ModalPortal = DialogPrimitive.Portal;

function ModalOverlay({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

const modalContentVariants = cva(
  "fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] p-6 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 bg-background",
  {
    variants: {
      size: {
        sm: "max-w-sm", // ConfirmModal
        default: "max-w-md", // CreateCampaignModal
        lg: "max-w-2xl", // Wider forms
        xl: "max-w-4xl", // Really big forms/editors if needed
        full: "max-w-[95vw] h-[95vh] overflow-y-auto", // REALLY big modals
      },
      variant: {
        default:
          "border-4 border-r-6 border-b-6 border-border-strong border-r-border-muted border-b-border-muted",
        destructive:
          "border-4 border-r-6 border-b-6 border-danger border-r-danger-muted border-b-danger-muted",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

interface ModalContentProps
  extends
    ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {}

// EXPORTED

const ModalRoot = DialogPrimitive.Root;

function ModalContent({
  className,
  size,
  variant,
  children,
  ...props
}: ModalContentProps) {
  return (
    <ModalPortal>
      <ModalOverlay />
      <DialogPrimitive.Content
        className={cn(modalContentVariants({ size, variant, className }))}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </ModalPortal>
  );
}

function ModalHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
}

function ModalTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn(
        "font-gothic-title text-2xl tracking-wide text-text-selected",
        className,
      )}
      {...props}
    />
  );
}

function ModalDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn(
        "font-mono text-xs text-text-muted leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

function ModalFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-4 pt-2 mt-6 border-t-2 border-dashed border-border-muted",
        className,
      )}
      {...props}
    />
  );
}

export {
  ModalRoot,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
};
