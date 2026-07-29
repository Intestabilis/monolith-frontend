import { useMutation } from "@tanstack/react-query";
import { updateWidgetsLayout as updateWidgetsLayoutApi } from "../../../api/apiWidgets";
import type { UpdateWidgetsLayoutDTO } from "../../../schemas/widget.schema";

export function useUpdateWidgetsLayout(campaignId: string) {
  const {
    mutate: updateWidgetsLayout,
    isPending,
    error,
  } = useMutation({
    mutationFn: (widgetsData: UpdateWidgetsLayoutDTO) =>
      updateWidgetsLayoutApi(campaignId, widgetsData),
    // REVIEW check if there any other toast then error, if only error then we can enable it (if there's some update toasts it will spam on every layout update)
    meta: { hideToast: true },
  });

  return { updateWidgetsLayout, isPending, error };
}
