import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { UpdateQuestDTO } from "../../../schemas/quest.schema";
import { questKeys } from "./questKeys";
import { updateQuest as updateQuestApi } from "../../../api/apiQuests";

export function useUpdateQuest(campaignId: string) {
  const queryClient = useQueryClient();

  const { mutate: updateQuest, isPending } = useMutation({
    mutationFn: ({
      questId,
      data,
    }: {
      questId: string;
      data: UpdateQuestDTO;
    }) => updateQuestApi(campaignId, questId, data),
    meta: { errorMessage: "Не вдалося оновити квест" },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: questKeys.tree(campaignId) });
      queryClient.invalidateQueries({
        queryKey: questKeys.quest(campaignId, variables.questId),
      });
    },
  });

  return { updateQuest, isPending };
}
