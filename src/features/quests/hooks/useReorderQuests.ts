import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { ReorderItemsDTO } from "../../../schemas/quest.schema";
import { questKeys } from "./questKeys";
import { reorderQuests as reorderQuestsApi } from "../../../api/apiQuests";

export function useReorderQuests(campaignId: string) {
  const queryClient = useQueryClient();

  const { mutate: reorderQuests, isPending } = useMutation({
    mutationFn: (data: ReorderItemsDTO) => reorderQuestsApi(campaignId, data),
    meta: { errorMessage: "Не вдалося зберегти новий порядок квестів" },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questKeys.tree(campaignId) });
    },
  });

  return { reorderQuests, isPending };
}
