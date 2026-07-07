import type {
  CreateUserDTO,
  LoginUserDTO,
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
