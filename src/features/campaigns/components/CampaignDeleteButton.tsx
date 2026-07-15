import { useState } from "react";
import { useDeleteCampaign } from "../hooks/useDeleteCampaign";
import ModalConfirm from "../../../components/ModalConfirm";
import Tooltip from "../../../components/ui/Tooltip";
import { useNavigate } from "react-router";
import { Trash2 } from "lucide-react";

interface CampaignDeleteButtonProps {
  campaignId: string;
  campaignTitle: string;
}

function CampaignDeleteButton({
  campaignId,
  campaignTitle,
}: CampaignDeleteButtonProps) {
  const { deleteCampaign, isPending } = useDeleteCampaign();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  function handleConfirmDelete() {
    deleteCampaign(campaignId, {
      onSuccess: () => {
        setIsOpen(false);
        navigate("/profile", { replace: true });
      },
    });
  }

  return (
    <>
      <Tooltip content="Видалити кампейн" side="left">
        <button
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen(true);
          }}
          className="absolute top-4 right-4 z-30 border-2 border-border-strong bg-surface p-2 text-text-muted hover:text-danger hover:border-danger transition-all opacity-0 group-hover/hero:opacity-100 shadow-[2px_2px_0px_var(--color-border-strong)]"
        >
          <Trash2 size="16" />
        </button>
      </Tooltip>
      <ModalConfirm
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isLoading={isPending}
        title="Видалення кампейну"
        description="Ця дія є остаточною та безповоротньою і видалить увесь вміст кампейну включно з квестами, записами кодексу та створеними інструментами"
        requireInput={campaignTitle}
        confirmText="Видалити"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default CampaignDeleteButton;
