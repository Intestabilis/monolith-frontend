import { useOutletContext } from "react-router";
import type { CampaignContextResponse } from "../../../schemas/campaign.schema";

export function useCampaignContext() {
  const context = useOutletContext<CampaignContextResponse>();
  if (!context) {
    throw new Error("useCampaignContext must be used within CampaignLayout");
  }
  return context;
}
