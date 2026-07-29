import { RefreshCw, Save, Check } from "lucide-react";

function SyncStatus({
  isSyncing,
  isSaving,
}: {
  isSyncing: boolean;
  isSaving: boolean;
}) {
  const baseClasses =
    "absolute top-6 right-6 z-50 flex items-center gap-2 text-xs font-medium pointer-events-none transition-opacity duration-300";

  if (isSaving) {
    return (
      <div className={`${baseClasses} text-text-primary`}>
        <Save size={14} className="animate-pulse" />
        <span>Збереження...</span>
      </div>
    );
  }

  if (isSyncing) {
    return (
      <div className={`${baseClasses} text-text-primary`}>
        <RefreshCw size={14} className="animate-spin" />
        <span>Очікування...</span>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} text-text-muted`}>
      <Check size={14} />
      <span>Збережено</span>
    </div>
  );
}

export default SyncStatus;
