import type { UpdateProfileDTO, UserInfoDTO } from "../schemas/user.schema";
import { tokenService } from "../utils/tokenService";
import { apiClient } from "./apiClient";

export async function fetchProfile(): Promise<UserInfoDTO | null> {
  const token = tokenService.get();
  if (!token) return null;
  const { data } = await apiClient.get("/users/me");
  return data;
}

export async function updateProfile(
  payload: UpdateProfileDTO,
): Promise<UserInfoDTO> {
  const { data } = await apiClient.patch<UserInfoDTO>("/users/me/", payload);
  return data;
}
