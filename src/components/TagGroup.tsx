import { useState } from "react";
import Input from "./ui/Input";
import Badge from "./ui/Badge";

interface TagGroupProps {
  label: string;
  selectedTags: string[];
  defaultTags: string[];
  colorDictionary: Record<string, string>;
  onChange: (newTags: string[]) => void;
  placeholder?: string;
}

export function TagGroup({
  label,
  selectedTags = [],
  defaultTags,
  colorDictionary,
  onChange,
  placeholder = "Додати...",
}: TagGroupProps) {
  const [customValue, setCustomValue] = useState("");

  const unselectedDefaults = defaultTags.filter(
    (tag) => !selectedTags.includes(tag),
  );

  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      onChange([...selectedTags, trimmed]);
    }
  }

  function removeTag(tag: string) {
    onChange(selectedTags.filter((item) => item !== tag));
  }

  function handleAddCustomTag() {
    addTag(customValue);
    setCustomValue("");
  }

  return (
    <div>
      <span className="mb-2 block font-mono text-xs uppercase text-text-muted">
        {label}
      </span>

      <div className="flex flex-wrap gap-2 items-center">
        {selectedTags.length === 0 && (
          <span className="font-mono text-xs text-text-muted/50 italic">
            Не вказано
          </span>
        )}

        {selectedTags.map((tag) => (
          <Badge key={tag} variant="default" className={colorDictionary[tag]}>
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2 text-current opacity-70 hover:opacity-100 font-bold focus:outline-none leading-none cursor-pointer"
              // I decided that adding custom Tooltip THERE will be too much
              title="Видалити"
            >
              ×
            </button>
          </Badge>
        ))}

        <div className="flex items-center gap-1">
          <Input
            size="sm"
            variant="ghost"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(customValue);
                setCustomValue("");
              }
            }}
            placeholder={placeholder}
            className="w-32 uppercase placeholder:text-text-primary/90 border border-border-strong hover:border-text-muted focus-visible:border-primary  px-2 font-mono h-5.5"
          />
          <button
            type="button"
            onClick={handleAddCustomTag}
            disabled={!customValue.trim()}
            title="Додати тег"
            className="flex h-5.5 w-5.5 shrink-0 items-center justify-center border border-border-strong text-text-selected transition-colors hover:border-primary hover:text-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      {unselectedDefaults.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {unselectedDefaults.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => addTag(tag)}
              className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
            >
              <Badge variant="default" className={colorDictionary[tag]}>
                + {tag}
              </Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
