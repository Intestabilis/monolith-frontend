import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../api/apiUsers";

export function useProfile(userId: string | undefined) {
  const { data: user, isPending } = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: fetchProfile,
    // check for user existance before doing request
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
  return { user, isPending };
}
