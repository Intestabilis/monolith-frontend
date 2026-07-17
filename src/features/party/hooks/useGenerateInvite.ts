import { useMutation } from "@tanstack/react-query";
import { generateInviteUrl } from "../../../api/apiParty";

export function useGenerateInvite(campaignId: string) {
  const { mutate: generateInvite, isPending } = useMutation({
    // REVIEW maybe implementing duration type on front-end too... ngl I'm so tired of this number of interfaces/types/etc
    mutationFn: (duration: "7d" | "30d") =>
      generateInviteUrl(campaignId, duration),
    meta: {
      errorMessage: "Помилка при створенні запрошення",
    },
  });

  return { generateInvite, isPending };
}
