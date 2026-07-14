import { useQuery } from "@tanstack/react-query";
import {
  fetchCampaignsList,
  type CampaignListType,
} from "../../../api/apiCampaigns";

export function useCampaignsList(type: CampaignListType = "all") {
  const {
    data: campaigns,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["campaigns", "list", type],
    queryFn: () => fetchCampaignsList(type),
    staleTime: 5 * 60 * 1000,
  });

  return { campaigns, isPending, error, refetch };
}
