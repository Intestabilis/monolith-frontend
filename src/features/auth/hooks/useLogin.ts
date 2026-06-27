import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { apiClient } from "../../../api/apiClient";
import type { AuthResponse } from "../../../types/AuthResponse";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async ({ email, password }: Record<string, string>) => {
      const { data } = await apiClient.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      return data;
    },
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

  return { login, isPending, isError };
}
