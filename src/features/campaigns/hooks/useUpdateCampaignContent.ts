import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateCampaignContent } from "../../../api/apiCampaigns";
import { type JSONContent } from "@tiptap/react";

export function useUpdateCampaignContent() {
  const queryClient = useQueryClient();

  const { mutate: updateContent, isPending } = useMutation({
    mutationFn: ({ id, content }: { id: string; content: JSONContent }) =>
      updateCampaignContent(id, content),
    meta: { errorMessage: "Помилка при оновленні кампанії" },
    onSuccess: (updatedData, variables) => {
      queryClient.setQueryData(
        ["campaign", variables.id, "content"],
        updatedData,
      );
      // don't see any reason to invalidate context for now
      // queryClient.invalidateQueries({
      //   queryKey: ["campaign", variables.id, "context"],
      // });
    },
  });

  return { updateContent, isPending };
}
