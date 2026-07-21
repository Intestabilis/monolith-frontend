import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateQuestCategory } from "../../../api/apiQuests";
import type { UpdateCategoryDTO } from "../../../schemas/quest.schema";
import { questKeys } from "./questKeys";

export function useUpdateQuestCategory(campaignId: string) {
  const queryClient = useQueryClient();

  const { mutate: updateCategory, isPending } = useMutation({
    mutationFn: ({
      categoryId,
      data,
    }: {
      categoryId: string;
      data: UpdateCategoryDTO;
    }) => updateQuestCategory(campaignId, categoryId, data),
    meta: { errorMessage: "Не вдалося оновити назву категорії" },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questKeys.tree(campaignId) });
    },
  });

  return { updateCategory, isPending };
}
