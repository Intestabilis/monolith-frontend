import { useState, type ChangeEvent } from "react";
import { cn } from "../utils/cn";
import {
  ModalRoot,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "./ui/Modal";

interface ModalConfirmProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  requireInput?: string;
}

function ModalConfirm({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading = false,
  title,
  description,
  confirmText = "Видалити",
  cancelText = "Скасувати",
  requireInput,
}: ModalConfirmProps) {
  const [inputValue, setInputValue] = useState("");

  const isMatch = requireInput
    ? inputValue.trim().toLowerCase() === requireInput.trim().toLowerCase()
    : true;

  function handleConfirmSubmit() {
    if (!isMatch || isLoading) return;
    onConfirm();
  }

  function handleOpenChange(open: boolean) {
    if (isLoading) return;
    if (!open) {
      setInputValue("");
    }
    onOpenChange(open);
  }

  return (
    <ModalRoot open={isOpen} onOpenChange={handleOpenChange}>
      <ModalContent size="sm" variant="destructive">
        <ModalHeader>
          <ModalTitle className="text-danger flex items-center gap-2">
            {title}
          </ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>

        {/* only if we have requireInput */}
        {requireInput && (
          <div className="mb-2 bg-surface/40 border-2 border-border-muted p-4">
            <label className="block text-xs uppercase tracking-widest text-text-muted mb-2">
              Введіть{" "}
              <span className="text-text-selected font-bold select-all">
                "{requireInput}"
              </span>{" "}
              для підтвердження:
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setInputValue(event.target.value)
              }
              disabled={isLoading}
              className="uppercase w-full bg-surface border-2 border-border-strong px-3 py-2 text-sm text-text-selected focus:outline-none focus:border-danger transition-colors rounded-none font-mono"
            />
          </div>
        )}

        <ModalFooter>
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
            className="border-2 border-border-strong px-4 py-2 text-sm uppercase tracking-wider hover:bg-surface transition-colors rounded-none font-bold text-text-primary"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={handleConfirmSubmit}
            disabled={!isMatch || isLoading}
            className={cn(
              "border-2 px-4 py-2 text-sm uppercase tracking-wider font-bold rounded-none transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.2)]",
              isMatch && !isLoading
                ? "border-danger bg-danger/10 text-danger hover:bg-danger hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                : "border-border-muted text-text-muted bg-surface/20 cursor-not-allowed shadow-none opacity-50",
            )}
          >
            {isLoading ? "Виконання..." : confirmText}
          </button>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  );
}

export default ModalConfirm;
