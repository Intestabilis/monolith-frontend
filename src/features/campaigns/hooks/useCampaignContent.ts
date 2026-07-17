import { useQuery } from "@tanstack/react-query";
import { fetchCampaignContent } from "../../../api/apiCampaigns";

export function useCampaignContent(campaignId: string | undefined) {
  const {
    data: campaignContent,
    isPending,
    error,
  } = useQuery({
    queryKey: ["campaign", campaignId, "content"],
    queryFn: () => fetchCampaignContent(campaignId!),
    meta: { hideToast: true },
    enabled: !!campaignId,
    staleTime: 5 * 60 * 1000,
  });
  return { campaignContent, isPending, error };
}
