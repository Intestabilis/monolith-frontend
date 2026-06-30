import { FilterGroup, FilterTab } from "../../../components/ui/FilterTabs";
import Select from "../../../components/ui/Select";
import type { FilterRole, SortOption } from "./CampaignList";

interface CampaignListControlsProps {
  counts: { master: number; player: number; total: number };
  roleFilter: FilterRole;
  setRoleFilter: (role: FilterRole) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

function CampaignListControls({
  counts,
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy,
}: CampaignListControlsProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-border-strong pb-4">
      {/* Фільтри (Таби) */}

      <FilterGroup>
        <FilterTab
          active={roleFilter === "all"}
          onClick={() => setRoleFilter("all")}
        >
          Всі ({counts.total})
        </FilterTab>
        <FilterTab
          variant="primary"
          active={roleFilter === "master"}
          onClick={() => setRoleFilter("master")}
        >
          Майстер ({counts.master})
        </FilterTab>

        <FilterTab
          variant="warning"
          active={roleFilter === "player"}
          onClick={() => setRoleFilter("player")}
        >
          Гравець ({counts.player})
        </FilterTab>
      </FilterGroup>

      <div className="flex items-center gap-3 shrink-0">
        <label
          htmlFor="sort-select"
          className="font-mono text-xs text-text-muted hidden sm:block"
        >
          Сортувати:
        </label>
        <Select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full sm:w-auto"
        >
          <option value="newest">Найновіші</option>
          <option value="oldest">Найстаріші</option>
          <option value="updated">Оновлені</option>
        </Select>
      </div>
    </div>
  );
}

export default CampaignListControls;
