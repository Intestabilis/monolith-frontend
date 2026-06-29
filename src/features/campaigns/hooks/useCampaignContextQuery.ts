import { useQuery } from "@tanstack/react-query";
import { fetchCampaignContext } from "../../../api/apiCampaigns";

export function useCampaignContextQuery(campaignId: string | undefined) {
  const {
    data: campaignContext,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["campaign", campaignId, "context"],
    queryFn: () => fetchCampaignContext(campaignId!),
    enabled: !!campaignId,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return { campaignContext, isPending, isError, error };
}
