import { Controller, useForm } from "react-hook-form";
import Button from "../ui/Button";
import BaseEditor from "./BaseEditor";
import { useState } from "react";
import { type Extensions, type JSONContent } from "@tiptap/react";
import { cn } from "../../utils/cn";
import { Save } from "lucide-react";

interface DocumentEditorProps {
  initialContent: JSONContent;
  extensions: Extensions;
  isEditable: boolean;
  isSaving: boolean;
  onSave: (content: JSONContent, onSuccess: () => void) => void;
  className?: string;
  editorClassName?: string;
}

function DocumentEditor({
  initialContent,
  extensions,
  isEditable,
  isSaving,
  onSave,
  className,
  editorClassName,
}: DocumentEditorProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: { content: initialContent },
  });

  const [isEditMode, setIsEditMode] = useState(false);

  function onSubmit(data: { content: JSONContent }) {
    onSave(data.content, () => {
      reset(data);
      setIsEditMode(false);
    });
  }

  function handleCancel() {
    reset();
    setIsEditMode(false);
  }

  const isEditorDisabled = !isEditable || !isEditMode;

  // save & cancel buttons to pass in the Toolbar
  const actionSlot = isEditMode ? (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCancel}
        disabled={isSaving}
      >
        Скасувати
      </Button>
      <Button
        type="submit"
        size="sm"
        disabled={!isDirty || isSaving}
        variant={isDirty ? "primary" : "default"}
        className="shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
      >
        {isSaving ? "..." : isDirty ? <Save size={16} /> : "✓"}
      </Button>
    </>
  ) : null;

  return (
    // group for floating edit button on hover
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col relative w-full group"
    >
      {isEditable && !isEditMode && (
        <div className="absolute top-2 right-2 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
          <Button
            type="button"
            variant="default"
            onClick={() => setIsEditMode(true)}
            className="shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-surface/90 backdrop-blur"
          >
            Редагувати
          </Button>
        </div>
      )}

      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <BaseEditor
            key={isEditMode ? "edit" : "read"}
            extensions={extensions}
            value={field.value}
            onChange={field.onChange}
            disabled={isEditorDisabled}
            toolbarActionSlot={actionSlot} // passing save & cancel buttons in the Toolbar through BaseEditor
            className={cn(
              !isEditorDisabled &&
                "border-2 border-border-strong bg-background shadow-[4px_4px_0px_rgba(0,0,0,1)]",
              className,
            )}
            editorClassName={cn(
              editorClassName ? editorClassName : "py-4 px-4",
            )}
          />
        )}
      />
    </form>
  );
}

export default DocumentEditor;
