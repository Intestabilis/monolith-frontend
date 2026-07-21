import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { CreateCategoryDTO } from "../../../schemas/quest.schema";
import { questKeys } from "./questKeys";
import { createQuestCategory } from "../../../api/apiQuests";

export function useCreateQuestCategory(campaignId: string) {
  const queryClient = useQueryClient();

  const { mutate: createCategory, isPending } = useMutation({
    mutationFn: (data: CreateCategoryDTO) =>
      createQuestCategory(campaignId, data),
    meta: { errorMessage: "Не вдалося створити категорію" },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questKeys.tree(campaignId) });
    },
  });

  return { createCategory, isPending };
}
