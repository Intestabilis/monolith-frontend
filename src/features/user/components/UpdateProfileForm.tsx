import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/ui/Button";
import TextareaAutosize from "react-textarea-autosize";
import {
  UpdateProfileSchema,
  type UpdateProfileDTO,
  type UserInfoDTO,
} from "../../../schemas/user.schema";
import { TagGroup } from "../../../components/TagGroup";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import {
  POPULAR_SYSTEMS,
  PLAYSTYLES,
  TIMEZONES,
  SYSTEM_STYLES,
  PLAYSTYLE_STYLES,
} from "../constants";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useUploadAvatar } from "../hooks/useUploadAvatar";
import { useCallback, useEffect, useState } from "react";
import Loader from "../../../components/ui/Loader";
import toast from "react-hot-toast";
import FantasyIcon from "../../../components/icons/FantasyIcon";
import type { Area } from "react-easy-crop";
import { getCroppedImage } from "../../../utils/getCroppedImage";
import Cropper from "react-easy-crop";

interface UpdateProfileFormProps {
  user: UserInfoDTO;
  onCancel: () => void;
}

function UpdateProfileForm({ user, onCancel }: UpdateProfileFormProps) {
  const { updateProfile, isPending } = useUpdateProfile();
  const { uploadAvatar, isPending: isAvatarUploading } = useUploadAvatar();

  const isSaving = isPending || isAvatarUploading;

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileDTO>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      bio: user.bio || "",
      pronouns: user.pronouns || "",
      timezone: user.timezone || "",
      favoriteSystems: user.favoriteSystems || [],
      playstyles: user.playstyles || [],
    },
  });

  // clearing local avatar file on changing picture
  useEffect(() => {
    return () => {
      if (imageToCrop) URL.revokeObjectURL(imageToCrop);
    };
  }, [imageToCrop]);

  function handleAvatarSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // reset crop/zoom after new file selection
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setImageToCrop(URL.createObjectURL(file));
    e.target.value = "";
  }

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
    },
    [],
  );

  async function onSubmit(data: UpdateProfileDTO) {
    if (imageToCrop && croppedAreaPixels) {
      try {
        const croppedFile = await getCroppedImage(
          imageToCrop,
          croppedAreaPixels,
        );

        uploadAvatar(croppedFile, {
          onSuccess: () => {
            if (isDirty) {
              updateProfile(data, { onSuccess: handleCancel });
            } else {
              handleCancel();
            }
          },
        });
      } catch (error) {
        toast.error(`Помилка створення зображення: ${error}`);
      }
    } else if (isDirty) {
      updateProfile(data, { onSuccess: handleCancel });
    } else {
      handleCancel();
    }
  }

  function handleCancel() {
    if (imageToCrop) URL.revokeObjectURL(imageToCrop);
    setImageToCrop(null);
    setCroppedAreaPixels(null);
    onCancel();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-8 md:grid-cols-3"
    >
      {/* LEFT SECTION */}
      <section className="flex flex-col md:col-span-2 md:pr-4">
        <div className="mb-6 flex gap-4 items-center ">
          <h2 className="font-title font-bold uppercase text-2xl text-text-selected break-all m-0 leading-none">
            {user.username}
          </h2>
          <div className="w-32">
            <Input
              size="sm"
              variant="ghost"
              {...register("pronouns")}
              placeholder="Займенники"
              className="border-border-strong font-mono text-sm text-text-primary hover:border-text-muted focus-visible:border-primary  whitespace-nowrap"
            />
            {errors.pronouns && (
              <span className="text-danger text-[10px] mt-1 block absolute">
                {errors.pronouns.message}
              </span>
            )}
          </div>
        </div>

        {/* Tags (systems + playstyles) */}
        <div className="mb-8 space-y-4">
          <Controller
            name="favoriteSystems"
            control={control}
            render={({ field }) => (
              <TagGroup
                label="Улюблені системи:"
                selectedTags={field.value || []}
                defaultTags={POPULAR_SYSTEMS}
                colorDictionary={SYSTEM_STYLES}
                onChange={field.onChange}
                placeholder="+ СИСТЕМА"
              />
            )}
          />

          <Controller
            name="playstyles"
            control={control}
            render={({ field }) => (
              <TagGroup
                label="Стилі гри:"
                selectedTags={field.value || []}
                defaultTags={PLAYSTYLES}
                colorDictionary={PLAYSTYLE_STYLES}
                onChange={field.onChange}
                placeholder="+ СТИЛЬ"
              />
            )}
          />
        </div>

        <div className="border-t-2 border-border-muted pt-6 flex-1 flex flex-col">
          <span className="mb-3 block font-mono text-xs uppercase text-text-muted">
            Про себе:
          </span>
          <TextareaAutosize
            {...register("bio")}
            minRows={5}
            placeholder="Розкажіть про себе"
            className="w-full font-mono max-w-full resize-none bg-transparent border border-border-strong hover:border-text-muted focus:border-primary focus:outline-none p-3 text-sm leading-relaxed text-text-primary prose prose-invert transition-colors"
          />
          {errors.bio && (
            <span className="text-danger text-xs mt-1 block">
              {errors.bio.message}
            </span>
          )}
        </div>
      </section>

      {/* RIGHT SECTION */}
      <section className="flex flex-col gap-6 md:border-l-2 md:border-border-muted md:pl-8">
        <div className="relative aspect-square w-full border-2 border-border-strong bg-background-contrast flex items-center justify-center overflow-hidden group cursor-pointer transition-colors hover:border-primary">
          {imageToCrop ? (
            // Cropper
            <Cropper
              image={imageToCrop}
              crop={crop}
              zoom={zoom}
              zoomSpeed={0.2}
              aspect={1}
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: {
                  background: "var(--color-background-contrast)",
                },
              }}
            />
          ) : (
            <>
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 z-10 cursor-pointer"
                title="Змінити аватар"
              >
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/jpeg, image/png, image/webp"
                  className="hidden"
                  onChange={handleAvatarSelect}
                  disabled={isSaving}
                />
              </label>

              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="Аватар"
                  className="h-full w-full object-cover transition-all contrast-125 opacity-70 group-hover:opacity-100"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 opacity-40 grayscale filter transition-opacity group-hover:opacity-80">
                  <FantasyIcon name="behold" className="h-12 w-12" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    Натисніть для
                    <br />
                    завантаження
                  </p>
                </div>
              )}
            </>
          )}

          {isSaving && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/50 pointer-events-none">
              <Loader variant="d20" size="md" text="Збереження..." />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 font-mono text-xs">
          <div>
            <span className="mb-1 block text-text-muted uppercase">Пошта:</span>
            <span className="text-text-primary break-all flex items-center">
              {user.email}
            </span>
          </div>

          <div>
            <label
              htmlFor="timezone"
              className="mb-1 block text-text-muted uppercase cursor-pointer"
            >
              Часовий пояс:
            </label>
            <Select
              id="timezone"
              size="sm"
              variant="ghost"
              {...register("timezone")}
              className="border border-border-strong hover:border-text-muted focus-visible:border-primary font-mono text-xs "
            >
              <option value="" className="bg-surface text-text-primary">
                -- Не вказано --
              </option>
              {TIMEZONES.map((timezone) => (
                <option
                  key={timezone}
                  value={timezone}
                  className="bg-surface text-text-primary"
                >
                  {timezone}
                </option>
              ))}
            </Select>
            {errors.timezone && (
              <span className="text-danger text-[10px] mt-1 block absolute">
                {errors.timezone.message}
              </span>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant={`${isDirty || imageToCrop ? "primary" : "default"}`}
          className="w-full"
          disabled={isSaving || (!isDirty && !imageToCrop)}
        >
          {isSaving
            ? "Збереження..."
            : isDirty || imageToCrop
              ? "Зберегти зміни"
              : "Збережено"}
        </Button>
      </section>
    </form>
  );
}
export default UpdateProfileForm;
