import PlusIcon from "../../../components/icons/PlusIcon";
import CampaignVerticalCard from "./CampaignVerticalCard";
import type { CampaignLayoutProps } from "./propsInterfaces";

function CampaignVerticalLayout({
  campaigns,
  onCreateClick,
}: CampaignLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {campaigns.map((campaign) => (
        <CampaignVerticalCard
          key={campaign.data.id}
          campaign={campaign}
          // REVIEW right now I don't need it, but probably should do it as a campaign list prop and drill down there
          showRole={false}
        />
      ))}

      {onCreateClick && (
        <button
          onClick={onCreateClick}
          className="group relative flex flex-col sm:flex-row sm:items-center justify-start p-4 gap-4 w-full border-2 border-dashed border-border-strong bg-surface/30 text-text-muted transition-all hover:border-border-default hover:bg-background-contrast/40 cursor-pointer"
        >
          <div className="flex items-center gap-4 w-full overflow-hidden">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center border-2 border-dashed border-border-strong bg-background/50 transition-colors group-hover:border-text-primary group-hover:bg-background-contrast">
              <span className="flex items-center justify-center text-5xl font-light leading-none text-border-strong transition-colors group-hover:text-text-primary pb-1">
                <PlusIcon />
              </span>
            </div>

            <div className="flex flex-col text-left truncate">
              <span className="font-heading uppercase text-xl tracking-wide font-bold transition-colors group-hover:text-text-primary">
                Новий кампейн
              </span>
              <span className="mt-1 font-mono text-xs text-border-strong opacity-70 transition-colors group-hover:opacity-100 group-hover:text-text-primary">
                Почніть вести лог своїх пригод прямо зараз
              </span>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

export default CampaignVerticalLayout;
