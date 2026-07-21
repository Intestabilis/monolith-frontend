import { useQuery } from "@tanstack/react-query";
import { questKeys } from "./questKeys";
import { fetchQuestTree } from "../../../api/apiQuests";

export function useQuestTree(campaignId: string) {
  const {
    data: questTree,
    isPending,
    error,
  } = useQuery({
    queryKey: questKeys.tree(campaignId),
    queryFn: () => fetchQuestTree(campaignId),
    meta: { hideToast: true },
    enabled: !!campaignId,
  });

  return { questTree, isPending, error };
}
