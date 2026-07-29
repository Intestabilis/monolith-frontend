import { useCallback, useState } from "react";
import { useUpdateWidgetContent } from "./useUpdateWidgetContent";
import { useDebouncedCallback } from "../../../hooks/useDebouncedCallback";
import type { WidgetContentDTO } from "../../../schemas/widget.schema";

export function useWidgetContent<TContent extends WidgetContentDTO>(
  campaignId: string,
  widgetId: string,
  delay: number = 1000,
) {
  const { updateWidgetContent, isPending, error } = useUpdateWidgetContent(
    campaignId,
    widgetId,
  );
  const [isWaitingForDebounce, setIsWaitingForDebounce] = useState(false);

  const debouncedSave = useDebouncedCallback((content: TContent) => {
    setIsWaitingForDebounce(false);
    updateWidgetContent(content);
  }, delay);

  const updateContent = useCallback(
    (newContent: TContent) => {
      setIsWaitingForDebounce(true);
      debouncedSave(newContent);
    },
    [debouncedSave],
  );

  return {
    updateContent,
    isUpdating: isWaitingForDebounce || isPending,
    error,
  };
}
