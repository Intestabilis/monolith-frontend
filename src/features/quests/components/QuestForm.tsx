import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Button from "../../../components/ui/Button";

import {
  type UpdateQuestDTO,
  type CreateQuestDTO,
  type QuestResponseDTO,
  createQuestSchema,
} from "../../../schemas/quest.schema";

import BaseEditor from "../../../components/editor/BaseEditor";
import { questEditorConfig } from "../../../lib/tiptap/editorConfigs";
import { useUpdateQuest } from "../hooks/useUpdateQuest";
import { useCreateQuest } from "../hooks/useCreateQuest";

interface QuestFormProps {
  campaignId: string;
  quest?: Partial<QuestResponseDTO>;
  isCreateMode?: boolean;
  // quest object in create mode, nothing in edit mode
  onSuccess: (quest?: QuestResponseDTO) => void;
  onCancel: () => void;
}

export function QuestForm({
  campaignId,
  quest,
  isCreateMode = false,
  onSuccess,
  onCancel,
}: QuestFormProps) {
  const { updateQuest, isPending: isUpdating } = useUpdateQuest(campaignId);
  const { createQuest, isPending: isCreating } = useCreateQuest(campaignId);

  const isPending = isUpdating || isCreating;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<CreateQuestDTO>({
    resolver: zodResolver(createQuestSchema),
    defaultValues: {
      title: quest?.title || "",
      status: (quest?.status as CreateQuestDTO["status"]) || "active",
      source: quest?.source || "",
      content: quest?.content ? quest.content : null,
      categoryId: quest?.categoryId || undefined,
    },
  });

  function onSubmit(data: CreateQuestDTO) {
    if (isCreateMode) {
      createQuest(data, {
        onSuccess: (newQuest) => onSuccess(newQuest),
      });
    } else {
      if (!quest?.id) return;
      updateQuest(
        { questId: quest.id, data: data as UpdateQuestDTO },
        { onSuccess: () => onSuccess() },
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full h-full flex-1 min-w-0 overflow-hidden"
    >
      <div className="flex justify-end mb-4 shrink-0 gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          disabled={isPending}
        >
          Скасувати
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={isPending || (!isDirty && !isCreateMode)}
          variant={isDirty || isCreateMode ? "primary" : "default"}
        >
          {isPending ? "..." : isCreateMode ? "Створити квест" : "Зберегти"}
        </Button>
      </div>

      <article className="space-y-6 flex-1 flex flex-col w-full min-w-0 overflow-hidden">
        <header className="border-b-2 border-border pb-4 w-full min-w-0 shrink-0">
          <div className="flex justify-between items-start mb-2 gap-4 w-full min-w-0">
            <input
              id="title"
              {...register("title")}
              className={`font-title text-3xl md:text-4xl font-bold bg-transparent border-transparent shadow-none m-0 p-0 w-full min-w-0 hover:bg-surface-hover focus:bg-surface transition-colors rounded-none placeholder:text-text-muted/50 focus:ring-0 outline-none ${
                errors.title ? "text-danger" : "text-text-selected"
              }`}
              placeholder="Назва квесту"
            />
          </div>

          {errors.title && (
            <div className="text-danger font-mono text-xs tracking-widest uppercase mb-2">
              {errors.title.message}
            </div>
          )}

          <div className="flex w-full justify-between items-center mt-2 min-w-0 gap-4">
            <div className="text-text-muted italic font-serif text-sm flex items-center flex-1 min-w-0">
              <span className="mr-1 shrink-0">Джерело:</span>
              <input
                id="source"
                {...register("source")}
                className="italic font-serif text-sm text-text-primary bg-transparent border-transparent shadow-none p-0 m-0 w-full min-w-0 hover:bg-surface-hover focus:bg-surface transition-colors rounded-none placeholder:text-text-muted/50 focus:ring-0 outline-none"
                placeholder="Введіть джерело"
              />
            </div>

            {/* REVIEW somehow provide a single source of truth for this select and QuestDetails status*/}
            <select
              id="status"
              {...register("status")}
              className="font-mono text-sm tracking-widest px-2 py-0 m-0 text-text-muted uppercase shrink-0 bg-transparent border-transparent shadow-none hover:bg-surface-hover focus:bg-surface transition-colors cursor-pointer appearance-none text-right rounded-none outline-none focus:ring-0"
            >
              <option value="active">Активний</option>
              <option value="in-progress">В процесі</option>
              <option value="completed">Виконаний</option>
              <option value="failed">Провалений</option>
            </select>
          </div>
        </header>

        <div className="flex-1 flex flex-col w-full min-w-0 overflow-y-auto break-all">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <div className="flex-1 flex flex-col w-full min-w-0 min-h-0 hover:bg-surface-hover/30 focus-within:bg-surface-hover/30 transition-colors rounded-none">
                <BaseEditor
                  extensions={questEditorConfig}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isPending}
                  className="w-full max-w-full flex-1 min-w-0 flex flex-col"
                  editorClassName="py-2 min-w-0 w-full !max-w-full break-words [overflow-wrap:anywhere] whitespace-pre-wrap flex-1 min-h-[300px] h-full outline-none"
                />
              </div>
            )}
          />
        </div>
      </article>
    </form>
  );
}

export default QuestForm;
