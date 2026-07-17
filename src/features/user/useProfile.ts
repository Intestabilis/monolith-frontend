import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../api/apiUsers";

export function useProfile(userId: string | undefined) {
  const { data: user, isPending } = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: fetchProfile,
    // REVIEW probably should hide in the future and just show some alert/error message in the place of usage (profile page for instance)
    meta: { errorMessage: "Помилка при отриманні даних користувача" },
    // check for user existance before doing request
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
  return { user, isPending };
}
