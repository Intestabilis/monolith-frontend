import { useMutation } from "@tanstack/react-query";
import { updateWidgetContent as updateWidgetContentApi } from "../../../api/apiWidgets";
import type { UpdateWidgetContentDTO } from "../../../schemas/widget.schema";

export function useUpdateWidgetContent(campaignId: string, widgetId: string) {
  const {
    mutate: updateWidgetContent,
    isPending,
    error,
  } = useMutation({
    // mutationKey: ["widget", widgetId, "content"],
    mutationFn: (content: UpdateWidgetContentDTO["content"]) =>
      updateWidgetContentApi(campaignId, widgetId, { content }),
    // REVIEW similar to updating layout
    meta: { hideToast: true },
  });

  return {
    updateWidgetContent,
    isPending,
    error,
  };
}
