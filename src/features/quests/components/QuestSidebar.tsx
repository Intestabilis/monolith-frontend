import { useState } from "react";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/ui/Loader";

import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import { useQuestTree } from "../hooks/useQuestTree";
import { useCreateQuestCategory } from "../hooks/useCreateQuestCategory";
import { useUpdateQuestCategory } from "../hooks/useUpdateQuestCategory";
import { useDeleteQuestCategory } from "../hooks/useDeleteQuestCategory";
import { useReorderQuests } from "../hooks/useReorderQuests";
import { useQuestSidebarDnd } from "../hooks/useQuestSidebarDnd";

import QuestCategoryCreate from "./QuestCategoryCreate";
import SortableCategory from "./SortableCategory";
import SortableQuest from "./SortableQuest";
import ModalConfirm from "../../../components/ModalConfirm";
import Separator from "../../../components/ui/Separator";

interface QuestSidebarProps {
  campaignId: string;
  selectedQuestId: string | null;
  onSelectQuest: (id: string) => void;
  isMaster: boolean;
  onAddQuest: (categoryId?: string) => void;
}

function QuestSidebar({
  campaignId,
  selectedQuestId,
  onSelectQuest,
  isMaster,
  onAddQuest,
}: QuestSidebarProps) {
  const { questTree, isPending, error } = useQuestTree(campaignId);
  const { reorderQuests } = useReorderQuests(campaignId);

  // drag-and-drop
  const {
    boardData,
    activeId,
    activeType,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useQuestSidebarDnd(questTree, reorderQuests);

  // categories hooks + modal
  const { createCategory, isPending: isCreatingCategory } =
    useCreateQuestCategory(campaignId);
  const { updateCategory } = useUpdateQuestCategory(campaignId);
  const { deleteCategory, isPending: isDeletingCategory } =
    useDeleteQuestCategory(campaignId);

  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    categoryId: string | null;
    title: string;
  }>({ isOpen: false, categoryId: null, title: "" });

  // handlers
  function handleSaveCategory(title: string) {
    createCategory({ title });
  }

  function handleEditCategory(categoryId: string, newTitle: string) {
    updateCategory({ categoryId, data: { title: newTitle } });
  }

  function handleConfirmDelete() {
    if (!confirmState.categoryId) return;
    deleteCategory(confirmState.categoryId, {
      onSuccess: () =>
        setConfirmState({ isOpen: false, categoryId: null, title: "" }),
    });
  }

  if (isPending) return <Loader text="Завантаження квестів..." />;
  if (error)
    return (
      <div className="p-4 text-center text-danger">Помилка завантаження</div>
    );
  if (!questTree) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <div className="p-4 flex flex-col gap-4 border-b-2 border-border-strong shrink-0 bg-surface">
        <h2 className="text-xl font-gothic-title text-text-selected tracking-widest uppercase text-center">
          Журнал
        </h2>
        {isMaster && (
          <Button
            variant="default"
            size="sm"
            className="w-full text-xs"
            onClick={() => onAddQuest()}
          >
            Додати Квест
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar scrollbar-thumb-border-strong pr-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          {/* categories */}
          <SortableContext
            items={boardData.categories.map((category) => category.id)}
            strategy={verticalListSortingStrategy}
          >
            {boardData.categories.map((category) => {
              const hasQuests = category.quests.length > 0;
              const isSelectedQuestHere = category.quests.some(
                (quest) => quest.id === selectedQuestId,
              );

              return (
                <SortableCategory
                  key={category.id}
                  categoryId={category.id}
                  title={category.title}
                  isMaster={isMaster}
                  isEmpty={!hasQuests}
                  defaultOpen={isSelectedQuestHere || activeType === "Quest"}
                  onAddQuest={() => onAddQuest(category.id)}
                  onEdit={(newTitle) =>
                    handleEditCategory(category.id, newTitle)
                  }
                  onDelete={() =>
                    setConfirmState({
                      isOpen: true,
                      categoryId: category.id,
                      title: category.title,
                    })
                  }
                >
                  {/* category quests */}
                  <SortableContext
                    items={category.quests.map((quest) => quest.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex flex-col gap-0.5">
                      {category.quests.map((quest) => (
                        <SortableQuest
                          key={quest.id}
                          quest={quest}
                          isSelected={quest.id === selectedQuestId}
                          onClick={() => onSelectQuest(quest.id)}
                          isMaster={isMaster}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </SortableCategory>
              );
            })}
          </SortableContext>

          {/* REVIEW visual */}
          <div className="py-2 text-center flex flex-col gap-2">
            <Separator />
            <span className="text-text-muted text-sm text-title">Інші</span>
            <Separator />
          </div>

          {/* root quests */}
          <SortableContext
            items={boardData.rootQuests.map((quest) => quest.id)}
            strategy={verticalListSortingStrategy}
          >
            {boardData.rootQuests.length > 0 && (
              <div className="flex flex-col gap-0.5 mt-2">
                {boardData.rootQuests.map((quest) => (
                  <SortableQuest
                    key={quest.id}
                    quest={quest}
                    isSelected={quest.id === selectedQuestId}
                    onClick={() => onSelectQuest(quest.id)}
                    isMaster={isMaster}
                  />
                ))}
              </div>
            )}
          </SortableContext>
          {isMaster && (
            <QuestCategoryCreate
              onSave={handleSaveCategory}
              isPending={isCreatingCategory}
            />
          )}

          {/* overlay for dragging */}
          <DragOverlay dropAnimation={null}>
            {activeId ? (
              activeType === "Category" ? (
                <div className="bg-surface opacity-95 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] border-2 border-primary p-2 min-h-10 flex items-center justify-center font-heading text-sm tracking-widest uppercase text-text-selected rotate-1 cursor-grabbing">
                  {
                    boardData.categories.find(
                      (category) => category.id === activeId,
                    )?.title
                  }
                </div>
              ) : (
                <div className="bg-surface-hover opacity-95 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] border-l-2 border-primary py-2 px-6 font-heading text-sm text-text-selected text-center truncate rotate-1 cursor-grabbing">
                  {
                    [
                      ...boardData.rootQuests,
                      ...boardData.categories.flatMap(
                        (category) => category.quests,
                      ),
                    ].find((quest) => quest.id === activeId)?.title
                  }
                </div>
              )
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <ModalConfirm
        isOpen={confirmState.isOpen}
        onOpenChange={(isOpen) =>
          setConfirmState((state) => ({ ...state, isOpen }))
        }
        onConfirm={handleConfirmDelete}
        isLoading={isDeletingCategory}
        title={"Видалення категорії"}
        description={`Ви впевнені, що хочете видалити "${confirmState.title}"? Це також видалить усі квести, що знаходяться у цій категорії без можливості відновлення.`}
        requireInput={confirmState.title}
      />
    </div>
  );
}

export default QuestSidebar;
