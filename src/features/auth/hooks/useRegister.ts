import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { register as registerApi } from "../../../api/apiAuth";

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: register,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      // CHANGE to proper dto type
      queryClient.setQueryData(["auth-status"], {
        id: data.user.id,
        isActivated: data.user.isActivated,
      });
      navigate("/");
    },
  });

  return { register, isPending, isError, error };
}
