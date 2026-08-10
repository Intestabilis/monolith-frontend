import type {
  CreateUserDTO,
  LoginUserDTO,
  ResetPasswordPayload,
  UserStatusDTO,
} from "../schemas/user.schema";
import type { AuthResponse } from "../types/AuthResponse";
import { tokenService } from "../utils/tokenService";
import { apiClient } from "./apiClient";

type CreateUserDTORequest = Omit<CreateUserDTO, "confirmPassword">;

export async function register(
  credentials: CreateUserDTORequest,
): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    "/auth/register",
    credentials,
  );
  tokenService.set(data.accessToken);
  return data;
}

export async function login(credentials: LoginUserDTO): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    "/auth/login",
    credentials,
  );
  tokenService.set(data.accessToken);
  return data;
}

export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
  tokenService.clear();
}

export async function getAuthStatus(): Promise<UserStatusDTO | null> {
  if (!tokenService.get()) return null;
  const { data } = await apiClient.get("/auth/status");
  return data;
}

export async function activateAccount(activationLink: string) {
  const { data } = await apiClient.post(`/auth/activate/${activationLink}`);
  tokenService.set(data.accessToken);
  return data;
}

export async function resendActivation() {
  const { data } = await apiClient.post("/auth/resend-activation");
  return data;
}

// REVIEW think about better naming there and in hook/hook usage
export async function forgotPassword(email: string) {
  const { data } = await apiClient.post("/auth/forgot-password", { email });
  return data;
}

export async function resetPassword(payload: ResetPasswordPayload) {
  const { data } = await apiClient.post("/auth/reset-password", payload);
  return data;
}
