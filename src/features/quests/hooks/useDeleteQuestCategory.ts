import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteQuestCategory } from "../../../api/apiQuests";
import { questKeys } from "./questKeys";

export function useDeleteQuestCategory(campaignId: string) {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isPending } = useMutation({
    mutationFn: (categoryId: string) =>
      deleteQuestCategory(campaignId, categoryId),
    meta: { errorMessage: "Не вдалося видалити категорію" },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questKeys.tree(campaignId) });
    },
  });

  return { deleteCategory, isPending };
}
