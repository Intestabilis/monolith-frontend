import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import { useAuth } from "../features/auth/hooks/useAuth";
import { CampaignList } from "../features/campaigns/components/CampaignList";
import { useCampaignsList } from "../features/campaigns/hooks/useCampaignsList";
import { useProfile } from "../features/user/useProfile";

function ProfilePage() {
  const { user: authData } = useAuth();
  const { user, isPending: isUserPending } = useProfile(authData?.id);

  const { campaigns: masterCampaigns, isPending: isMasterLoading } =
    useCampaignsList("master");
  const { campaigns: playerCampaigns, isPending: isPlayerLoading } =
    useCampaignsList("player");

  // IMPLEMENT REVIEW probably create "button" will just create a new campaign and reditect to info page instead
  function handleCreateCampaignClick() {
    console.log("Create campaign");
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-background px-4 py-8 text-text-primary selection:bg-primary-surface selection:text-text-selected">
      <Card variant="default" className="mb-12">
        <div className="mb-4 flex items-center justify-between border-b-2 border-border-strong pb-4">
          <h1 className="font-gothic-title text-3xl tracking-wide text-text-selected">
            Профіль
          </h1>
          {/* <Badge>Status: Active</Badge> */}
        </div>

        {isUserPending ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ) : user ? (
          <div className="grid grid-cols-1 gap-6 font-mono text-sm md:grid-cols-3">
            <div className="flex flex-col gap-1.5 border-border-muted pr-4 md:border-r">
              <p>
                <span className="text-text-muted">НІКНЕЙМ:</span>{" "}
                <span className="font-bold text-text-selected">
                  {user.username}
                </span>
              </p>
              <p>
                <span className="text-text-muted">ПОШТА:</span>{" "}
                <span className="text-text-primary">{user.email}</span>
              </p>
            </div>

            <div className="flex flex-col gap-1.5 border-border-muted px-4 md:border-r">
              <p>
                <span className="text-text-muted">СТАТУС ПРОФІЛЯ:</span>{" "}
                {user.isActivated ? (
                  <Badge variant="success">✓ ПІДТВЕРДЖЕНО</Badge>
                ) : (
                  <Badge variant="danger">✗ НЕАКТИВОВАНО</Badge>
                )}
              </p>
              <p>
                <span className="text-text-muted">ID:</span>{" "}
                <span className="break-all text-xs text-border-strong">
                  {user.id}
                </span>
              </p>
            </div>

            <Card
              variant="sub"
              className="flex items-center justify-center border-dashed border-border-muted bg-background/50"
            >
              <div className="text-center opacity-40 grayscale filter">
                <span className="mb-2 block text-2xl">👤</span>
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                  Зображення профілю
                  <br />
                  відсутнє (затичка)
                </p>
              </div>
            </Card>
          </div>
        ) : (
          <p className="font-mono text-danger">
            Не вдалося завантажити профіль користувача
          </p>
        )}
      </Card>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b-2 border-border-muted pb-2">
            <span className="text-xl text-primary">I</span>
            <h2 className="font-gothic-title text-2xl font-bold tracking-wide text-text-selected">
              Кампейни майстра{" "}
              <span className="font-mono text-sm text-text-muted">
                ({masterCampaigns?.length || 0})
              </span>
            </h2>
          </div>
          <CampaignList
            campaigns={masterCampaigns}
            isLoading={isMasterLoading}
            emptyTitle="Кампейни відсутні"
            emptyDescription="Ви не маєте жодного власного кампейна"
            layout="grid"
            onCreateClick={handleCreateCampaignClick}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b-2 border-border-muted pb-2">
            <span className="text-xl text-warning">I</span>
            <h2 className="font-gothic-title text-2xl font-bold tracking-wide text-text-selected">
              Кампейни гравця{" "}
              <span className="font-mono text-sm text-text-muted">
                ({playerCampaigns?.length || 0})
              </span>
            </h2>
          </div>
          <CampaignList
            campaigns={playerCampaigns}
            isLoading={isPlayerLoading}
            emptyTitle="Кампейни відсутні"
            layout="grid"
            emptyDescription="Вас ще не додано як гравця до жодного кампейну"
          />
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
