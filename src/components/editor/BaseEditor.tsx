import {
  useEditor,
  EditorContent,
  type JSONContent,
  type Extensions,
} from "@tiptap/react";
import EditorToolbar from "./EditorToolbar";
import { cn } from "../../utils/cn";
import "./BaseEditor.css";
import type { ReactNode } from "react";

interface BaseEditorProps {
  extensions: Extensions;
  value: JSONContent;
  onChange: (value: JSONContent) => void;
  disabled?: boolean;
  className?: string;
  editorClassName?: string;
  toolbarActionSlot?: ReactNode; // save & cancel buttons
}

function BaseEditor({
  extensions,
  value,
  onChange,
  disabled = false,
  className,
  editorClassName,
  toolbarActionSlot,
}: BaseEditorProps) {
  const editor = useEditor({
    extensions,
    editable: !disabled,
    content: value,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        class: cn("focus:outline-none min-h-25 w-full", editorClassName),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  if (!editor) return null;

  return (
    <div className={cn("flex flex-col transition-all relative ", className)}>
      {!disabled && (
        <EditorToolbar editor={editor} actionSlot={toolbarActionSlot} />
      )}

      <EditorContent
        editor={editor}
        className={cn(
          !disabled && "cursor-text",
          "w-full",
          // Prose + custom prose class (editor-prose) + text size
          "prose prose-base editor-prose max-w-none",

          // Basic text
          "prose-p:my-2 prose-p:leading-none font-serif",

          // Headers
          "prose-h1:font-gothic prose-h1:uppercase prose-h1:tracking-wider prose-h1:mt-6 prose-h1:mb-3",
          "prose-h2:font-title prose-h2:mt-5 prose-h2:mb-2",
          "prose-h3:font-title prose-h3:mt-4 prose-h3:mb-2",

          // Blockquotes
          "prose-blockquote:font-title prose-blockquote:bg-surface prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:my-4 prose-blockquote:rounded-none prose-blockquote:border-l-4 prose-blockquote:border-primary",

          // Lists
          "prose-ul:my-2 prose-ol:my-2",
        )}
      />
    </div>
  );
}

export default BaseEditor;
