import { Navigate, Outlet, useParams } from "react-router";
import { useCampaignRole } from "../campaigns/hooks/useCampaignRole";

function ProtectedMasterRoute() {
  const { campaignId } = useParams();
  const { isMaster } = useCampaignRole();

  if (!isMaster) {
    // REVIEW path mostly
    return <Navigate to={`/campaigns/${campaignId}`} replace />;
  }

  return <Outlet />;
}

export default ProtectedMasterRoute;
