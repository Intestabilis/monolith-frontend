import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../../api/apiAuth";

export function useResetPassword() {
  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: resetPasswordApi,
    meta: {
      errorMessage: "Помилка скидання пароля",
    },
  });

  return { resetPassword, isPending, isSuccess };
}
