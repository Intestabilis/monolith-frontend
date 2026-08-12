import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateProfile as updateProfileApi } from "../../../api/apiUsers";
import type { UpdateProfileDTO } from "../../../schemas/user.schema";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (data: UpdateProfileDTO) => updateProfileApi(data),
    meta: { errorMessage: "Помилка при оновленні профіля" },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["user-profile", "me"], updatedProfile);
    },
  });

  return { updateProfile, isPending };
}
