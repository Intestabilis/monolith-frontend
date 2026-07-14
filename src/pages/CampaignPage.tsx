import CampaignHeader from "../features/campaigns/components/CampaignHeader";
import CampaignPartyPanel from "../features/party/components/CampaignPartyPanel";
import { useCampaignContext } from "../features/campaigns/hooks/useCampaignContext";
import CampaignEditor from "../features/campaigns/components/CampaignEditor";

function CampaignPage() {
  const campaignContext = useCampaignContext();
  // CHANGE
  if (!campaignContext) return null;

  const campaign = campaignContext.data;
  const isMaster = campaignContext.meta.userRole === "master";

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      <CampaignHeader campaign={campaign} isMaster={isMaster} />
      <CampaignPartyPanel
        campaignId={campaign.id}
        isMaster={isMaster}
        master={campaign.master}
        members={campaign.members}
      />
      <CampaignEditor campaignId={campaign.id} isMaster={isMaster} />
      {/* <div className="w-full max-w-6xl mx-auto pb-16 border-2 border-dashed border-border-strong bg-surface/30 min-h-125 flex items-center justify-center p-8 text-text-muted font-mono text-sm uppercase tracking-widest"></div> */}
    </div>
  );
}

export default CampaignPage;
