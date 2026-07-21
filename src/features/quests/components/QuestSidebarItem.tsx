import { cva } from "class-variance-authority";
import type { QuestSidebarItemDTO } from "../../../schemas/quest.schema";
import { cn } from "../../../utils/cn";
import { GripVertical } from "lucide-react";
import type { ComponentProps } from "react";
import Tooltip from "../../../components/ui/Tooltip";

const itemVariants = cva(
  "group relative w-full flex items-center justify-center py-2 px-4 transition-colors duration-150 cursor-pointer font-heading text-sm border-l-2",
  {
    variants: {
      isSelected: {
        true: "bg-surface-hover border-primary text-text-selected font-bold",
        false:
          "bg-transparent border-transparent text-text-primary hover:bg-surface-hover hover:border-border",
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  },
);

interface QuestSidebarItemProps {
  quest: QuestSidebarItemDTO;
  isSelected: boolean;
  onClick: () => void;
  isMaster?: boolean;
  dragHandleProps?: ComponentProps<"div">; // for dnd-kit
}

function QuestSidebarItem({
  quest,
  isSelected,
  onClick,
  isMaster,
  dragHandleProps,
}: QuestSidebarItemProps) {
  const isCompleted = quest.status === "completed";
  const isFailed = quest.status === "failed";

  return (
    <button onClick={onClick} className={cn(itemVariants({ isSelected }))}>
      {/* dnd grip icon */}
      {isMaster && dragHandleProps && (
        <Tooltip content="Перетягнути квест">
          <div
            {...dragHandleProps}
            onClick={(e) => e.stopPropagation()} // to not select quest on click
            className="absolute left-2 p-1 text-text-muted hover:text-text-primary cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity touch-none outline-none"
          >
            <GripVertical size={14} />
          </div>
        </Tooltip>
      )}

      <span
        className={cn(
          "truncate transition-all duration-300 px-6",
          isCompleted && "line-through text-text-muted opacity-60",
          isFailed && "line-through text-danger-muted opacity-80",
        )}
      >
        {quest.title}
      </span>
    </button>
  );
}

export default QuestSidebarItem;
