import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login as loginApi } from "../../../api/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      // CHANGE to proper dto type
      queryClient.setQueryData(["auth-status"], {
        id: data.user.id,
        isActivated: data.user.isActivated,
      });
      // REVIEW&CHANGE go to /home for users or smth like that
      navigate("/");
    },
  });

  return { login, isPending, isError, error };
}
