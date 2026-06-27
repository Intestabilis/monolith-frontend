import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { apiClient } from "../../../api/apiClient";
import type { AuthResponse } from "../../../types/AuthResponse";

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: register,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async ({
      email,
      username,
      password,
    }: Record<string, string>) => {
      const { data } = await apiClient.post<AuthResponse>("/auth/register", {
        email,
        username,
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
      navigate("/");
    },
  });

  return { register, isPending, isError };
}
