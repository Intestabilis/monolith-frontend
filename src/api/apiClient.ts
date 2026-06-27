import axios, { isAxiosError } from "axios";

const API_URL = "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// auth interceptor request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// auth interceptor response (with refreshing token logic)

let isRefreshing = false;
const failedQueue: {
  resolve: (value: string | null) => void;
  reject: (err: Error | null) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.splice(0).forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      isAxiosError(error) &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });

        const newAccessToken = data.accessToken;
        localStorage.setItem("token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        if (refreshError instanceof Error) {
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        }
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
