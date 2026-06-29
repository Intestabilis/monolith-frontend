import type { UserInfoDTO } from "../schemas/user.schema";
import { tokenService } from "../utils/TokenService";
import { apiClient } from "./apiClient";

export async function fetchProfile(): Promise<UserInfoDTO | null> {
  const token = tokenService.get();
  if (!token) return null;
  const { data } = await apiClient.get("/users/me");
  return data;
}
