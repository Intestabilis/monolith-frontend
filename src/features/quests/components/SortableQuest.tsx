import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import QuestSidebarItem from "./QuestSidebarItem";
import { type ComponentProps } from "react";

type SortableQuestProps = ComponentProps<typeof QuestSidebarItem>;

export default function SortableQuest({ ...props }: SortableQuestProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.quest.id,
    data: { type: "Quest" },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <QuestSidebarItem
        {...props}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
