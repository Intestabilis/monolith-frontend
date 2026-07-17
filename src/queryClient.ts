import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

const AXIOS_ERROR_STATUS = [401, 403, 404];

interface CustomMeta extends Record<string, unknown> {
  hideToast?: boolean;
  errorMessage?: string;
}

function handleGlobalError(err: unknown, meta?: CustomMeta) {
  if (meta?.hideToast) {
    return;
  }
  // to "logout" if refresh token won't work
  if (isAxiosError(err)) {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      queryClient.setQueryData(["auth-status"], null);
      queryClient.setQueryData(["user-profile"], null);

      // REVIEW maybe don't hardcode error message there
      toast.error("Час сесії вичерпано, будь ласка, увійдіть знову");
      // to not show error toast twice
      return;
    }

    // Ignore cancelled by user requests (I hope that code is right)
    if (err.code === "ERR_CANCELED") return;
  }

  // showing toast error
  const errorMessage = err instanceof Error ? err.message : String(err);
  const queryMessage = meta?.errorMessage;
  const finalMessage = queryMessage
    ? `${queryMessage}: ${errorMessage}`
    : errorMessage;
  toast.error(finalMessage);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (retryCount, err) => {
        if (
          isAxiosError(err) &&
          AXIOS_ERROR_STATUS.includes(err.response?.status || 0)
        ) {
          return false;
        }
        return retryCount < 3;
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => handleGlobalError(error, query.meta),
  }),
  mutationCache: new MutationCache({
    onError: (error, _vars, _result, mutation) =>
      handleGlobalError(error, mutation.meta),
  }),
});
