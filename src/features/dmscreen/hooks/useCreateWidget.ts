import { useMutation } from "@tanstack/react-query";
import { createWidget as createWidgetApi } from "../../../api/apiWidgets";
import type { CreateWidgetDTO } from "../../../schemas/widget.schema";

export function useCreateWidget(campaignId: string) {
  const {
    mutate: createWidget,
    isPending,
    error,
  } = useMutation({
    mutationFn: (newWidget: CreateWidgetDTO) =>
      createWidgetApi(campaignId, newWidget),
    meta: { errorMessage: "Не вдалося зберегти новий інструмент" },
  });

  return { createWidget, isPending, error };
}
