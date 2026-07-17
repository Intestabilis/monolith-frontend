import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCampaign as deleteCampaignApi } from "../../../api/apiCampaigns";

export function useDeleteCampaign() {
  const queryClient = useQueryClient();

  const { mutate: deleteCampaign, isPending } = useMutation({
    mutationFn: (id: string) => deleteCampaignApi(id),
    meta: { errorMessage: "Помилка при видаленні кампанії" },
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ["campaign", deletedId] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", "list"] });
    },
  });
  return { deleteCampaign, isPending };
}
