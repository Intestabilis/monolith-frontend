import type { Editor } from "@tiptap/react";
import Tooltip from "../../ui/Tooltip";
import Button from "../../ui/Button";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface AlignmentGroupProps {
  editor: Editor;
  activeStates: Record<string, string | boolean>;
}

function AlignmentGroup({ editor, activeStates }: AlignmentGroupProps) {
  if (!editor.extensionManager.extensions.some((e) => e.name === "textAlign"))
    return null;

  function handleAlign(alignment: "left" | "center" | "right") {
    // aligning image (custom ResizableImage extension with align attribute)
    if (editor.isActive("image")) {
      const pos = editor.state.selection.from;

      // updating Tiptap JSON for image and setting alignment (also keeping focus on the image)
      editor
        .chain()
        .updateAttributes("image", { align: alignment })
        .setNodeSelection(pos)
        .focus()
        .run();

      // Fixing re-render with assigning alignment class to image immediately (without that code image will rerender with correct alignment only after saving document)
      const dom = editor.view.nodeDOM(pos) as HTMLElement;
      (dom?.tagName === "IMG" ? dom : dom?.querySelector("img"))?.setAttribute(
        "data-align",
        alignment,
      );
    } else {
      editor.chain().focus().setTextAlign(alignment).run();
    }
  }

  return (
    <>
      <div className="w-0.5 h-6 bg-border-muted mx-1" />
      <Tooltip content="Ліворуч">
        <Button
          type="button"
          onClick={() => handleAlign("left")}
          size="sm"
          variant={activeStates.alignLeft ? "primary" : "ghost"}
        >
          <AlignLeft size={14} />
        </Button>
      </Tooltip>

      <Tooltip content="По центру">
        <Button
          type="button"
          onClick={() => handleAlign("center")}
          size="sm"
          variant={activeStates.alignCenter ? "primary" : "ghost"}
        >
          <AlignCenter size={14} />
        </Button>
      </Tooltip>

      <Tooltip content="Праворуч">
        <Button
          type="button"
          onClick={() => handleAlign("right")}
          size="sm"
          variant={activeStates.alignRight ? "primary" : "ghost"}
        >
          <AlignRight size={14} />
        </Button>
      </Tooltip>
    </>
  );
}

export default AlignmentGroup;
