import { useMutation } from "@tanstack/react-query";
import { resendActivation as resendActivationApi } from "../../../api/apiAuth";

export function useResendActivation() {
  const {
    mutate: resendActivation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: resendActivationApi,
    meta: { errorMessage: "Не вдалося надіслати лист" },
  });

  return { resendActivation, isPending, isSuccess };
}
