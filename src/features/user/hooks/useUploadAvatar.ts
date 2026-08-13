import { useQueryClient, useMutation } from "@tanstack/react-query";
import { uploadAvatar as uploadAvatarApi } from "../../../api/apiUsers";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  const { mutate: uploadAvatar, isPending } = useMutation({
    mutationFn: (file: File) => uploadAvatarApi(file),
    meta: { errorMessage: "Помилка при встановленні зображення профіля" },
    onSuccess: (updatedProfile) => {
      console.log(updatedProfile);
      queryClient.setQueryData(["user-profile", "me"], updatedProfile);
    },
  });

  return { uploadAvatar, isPending };
}
