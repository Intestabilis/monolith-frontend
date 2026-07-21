import { X } from "lucide-react";
import Tooltip from "../../../components/ui/Tooltip";
import { cn } from "../../../utils/cn";

interface MemberBadgeProps {
  // REVIEW change to RoleType
  username: string;
  avatarUrl?: string | null;
  role: "master" | "player";
  showRemoveButton?: boolean;
  onRemove?: () => void;
}

// REVIEW move into utils/lib if will need somewhere else
// cloudinary util function to get small avatar
function getOptimizedAvatar(url?: string | null) {
  if (!url) return null;
  if (url.includes("cloudinary.com")) {
    return url.replace("/upload/", "/upload/w_80,h_80,c_fill,q_auto,f_auto/");
  }
  return url;
}

function MemberBadge({
  username,
  avatarUrl,
  role,
  showRemoveButton,
  onRemove,
}: MemberBadgeProps) {
  const optimizedAvatar = getOptimizedAvatar(avatarUrl);
  // kinda confusing since we're using "isMaster" mostly as a check for permissions, but there it's a check of any given user role (not current logged user)
  const isMaster = role === "master";
  return (
    <li
      className={cn(
        "relative group flex items-center gap-4 p-2 bg-background border-2 border-border-strong shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all min-w-45 max-w-55",
        isMaster
          ? "border-primary/50 bg-primary/5"
          : "hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-default",
      )}
    >
      <div className=" relative w-10 h-10 bg-surface border-2 border-border-strong flex items-center justify-center shrink-0 overflow-hidden">
        {optimizedAvatar ? (
          <img
            src={optimizedAvatar}
            alt={username}
            className={cn(
              "w-full h-full object-cover transition-all",
              !isMaster &&
                "grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100",
            )}
            loading="lazy"
          />
        ) : (
          <span className="font-heading text-lg text-text-primary uppercase">
            {username.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex flex-col overflow-hidden">
        <span className="font-bold text-sm text-text-primary truncate">
          {username}
        </span>
        <span
          className={cn(
            "text-[10px] font-mono uppercase tracking-wider",
            isMaster ? "text-primary" : "text-text-muted",
          )}
        >
          {isMaster ? "Майстер" : "Гравець"}
        </span>
      </div>

      {showRemoveButton && (
        <Tooltip content="Вигнати гравця">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className="p-1.5 shrink-0 text-text-muted hover:text-danger hover:bg-danger-surface transition-colors rounded-sm opacity-0 group-hover:opacity-100"
          >
            <X size="16" strokeWidth="3" />
          </button>
        </Tooltip>
      )}
    </li>
  );
}

export default MemberBadge;
