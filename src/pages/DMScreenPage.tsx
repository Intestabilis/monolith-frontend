import { useWidgets } from "../features/dmscreen/hooks/useWidgets";
import { useCampaignContext } from "../features/campaigns/hooks/useCampaignContext";
import DMScreenBoard from "../features/dmscreen/components/DMScreenBoard";
import Loader from "../components/ui/Loader";

function DMScreenPage() {
  const campaignContext = useCampaignContext();
  const campaignId = campaignContext.data.id;

  const {
    widgets,
    isPending: isFetchingWidgets,
    error: fetchError,
  } = useWidgets(campaignId);

  if (isFetchingWidgets) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader text="Завантаження ширми..." variant="d20" size="lg" />
      </div>
    );
  }

  // CHANGE TO PROPER ERROR
  if (fetchError || !widgets) {
    return (
      <div className="flex h-full items-center justify-center text-danger font-gothic">
        Сталася помилка при завантаженні
      </div>
    );
  }

  return <DMScreenBoard campaignId={campaignId} initialWidgets={widgets} />;
}

export default DMScreenPage;
