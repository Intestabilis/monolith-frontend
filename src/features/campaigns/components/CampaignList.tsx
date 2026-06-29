import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Skeleton from "../../../components/ui/Skeleton";
import type { CampaignListResponse } from "../../../schemas/campaign.schema";
import CampaignCard from "./CampaignCard";

interface CampaignListProps {
  campaigns: CampaignListResponse | undefined;
  isLoading: boolean;
  emptyTitle: string;
  emptyDescription: string;
  onCreateClick?: () => void;
}

export function CampaignList({
  campaigns,
  isLoading,
  emptyTitle,
  emptyDescription,
  onCreateClick,
}: CampaignListProps) {
  // Skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[1, 2].map((n) => (
          <Card key={n} variant="interactive" className="h-80">
            <Skeleton className="h-40 mb-4 border border-border-muted" />
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="mt-4 h-10 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  //Empty State
  if (!campaigns || campaigns.length === 0) {
    return (
      <Card variant="dashed" className="text-text-muted">
        <span className="text-3xl block mb-2 opacity-50 uppercase">x</span>
        <h4 className="text-lg font-bold font-heading text-text-primary">
          {emptyTitle}
        </h4>
        <p className="mt-1 text-sm font-mono max-w-xs mx-auto">
          {emptyDescription}
        </p>
        {onCreateClick && (
          <Button
            variant="primary"
            size="sm"
            className="mt-4"
            onClick={onCreateClick}
          >
            + Створити кампанію
          </Button>
        )}
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.data.id}
          campaign={campaign}
          showRole={false}
        />
      ))}
      {onCreateClick && (
        <button
          onClick={onCreateClick}
          className="group relative flex flex-col items-center justify-center h-full min-h-72.5 border-2 border-dashed border-border-strong bg-surface/30 p-6 text-center font-heading text-text-muted transition-all hover:border-border-default hover:bg-background-contrast/40 cursor-pointer"
        >
          <span className="text-4xl mb-2 text-border-strong transition-colors group-hover:text-text-primary">
            +
          </span>
          <span className="text-sm font-bold uppercase tracking-wider text-text-muted transition-colors group-hover:text-text-primary">
            Новий кампейн
          </span>
          <span className="mt-1 font-mono text-xs text-border-strong opacity-70">
            Почніть вести лог своїх пригод прямо зараз (замінити текст)
          </span>
        </button>
      )}
    </div>
  );
}
