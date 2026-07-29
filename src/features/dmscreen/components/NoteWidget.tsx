import { useState, type ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import type { NoteContentDTO } from "../../../schemas/widget.schema";
import type { BaseWidgetProps } from "./WidgetRegistry";
import { useWidgetContent } from "../hooks/useWidgetContent";
import { Save } from "lucide-react";

type NoteWidgetProps = BaseWidgetProps<NoteContentDTO>;

export function NoteWidget({ campaignId, widgetId, content }: NoteWidgetProps) {
  const [text, setText] = useState(content?.text || "");
  const { updateContent, isUpdating } = useWidgetContent<NoteContentDTO>(
    campaignId,
    widgetId,
  );

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const newText = e.target.value;
    setText(newText);

    updateContent({
      text: newText,
    });
  }

  return (
    <div className="relative w-full h-full">
      <TextareaAutosize
        className="overflow-hidden block w-full h-full p-4 bg-transparent text-text-primary placeholder:text-text-muted resize-none outline-none font-mono text-sm"
        placeholder="Швидка нотатка"
        value={text ?? ""}
        onChange={handleChange}
        onMouseDown={(e) => e.stopPropagation()}
      ></TextareaAutosize>
      {isUpdating && (
        <div className="absolute bottom-2 right-4 text-text-muted animate-pulse">
          <Save size={14} />
        </div>
      )}
    </div>
  );
}
