import { Navigate, Outlet, useParams } from "react-router";
import { useCampaignContextQuery } from "../campaigns/hooks/useCampaignContextQuery";
import Loader from "../../components/ui/Loader";

function ProtectedCampaignRoute() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const { campaignContext, isPending, isError } =
    useCampaignContextQuery(campaignId);

  if (isPending) {
    return (
      <Loader variant="d20" size="fullscreen" text="Завантаження кампейну..." />
    );
  }
  // REVIEW maybe navigate to 403 page will be more appropriate
  if (isError || !campaignContext) return <Navigate to="/profile" replace />;

  return <Outlet context={campaignContext} />;
}

export default ProtectedCampaignRoute;
