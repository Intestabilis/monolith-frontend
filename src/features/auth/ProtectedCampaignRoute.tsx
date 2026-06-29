import { Navigate, Outlet, useParams } from "react-router";
import { useCampaignContextQuery } from "../campaigns/hooks/useCampaignContextQuery";

function ProtectedCampaignRoute() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const { campaignContext, isPending, isError } =
    useCampaignContextQuery(campaignId);

  // CHANGE later to loader
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="animate-pulse font-mono text-sm uppercase tracking-widest text-text-muted">
          Завантаження...
        </span>
      </div>
    );
  }
  // REVIEW maybe show some error with a toast or smth idk (or more appropriately navigate to 403 page)
  if (isError || !campaignContext) return <Navigate to="/profile" replace />;

  return <Outlet context={campaignContext} />;
}

export default ProtectedCampaignRoute;
