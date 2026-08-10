import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../../../api/apiAuth";

export function useForgotPassword() {
  const {
    mutate: forgotPassword,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: forgotPasswordApi,
    meta: { errorMessage: "Помилка при відправці запиту" },
  });
  return { forgotPassword, isPending, isSuccess };
}
