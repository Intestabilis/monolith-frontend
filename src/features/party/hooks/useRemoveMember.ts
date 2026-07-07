import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeMember as removememberApi } from "../../../api/apiParty";

export function useRemoveMember(campaignId: string) {
  const queryClient = useQueryClient();

  const { mutate: removeMember, isPending } = useMutation({
    mutationFn: (userId: string) => removememberApi(campaignId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["campaign", campaignId, "context"],
      });
    },
    onError: (error) => {
      // CHANGE add toast as usual
      console.error("Error while kicking player: ", error);
    },
  });

  return { removeMember, isPending };
}
