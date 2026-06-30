import { useState } from "react";
import type { CampaignListResponse } from "../../../schemas/campaign.schema";
import CampaignGridLayout from "./CampaignGridLayout";
import CampaignVerticalLayout from "./CampaignVerticalLayout";
import GridCampaignSkeleton from "./GridCampaignSkeleton";
import NoCampaignsState from "./NoCampaignsState";
import VerticalCampaignSkeleton from "./VerticalCampaignSkeleton";
import CampaignListControls from "./CampaignListControls";

type LayoutType = "grid" | "horizontal" | "vertical";
export type FilterRole = "all" | "master" | "player";
export type SortOption = "newest" | "oldest" | "updated";

export interface CampaignListProps {
  campaigns: CampaignListResponse | undefined;
  isLoading: boolean;
  emptyTitle: string;
  emptyDescription: string;
  layout?: LayoutType;
  showControls?: boolean;
  onCreateClick?: () => void;
}

export function CampaignList({
  campaigns,
  isLoading,
  emptyTitle,
  emptyDescription,
  layout = "grid",
  showControls = false,
  onCreateClick,
}: CampaignListProps) {
  const [roleFilter, setRoleFilter] = useState<FilterRole>("all");
  const [sortBy, setSortBy] = useState<SortOption>("updated");

  // Skeleton
  if (isLoading) {
    switch (layout) {
      case "grid":
        return <GridCampaignSkeleton />;
      case "vertical":
        return <VerticalCampaignSkeleton />;
    }
  }

  // Global Empty State
  if (!campaigns || campaigns.length === 0) {
    return (
      <NoCampaignsState
        title={emptyTitle}
        description={emptyDescription}
        onCreateClick={onCreateClick}
      />
    );
  }

  // honestly all this filtering/sorting not efficient-efficient, but user will probably have no more that 10-12 campaigns cap so doesn't matter here
  const counts = campaigns.reduce(
    (acc, campaign) => {
      if (campaign.meta.userRole === "master") acc.master++;
      else if (campaign.meta.userRole === "player") acc.player++;
      return acc;
    },
    { master: 0, player: 0 },
  );

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (roleFilter === "all") return true;
    return campaign.meta.userRole === roleFilter;
  });

  // CHANGE to createdAt/updatedAt comparison and not titles
  const sortedCampaigns = filteredCampaigns.toSorted((a, b) => {
    if (sortBy === "newest") {
      return b.data.title.localeCompare(a.data.title);
    }
    if (sortBy === "oldest") {
      return a.data.title.localeCompare(b.data.title);
    }
    if (sortBy === "updated") {
      return 0;
    }
    return 0;
  });

  // Local Empty State
  if (sortedCampaigns.length === 0) {
    return (
      <div className="flex flex-col h-full w-full">
        {showControls && (
          <CampaignListControls
            counts={{ ...counts, total: campaigns.length }}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        )}
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-border-muted text-text-muted">
          <span className="text-4xl mb-4 opacity-50">?</span>
          <h4 className="font-heading text-lg font-bold text-text-primary uppercase tracking-wide">
            Нічого не знайдено
          </h4>
          <p className="font-mono text-sm mt-1">
            Немає кампаній з обраною роллю.
          </p>
        </div>
      </div>
    );
  }

  // change back to switch if adding any more layouts are necessary
  const LayoutComponent =
    layout === "grid" ? CampaignGridLayout : CampaignVerticalLayout;

  return (
    <div className="flex flex-col w-full">
      {showControls && (
        <CampaignListControls
          counts={{ ...counts, total: campaigns.length }}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}
      <LayoutComponent campaigns={campaigns} onCreateClick={onCreateClick} />
    </div>
  );

  // switch (layout) {
  //   case "grid":
  //     return (
  //       <CampaignGridLayout
  //         campaigns={campaigns}
  //         onCreateClick={onCreateClick}
  //       />
  //     );
  //   case "vertical":
  //     return (
  //       <CampaignVerticalLayout
  //         campaigns={campaigns}
  //         onCreateClick={onCreateClick}
  //       />
  //     );
  // }
}
