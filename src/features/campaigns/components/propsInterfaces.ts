import type {
  CampaignListResponse,
  CampaignPreview,
} from "../../../schemas/campaign.schema";

export interface CampaignLayoutProps {
  campaigns: CampaignListResponse;
  onCreateClick?: () => void;
}

export interface CampaignCardProps {
  campaign: {
    data: CampaignPreview;
    meta: { userRole: "master" | "player" };
  };
  showRole?: boolean;
}
