import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { CreateQuestDTO } from "../../../schemas/quest.schema";
import { questKeys } from "./questKeys";
import { createQuest as createQuestApi } from "../../../api/apiQuests";

export function useCreateQuest(campaignId: string) {
  const queryClient = useQueryClient();

  const { mutate: createQuest, isPending } = useMutation({
    mutationFn: (data: CreateQuestDTO) => createQuestApi(campaignId, data),
    meta: { errorMessage: "Не вдалося створити квест" },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questKeys.tree(campaignId) });
    },
  });

  return { createQuest, isPending };
}
