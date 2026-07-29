import { useQuery } from "@tanstack/react-query";
import { fetchWidgets } from "../../../api/apiWidgets";

export function useWidgets(campaignId: string | undefined) {
  const {
    data: widgets,
    isPending,
    error,
  } = useQuery({
    queryKey: ["campaign", campaignId, "widgets"],
    queryFn: () => fetchWidgets(campaignId!),
    meta: { errorMessage: "Неможливо завантажити ширму" },
    enabled: !!campaignId,
    retry: 1,
    // Widgets shouldn't refresh automatically since keep local UI is kinda important for that dashboard
    staleTime: Infinity,
  });

  return { widgets, isPending, error };
}
