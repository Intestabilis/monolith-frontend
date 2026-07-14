import type { Editor } from "@tiptap/react";
import { useRef } from "react";
import Button from "../../ui/Button";
import Tooltip from "../../ui/Tooltip";
import { Image } from "lucide-react";

function UploadImageButton({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasImageUploader = "uploadImage" in editor.commands;

  if (!hasImageUploader) return null;

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    editor.chain().focus().uploadImage(file).run(); // custom command from ImageUploader
    event.target.value = "";
  }

  return (
    <>
      <div className="w-0.5 h-6 bg-border-muted mx-1" />
      <input
        type="file"
        accept="image/jpeg, image/png, image/gif, image/webp"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Tooltip content="Завантажити зображення">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={14} />
        </Button>
      </Tooltip>
    </>
  );
}

export default UploadImageButton;
