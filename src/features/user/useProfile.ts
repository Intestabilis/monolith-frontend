import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/apiClient";

export function useProfile(userId: string | undefined) {
  const { data: user, isPending } = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const { data } = await apiClient.get("/users/me");
      return data;
    },
    // check for user existance before doing request
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
  return { user, isPending };
}
