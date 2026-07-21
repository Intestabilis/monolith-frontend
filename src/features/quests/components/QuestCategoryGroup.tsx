import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  GripVertical,
} from "lucide-react";
import { useState, useRef, type ComponentProps } from "react";
import Tooltip from "../../../components/ui/Tooltip";

interface QuestCategoryGroupProps {
  title: string;
  isMaster: boolean;
  onDelete?: () => void;
  onAddQuest?: () => void;
  onEdit?: (newTitle: string) => void;
  defaultOpen?: boolean;
  isEmpty?: boolean;
  dragHandleProps?: ComponentProps<"div">; // for dnd-kit
  children: React.ReactNode;
}

function QuestCategoryGroup({
  title,
  isMaster,
  onDelete,
  onAddQuest,
  onEdit,
  defaultOpen = false,
  isEmpty = false,
  dragHandleProps,
  children,
}: QuestCategoryGroupProps) {
  const [isOpen, setIsOpen] = useState(() => defaultOpen);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSave() {
    if (editValue.trim() && editValue !== title) onEdit?.(editValue.trim());
    setIsEditing(false);
  }

  function handleCancel() {
    setEditValue(title);
    setIsEditing(false);
  }

  function toggleOpen() {
    if (!isEditing && !isEmpty) setIsOpen(!isOpen);
  }

  return (
    <div className="mb-2">
      <div
        className={`group relative flex items-center p-2 bg-muted border-y border-border transition-colors min-h-10 ${
          isEmpty ? "cursor-default" : "cursor-pointer hover:bg-surface-hover"
        }`}
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-1 shrink-0 z-10">
          <div className="flex justify-center text-text-muted transition-colors group-hover:text-text-primary">
            {!isEmpty &&
              (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
          </div>
          {dragHandleProps && isMaster && !isEditing ? (
            <Tooltip content="Перетягнути категорію">
              <div
                {...dragHandleProps}
                className="p-1 -ml-1 text-text-muted hover:text-text-primary cursor-grab active:cursor-grabbing touch-none outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <GripVertical size={14} />
              </div>
            </Tooltip>
          ) : (
            // empty space to hold chevron in place without grip icon
            <div className="w-5.5 -ml-1" />
          )}
        </div>

        <div className="absolute left-0 right-0 flex justify-center pointer-events-none px-16">
          {isEditing ? (
            <input
              ref={inputRef}
              autoFocus
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto bg-surface border-b-2 border-primary px-2 py-0 text-center font-heading font-bold text-sm tracking-widest uppercase text-text-selected outline-none w-full max-w-62.5"
            />
          ) : (
            <h3 className="font-heading font-bold text-sm tracking-widest uppercase text-text-selected truncate w-full max-w-62.5 text-center">
              {title}
            </h3>
          )}
        </div>

        <div className="flex-1" />

        <div className="flex justify-end shrink-0 z-10">
          {isMaster && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-muted px-1 rounded-sm">
              {/* REVIEW maybe create some button variant like small icon button (composite variant? idk) and use there */}
              {isEditing ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave();
                    }}
                    className="p-1 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancel();
                    }}
                    className="p-1 text-danger hover:bg-danger/20 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <>
                  <Tooltip content="Редагувати категорію">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                      }}
                      className="p-1 text-text-muted hover:text-primary transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                  </Tooltip>
                  <Tooltip content="Додати квест">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddQuest?.();
                      }}
                      className="p-1 text-text-muted hover:text-text-primary transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </Tooltip>
                  <Tooltip content="Видалити категорію">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.();
                      }}
                      className="p-1 text-text-muted hover:text-danger transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </Tooltip>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {isOpen && !isEmpty && (
        <div className="py-1 flex flex-col gap-0.5">{children}</div>
      )}
    </div>
  );
}

export default QuestCategoryGroup;
