import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateCampaign as updateCampaignApi } from "../../../api/apiCampaigns";
import type { UpdateCampaignDTO } from "../../../schemas/campaign.schema";

export function useUpdateCampaign() {
  const queryClient = useQueryClient();

  const { mutate: updateCampaign, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCampaignDTO }) =>
      updateCampaignApi(id, data),
    onSuccess: (updatedCampaign, variables) => {
      queryClient.setQueryData(
        ["campaign", variables.id, "context"],
        updatedCampaign,
      );
      queryClient.invalidateQueries({ queryKey: ["campaigns", "list"] });
    },
  });
  return { updateCampaign, isPending };
}
