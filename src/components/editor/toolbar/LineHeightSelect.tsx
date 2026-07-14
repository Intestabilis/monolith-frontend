import type { Editor } from "@tiptap/react";
import Tooltip from "../../ui/Tooltip";

interface LineHeightSelectProps {
  editor: Editor;
  activeStates: Record<string, string | boolean>;
}

function LineHeightSelect({ editor, activeStates }: LineHeightSelectProps) {
  if (!editor.extensionManager.extensions.some((e) => e.name === "lineHeight"))
    return null;

  function handleLineHeight(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    if (value === "default") editor.chain().focus().unsetLineHeight().run();
    else editor.chain().focus().setLineHeight(value).run();
  }

  return (
    <>
      <div className="w-0.5 h-6 bg-border-muted mx-1" />
      <Tooltip content="Міжрядковий інтервал">
        <select
          onChange={handleLineHeight}
          // also type kostyl ngl (still don't want to do separate large type with every activeState option)
          value={activeStates.lineHeight as string}
          className="bg-transparent border border-border rounded px-1 py-1 text-sm font-sans focus:outline-none focus:border-stone-400 h-8 cursor-pointer"
        >
          <option value="default" className="bg-surface">
            Авто
          </option>
          <option value="1.25" className="bg-surface">
            1.25
          </option>
          <option value="1.5" className="bg-surface">
            1.5
          </option>
          <option value="2" className="bg-surface">
            2
          </option>
        </select>
      </Tooltip>
    </>
  );
}

export default LineHeightSelect;
