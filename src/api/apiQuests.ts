import { apiClient } from "./apiClient";
import type {
  QuestSidebarResponseDTO,
  CreateQuestDTO,
  UpdateQuestDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
  ReorderItemsDTO,
  QuestResponseDTO,
} from "../schemas/quest.schema";

// get methods

export async function fetchQuestTree(
  campaignId: string,
): Promise<QuestSidebarResponseDTO> {
  const { data } = await apiClient.get<QuestSidebarResponseDTO>(
    `/campaigns/${campaignId}/quests/quest-tree`,
  );
  return data;
}

export async function fetchQuestById(
  campaignId: string,
  questId: string,
): Promise<QuestResponseDTO> {
  const { data } = await apiClient.get(
    `/campaigns/${campaignId}/quests/${questId}`,
  );
  return data;
}

// quests

export async function createQuest(campaignId: string, payload: CreateQuestDTO) {
  const { data } = await apiClient.post(
    `/campaigns/${campaignId}/quests`,
    payload,
  );
  return data;
}

export async function updateQuest(
  campaignId: string,
  questId: string,
  payload: UpdateQuestDTO,
) {
  const { data } = await apiClient.patch(
    `/campaigns/${campaignId}/quests/${questId}`,
    payload,
  );
  return data;
}

export async function deleteQuest(
  campaignId: string,
  questId: string,
): Promise<void> {
  await apiClient.delete(`/campaigns/${campaignId}/quests/${questId}`);
}

// categories

export async function createQuestCategory(
  campaignId: string,
  payload: CreateCategoryDTO,
) {
  const { data } = await apiClient.post(
    `/campaigns/${campaignId}/quests/categories`,
    payload,
  );
  return data;
}

export async function updateQuestCategory(
  campaignId: string,
  categoryId: string,
  payload: UpdateCategoryDTO,
) {
  const { data } = await apiClient.patch(
    `/campaigns/${campaignId}/quests/categories/${categoryId}`,
    payload,
  );
  return data;
}

export async function deleteQuestCategory(
  campaignId: string,
  categoryId: string,
): Promise<void> {
  await apiClient.delete(
    `/campaigns/${campaignId}/quests/categories/${categoryId}`,
  );
}

// reorder

export async function reorderQuests(
  campaignId: string,
  payload: ReorderItemsDTO,
) {
  const { data } = await apiClient.patch(
    `/campaigns/${campaignId}/quests/reorder/items`,
    payload,
  );
  return data;
}
