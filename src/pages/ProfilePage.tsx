import { useState } from "react";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import { CampaignList } from "../features/campaigns/components/CampaignList";
import { useCampaignsList } from "../features/campaigns/hooks/useCampaignsList";
import { useProfile } from "../features/user/hooks/useProfile";
import CreateCampaignModal from "../features/campaigns/components/CreateCampaignModal";
import { useResendActivation } from "../features/auth/hooks/useResendActivation";
import Button from "../components/ui/Button";
import UserProfileCard from "../features/user/components/UserProfileCard";
import UpdateProfileForm from "../features/user/components/UpdateProfileForm";

function ProfilePage() {
  const { user, isPending: isUserPending } = useProfile();

  const [isEditing, setIsEditing] = useState(false);

  const {
    resendActivation,
    isPending: isResending,
    isSuccess: isResendSuccess,
  } = useResendActivation();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const {
    campaigns: masterCampaigns,
    isPending: isMasterLoading,
    error: masterCampaignsError,
    refetch: refetchMaster,
  } = useCampaignsList("master");
  const {
    campaigns: playerCampaigns,
    isPending: isPlayerLoading,
    error: playerCampaignsError,
    refetch: refetchPlayer,
  } = useCampaignsList("player");

  // IMPLEMENT REVIEW probably create "button" will just create a new campaign and reditect to info page instead
  function handleCreateCampaignClick() {
    setIsCreateModalOpen(true);
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-background px-4 py-8 text-text-primary selection:bg-primary-surface selection:text-text-selected">
      <Card variant="default" className="mb-12">
        <div className="mb-6 flex items-center justify-between border-b-2 border-border-strong pb-4">
          <h1 className="font-gothic-title text-2xl font-bold uppercase tracking-widest text-text-selected">
            Профіль
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {!isEditing ? "Редагувати" : "Скасувати"}
          </Button>
        </div>
        {isUserPending ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ) : user ? (
          isEditing ? (
            <UpdateProfileForm
              user={user}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <UserProfileCard
              user={user}
              isOwnProfile={true}
              onResendActivation={() => resendActivation()}
              isResending={isResending}
              isResendSuccess={isResendSuccess}
            />
          )
        ) : (
          <p className="font-mono text-danger">
            Не вдалося завантажити профіль користувача
          </p>
        )}
      </Card>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <CreateCampaignModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b-2 border-border-muted pb-2">
            <span className="text-xl text-primary">I</span>
            <h2 className="font-gothic-title text-2xl font-bold tracking-wide text-text-selected">
              Кампейни майстра{" "}
              {!masterCampaignsError && (
                <span className="font-mono text-sm text-text-muted">
                  ({masterCampaigns?.length || 0})
                </span>
              )}
            </h2>
          </div>
          <CampaignList
            campaigns={masterCampaigns}
            isLoading={isMasterLoading}
            error={masterCampaignsError}
            onRetry={refetchMaster}
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
            error={playerCampaignsError}
            onRetry={refetchPlayer}
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
