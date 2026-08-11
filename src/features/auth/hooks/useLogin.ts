import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../../api/apiAuth";
import { tokenService } from "../../../utils/tokenService";

export function useLogin() {
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: loginApi,
    meta: { hideToast: true },
    onSuccess: (data) => {
      tokenService.set(data.accessToken);

      // CHANGE to proper dto type
      queryClient.setQueryData(["auth-status"], {
        id: data.user.id,
        isActivated: data.user.isActivated,
      });
      queryClient.invalidateQueries({ queryKey: ["user-profile", "me"] });
    },
  });

  return { login, isPending, isError, error };
}
