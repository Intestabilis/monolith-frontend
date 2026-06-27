import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { apiClient } from "../../../api/apiClient";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: logout,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => {
      await apiClient.post("/auth/logout");
    },
    onSettled: () => {
      localStorage.removeItem("token");
      queryClient.clear();
      queryClient.setQueryData(["auth-status"], null);
      navigate("/login");
    },
  });
  return { logout, isPending, isError };
}
