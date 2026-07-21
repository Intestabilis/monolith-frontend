import { useQuery } from "@tanstack/react-query";
import { questKeys } from "./questKeys";
import { fetchQuestById } from "../../../api/apiQuests";

export function useQuestDetails(
  campaignId: string,
  questId: string | undefined,
) {
  const {
    data: questDetails,
    isPending,
    error,
  } = useQuery({
    queryKey: questKeys.quest(campaignId, questId!),
    queryFn: () => fetchQuestById(campaignId, questId!),
    meta: { hideToast: true },
    enabled: !!campaignId && !!questId,
  });

  return { questDetails, isPending, error };
}
