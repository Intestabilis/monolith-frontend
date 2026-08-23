import Card from "../components/ui/Card";
import { CampaignList } from "../features/campaigns/components/CampaignList";
import { useProfile } from "../features/user/hooks/useProfile";
import { useCampaignsList } from "../features/campaigns/hooks/useCampaignsList";
import DiceRoller from "../components/misc/DiceRoller";

function DashboardPage() {
  const { user: profile } = useProfile();

  const { campaigns, isPending } = useCampaignsList();

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-8">
      <header className="mb-8 border-b-4 border-border-strong pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-gothic-title text-4xl text-text-selected tracking-wide mb-1">
            З поверненням, {profile?.username || "Мандрівнику"}!
          </h1>
          <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
            Оберіть кампейн або створіть власний на сторінці профілю!
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">
        <section>
          <CampaignList
            campaigns={campaigns}
            isLoading={isPending}
            layout="grid"
            emptyTitle="Жодного активного контракту"
            emptyDescription="Схоже, ти ще не приєднався до жодної гри. Створи свою або дочекайся запрошення."
            showControls={true}
          />
        </section>

        {/* WIDGETS: fill later (CHANGE) with some additional info like statistics, calendar/next game date/etc*/}
        <aside className="flex flex-col gap-6 sticky top-24">
          <DiceRoller />

          <Card variant="default" className="p-4 bg-surface">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-text-primary mb-4 border-b-2 border-border-strong pb-2">
              Згодом тут буде більше контенту!
            </h3>

            <Card variant="sub" className="w-full h-50 text-center">
              <h2 className="italic text-text-muted">Stay tuned!</h2>
            </Card>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default DashboardPage;
