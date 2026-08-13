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

export async function uploadAvatar(file: File): Promise<UserInfoDTO> {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await apiClient.post<UserInfoDTO>(
    "/upload/me/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
}
