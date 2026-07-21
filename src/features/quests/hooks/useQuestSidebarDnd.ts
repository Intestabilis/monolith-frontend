import { useState, useRef } from "react";
import {
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import type {
  QuestSidebarResponseDTO,
  QuestSidebarItemDTO,
  ReorderItemsDTO,
} from "../../../schemas/quest.schema";

// Helper functions
function findContainerOfQuest(
  questId: string,
  data: QuestSidebarResponseDTO,
): string | null {
  if (data.rootQuests.find((quest) => quest.id === questId)) return "root";
  const category = data.categories.find((category) =>
    category.quests.some((quest) => quest.id === questId),
  );
  return category ? category.id : null;
}

function getQuestsByContainer(
  containerId: string,
  data: QuestSidebarResponseDTO,
) {
  if (containerId === "root") return data.rootQuests;
  return (
    data.categories.find((category) => category.id === containerId)?.quests ||
    []
  );
}

function updateQuestsInContainer(
  containerId: string,
  newQuests: QuestSidebarItemDTO[],
  prevData: QuestSidebarResponseDTO,
): QuestSidebarResponseDTO {
  if (containerId === "root") {
    return { ...prevData, rootQuests: newQuests };
  }
  return {
    ...prevData,
    categories: prevData.categories.map((category) =>
      category.id === containerId
        ? { ...category, quests: newQuests }
        : category,
    ),
  };
}

export function useQuestSidebarDnd(
  questTree: QuestSidebarResponseDTO | undefined,
  reorderQuests: (data: ReorderItemsDTO) => void,
) {
  // derived front-end state
  const [boardData, setBoardData] = useState<QuestSidebarResponseDTO>({
    categories: questTree?.categories || [],
    rootQuests: questTree?.rootQuests || [],
  });

  const [prevTree, setPrevTree] = useState<QuestSidebarResponseDTO | undefined>(
    questTree,
  );

  // Tanstack recreating(?) object after fetching new data, so we can use reference to compare trees
  if (questTree && questTree !== prevTree) {
    setPrevTree(questTree);
    setBoardData({
      categories: questTree.categories,
      rootQuests: questTree.rootQuests,
    });
  }

  // dnd state
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<"Category" | "Quest" | null>(
    null,
  );
  const initialContainerRef = useRef<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // handlers
  function handleDragStart(event: DragStartEvent) {
    const id = event.active.id as string;
    const type = event.active.data.current?.type as "Category" | "Quest";

    setActiveId(id);
    setActiveType(type);

    if (type === "Quest") {
      initialContainerRef.current = findContainerOfQuest(id, boardData);
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.data.current?.type === "Category") return;

    const activeId = active.id as string;
    const overId = over.id as string;

    setBoardData((prev) => {
      const activeContainer = findContainerOfQuest(activeId, prev);
      const overContainer =
        over.data.current?.type === "Category"
          ? overId
          : findContainerOfQuest(overId, prev);

      if (
        !activeContainer ||
        !overContainer ||
        activeContainer === overContainer
      ) {
        return prev;
      }

      const activeQuests = getQuestsByContainer(activeContainer, prev);
      const overQuests = getQuestsByContainer(overContainer, prev);

      const movedQuest = activeQuests.find((quest) => quest.id === activeId);
      if (!movedQuest) return prev;

      // deleting from old list
      const newActiveQuests = activeQuests.filter(
        (quest) => quest.id !== activeId,
      );

      // adding in new list
      const overIndex = overQuests.findIndex((quest) => quest.id === overId);
      // for empty categories
      const insertIndex = overIndex >= 0 ? overIndex : overQuests.length;

      const newOverQuests = [
        ...overQuests.slice(0, insertIndex),
        movedQuest,
        ...overQuests.slice(insertIndex),
      ];

      const newState = updateQuestsInContainer(
        activeContainer,
        newActiveQuests,
        prev,
      );
      return updateQuestsInContainer(overContainer, newOverQuests, newState);
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    setActiveType(null);

    const { active, over } = event;
    const initialContainer = initialContainerRef.current;
    initialContainerRef.current = null;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Categories
    if (active.data.current?.type === "Category") {
      if (activeId !== overId) {
        setBoardData((prev) => {
          const oldIndex = prev.categories.findIndex(
            (category) => category.id === activeId,
          );
          const newIndex = prev.categories.findIndex(
            (category) => category.id === overId,
          );
          const newOrder = arrayMove(prev.categories, oldIndex, newIndex);

          reorderQuests({
            items: newOrder.map((category, i) => ({
              id: category.id,
              type: "category",
              order: i,
            })),
          });

          return { ...prev, categories: newOrder };
        });
      }
      return;
    }

    // Quests
    setBoardData((prev) => {
      const currentContainer = findContainerOfQuest(activeId, prev);
      if (!currentContainer) return prev;

      const hasMoved =
        activeId !== overId || initialContainer !== currentContainer;
      if (!hasMoved) return prev;

      const currentQuests = getQuestsByContainer(currentContainer, prev);
      const oldIndex = currentQuests.findIndex(
        (quest) => quest.id === activeId,
      );
      const newIndex = currentQuests.findIndex((quest) => quest.id === overId);

      const sortedQuests = arrayMove(currentQuests, oldIndex, newIndex);

      const categoryId = currentContainer === "root" ? null : currentContainer;

      reorderQuests({
        items: sortedQuests.map((quest, i) => ({
          id: quest.id,
          type: "quest",
          order: i,
          categoryId,
        })),
      });

      return updateQuestsInContainer(currentContainer, sortedQuests, prev);
    });
  }

  return {
    boardData,
    activeId,
    activeType,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
