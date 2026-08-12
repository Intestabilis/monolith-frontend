import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import type { UserInfoDTO } from "../../../schemas/user.schema";
import { PLAYSTYLE_STYLES, SYSTEM_STYLES } from "../constants";

interface UserProfileCardProps {
  user: UserInfoDTO;
  isOwnProfile?: boolean;

  // Props for resending activation email logic - needed ONLY if that's user's own profile
  onResendActivation?: () => void;
  isResending?: boolean;
  isResendSuccess?: boolean;
}

function UserProfileCard({
  user,
  isOwnProfile = false,
  onResendActivation,
  isResending,
  isResendSuccess,
}: UserProfileCardProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {/* CHANGE fr change fields + text colors for more bright for better contrast */}
      {/* REVIEW style choices like font in username, text-muted color, badge for pronouns etc. */}
      {/* BIO */}
      <section className="flex flex-col md:col-span-2 md:pr-4">
        <div className="mb-6 flex gap-4 items-center">
          <h2 className="font-title font-bold uppercase text-2xl text-text-selected break-all">
            {user.username}
          </h2>
          {user.pronouns && (
            <span className="font-mono text-sm text-text-muted border border-border-muted px-2 py-1 whitespace-nowrap">
              {user.pronouns}
            </span>
          )}
        </div>

        {/* Systems and playstyles */}
        <div className="mb-8 space-y-4">
          <div>
            <span className="mb-2 block font-mono text-xs uppercase text-text-muted">
              Улюблені системи:
            </span>
            <div className="flex flex-wrap gap-2">
              {user.favoriteSystems && user.favoriteSystems.length > 0 ? (
                user.favoriteSystems.map((system) => (
                  <Badge
                    key={system}
                    variant="default"
                    className={SYSTEM_STYLES[system]}
                  >
                    {system}
                  </Badge>
                ))
              ) : (
                <span className="font-mono text-xs text-text-muted/50 italic">
                  Не вказано
                </span>
              )}
            </div>
          </div>

          <div>
            <span className="mb-2 block font-mono text-xs uppercase text-text-muted">
              Стилі гри:
            </span>
            <div className="flex flex-wrap gap-2">
              {user.playstyles && user.playstyles.length > 0 ? (
                user.playstyles.map((style) => (
                  <Badge
                    key={style}
                    variant="default"
                    className={PLAYSTYLE_STYLES[style]}
                  >
                    {style}
                  </Badge>
                ))
              ) : (
                <span className="font-mono text-xs text-text-muted/50 italic">
                  Не вказано
                </span>
              )}
            </div>
          </div>
        </div>

        {/* About me */}
        <div className="border-t-2 border-border-muted pt-6">
          <span className="mb-3 block font-mono text-xs uppercase text-text-muted">
            Про себе:
          </span>
          <div className="font-sans text-sm prose prose-invert w-full max-w-full leading-relaxed text-text-primary">
            {user.bio ? (
              <p className="whitespace-pre-wrap">{user.bio}</p>
            ) : (
              <p className="text-text-muted italic opacity-70">
                Поки що тут нічого немає...
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Avatar + private info (REVIEW think about moving GMT from here? since it should be public info to show people your timezone to schedule games) */}
      <section className="flex flex-col gap-6 md:border-l-2 md:border-border-muted md:pl-8">
        <div className="aspect-square w-full border-2 border-border-strong bg-background-muted flex items-center justify-center overflow-hidden">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={`Аватар ${user.username}`}
              // REVIEW styles + avatar in general after uploading implementation
              className="h-full w-full object-cover grayscale contrast-125 transition-all hover:grayscale-0"
            />
          ) : (
            <div className="text-center opacity-40 grayscale filter">
              {/* CHANGE use some silly fantasy icon like for other things*/}
              <span className="mb-2 block text-4xl">👤</span>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Зображення відсутнє
              </p>
            </div>
          )}
        </div>

        {isOwnProfile && (
          <div className="flex flex-col gap-3 font-mono text-xs">
            <div>
              <span className="mb-1 block text-text-muted uppercase">
                Пошта:
              </span>
              <span className="text-text-primary break-all">{user.email}</span>
            </div>

            <div>
              <span className="mb-1 block text-text-muted uppercase">
                Часовий пояс:
              </span>
              <span className="text-text-primary">
                {user.timezone || (
                  <span className="text-text-muted/50 italic">Не вказано</span>
                )}
              </span>
            </div>

            <div>
              <span className="mb-1 block text-text-muted uppercase">
                Статус акаунту:
              </span>
              {user.isActivated ? (
                <Badge variant="success">✓ АКТИВОВАНИЙ</Badge>
              ) : (
                <div className="space-y-3 mt-2">
                  <Badge variant="danger">✗ НЕАКТИВОВАНИЙ</Badge>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full text-xs"
                    onClick={onResendActivation}
                    disabled={isResending || isResendSuccess}
                  >
                    {isResending
                      ? "Надсилання..."
                      : isResendSuccess
                        ? "Посилання надіслано"
                        : "Надіслати лист"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default UserProfileCard;
