import { useQueryClient, useMutation } from "@tanstack/react-query";

import { register as registerApi } from "../../../api/apiAuth";
import { tokenService } from "../../../utils/tokenService";

export function useRegister() {
  const queryClient = useQueryClient();

  const {
    mutate: register,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      tokenService.set(data.accessToken);
      // CHANGE to proper dto type
      queryClient.setQueryData(["auth-status"], {
        id: data.user.id,
        isActivated: data.user.isActivated,
      });
    },
  });

  return { register, isPending, isError, error };
}
