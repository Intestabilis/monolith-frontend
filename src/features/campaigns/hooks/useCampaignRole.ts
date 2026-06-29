import { useCampaignContext } from "./useCampaignContext";

export function useCampaignRole() {
  const { meta } = useCampaignContext();

  return {
    role: meta.userRole,
    isMaster: meta.userRole === "master",
    isPlayer: meta.userRole === "player",
    permissions: meta.permissions,
  };
}
