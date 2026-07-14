import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import Button from "../ui/Button";
import { ResizableImage } from "../../lib/tiptap/extensions/ResizableImage";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Minus,
} from "lucide-react";
import Tooltip from "../ui/Tooltip";
import AlignmentGroup from "./toolbar/AlignmentGroup";
import UploadImageButton from "./toolbar/UploadImageButton";
import LineHeightSelect from "./toolbar/LineHeightSelect";
import type { ReactNode } from "react";

type ToolbarButtonConfig = {
  name: string; // extension name
  icon: React.ElementType; // icon from lucide react
  title: string;
  isActive: boolean;
  onClick: () => void;
};

interface EditorToolbarProps {
  editor: Editor;
  actionSlot?: ReactNode; // save & cancel buttons
}

function EditorToolbar({ editor, actionSlot }: EditorToolbarProps) {
  // Getting info about active states from useEditorState hook to track it and update UI properly
  const activeStates = useEditorState({
    editor,
    selector: (ctx) => {
      let lineHeight = "default";
      if (ctx.editor.isActive("textStyle", { lineHeight: "1.25" }))
        lineHeight = "1.25";
      else if (ctx.editor.isActive("textStyle", { lineHeight: "1.5" }))
        lineHeight = "1.5";
      else if (ctx.editor.isActive("textStyle", { lineHeight: "2" }))
        lineHeight = "2";

      return {
        bold: ctx.editor.isActive("bold"),
        italic: ctx.editor.isActive("italic"),
        underline: ctx.editor.isActive("underline"),
        strike: ctx.editor.isActive("strike"),
        h1: ctx.editor.isActive("heading", { level: 1 }),
        h2: ctx.editor.isActive("heading", { level: 2 }),
        h3: ctx.editor.isActive("heading", { level: 3 }),
        blockquote: ctx.editor.isActive("blockquote"),
        bulletList: ctx.editor.isActive("bulletList"),
        orderedList: ctx.editor.isActive("orderedList"),
        alignLeft:
          ctx.editor.isActive({ textAlign: "left" }) ||
          (ctx.editor.isActive(ResizableImage.name) &&
            ctx.editor.getAttributes(ResizableImage.name).align === "left"),
        alignCenter:
          ctx.editor.isActive({ textAlign: "center" }) ||
          (ctx.editor.isActive(ResizableImage.name) &&
            ctx.editor.getAttributes(ResizableImage.name).align === "center"),
        alignRight:
          ctx.editor.isActive({ textAlign: "right" }) ||
          (ctx.editor.isActive(ResizableImage.name) &&
            ctx.editor.getAttributes(ResizableImage.name).align === "right"),
        lineHeight,
      };
    },
  });

  // Button groups configuration
  const formatButtons: ToolbarButtonConfig[] = [
    {
      name: "bold",
      icon: Bold,
      title: "Жирний",
      isActive: activeStates.bold,
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      name: "italic",
      icon: Italic,
      title: "Курсив",
      isActive: activeStates.italic,
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      name: "underline",
      icon: Underline,
      title: "Підкреслення",
      isActive: activeStates.underline,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      name: "strike",
      icon: Strikethrough,
      title: "Закреслення",
      isActive: activeStates.strike,
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
  ];

  const blockButtons: ToolbarButtonConfig[] = [
    {
      name: "heading",
      icon: Heading1,
      title: "Заголовок 1",
      isActive: activeStates.h1,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      name: "heading",
      icon: Heading2,
      title: "Заголовок 2",
      isActive: activeStates.h2,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      name: "heading",
      icon: Heading3,
      title: "Заголовок 3",
      isActive: activeStates.h3,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      name: "blockquote",
      icon: Quote,
      title: "Цитата",
      isActive: activeStates.blockquote,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      name: "horizontalRule",
      icon: Minus,
      title: "Лінія-розділювач",
      isActive: false,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
    },
  ];

  const listButtons: ToolbarButtonConfig[] = [
    {
      name: "bulletList",
      icon: List,
      title: "Маркований список",
      isActive: activeStates.bulletList,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      name: "orderedList",
      icon: ListOrdered,
      title: "Нумерований список",
      isActive: activeStates.orderedList,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
  ];

  // Function to render button groups
  function renderButtonGroup(buttons: ToolbarButtonConfig[]) {
    return buttons.map((btn) => {
      if (
        !editor.extensionManager.extensions.some((ext) => ext.name === btn.name)
      )
        return null;
      return (
        <Tooltip content={btn.title} key={btn.title}>
          <Button
            type="button"
            variant={btn.isActive ? "primary" : "ghost"}
            size="sm"
            onClick={btn.onClick}
          >
            <btn.icon size={14} />
          </Button>
        </Tooltip>
      );
    });
  }

  return (
    <div className="sticky top-0 z-30 flex items-start justify-between gap-4 border-b-2 border-border-strong bg-surface p-2 shadow-sm">
      {/* Left side toolbar buttons */}
      <div className="flex flex-wrap items-center gap-2 flex-1">
        {renderButtonGroup(formatButtons)}

        {/* REVIEW */}
        {/* rendering separator if group has at least one button (active extension) */}
        {editor.extensionManager.extensions.some(
          (ext) => ext.name === "heading" || ext.name === "blockquote",
        ) && <div className="w-0.5 h-6 bg-border-muted mx-1" />}

        {renderButtonGroup(blockButtons)}
        <AlignmentGroup editor={editor} activeStates={activeStates} />

        {editor.extensionManager.extensions.some(
          (ext) => ext.name === "bulletList" || ext.name === "orderedList",
        ) && <div className="w-0.5 h-6 bg-border-muted mx-1" />}

        {renderButtonGroup(listButtons)}
        <UploadImageButton editor={editor} />
        <LineHeightSelect editor={editor} activeStates={activeStates} />
      </div>

      {/* Right side action slots (save & cancel buttons) */}
      {actionSlot && (
        <div className="flex shrink-0 items-center gap-2 pt-0.5">
          {actionSlot}
        </div>
      )}
    </div>
  );
}

export default EditorToolbar;
