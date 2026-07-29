import { useOutletContext, Outlet } from "react-router";
import type { CampaignContextResponse } from "../schemas/campaign.schema";
import Sidebar from "../components/Sidebar";

function CampaignLayout() {
  const campaignContext = useOutletContext<CampaignContextResponse>();
  return (
    <div className="flex h-screen w-full bg-background text-text-primary overflow-hidden">
      <main className="flex-1 relative bg-background h-full min-w-0 overflow-hidden">
        <Outlet context={campaignContext} />
      </main>
      <Sidebar campaignTitle={campaignContext.data.title} />
    </div>
  );
}

export default CampaignLayout;
