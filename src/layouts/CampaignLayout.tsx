import { useOutletContext, Outlet } from "react-router";
import type { CampaignContextResponse } from "../schemas/campaign.schema";
import Sidebar from "../components/Sidebar";

function CampaignLayout() {
  const campaignContext = useOutletContext<CampaignContextResponse>();
  return (
    <div className="flex h-screen w-full bg-background text-text-primary overflow-hidden">
      {/* REVIEW scroll (maybe should do as a class in index file or smth later) */}
      <main className="flex-1 overflow-y-auto relative bg-background [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border-muted">
        {/* REVIEW Think about max-w-full there (and in general for other pages)*/}
        <div className="mx-auto max-w-6xl p-8">
          <Outlet context={campaignContext} />
        </div>
      </main>
      <Sidebar campaignTitle={campaignContext.data.title} />
    </div>
  );
}

export default CampaignLayout;
