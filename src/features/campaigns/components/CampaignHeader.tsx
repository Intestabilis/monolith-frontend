import type { CampaignPreview } from "../../../schemas/campaign.schema";
import CampaignCover from "./CampaignCover";
import CampaignDeleteButton from "./CampaignDeleteButton";
import CampaignTitleEdit from "./CampaignTitleEdit";

interface CampaignHeaderProps {
  campaign: CampaignPreview;
  isMaster: boolean;
}

function CampaignHeader({ campaign, isMaster }: CampaignHeaderProps) {
  return (
    <div className="w-full border-2 border-border-strong bg-surface mb-8 relative group/hero">
      {isMaster && (
        <CampaignDeleteButton
          campaignId={campaign.id}
          campaignTitle={campaign.title}
        />
      )}
      <CampaignCover
        campaignId={campaign.id}
        imageUrl={campaign.imageUrl}
        isMaster={isMaster}
      />
      <div className="px-6 pb-6 sm:px-8 sm:pb-8 bg-background relative flex flex-col items-start pt-4 border-t-2 border-border-strong">
        <CampaignTitleEdit
          campaignId={campaign.id}
          initialTitle={campaign.title}
          isMaster={isMaster}
        />

        <div className="flex items-center gap-2 mt-6 font-mono text-xs text-text-muted">
          <span className="bg-primary-surface border-2 border-primary/50 text-primary px-2 py-0.5 font-bold uppercase tracking-wider">
            Майстер
          </span>
          <span>{campaign.masterUsername}</span>
        </div>
      </div>
    </div>
  );
}

export default CampaignHeader;
