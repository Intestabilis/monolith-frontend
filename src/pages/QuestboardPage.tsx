import { useSearchParams } from "react-router";
import { useState } from "react";
import { useCampaignContext } from "../features/campaigns/hooks/useCampaignContext";
import QuestSidebar from "../features/quests/components/QuestSidebar";
import QuestDetails from "../features/quests/components/QuestDetails";
import QuestForm from "../features/quests/components/QuestForm";

function QuestboardPage() {
  const { data, meta } = useCampaignContext();
  const campaignId = data.id;
  const isMaster = meta.userRole === "master";

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedQuestId = searchParams.get("questId");

  // categoryId for creating quest, "root" for quest without category, null for not creating quest
  const [creationCategoryId, setCreationCategoryId] = useState<string | null>(
    null,
  );

  function handleSelectQuest(questId: string) {
    setCreationCategoryId(null); // close create quest form
    setSearchParams({ questId });
  }

  function handleStartCreation(categoryId?: string) {
    setSearchParams(new URLSearchParams());
    setCreationCategoryId(categoryId || "root");
  }

  function handleCancelCreation() {
    setCreationCategoryId(null);
  }

  function handleCreationSuccess(newQuestId: string) {
    setCreationCategoryId(null);
    setSearchParams({ questId: newQuestId });
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-background text-text-primary ">
      <aside className="w-80 shrink-0 flex flex-col h-full bg-surface border-2 border-border-strong z-10">
        <QuestSidebar
          campaignId={campaignId}
          selectedQuestId={selectedQuestId}
          onSelectQuest={handleSelectQuest}
          isMaster={isMaster}
          onAddQuest={handleStartCreation}
        />
      </aside>

      <main className="flex-1 relative h-full min-w-0">
        {creationCategoryId !== null && isMaster ? (
          <div className="h-full w-full bg-surface/50 border-2 border-border-strong shadow-[4px_4px_0px_var(--color-background-contrast)] p-6 lg:p-10 overflow-hidden flex flex-col">
            <QuestForm
              campaignId={campaignId}
              isCreateMode={true}
              quest={{
                categoryId:
                  creationCategoryId === "root" ? null : creationCategoryId,
              }}
              onSuccess={(newQuest) => handleCreationSuccess(newQuest!.id)}
              onCancel={handleCancelCreation}
            />
          </div>
        ) : selectedQuestId ? (
          <div className="h-full w-full bg-surface/50 border-2 border-border-strong shadow-[4px_4px_0px_var(--color-background-contrast)] p-6 lg:p-10 overflow-hidden flex flex-col">
            <QuestDetails
              campaignId={campaignId}
              questId={selectedQuestId}
              isMaster={isMaster}
            />
          </div>
        ) : (
          <div className="flex h-full w-full bg-surface/50 border-2 border-border-strong shadow-[4px_4px_0px_var(--color-background-contrast)] items-center justify-center text-text-muted font-heading text-lg italic uppercase tracking-widest opacity-60">
            Оберіть квест{isMaster ? ", або створіть новий" : ""}
          </div>
        )}
      </main>
    </div>
  );
}

export default QuestboardPage;
