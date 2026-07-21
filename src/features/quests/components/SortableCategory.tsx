import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import QuestCategoryGroup from "./QuestCategoryGroup";

type SortableCategoryProps = React.ComponentProps<typeof QuestCategoryGroup> & {
  categoryId: string;
};

export default function SortableCategory({
  categoryId,
  ...props
}: SortableCategoryProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: categoryId,
    data: { type: "Category" },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <QuestCategoryGroup
        {...props}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
