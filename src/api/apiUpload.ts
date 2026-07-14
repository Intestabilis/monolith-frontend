import { apiClient } from "./apiClient";

export async function uploadEditorImage(
  file: File,
  campaignId: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const { data: imageUrl } = await apiClient.post<string>(
    `/upload/${campaignId}/editor/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  console.log(imageUrl);
  return imageUrl;
}
