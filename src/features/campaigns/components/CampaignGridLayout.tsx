import CampaignGridCard from "./CampaignGridCard";
import type { CampaignLayoutProps } from "./propsInterfaces";

function CampaignGridLayout({ campaigns, onCreateClick }: CampaignLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {campaigns.map((campaign) => (
        <CampaignGridCard
          key={campaign.data.id}
          campaign={campaign}
          // REVIEW right now I don't need it, but probably should do it as a campaign list prop and drill down there
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

export default CampaignGridLayout;
