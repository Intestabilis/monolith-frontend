import CampaignHeader from "../features/campaigns/components/CampaignHeader";
import { useCampaignContext } from "../features/campaigns/hooks/useCampaignContext";

function CampaignPage() {
  const campaignContext = useCampaignContext();

  console.log(campaignContext);
  // CHANGE
  if (!campaignContext) return null;

  const campaign = campaignContext.data;
  const isMaster = campaignContext.meta.userRole === "master";

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      <CampaignHeader campaign={campaign} isMaster={isMaster} />
      {/* <CampaignPartyPanel campaign={campaign} isMaster={isMaster} /> */}

      <div className="w-full max-w-6xl mx-auto pb-16 border-2 border-dashed border-border-strong bg-surface/30 min-h-125 flex items-center justify-center p-8 text-text-muted font-mono text-sm uppercase tracking-widest"></div>
      {/* <Editor/> */}
    </div>
  );
}

export default CampaignPage;
