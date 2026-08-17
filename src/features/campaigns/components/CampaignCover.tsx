import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { useUploadCampaignCover } from "../hooks/useUploadCampaignCover";
import { cn } from "../../../utils/cn";
import { Upload } from "lucide-react";
import Loader from "../../../components/ui/Loader";
import { getCroppedImage } from "../../../utils/getCroppedImage";
import Cropper, { type Area } from "react-easy-crop";
import Button from "../../../components/ui/Button";

interface CampaignCoverProps {
  campaignId: string;
  imageUrl?: string | null;
  isMaster: boolean;
}

function CampaignCover({ campaignId, imageUrl, isMaster }: CampaignCoverProps) {
  const { uploadCover, isUploading } = useUploadCampaignCover(campaignId);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // cropper image state
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    return () => {
      if (imageToCrop) URL.revokeObjectURL(imageToCrop);
    };
  }, [imageToCrop]);

  function handleFile(file: File) {
    if (file) {
      setImageToCrop(URL.createObjectURL(file));
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      handleFile(event.target.files[0]);
    }
  }

  // Drag-and-Drop

  // Drag & Drop
  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    if (isMaster && !imageToCrop) setIsDragging(true);
  }

  function handleDragLeave(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(false);
    if (!isMaster || isUploading || imageToCrop) return;

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFile(event.dataTransfer.files[0]);
    }
  }

  // memoize to optimize cropper and not recreating function every tipe
  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  async function handleConfirmCrop() {
    try {
      if (!imageToCrop || !croppedAreaPixels) return;

      const croppedFile = await getCroppedImage(imageToCrop, croppedAreaPixels);

      uploadCover(croppedFile, {
        onSuccess: () => {
          setImageToCrop(null);
        },
      });
    } catch (e) {
      console.error("Помилка обрізання зображення:", e);
    }
  }

  function handleCancelCrop() {
    setImageToCrop(null);
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
        className="relative w-full aspect-video bg-background-contrast flex items-center justify-center overflow-hidden transition-all group/cover"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() =>
          isMaster &&
          !isUploading &&
          !imageToCrop &&
          fileInputRef.current?.click()
        }
      >
        {isUploading ? (
          <Loader variant="d20" size="lg" text="Завантаження..." />
        ) : imageToCrop ? (
          <div className="absolute inset-0 z-20 flex flex-col bg-background">
            <div className="relative flex-1">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                zoomSpeed={0.2}
                aspect={16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid={false}
                style={{
                  containerStyle: {
                    background: "var(--color-background-contrast)",
                  },
                }}
              />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 border-2 border-border-strong bg-surface px-4 py-2 z-30">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCancelCrop}
              >
                Скасувати
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleConfirmCrop}
              >
                Зберегти обкладинку
              </Button>
            </div>
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
        {isMaster && !isUploading && !imageToCrop && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-200",
              isDragging
                ? "bg-primary/20 border-4 border-dashed border-primary backdrop-blur-sm"
                : "bg-background/40 opacity-0 group-hover/cover:opacity-100 backdrop-blur-sm",
            )}
          >
            <div className="flex items-center gap-2 border-2 border-border-strong bg-surface px-4 py-2 text-sm font-bold uppercase tracking-wider text-text-primary">
              <Upload size="16" />
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
