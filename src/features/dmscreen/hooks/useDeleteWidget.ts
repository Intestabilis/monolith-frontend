import { useMutation } from "@tanstack/react-query";
import { deleteWidget as deleteWidgetApi } from "../../../api/apiWidgets";

export function useDeleteWidget(campaignId: string) {
  const {
    mutate: deleteWidget,
    isPending,
    error,
  } = useMutation({
    mutationFn: (widgetId: string) => deleteWidgetApi(campaignId, widgetId),
    meta: { errorMessage: "Не вдалося видалити інструмент" },
  });

  return { deleteWidget, isPending, error };
}
