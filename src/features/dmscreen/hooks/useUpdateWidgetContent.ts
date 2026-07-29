import { useMutation } from "@tanstack/react-query";
import { updateWidgetContent as updateWidgetContentApi } from "../../../api/apiWidgets";
import { useDebouncedCallback } from "../../../hooks/useDebouncedCallback";
import type { UpdateWidgetContentDTO } from "../../../schemas/widget.schema";

export function useUpdateWidgetContent(campaignId: string) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      widgetId,
      content,
    }: {
      widgetId: string;
      content: UpdateWidgetContentDTO["content"];
    }) => updateWidgetContentApi(campaignId, widgetId, { content }),
    // REVIEW similar to updating layout
    meta: { hideToast: true },
  });

  // REVIEW I guess debounce make sense for constatly updating object and requests from it
  const updateWidgetContent = useDebouncedCallback(
    ({
      widgetId,
      content,
    }: {
      widgetId: string;
      content: UpdateWidgetContentDTO["content"];
    }) => {
      mutate({ widgetId, content });
    },
    1500,
  );

  return {
    updateWidgetContent,
    isPending,
    error,
  };
}
