import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createCampaign as createCampaignApi } from "../../../api/apiCampaigns";
import type { CreateCampaignDTO } from "../../../schemas/campaign.schema";

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  const { mutate: createCampaign, isPending } = useMutation({
    mutationFn: (data: CreateCampaignDTO) => createCampaignApi(data),
    meta: { errorMessage: "Помилка при створенні кампанії" },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns", "list"] });
    },
  });
  return { createCampaign, isPending };
}
