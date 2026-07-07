import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { joinCampaign as joinCampaignApi } from "../../../api/apiParty";

export function useJoinCampaign() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: joinCampaign,
    isPending,
    error,
  } = useMutation({
    mutationFn: (token: string) => joinCampaignApi(token),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["campaigns", "list", "player"],
      });
      queryClient.invalidateQueries({ queryKey: ["campaigns", "list", "all"] });

      navigate(`/campaigns/${data.campaignId}`, { replace: true });
    },
  });

  return { joinCampaign, isPending, error };
}
