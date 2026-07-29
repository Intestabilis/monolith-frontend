import { useState } from "react";
import { useSearchParams } from "react-router";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/ui/Loader";
import QuestForm from "./QuestForm";
import BaseEditor from "../../../components/editor/BaseEditor";
import { questEditorConfig } from "../../../lib/tiptap/editorConfigs";
import { useQuestDetails } from "../hooks/useQuestDetails";
import { useDeleteQuest } from "../hooks/useDeleteQuest";
import ModalConfirm from "../../../components/ModalConfirm";

interface QuestDetailsProps {
  campaignId: string;
  questId: string;
  isMaster: boolean;
}

// REVIEW maybe should somehow do a single source of truth for that and select in QuestForm
function getStatusText(status: string | null) {
  switch (status) {
    case "active":
      return "Активний";
    case "completed":
      return "Виконаний";
    case "in-progress":
      return "В процесі";
    case "failed":
      return "Провалений";
    default:
      return "Невідомо";
  }
}

export function QuestDetails({
  campaignId,
  questId,
  isMaster,
}: QuestDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // need it to clear url after deletion
  const [, setSearchParams] = useSearchParams();

  const { questDetails, isPending, error } = useQuestDetails(
    campaignId,
    questId,
  );

  const { deleteQuest, isPending: isDeleting } = useDeleteQuest(campaignId);

  function handleDeleteSubmit() {
    deleteQuest(questId, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setSearchParams({});
      },
    });
  }

  // REVIEW maybe change loader type to d20
  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader text="Завантаження квесту..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
        <span className="text-danger font-title text-2xl mb-2">
          Сталася помилка
        </span>
        <span className="text-text-muted font-mono text-sm">
          {error instanceof Error
            ? error.message
            : "Помилка завантаження квесту"}
        </span>
      </div>
    );
  }

  if (!questDetails) return null;

  return (
    <div
      key={questId}
      className="flex flex-col h-full w-full min-w-0 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2"
    >
      {isMaster && !isEditing && (
        <div className="flex justify-end mb-4 shrink-0 gap-2">
          <Button onClick={() => setIsEditing(true)} size="sm">
            Редагувати
          </Button>
          <Button
            variant="destructive"
            onClick={() => setIsDeleteModalOpen(true)}
            size="sm"
          >
            Видалити
          </Button>
        </div>
      )}

      {isEditing ? (
        <QuestForm
          campaignId={campaignId}
          quest={questDetails}
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <article className="space-y-6 flex-1 flex flex-col w-full min-w-0 overflow-x-hidden">
          <header className="border-b-2 border-border pb-4 w-full min-w-0">
            <div className="flex justify-between items-start mb-2 gap-4 w-full min-w-0">
              <h1 className="font-title text-3xl md:text-4xl text-text-selected font-bold break-all w-full min-w-0">
                {questDetails.title}
              </h1>
            </div>

            <div className="flex w-full justify-between items-center min-w-0 gap-4 mt-2">
              {questDetails.source ? (
                <p className="text-text-muted italic font-serif text-sm truncate min-w-0">
                  Джерело: {questDetails.source}
                </p>
              ) : (
                <div></div>
              )}
              <span className="font-mono text-sm tracking-widest px-2 text-text-muted uppercase shrink-0">
                {getStatusText(questDetails.status)}
              </span>
            </div>
          </header>

          <div className="w-full min-w-0 flex-1 flex flex-col mt-4">
            <BaseEditor
              key={questDetails.updatedAt}
              extensions={questEditorConfig}
              value={questDetails.content}
              onChange={() => {}}
              disabled={true}
              className="w-full flex-1 min-w-0"
              editorClassName="p-0 min-w-0 w-full break-all"
            />
          </div>
        </article>
      )}

      <ModalConfirm
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDeleteSubmit}
        isLoading={isDeleting}
        title="Видалення квесту"
        description={`Ви впевнені, що хочете видалити квест "${questDetails.title}"? Цю дію неможливо скасувати, і вміст квесту буде видалений назавжди.`}
      />
    </div>
  );
}

export default QuestDetails;
