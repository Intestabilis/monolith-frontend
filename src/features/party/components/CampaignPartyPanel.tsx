import { useState } from "react";
import { useRemoveMember } from "../hooks/useRemoveMember";
import type { CampaignMember } from "../../../schemas/user.schema";
import ModalConfirm from "../../../components/ModalConfirm";
import Button from "../../../components/ui/Button";
import InviteModal from "./InviteModal";
import MemberBadge from "./MemberBadge";

interface CampaignPartyPanelProps {
  campaignId: string;
  isMaster: boolean;
  master: Omit<CampaignMember, "joinedAt">;
  members: CampaignMember[];
}

function CampaignPartyPanel({
  campaignId,
  isMaster,
  master,
  members,
}: CampaignPartyPanelProps) {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<CampaignMember | null>(null);
  const { removeMember, isPending } = useRemoveMember(campaignId);

  function handleRemoveConfirm() {
    if (!removeTarget) return;
    removeMember(removeTarget.id, { onSuccess: () => setRemoveTarget(null) });
  }

  return (
    <div className="border-2 border-border-strong bg-surface p-4 flex flex-col gap-4 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center border-b-2 border-dashed border-border-muted pb-2">
        <h2 className="font-heading text-xl text-text-selected">
          Партія ({members.length + 1})
        </h2>
        {isMaster && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsInviteOpen(true)}
            className="text-primary hover:text-primary hover:bg-primary/20 border-primary border-2 px-2 py-1"
          >
            Запросити
          </Button>
        )}
      </div>

      <ul className="flex flex-wrap gap-4 pt-2">
        {/* Campaign master */}
        <MemberBadge
          username={master.username}
          avatarUrl={master.avatarUrl}
          role="master"
        />
        {members.map((member) => (
          <MemberBadge
            key={member.id}
            username={member.username}
            avatarUrl={member.avatarUrl}
            role="player"
            showRemoveButton={isMaster}
            onRemove={() => setRemoveTarget(member)}
          />
        ))}
      </ul>

      {isMaster && (
        <InviteModal
          campaignId={campaignId}
          isOpen={isInviteOpen}
          onOpenChange={setIsInviteOpen}
        />
      )}

      <ModalConfirm
        isOpen={!!removeTarget}
        onOpenChange={(open) => !open && setRemoveTarget(null)}
        onConfirm={handleRemoveConfirm}
        isLoading={isPending}
        title="Вигнати гравця?"
        description={`Ви впевнені, що хочете вигнати ${removeTarget?.username} з кампанії?`}
        confirmText="Вигнати"
      />
    </div>
  );
}

export default CampaignPartyPanel;
