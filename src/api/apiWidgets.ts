import type {
  CreateWidgetDTO,
  UpdateWidgetContentDTO,
  UpdateWidgetsLayoutDTO,
  WidgetResponseDTO,
} from "../schemas/widget.schema";
import { apiClient } from "./apiClient";

// CRUD

export async function fetchWidgets(
  campaignId: string,
): Promise<WidgetResponseDTO[]> {
  const { data } = await apiClient.get(`/campaigns/${campaignId}/widgets`);
  return data;
}

export async function createWidget(
  campaignId: string,
  payload: CreateWidgetDTO,
): Promise<WidgetResponseDTO> {
  const { data } = await apiClient.post(
    `/campaigns/${campaignId}/widgets`,
    payload,
  );
  return data;
}

export async function deleteWidget(
  campaignId: string,
  widgetId: string,
): Promise<void> {
  await apiClient.delete(`/campaigns/${campaignId}/widgets/${widgetId}`);
}

export async function updateWidgetContent(
  campaignId: string,
  widgetId: string,
  payload: UpdateWidgetContentDTO,
): Promise<WidgetResponseDTO> {
  const { data } = await apiClient.patch(
    `/campaigns/${campaignId}/widgets/${widgetId}`,
    payload,
  );
  return data;
}

// Layout

export async function updateWidgetsLayout(
  campaignId: string,
  payload: UpdateWidgetsLayoutDTO,
) {
  const { data } = await apiClient.patch(
    `/campaigns/${campaignId}/widgets/layout`,
    payload,
  );
  return data;
}
