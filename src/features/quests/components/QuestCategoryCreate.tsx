import { Plus, Check, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Props {
  onSave: (title: string) => void;
  isPending?: boolean;
}

export default function QuestCategoryCreate({ onSave, isPending }: Props) {
  const [isCreating, setIsCreating] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCreating) {
      inputRef.current?.focus();
    }
  }, [isCreating]);

  function handleSave() {
    if (value.trim()) {
      onSave(value.trim());
      setValue("");
      setIsCreating(false);
    }
  }

  function handleCancel() {
    setValue("");
    setIsCreating(false);
  }

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="group relative flex items-center justify-center p-2 bg-transparent border-y border-dashed border-border-muted hover:border-border transition-colors w-full mt-4 mb-2 min-h-10"
      >
        <div className="absolute left-2 text-text-muted transition-colors group-hover:text-text-primary">
          <Plus size={16} />
        </div>
        <span className="font-heading font-bold text-sm tracking-widest uppercase text-text-muted group-hover:text-text-primary transition-colors truncate px-8">
          Нова категорія
        </span>
      </button>
    );
  }

  return (
    <div className="relative flex items-center justify-center p-2 bg-surface/30 border-y border-dashed border-primary mt-4 mb-2 min-h-10">
      {/* REVIEW maybe do some styling in UI Input and use it there instead */}
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave();
          if (e.key === "Escape") handleCancel();
        }}
        disabled={isPending}
        placeholder="НАЗВА КАТЕГОРІЇ"
        className="bg-transparent border-b border-primary/50 focus:border-primary px-2 py-0 text-center font-heading font-bold text-sm tracking-widest uppercase text-text-selected outline-none w-3/4 max-w-50"
      />
      <div className="absolute right-2 flex gap-1">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="p-1 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
        >
          <Check size={14} />
        </button>
        <button
          onClick={handleCancel}
          disabled={isPending}
          className="p-1 text-danger hover:bg-danger/20 transition-colors disabled:opacity-50"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
