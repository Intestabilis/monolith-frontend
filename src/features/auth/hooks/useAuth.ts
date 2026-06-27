import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/apiClient";

export function useAuth() {
  const { data: user, isPending } = useQuery({
    queryKey: ["auth-status"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const { data } = await apiClient.get("/auth/status");
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return { user, isPending };
}
