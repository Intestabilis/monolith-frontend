import { useRef, useState, type ChangeEvent } from "react";
import { useUploadCampaignCover } from "../hooks/useUploadCampaignCover";
import { cn } from "../../../utils/cn";
import UploadIcon from "../../../components/icons/UploadIcon";

interface CampaignCoverProps {
  campaignId: string;
  imageUrl?: string | null;
  isMaster: boolean;
}

function CampaignCover({ campaignId, imageUrl, isMaster }: CampaignCoverProps) {
  const { uploadCoverAsync, isUploading } = useUploadCampaignCover(campaignId);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      await uploadCoverAsync(event.target.files[0]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  // Drag-and-Drop

  // Drag & Drop
  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    if (isMaster) setIsDragging(true);
  }

  function handleDragLeave(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(false);
  }

  async function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(false);
    if (!isMaster || isUploading) return;

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      await uploadCoverAsync(event.dataTransfer.files[0]);
    }
  }

  return (
    <>
      <input
        type="file"
        accept="image/jpeg, image/png, image/webp"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />
      <div
        className="relative w-full aspect-video max-h-125 bg-background-contrast flex items-center justify-center overflow-hidden transition-all group/cover"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() =>
          isMaster && !isUploading && fileInputRef.current?.click()
        }
      >
        {isUploading ? (
          // CHANGE proper loader
          <div className="flex flex-col items-center gap-3 z-20">
            <span className="animate-spin text-3xl">⚔️</span>
            <span className="font-mono text-sm text-text-selected uppercase bg-background/80 px-3 py-1">
              Завантаження...
            </span>
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="Обкладинка кампейну"
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <span className="font-mono text-sm text-text-muted opacity-50">
            {isMaster
              ? "Натисніть або перетягніть зображення"
              : "Зображення відсутнє"}
          </span>
        )}

        {/* Drag/master hover overlay*/}
        {isMaster && !isUploading && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-200",
              isDragging
                ? "bg-primary/20 border-4 border-dashed border-primary backdrop-blur-sm"
                : "bg-background/40 opacity-0 group-hover/cover:opacity-100 backdrop-blur-sm",
            )}
          >
            <div className="flex items-center gap-2 border-2 border-border-strong bg-surface px-4 py-2 text-sm font-bold uppercase tracking-wider text-text-primary shadow-[4px_4px_0px_var(--color-border-strong)]">
              <UploadIcon />
              {isDragging
                ? "Перетягніть зображення сюди"
                : "Змінити обкладинку (PNG, JPG до 4 МБ)"}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CampaignCover;
