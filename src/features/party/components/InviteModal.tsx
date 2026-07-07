import { useState } from "react";
import { useGenerateInvite } from "../hooks/useGenerateInvite";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Label from "../../../components/ui/Label";
import {
  ModalRoot,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "../../../components/ui/Modal";
import { cn } from "../../../utils/cn";
import Select from "../../../components/ui/Select";

interface InviteModalProps {
  campaignId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function InviteModal({ campaignId, isOpen, onOpenChange }: InviteModalProps) {
  const { generateInvite, isPending } = useGenerateInvite(campaignId);

  const [duration, setDuration] = useState<"7d" | "30d">("7d");
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  function handleOpenChange(open: boolean) {
    if (!open) {
      setInviteUrl(null);
      setIsCopied(false);
      setDuration("7d");
    }
    onOpenChange(open);
  }

  function handleGenerate() {
    generateInvite(duration, {
      onSuccess: (data) => {
        setInviteUrl(data.inviteUrl);
        setIsCopied(false);
      },
    });
  }

  async function handleCopy() {
    if (!inviteUrl) return;
    await navigator.clipboard.writeText(inviteUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  return (
    <ModalRoot open={isOpen} onOpenChange={handleOpenChange}>
      <ModalContent size="default">
        <ModalHeader>
          <ModalTitle>Запросити гравців</ModalTitle>
          <ModalDescription>
            Створіть посилання, за яким інші гравці зможуть доєднатися до вашого
            кампейну.
          </ModalDescription>
        </ModalHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label>Час дії посилання</Label>
            <Select
              value={duration}
              onChange={(e) => setDuration(e.target.value as "7d" | "30d")}
              disabled={isPending || !!inviteUrl}
            >
              <option className="font-bold" value="7d">
                7 Днів
              </option>
              <option className="font-bold" value="30d">
                30 Днів
              </option>
            </Select>
          </div>

          {!inviteUrl ? (
            <Button
              onClick={handleGenerate}
              disabled={isPending}
              variant="primary"
              className="w-full py-3"
            >
              {isPending ? "Створення посилання..." : "Створити Посилання"}
            </Button>
          ) : (
            <div className="flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-200">
              <Label className="text-success flex items-center gap-1">
                <span>✓</span> Посилання створене
              </Label>

              <div className="flex gap-2">
                <Input
                  readOnly
                  value={inviteUrl}
                  className="flex-1 border-success/50 bg-background"
                />
                <Button
                  onClick={handleCopy}
                  variant="default" // REVIEW maybe add some success/secondary variants in the future and use them there
                  className={cn(
                    "min-w-35",
                    isCopied &&
                      "border-success text-success hover:border-success hover:text-success",
                  )}
                >
                  {isCopied ? "Скопійовано!" : "Копіювати"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </ModalContent>
    </ModalRoot>
  );
}

export default InviteModal;
