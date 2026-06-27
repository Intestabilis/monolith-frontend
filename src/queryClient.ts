import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { isAxiosError } from "axios";

const AXIOS_ERROR_STATUS = [401, 403, 404];

// to "logout" if refresh token won't work
function handleAuthError(err: unknown) {
  if (isAxiosError(err) && err.response?.status === 401) {
    localStorage.removeItem("token");
    queryClient.setQueryData(["auth-status"], null);
    queryClient.setQueryData(["user-profile"], null);
  }
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
  queryCache: new QueryCache({ onError: handleAuthError }),
  mutationCache: new MutationCache({ onError: handleAuthError }),
});
