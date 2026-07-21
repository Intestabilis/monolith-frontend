import { useQueryClient, useMutation } from "@tanstack/react-query";
import { questKeys } from "./questKeys";
import { deleteQuest as deleteQuestApi } from "../../../api/apiQuests";

export function useDeleteQuest(campaignId: string) {
  const queryClient = useQueryClient();

  const { mutate: deleteQuest, isPending } = useMutation({
    mutationFn: (questId: string) => deleteQuestApi(campaignId, questId),
    meta: { errorMessage: "Не вдалося видалити квест" },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questKeys.tree(campaignId) });
    },
  });

  return { deleteQuest, isPending };
}
