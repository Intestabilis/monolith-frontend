import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadCover as uploadCoverApi } from "../../../api/apiCampaigns";
import type { CampaignContextResponse } from "../../../schemas/campaign.schema";

export function useUploadCampaignCover(campaignId: string) {
  const queryClient = useQueryClient();
  const { mutateAsync: uploadCoverAsync, isPending: isUploading } = useMutation(
    {
      mutationFn: (file: File) => uploadCoverApi(campaignId, file),

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
      onError: (err) => {
        // CHANGE use toast or something (and check backend error for format/size error with according message)
        console.error("Не вдалося завантажити обкладинку: ", err);
      },
    },
  );
  return { uploadCoverAsync, isUploading };
}
