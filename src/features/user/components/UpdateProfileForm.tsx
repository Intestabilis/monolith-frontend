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

interface UpdateProfileFormProps {
  user: UserInfoDTO;
  onCancel: () => void;
}

function UpdateProfileForm({ user, onCancel }: UpdateProfileFormProps) {
  const { updateProfile, isPending } = useUpdateProfile();

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

  const onSubmit = async (data: UpdateProfileDTO) => {
    updateProfile(data, {
      onSuccess: onCancel,
    });
    console.log("Збереження:", data);
  };

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
        <div className="aspect-square w-full border-2 border-border-strong bg-background-muted flex items-center justify-center overflow-hidden">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Аватар"
              className="h-full w-full object-cover grayscale contrast-125 opacity-50"
            />
          ) : (
            <div className="text-center opacity-40 grayscale filter">
              <span className="mb-2 block text-4xl">👤</span>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Зображення відсутнє
              </p>
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
          variant={`${isDirty ? "primary" : "default"}`}
          className="w-full"
          disabled={isPending || !isDirty}
        >
          {isPending
            ? "Збереження..."
            : isDirty
              ? "Зберегти зміни"
              : "Збережено"}
        </Button>
      </section>
    </form>
  );
}
export default UpdateProfileForm;
