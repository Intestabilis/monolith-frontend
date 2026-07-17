import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "../../../api/apiAuth";

export function useAuth() {
  const { data: user, isPending } = useQuery({
    queryKey: ["auth-status"],
    meta: { errorMessage: "Помилка при отриманні даних аутентифікації" },
    queryFn: getAuthStatus,
    staleTime: 5 * 60 * 1000,
  });

  return { user, isPending };
}
