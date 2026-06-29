import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout as logoutApi } from "../../../api/apiAuth";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      localStorage.removeItem("token");
      // queryClient.clear();
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] !== "auth-status",
      });
      queryClient.setQueryData(["auth-status"], null);
      navigate("/");
    },
  });
  return { logout, isPending };
}
