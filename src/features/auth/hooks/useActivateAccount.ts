import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateAccount as activateAccountApi } from "../../../api/apiAuth";
import { tokenService } from "../../../utils/tokenService";
import { useNavigate } from "react-router";

export function useActivateAccount(userId: string | undefined) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: activateAccount,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: activateAccountApi,
    // updating cache and new token with updated isActivated field
    onSuccess: (data) => {
      if (data.accessToken) {
        tokenService.set(data.accessToken);
        queryClient.setQueryData(["auth-status"], (oldData) => {
          if (!oldData) return oldData;
          return { ...oldData, isActivated: true };
        });
        queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
      } else {
        tokenService.clear();
        queryClient.clear();
        navigate("/login");
      }
    },
    meta: { hideToast: true },
  });

  return { activateAccount, isPending, isSuccess, error };
}
