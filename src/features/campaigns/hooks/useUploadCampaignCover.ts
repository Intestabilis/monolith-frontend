import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadCover as uploadCoverApi } from "../../../api/apiCampaigns";
import type { CampaignContextResponse } from "../../../schemas/campaign.schema";

export function useUploadCampaignCover(campaignId: string) {
  const queryClient = useQueryClient();
  const { mutateAsync: uploadCoverAsync, isPending: isUploading } = useMutation(
    {
      mutationFn: (file: File) => uploadCoverApi(campaignId, file),
      meta: {
        errorMessage: "Не вдалося завантажити обкладинку",
      },
      onSuccess: (newImageUrl: string) => {
        queryClient.setQueryData<CampaignContextResponse>(
          ["campaign", campaignId, "context"],
          (oldData) => {
            // REVIEW
            if (!oldData) return oldData;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                imageUrl: newImageUrl,
              },
            };
          },
        );
      },
    },
  );
  return { uploadCoverAsync, isUploading };
}
