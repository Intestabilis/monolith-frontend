import { Plus } from "lucide-react";
import Button from "../../../components/ui/Button";
import type { WidgetType } from "../../../schemas/widget.schema";

interface BoardToolbarProps {
  onAddWidget: (type: WidgetType) => void;
  isCreating: boolean;
}

function BoardToolbar({ onAddWidget, isCreating }: BoardToolbarProps) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex gap-4 bg-surface p-2 border-2 border-border-strong">
      <Button
        onClick={() => onAddWidget("NOTE")}
        disabled={isCreating}
        className="border-border bg-muted hover:bg-surface-hover hover:text-text-primary"
      >
        <span className="flex gap-1 flex-row items-center">
          <Plus size="14" strokeWidth="4" />
          Нотатка
        </span>
      </Button>
      {/* <Button
        onClick={() => onAddWidget("INITIATIVE")}
        disabled={isCreating}
        className="border-border bg-muted hover:bg-surface-hover hover:text-text-primary"
      >
        <span className="flex gap-1 flex-row items-center">
          <Plus size="14" strokeWidth="4" />
          Ініціатива
        </span>
      </Button> */}
    </div>
  );
}

export default BoardToolbar;
