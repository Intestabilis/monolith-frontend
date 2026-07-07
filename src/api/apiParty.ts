import { apiClient } from "./apiClient";

export interface GenerateInviteResponse {
  inviteUrl: string;
  token: string;
}

export interface JoinCampaignResponse {
  message: string;
  campaignId: string;
}

export async function generateInviteUrl(
  campaignId: string,
  duration: "7d" | "30d" = "7d",
) {
  const { data } = await apiClient.post<GenerateInviteResponse>(
    `/campaigns/${campaignId}/party/invites`,
    { duration },
  );
  return data;
}

export async function joinCampaign(token: string) {
  const { data } = await apiClient.post<JoinCampaignResponse>(
    `/campaigns/join/${token}`,
  );
  return data;
}

export async function removeMember(campaignId: string, userId: string) {
  await apiClient.delete(`/campaigns/${campaignId}/party/${userId}`);
}
