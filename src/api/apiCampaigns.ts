import type {
  CampaignListResponse,
  CampaignContextResponse,
  CampaignContentResponse,
  CreateCampaignDTO,
  UpdateCampaignDTO,
} from "../schemas/campaign.schema";
import { apiClient } from "./apiClient";

export type CampaignListType = "all" | "master" | "player";

// Fetch campaign(s)

export async function fetchCampaignsList(
  type: CampaignListType = "all",
): Promise<CampaignListResponse> {
  const endpoint =
    type === "all"
      ? "/campaigns/my-campaigns"
      : `/campaigns/my-campaigns/${type}`;
  const { data } = await apiClient.get<CampaignListResponse>(endpoint);
  return data;
}

export async function fetchCampaignContext(
  id: string,
): Promise<CampaignContextResponse> {
  const { data } = await apiClient.get<CampaignContextResponse>(
    `/campaigns/${id}/context`,
  );
  return data;
}

export async function fetchCampaignContent(
  id: string,
): Promise<CampaignContentResponse> {
  const { data } = await apiClient.get<CampaignContentResponse>(
    `/campaigns/${id}/content`,
  );
  return data;
}

// Mutate campaign

export async function createCampaign(
  payload: CreateCampaignDTO,
): Promise<CampaignContextResponse> {
  const { data } = await apiClient.post<CampaignContextResponse>(
    "/campaigns",
    payload,
  );
  return data;
}

export async function updateCampaign(
  id: string,
  payload: UpdateCampaignDTO,
): Promise<CampaignContextResponse> {
  const { data } = await apiClient.patch<CampaignContextResponse>(
    `/campaigns/${id}`,
    payload,
  );
  return data;
}

export async function deleteCampaign(id: string): Promise<void> {
  await apiClient.delete(`/campaigns/${id}`);
}
